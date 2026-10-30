# Simple Web Page — Vanilla Web

Projeto de referências sobre Fábio Akita, feito com HTML, CSS e JavaScript vanilla.

## Estrutura

```text
simple-web-page/
├── README.md
├── server.py
└── web/
    ├── index.html
    ├── css/style.css
    ├── js/main.js
    └── assets/img/
```

Inicie `python server.py` nesta pasta; o site fica em `http://localhost:8000/`.

## Decisões de implementação

- HTML semântico em `pt-BR`, responsivo, com descrições acessíveis e links externos seguros.
- CSS sem dependências, com estilos-base compartilhados e ajustes por media queries. No desktop, o cabeçalho distribui texto e retrato em colunas, enquanto a área de conteúdo usa o espaço vertical disponível para organizar as referências e manter o rodapé no fim da página. No celular, os cartões empilham a prévia acima dos detalhes.
- Tokens CSS centralizam cores e largura do conteúdo: verde `#8BFF65`, fundo `#090C0A`, superfície `#111713`, borda `#26332A`, texto `#E4EAE5`, descrições `#9AA69C` e raio discreto `--radius`. A tipografia usa JetBrains Mono.
- A foto de Fábio Akita usa `<figure>` e `<figcaption>` para associar a legenda à imagem. CSS `aspect-ratio: 1` mantém a foto quadrada; `object-fit: cover` preenche o quadro sem distorcer a imagem, e `object-position` controla o recorte.
- A thumbnail do blog exibe o ícone `[A]` do AkitaOnRails, em `web/assets/img/akitaonrails-logo.webp`. O nome `AkitaOnRails` aparece no título do cartão.
- O rótulo `Blog` aparece junto ao ícone próprio na descrição do card. As thumbnails de vídeo mostram miniatura e botão play, sem faixa ou rótulo `YouTube` sobre a imagem.
- Todos os previews — blog e vídeos — usam o mesmo diálogo flutuante e iframe. O diálogo fecha pelo botão, por Escape ou ao clicar no fundo; o iframe é removido ao fechar. Vídeos mantêm proporção 16:9.
- Acessibilidade: links têm foco visível, imagens decorativas usam `alt` vazio e `prefers-reduced-motion` reduz animações para quem configurou essa preferência no sistema.
- As media queries ajustam o layout até `48rem` (telas menores) e até `36rem` (celulares). Use o inspetor responsivo para verificar larguras, orientação e rolagem em telas baixas.
- Não adicionar scripts vazios, dependências ou infraestrutura desnecessária.

A imagem `web/assets/img/favicon.webp` é o favicon exibido na aba do navegador. Os assets raster ficam em WebP.

## Servidor e validação

`server.py` serve a pasta `web/`. Após alterar o servidor, reinicie o processo. Valide página, CSS, JS e imagens por HTTP — resposta 200 apenas na raiz não garante que os demais recursos estejam acessíveis.

Após mudanças visuais, confira no navegador ao menos uma viewport desktop e uma mobile. Teste também os links de prévia, fechamento do diálogo (botão, Escape e clique no fundo), foco pelo teclado e rolagem em telas baixas. `git diff --check` verifica whitespace, mas não substitui a inspeção visual.
