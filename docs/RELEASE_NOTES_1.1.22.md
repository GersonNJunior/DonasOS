# Donas OS 1.1.22

Correção crítica da persistência de ações em pedidos.

- Atualizações de pedido agora exigem confirmação real do Supabase.
- Se o Supabase não alterar nenhuma linha, o sistema avisa erro e desfaz a ação.
- Exclusão de pedido passa a tentar remover também no Supabase.
- SQL adiciona/renova políticas de UPDATE/DELETE para pedidos e itens do pedido.
