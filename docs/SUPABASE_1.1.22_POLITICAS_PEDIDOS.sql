-- Donas OS 1.1.22 - Corrige permissões de atualização/exclusão de pedidos
-- Seguro: não apaga dados. Apenas garante que o painel ADM consiga atualizar pedidos na fase beta sem login.

alter table public.pedidos enable row level security;
alter table public.pedido_itens enable row level security;

drop policy if exists "public_select_pedidos" on public.pedidos;
drop policy if exists "public_insert_pedidos" on public.pedidos;
drop policy if exists "public_update_pedidos" on public.pedidos;
drop policy if exists "public_delete_pedidos" on public.pedidos;

create policy "public_select_pedidos" on public.pedidos
for select using (true);

create policy "public_insert_pedidos" on public.pedidos
for insert with check (true);

create policy "public_update_pedidos" on public.pedidos
for update using (true) with check (true);

create policy "public_delete_pedidos" on public.pedidos
for delete using (true);

drop policy if exists "public_select_pedido_itens" on public.pedido_itens;
drop policy if exists "public_insert_pedido_itens" on public.pedido_itens;
drop policy if exists "public_update_pedido_itens" on public.pedido_itens;
drop policy if exists "public_delete_pedido_itens" on public.pedido_itens;

create policy "public_select_pedido_itens" on public.pedido_itens
for select using (true);

create policy "public_insert_pedido_itens" on public.pedido_itens
for insert with check (true);

create policy "public_update_pedido_itens" on public.pedido_itens
for update using (true) with check (true);

create policy "public_delete_pedido_itens" on public.pedido_itens
for delete using (true);
