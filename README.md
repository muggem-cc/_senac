# SENAC — estudos de desenvolvimento web

Repositório de estudos organizado por projetos e materiais. As aulas são identificadas pelos dias de encontro e registradas nos commits, não por pastas; o Git é único na raiz, sem repositórios aninhados. Para o fluxo de numeração e commits, consulte [`GIT.md`](GIT.md).

## Organização

```text
.
├── projetos/
│   └── nome-do-projeto/
├── estudos/
│   └── notas-e-exercicios/
├── aulas/             # materiais brutos das aulas, sem numeração de diretório
├── tools/
│   └── aula.py
├── .gitattributes
├── .gitignore
├── AGENTS.md
├── GIT.md
├── LICENSE
└── README.md
```

- Organize projetos em `projetos/` com nomes estáveis; não numere pastas pela aula em que foram trabalhados.
- Mantenha exercícios e notas em `estudos/` quando não fizerem parte de um projeto. Use `aulas/` apenas para materiais da aula que não sejam projetos; não crie subpastas numeradas por encontro.
- Cada projeto deve ter documentação suficiente para explicar objetivo, execução e validação.
- Dependências e configurações pertencem ao projeto que as utiliza. Só coloque recursos na raiz quando forem realmente compartilhados.
- Evite arquivos gerados, caches, credenciais e configurações pessoais no controle de versão.

## Aulas e histórico

`python tools/aula.py` calcula o número da aula pelos encontros de segunda, quarta e sexta. A referência confirmada fica local em `.git/aula-atual`; commits de aula usam o prefixo `aula NNN:`. Consulte [`GIT.md`](GIT.md) para o fluxo, confirmações e simulação de datas.

Faça commits pequenos e prefixe cada encontro pelo número calculado, acrescentando o projeto quando útil:

```text
aula 007: site-referencias, documenta execução
```

Para consultar o histórico de uma aula, filtre as mensagens pelo prefixo, conforme os exemplos em [`GIT.md`](GIT.md). O histórico de um projeto continua sendo consultado pelo caminho.

## Projeto atual

O site de referências está em [`projetos/simple-web-page/`](projetos/simple-web-page/), com estrutura, execução e validação documentadas no `README.md` do projeto.
