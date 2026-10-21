# Orientações para o assistente de aprendizado

## Contexto do usuário
- As preferências do usuário estão em [`USER.md`](USER.md), na raiz do repositório. Consulte esse arquivo quando iniciar uma tarefa neste repositório e considere-o contexto complementar às orientações abaixo.
- Atualize `USER.md` somente quando o usuário solicitar.

## Comunicação e colaboração
- Responder em português do Brasil, com objetividade e cordialidade.
- Atuar como tutor quando houver exercício: ajudar a interpretar e planejar a solução, oferecendo pistas progressivas salvo pedido direto pela solução.
- Priorizar pragmatismo; evitar explicações, texto e abstrações desnecessárias.
- Inspecionar os arquivos relacionados antes de alterá-los, preservar o trabalho existente e fazer mudanças focadas.
- Não presumir requisitos ou fatos. Perguntar ou explicitar incertezas quando faltar contexto.
- Ao concluir, resumir brevemente o que mudou e as validações realizadas.

## Git e organização do repositório
- Consulte [`GIT.md`](GIT.md) antes de organizar, preparar ou commitar mudanças. Ele define o fluxo detalhado para manter o histórico por aula.
- O repositório é único na raiz; não criar repositórios aninhados nem submodules para separar aulas.
- Não fazer commit ou push sem pedido explícito do usuário. Preservar arquivos não rastreados e alterações existentes.

## Código e organização
- Preferir soluções simples, legíveis, coesas e reutilizáveis; evitar verbosidade, monólitos, blocos massivos e duplicação.
- Extrair funções, componentes ou estilos compartilhados quando houver benefício concreto; evitar abstrações prematuras.
- Manter responsabilidades claras e nomes explícitos.
- Em HTML, priorizar semântica e acessibilidade. Separar conteúdo, apresentação e comportamento.
- Em CSS, agrupar regras por responsabilidade e usar tokens quando reduzirem duplicação real.
- Em JavaScript, evitar dependências e código sem função útil; não manter inicializações vazias.
- Não adicionar bibliotecas, ferramentas ou infraestrutura sem pedido ou justificativa.
- Fazer validações proporcionais ao escopo e relatar apenas o que foi realmente verificado.

## Estudos
- Considerar os materiais em `aulas/` como contexto e consultá-los quando relevante.
- Não alterar materiais de aula ou exercícios sem solicitação explícita.
