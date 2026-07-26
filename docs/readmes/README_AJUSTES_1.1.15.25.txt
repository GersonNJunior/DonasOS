DonasOS 1.1.15.25 — Correção definitiva da edição de pedidos

- O conteúdo completo dos pratos editados passa a ser salvo junto ao próprio pedido.
- A edição não é mais cancelada quando a política da tabela pedido_itens impede DELETE/INSERT.
- Após recarregar o banco, pratos, tamanhos, valores e ingredientes permanecem conforme a edição.
- A sincronização antiga de pedido_itens foi mantida apenas como compatibilidade.
- Todos os arquivos README da raiz foram organizados em docs/readmes.

Não exige novo SQL.
