# Organização e fluxo de trabalho com Git

Este documento define como preservar a organização das aulas e manter um histórico útil neste monorepo.

## Princípios

- Há um único repositório Git na raiz. As pastas de aula não são repositórios separados e não usam submodules.
- O conteúdo de cada aula fica isolado em `aulas/NNN/`. Histórico por pasta é obtido com filtros do Git; não representa um repositório ou branch independente.
- Commits devem ser pequenos, coerentes e focados. Não misture tarefas de aulas diferentes só por conveniência.
- Não inclua arquivos gerados, caches, credenciais, dependências instaladas ou configurações pessoais.
- Preserve alterações existentes. Antes de commitar, confira cuidadosamente o diff e o estado do diretório.

## Estrutura e escopo

Use identificadores de três dígitos, em ordem (`aulas/001/`, `aulas/002/` etc.). Mantenha dentro da aula seu código, exercícios, notas e instruções. Se uma aula tiver projeto, documente objetivo, estrutura, comandos de execução e validação em `README.md` ou `AULA.md`.

Só compartilhe arquivos entre aulas quando houver uso real por mais de uma. Mudanças compartilhadas ficam em uma localização comum apropriada e devem declarar esse escopo no commit. Não mova conteúdo entre aulas sem necessidade ou autorização.

## Commits

Escreva mensagens em português, concisas e no imperativo ou como descrição objetiva. Prefixe com o escopo quando houver uma única aula:

```text
aulas/006: documenta execução do projeto
```

Para trabalho que atravesse escopos, nomeie o tema compartilhado ou as aulas envolvidas:

```text
aulas/006, raiz: adiciona documentação do fluxo Git
```

Evite mensagens vagas como `ajustes`, `update` ou `correções`. Um commit deve representar uma unidade que possa ser entendida e revisada isoladamente.

## Fluxo antes de cada commit

1. Confira branch e estado: `git status --short --branch`.
2. Revise o diff, incluindo arquivos novos: `git diff` e `git diff --no-index /dev/null caminho/do/arquivo` quando necessário.
3. Verifique que caches, segredos e artefatos não serão incluídos.
4. Execute validações proporcionais às mudanças e registre resultados relevantes na documentação da aula, se apropriado.
5. Faça stage explícito por caminho; evite `git add .` quando houver arquivos de escopos diferentes ou alterações não relacionadas.
6. Revise o conteúdo staged com `git diff --cached` e confirme apenas quando o escopo estiver correto.
7. Após o commit, confirme o resultado com `git status --short --branch`.

Não reescreva histórico publicado nem descarte alterações do usuário sem autorização. Não faça push sem pedido explícito.

## Consultar histórico e diferenças por aula

```sh
# Histórico de uma aula
git log --oneline -- aulas/006

# Histórico detalhado de um arquivo
git log --follow -- aulas/006/server.py

# Mudanças locais em uma aula
git diff -- aulas/006

# Arquivos staged de uma aula
git diff --cached -- aulas/006

# Arquivos alterados, agrupados por status
git status --short
```

Os filtros por caminho ajudam a revisar a evolução de uma aula, mas commits que incluem arquivos compartilhados podem aparecer no histórico de mais de uma pasta.

## Branches

Para mudanças que precisem de revisão ou sejam maiores que uma correção pequena, use uma branch descritiva, por exemplo `docs/organizacao-git` ou `aula-006/galeria`. Mantenha o escopo da branch claro, integre-a conforme o fluxo acordado para o projeto e não crie branches permanentes por aula sem uma necessidade concreta.
