const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = __dirname;
const siteRoot = path.dirname(root);
const base = '/guia-exercises';
const port = Number(process.env.PORT || 8003);
const running = new Map();
// prompt-sync reads stdin synchronously; this tiny preload makes browser-fed lines work.
const shim = path.join(os.tmpdir(), `guide-prompt-${process.pid}.cjs`);
fs.writeFileSync(shim, `const fs=require('node:fs'),M=require('node:module'),load=M._load;function promptSync(){return function(q=''){if(q)process.stdout.write(q);let a=[],b=Buffer.alloc(1);while(true){if(!fs.readSync(0,b,0,1,null)||b[0]===10||b[0]===13)break;a.push(b[0])}return Buffer.from(a).toString()}}M._load=function(r,p,m){return r==='prompt-sync'?promptSync:load.call(this,r,p,m)};`);

const send = (res, status, body, type = 'text/plain; charset=utf-8') => {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
};
const emit = (session, type, text = '') => {
  if (!session.closed) session.res.write(`data: ${JSON.stringify({ type, text })}\n\n`);
};

async function activities() {
  const dirs = await fsp.readdir(root, { withFileTypes: true });
  const result = [];
  for (const dir of dirs) {
    if (!dir.isDirectory() || !/^atividade-\d{2}-\d{2}$/.test(dir.name)) continue;
    try {
      const code = await fsp.readFile(path.join(root, dir.name, 'content.js'), 'utf8');
      result.push({ id: dir.name, title: code.match(/^\s*\/\/\s*Atividade:\s*(.+)$/im)?.[1]?.trim() || dir.name });
    } catch {}
  }
  return result.sort((a, b) => a.id.localeCompare(b.id, 'pt-BR', { numeric: true }));
}

function run(id, res) {
  if (running.has(id)) return send(res, 409, 'Já está executando.');
  const file = path.join(root, id, 'content.js');
  const child = spawn(process.execPath, [file], {
    cwd: path.dirname(file), windowsHide: true,
    env: { ...process.env, NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --require=${shim.replaceAll('\\', '/')}`.trim() },
  });
  const session = { res, child, pending: '', closed: false };
  running.set(id, session);
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  res.write(': ready\n\n');
  let timer;
  const output = chunk => {
    session.pending += chunk.toString().replace(/\r/g, '').replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, '');
    const lines = session.pending.split('\n');
    session.pending = lines.pop();
    lines.forEach(line => emit(session, 'output', line));
    clearTimeout(timer);
    if (session.pending) timer = setTimeout(() => emit(session, 'prompt', session.pending), 40);
  };
  child.stdout.on('data', output);
  child.stderr.on('data', output);
  child.on('close', code => {
    clearTimeout(timer);
    if (session.pending) emit(session, 'output', session.pending);
    emit(session, 'exit', code === 0 ? 'Processo finalizado.' : `Processo encerrado (código ${code}).`);
    session.closed = true;
    res.end();
    running.delete(id);
  });
  res.on('close', () => {
    if (session.closed) return;
    session.closed = true;
    running.delete(id);
    child.kill();
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith(`${base}${base}/`)) {
    res.writeHead(302, { Location: url.pathname.slice(base.length) });
    return res.end();
  }
  const route = url.pathname === base ? '/' : url.pathname.startsWith(`${base}/`) ? url.pathname.slice(base.length) : url.pathname;
  if (req.method === 'GET' && route === '/api/activities') {
    try { return send(res, 200, JSON.stringify(await activities()), 'application/json'); }
    catch { return send(res, 500, 'Falha ao listar atividades.'); }
  }
  const match = route?.match(/^\/api\/activities\/(atividade-\d{2}-\d{2})(?:\/(run|input|stop))?$/);
  if (match) {
    const [, id, action] = match;
    try { await fsp.access(path.join(root, id, 'content.js')); }
    catch { return send(res, 404, 'Atividade não encontrada.'); }
    if (req.method === 'GET' && action === 'run') return run(id, res);
    if (req.method === 'POST' && action === 'stop') {
      running.get(id)?.child.kill();
      return send(res, 204, '');
    }
    if (req.method === 'POST' && action === 'input') {
      const session = running.get(id);
      if (!session) return send(res, 409, 'Não está executando.');
      let body = '';
      req.setEncoding('utf8');
      req.on('data', part => { body += part; });
      req.on('end', () => {
        try {
          const { value } = JSON.parse(body);
          if (typeof value !== 'string' || value.length > 10000) throw Error();
          session.child.stdin.write(`${value}\n`);
          send(res, 204, '');
        } catch { send(res, 400, 'Entrada inválida.'); }
      });
      return;
    }
    return send(res, 405, 'Método não permitido.');
  }
  if (req.method !== 'GET') return send(res, 405, 'Método não permitido.');
  if (route === null) return send(res, 404, 'Não encontrado.');
  const staticRoot = url.pathname === base || url.pathname.startsWith(`${base}/`) ? root : siteRoot;
  const file = path.resolve(staticRoot, `.${route === '/' ? '/index.html' : route}`);
  if (file !== staticRoot && !file.startsWith(staticRoot + path.sep)) return send(res, 403, 'Acesso negado.');
  try {
    const body = await fsp.readFile(file);
    const type = file.endsWith('.html')
      ? 'text/html; charset=utf-8'
      : file.endsWith('.css')
        ? 'text/css; charset=utf-8'
        : file.endsWith('.js')
          ? 'application/javascript; charset=utf-8'
          : 'application/octet-stream';
    send(res, 200, body, type);
  } catch { send(res, 404, 'Não encontrado.'); }
});

server.listen(port, () => console.log(`Guia disponível em http://localhost:${port}`));
function shutdown() {
  for (const session of running.values()) session.child.kill();
  server.close(() => { fs.rmSync(shim, { force: true }); process.exit(0); });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
