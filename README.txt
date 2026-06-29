Donas OS 1.0.3 - Produção GO LIVE

Versão oficial homologada para publicação online da Donas da Massa.

Como abrir localmente:
1. Abra o arquivo index.html no navegador.
2. Configure WhatsApp, PIX, Instagram e loja aberta/fechada em Configurações / Online Ready.
3. Use a aba Donas Online para testar a experiência do cliente.

Principais recursos desta versão:
- Donas Online com cardápio, carrinho, retirada e delivery.
- Pedido online com validação de nome, WhatsApp e endereço quando for delivery.
- WhatsApp com mensagem pronta do pedido.
- Opção "Deseja talher?".
- Banner informativo ou apenas imagem, com tamanhos configuráveis.
- Apenas 1 massa e 1 molho por prato no Donas Online.
- Múltiplos pratos no mesmo pedido.
- Campanhas exibidas no Portal/Donas Online.
- Pedidos externos entram como aguardando confirmação.
- Painel interno com pedidos, cozinha, clientes, estoque, compras, produção, financeiro, relatórios, backup e configurações.

Publicação:
- O index.html deve ficar na raiz do repositório GitHub.
- As pastas assets/ e docs/ devem ser enviadas junto.
- Esta versão foi preparada para publicação estática via Netlify.

Regra de estabilidade:
Após publicar esta versão, novas mudanças antes da inauguração devem ser apenas correções críticas ou ajustes indispensáveis ao GO LIVE.


---
Donas OS 1.0.1
Acesso do cliente: abrir o site normalmente.
Acesso administrativo: adicionar ?admin=1 ao final do link.
Exemplo: https://pedidos-donasdamassa.netlify.app/?admin=1
Observação: sem Supabase, pedidos feitos em celulares diferentes não aparecem automaticamente no painel interno; o fluxo de confirmação é pelo WhatsApp.
