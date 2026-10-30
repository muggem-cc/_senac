# SENAC — Desenvolvimento Web

Repositório de estudos organizado por projetos. As aulas são encontros de segunda, quarta e sexta, identificados por número, dia e data nos commits — não por diretórios. O repositório Git é único na raiz.

## Estrutura

```text
.
├── projetos/                 # projetos independentes, com nomes estáveis
│   └── simple-web-page/
├── estudos/                  # exercícios e anotações não ligados a projetos
├── aulas/                    # materiais de aula que não sejam projetos
├── tools/
│   └── aula.py               # cálculo e identificação da aula vigente
├── .github/workflows/        # automações do GitHub
├── AGENTS.md                 # orientações para agentes
├── GIT.md                    # fluxo de trabalho e convenções Git
├── LICENSE
└── README.md
```

- Não numere pastas de projeto pela aula em que foram iniciadas; um projeto pode atravessar várias aulas.
- Use `aulas/` para materiais de aula que não pertencem a um projeto e `estudos/` para exercícios e notas avulsos.
- Consulte o README de cada projeto para objetivo, execução e validação.

## Aulas e commits

O calendário considera encontros às segundas, quartas e sextas. O utilitário calcula o número e a data prevista da aula com base no marcador local `.git/aula-atual`.

```sh
# Consultar aula prevista e situação de hoje
python tools/aula.py

# Gerar o prefixo de commit da aula
python tools/aula.py --commit-prefix

# Simular uma data
python tools/aula.py --date 2026-10-23

# Confirmar a aula no marcador local após registrá-la
python tools/aula.py --advance
```

Use nos commits o formato `NNN-DIA-DD.MM.AA: descrição`, por exemplo:

```text
007-SEX-23.10.26: introduz seletores CSS
```

Se passar um dia letivo sem registro, a contagem avança e o programa indica falta provável. O calendário sozinho não distingue falta de feriado ou cancelamento: nesses casos, ajuste a referência local. O marcador dentro de `.git/` não é versionado; consulte [`GIT.md`](GIT.md) para inicialização, avanço e recuperação da referência.

## Projeto atual

O projeto `simple-web-page` é um site de referências sobre Fábio Akita, feito com HTML, CSS e JavaScript vanilla. Consulte [`projetos/simple-web-page/README.md`](projetos/simple-web-page/README.md) para estrutura, execução e validação.

## Uso educacional de inteligência artificial

Ferramentas de inteligência artificial podem apoiar atividades pontuais do processo de aprendizagem, como esclarecer dúvidas, explorar alternativas ou revisar uma solução. Seu uso é complementar: o estudante conduz o trabalho, compreende e verifica as sugestões recebidas e responde pelas decisões e pelo resultado final, em conformidade com as orientações do docente.
