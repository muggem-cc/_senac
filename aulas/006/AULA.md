# Aula 6 — Vanilla Web

Projeto de referências sobre Fábio Akita, feito com HTML, CSS e JavaScript vanilla.

## Estrutura

```text
006/
├── AULA.md
├── server.py
└── web/
    ├── index.html
    ├── css/style.css
    ├── js/main.js
    └── assets/img/
```

Inicie `python server.py` na raiz; o site fica em `http://localhost:8000/`.

## Decisões de implementação

- HTML semântico em `pt-BR`, responsivo, com descrições acessíveis e links externos seguros.
- CSS simples, organizado por componentes e com tokens de cor. Fonte JetBrains Mono; verde `#8BFF65`, fundo `#090C0A`, superfície `#111713`, borda `#26332A`, texto `#E4EAE5` e descrições `#9AA69C`.
- A foto de Fábio Akita usa `<figure>` e `<figcaption>` para manter a legenda abaixo da imagem.
- A thumbnail do blog exibe o ícone oficial `[A]` do AkitaOnRails, em `web/assets/img/akitaonrails-logo.webp`, ao lado do texto `AkitaOnRails.com`; o ícone mede `1.5rem`.
- O rótulo `Blog` aparece junto ao ícone próprio na descrição do card. As thumbnails de vídeo mostram miniatura e botão play, sem faixa ou rótulo `YouTube` sobre a imagem.
- Todos os previews — blog e vídeos — usam o mesmo diálogo flutuante e iframe. O diálogo fecha pelo botão, por Escape ou ao clicar no fundo; o iframe é removido ao fechar. Vídeos mantêm proporção 16:9.
- Não adicionar scripts vazios, dependências ou infraestrutura desnecessária.

A imagem `web/assets/img/favicon.webp` é o favicon exibido na aba do navegador. Os assets raster ficam em WebP.

## Servidor e validação

`server.py` serve a pasta `web/`. Após alterar o servidor, reinicie o processo. Valide página, CSS, JS e imagens por HTTP — resposta 200 apenas na raiz não garante que os demais recursos estejam acessíveis.
