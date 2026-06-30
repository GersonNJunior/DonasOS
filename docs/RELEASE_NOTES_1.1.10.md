# Donas OS 1.1.10

Correção crítica na validação de estoque ao concluir pedidos.

## Ajustes

- Pedido agora encontra o item correto mesmo quando o estoque veio do Supabase.
- Baixa/devolução de estoque usa identificação robusta.
- Validação soma o uso total do mesmo item antes de concluir o pedido.

## SQL

Não precisa rodar SQL novo.
