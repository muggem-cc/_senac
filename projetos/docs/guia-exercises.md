# Guia de exercícios — uso

## Abrir no navegador

O servidor Node.js do guia disponibiliza o lobby dos projetos e o mini terminal na porta `8003`:

- Lobby: <http://localhost:8003/>
- Guia: <http://localhost:8003/guia-exercises/>

Se o servidor não estiver rodando, abra um terminal na pasta `_senac` e execute:

```powershell
node projetos/guia-exercises/server.js
```

Mantenha esse terminal aberto enquanto usa o guia. Se a porta `8003` já estiver ocupada, não inicie outra cópia; abra o endereço acima no navegador.

## Executar uma atividade

1. Abra uma atividade no índice.
2. Pressione **Play** para executar `content.js` com Node.js no computador.
3. Digite no campo do mini terminal quando o programa solicitar uma entrada e pressione **Enter** ou **Enviar**.
4. Pressione **Stop** para interromper uma execução.

A saída padrão e os erros do script aparecem no mini terminal. Os scripts usam `prompt-sync`; o servidor conecta as entradas do navegador ao processo executado.

## Adicionar atividades

Crie uma pasta no formato `atividade-XX-YY` dentro de `projetos/guia-exercises/` e coloque nela um arquivo `content.js`. O índice descobre as pastas ao carregar; não é preciso cadastrar a atividade manualmente. Para definir o título mostrado no índice, inclua no início do script:

```js
// Atividade: Título da atividade
```

## Dados de exemplo e biblioteca utilitária

`dados.json` reúne valores fictícios para conferir as atividades. Para consultar um conjunto pelo identificador da atividade:

```js
const { mockDa } = require('../utils');
const exemplo = mockDa('atividade-03-01');
console.log(exemplo.nome); // Ana Costa
```

A biblioteca em `utils/index.js` também exporta `dados`, com o objeto completo carregado de `dados.json`. Os exemplos são opcionais; as atividades continuam solicitando os dados ao executar.

## Arquivos principais

- `index.html` e `web/css/style.css`: índice, navegação e mini terminal.
- `server.js`: servidor local, catálogo dinâmico e execução dos scripts.
- `atividade-XX-YY/content.js`: código de cada atividade.
- `dados.json` e `utils/index.js`: dados fictícios e acesso compartilhado aos mocks.

> Os scripts executam localmente com as permissões do usuário que iniciou o servidor. Use apenas código confiável e não exponha o servidor a redes não confiáveis.
