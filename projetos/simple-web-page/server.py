"""Servidor estático de desenvolvimento para web/."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from time import sleep

ROOT = Path(__file__).resolve().parent / "web"
WATCHED = (ROOT / "index.html", ROOT / "css/style.css", ROOT / "js/main.js")
clients = set()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self.path == "/__reload.js":
            script = b"new EventSource('/__reload').onmessage = () => location.reload();"
            self.send_response(200)
            self.send_header("Content-Type", "text/javascript")
            self.send_header("Content-Length", str(len(script)))
            self.end_headers()
            self.wfile.write(script)
        elif self.path == "/__reload":
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.end_headers()
            clients.add(self.wfile)
            try:
                while True:
                    self.wfile.write(b": keep-alive\n\n")
                    self.wfile.flush()
                    sleep(10)
            except (BrokenPipeError, ConnectionResetError):
                clients.discard(self.wfile)
        else:
            super().do_GET()


def watch():
    previous = tuple(path.stat().st_mtime_ns for path in WATCHED)
    while True:
        sleep(.5)
        current = tuple(path.stat().st_mtime_ns for path in WATCHED)
        if current != previous:
            previous = current
            for client in tuple(clients):
                try:
                    client.write(b"data: reload\n\n")
                    client.flush()
                except (BrokenPipeError, ConnectionResetError):
                    clients.discard(client)


if __name__ == "__main__":
    Thread(target=watch, daemon=True).start()
    print("http://localhost:8000", flush=True)
    ThreadingHTTPServer(("0.0.0.0", 8000), Handler).serve_forever()
