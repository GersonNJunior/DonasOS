# SQL complementar - Donas OS 1.1.0

Execute no Supabase em **SQL Editor > New query > Run**.

```sql
-- Políticas temporárias para a fase beta sem login.
-- Após criar Supabase Auth, substituiremos estas políticas por regras por usuário/perfil.

drop policy if exists "public_select_clientes" on clientes;
drop policy if exists "public_select_pedidos" on pedidos;
drop policy if exists "public_select_pedido_itens" on pedido_itens;
drop policy if exists "public_update_clientes" on clientes;
drop policy if exists "public_update_pedidos" on pedidos;
drop policy if exists "public_update_lojas" on lojas;

create policy "public_select_clientes" on clientes
for select using (true);

create policy "public_select_pedidos" on pedidos
for select using (true);

create policy "public_select_pedido_itens" on pedido_itens
for select using (true);

create policy "public_update_clientes" on clientes
for update using (true) with check (true);

create policy "public_update_pedidos" on pedidos
for update using (true) with check (true);

create policy "public_update_lojas" on lojas
for update using (true) with check (true);
```

## Observação
Estas políticas são suficientes para validar o funcionamento online. Na próxima etapa criaremos login de funcionários e políticas mais restritivas.
