# Donas OS 1.1.9 - Estoque/Itens no Supabase

## Objetivo
Iniciar a migração real dos módulos administrativos para o Supabase, começando por itens e estoque.

## Alterações
- Cria tabela `estoque_itens` no Supabase.
- Carrega itens do Supabase ao abrir o sistema.
- Salva cadastro/edição de itens no Supabase.
- Remove item também no Supabase quando removido pelo ADM.
- Sincroniza alterações de estoque geradas por pedidos, compras e produção.
- Mantém fallback local para segurança durante a fase beta.

## Testes recomendados
1. Rodar o SQL 1.1.9 no Supabase.
2. Abrir o ADM e conferir se os itens continuam aparecendo.
3. Editar estoque de um item e conferir no Supabase.
4. Fazer pedido teste e confirmar se o estoque baixa.
5. Registrar compra com adicionar estoque e conferir se soma no Supabase.
6. Reabrir o sistema em outro navegador e conferir se o estoque vem do Supabase.
