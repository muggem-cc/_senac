# SENAC — Desenvolvimento Web

Repositório de estudos organizado por projetos. As aulas são encontros de segunda, quarta e sexta, identificados por número, dia e data nos commits — não por diretórios. O repositório Git é único na raiz.

## Estrutura

```text
.
├── projetos/
│   └── simple-web-page/      # site de referências em HTML, CSS e JavaScript
├── tools/
│   └── aula.py               # cálculo da aula e prefixo para commits
├── .github/workflows/        # automações do GitHub
├── AGENTS.md                 # orientações para agentes
├── GIT.md                    # fluxo de trabalho e convenções Git
├── LICENSE
└── README.md
```

No momento, o repositório contém um projeto. Novos projetos ficam em `projetos/`, cada um em uma pasta com nome estável. Aulas são registradas no histórico Git, não em diretórios numerados.

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

A inteligência artificial é usada como apoio nos estudos e em tarefas pontuais, como esclarecer dúvidas, explorar alternativas e revisar soluções. Suas sugestões também podem ajudar a interpretar orientações do docente, mas são avaliadas e verificadas antes de serem aplicadas. A responsabilidade pelo conteúdo e pelas decisões permanece com o estudante.
