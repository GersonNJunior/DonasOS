DonasOS 1.1.15.20 — Pacote de estabilidade

1. Edição de pedidos
- Recalcula os valores de todos os pratos carregados do Supabase.
- Ao salvar uma edição, substitui também os registros de pedido_itens.
- Recarrega o pedido confirmado pelo banco após a edição.
- Evita que a sincronização restaure os itens anteriores.

2. Frete grátis
- Checkbox no pedido interno.
- Mantém o endereço e registra o valor original do frete.
- Persiste a cortesia junto ao pedido sem exigir alteração de tabela.

3. Histórico de acessos
- Corrigida chamada inexistente supabaseFetch para supabaseRequest.
- SQL reforçado com permissões de tabela e sequência.
- Execute novamente supabase_parte3_acessos.sql no Supabase.
