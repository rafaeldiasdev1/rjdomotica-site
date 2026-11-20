# rjdomotica.com

Site institucional da RJDOMÓTICA, publicado pelo GitHub Pages em https://rjdomotica.com.

- 100% estático: `index.html`, `style.css`, `app.js` e `img/`. Sem build, sem dependências.
- O app de rastreamento e o painel ficam em outro repositório (`rastreador-rj`, em app.rjdomotica.com).
- Contato e orçamento vão para o WhatsApp; o site não grava nada.
- O único dado buscado é a oferta pública do rastreador (`/functions/v1/api/oferta`, só leitura). Se falhar, ficam os valores do HTML.

## Segurança
- CSP por meta tag: só scripts do próprio site, sem `unsafe-inline`; conexões só para a rota pública da oferta.
- Nunca coloque chaves, tokens, senhas ou dados de clientes aqui: o repositório é público.
- Links externos com `rel="noopener noreferrer"`.
