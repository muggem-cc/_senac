# Organização e fluxo de trabalho com Git

Este documento define como organizar projetos e registrar aulas no histórico deste monorepo.

## Princípios

- Há um único repositório Git na raiz; não criar repositórios aninhados nem submodules.
- A numeração da aula é calculada pelo calendário letivo e registrada nos assuntos dos commits. Pastas `projetos/` organizam projetos, não aulas.
- Commits devem ser pequenos, coerentes e focados em um encontro e seu escopo. Não misture tarefas não relacionadas só por conveniência.
- Não inclua arquivos gerados, caches, credenciais, dependências instaladas ou configurações pessoais.
- `.gitattributes` padroniza finais de linha para LF e evita conversão dos assets WebP; mantenha-o atualizado ao introduzir formatos binários ou convenções específicas.
- Preserve alterações existentes. Antes de commitar, confira cuidadosamente o diff e o estado do diretório.

## Estrutura e escopo

Organize por projeto, com identificadores estáveis (`projetos/site-referencias/`, por exemplo), sem atrelar a pasta à aula em que começou. Exercícios e notas que não pertencem a um projeto ficam em uma área de estudos apropriada. Documente objetivo, estrutura, execução e validação em cada projeto.

Só compartilhe arquivos entre projetos quando houver uso real por mais de um. Mudanças compartilhadas ficam em localização comum apropriada e declaram seu escopo no commit. Não mova conteúdo existente sem necessidade ou autorização.

## Numeração de aulas e commits

As aulas são eventos do calendário, não diretórios. O utilitário `tools/aula.py` calcula o número a partir de uma data-base e dos encontros de segunda, quarta e sexta. O marcador local `.git/aula-atual` guarda a última aula confirmada e não é versionado. A contagem automática pressupõe que as aulas ocorreram; faltas e feriados exigem corrigir a referência antes de avançar.

```sh
python tools/aula.py                    # consulta aula vigente
python tools/aula.py --date 2026-10-23  # simula uma data
python tools/aula.py --advance          # confirma a aula após registrá-la
```

Registre cada encontro em um commit com prefixo `aula NNN:` (por exemplo, `aula 007: introduz seletores CSS`), podendo incluir um escopo de projeto depois do número. `--advance` só atualiza o marcador em dias letivos e exige que todos os números desde a referência estejam no histórico. O utilitário não cria commits. Para reconstruir a referência, use a data e o número conhecidos e confira os commits correspondentes.

## Commits

Escreva mensagens em português, concisas e no imperativo ou como descrição objetiva. Prefixe com o número da aula vigente; se houver contexto de projeto, inclua-o depois do número:

```text
aula 007: site-referencias, documenta execução
```

Para trabalho que atravesse projetos, nomeie o tema compartilhado:

```text
aula 007: raiz, documenta fluxo Git
```

Evite mensagens vagas como `ajustes`, `update` ou `correções`. Um commit deve representar uma unidade que possa ser entendida e revisada isoladamente.

## Fluxo antes de cada commit

1. Confira branch e estado: `git status --short --branch`.
2. Revise o diff, incluindo arquivos novos: `git diff` e `git diff --no-index /dev/null caminho/do/arquivo` quando necessário.
3. Verifique que caches, segredos e artefatos não serão incluídos.
4. Execute validações proporcionais às mudanças e registre resultados relevantes na documentação do projeto, se apropriado.
5. Faça stage explícito por caminho; evite `git add .` quando houver arquivos de escopos diferentes ou alterações não relacionadas.
6. Revise o conteúdo staged com `git diff --cached` e confirme apenas quando o escopo estiver correto.
7. Após o commit, confirme o resultado com `git status --short --branch`.

Não reescreva histórico publicado nem descarte alterações do usuário sem autorização. Não faça push sem pedido explícito.

## Consultar histórico e diferenças por aula

```sh
# Histórico de uma aula (prefixo na mensagem)
git log --all --oneline --grep='^aula 007:'

# Histórico de um projeto/arquivo
git log --oneline --follow -- projetos/site-referencias/server.py

# Mudanças locais no projeto
git diff -- projetos/site-referencias

# Arquivos staged no projeto
git diff --cached -- projetos/site-referencias

# Arquivos alterados, agrupados por status
git status --short
```

A busca por prefixo ajuda a revisar uma aula; filtros por caminho mostram a evolução de projetos e arquivos. Commits que incluem arquivos compartilhados podem aparecer no histórico de mais de um projeto.

## Branches

Para mudanças que precisem de revisão ou sejam maiores que uma correção pequena, use uma branch descritiva, por exemplo `docs/organizacao-git` ou `projeto/simple-web-page`. Mantenha o escopo da branch claro, integre-a conforme o fluxo acordado para o projeto e não crie branches permanentes por aula sem uma necessidade concreta.
