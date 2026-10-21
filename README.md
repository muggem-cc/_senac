# SENAC — estudos de desenvolvimento web

Repositório de estudos organizado por aulas. Cada pasta em `aulas/` mantém seu conteúdo e contexto; o Git é único na raiz, sem repositórios aninhados. Para o fluxo detalhado de branches, commits e revisão por aula, consulte [`GIT.md`](GIT.md).

## Organização

```text
.
├── aulas/
│   ├── 001/
│   ├── 002/
│   └── ...
├── .gitattributes
├── .gitignore
├── AGENTS.md
├── GIT.md
├── LICENSE
└── README.md
```

- Use identificadores numéricos com três dígitos (`001`, `002`, ...), em ordem de aula.
- Mantenha exercícios, projetos, notas e instruções específicas dentro da pasta da aula correspondente.
- Cada aula com conteúdo deve ter um `README.md` ou `AULA.md` com objetivo, estrutura, como executar e validações. Não crie arquivos vazios apenas para preencher um modelo.
- Dependências e configurações pertencem à aula que as utiliza. Só coloque recursos na raiz quando forem realmente compartilhados.
- Evite arquivos gerados, caches, credenciais e configurações pessoais no controle de versão.

## Histórico por aula

Faça commits pequenos, focados em uma aula e com escopo explícito, por exemplo:

```text
aulas/006: documenta como executar o projeto
```

O histórico Git é compartilhado, mas pode ser consultado por pasta:

```sh
git log --oneline -- aulas/006
git diff -- aulas/006
```

Mudanças compartilhadas ou que afetem várias aulas devem indicar isso no escopo do commit.

## Aula 006

Consulte [`aulas/006/AULA.md`](aulas/006/AULA.md) para estrutura, execução e validação do projeto web.
