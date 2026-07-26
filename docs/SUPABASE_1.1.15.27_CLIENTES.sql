-- DonasOS 1.1.15.27 — edição/exclusão de clientes e limpeza do histórico
-- Execute no Supabase: SQL Editor > New query > Run.
-- Não apaga clientes nem histórico automaticamente; apenas libera as operações do ADM.

alter table public.clientes enable row level security;
alter table public.clientes_pendentes enable row level security;

drop policy if exists "public_select_clientes" on public.clientes;
drop policy if exists "public_insert_clientes" on public.clientes;
drop policy if exists "public_update_clientes" on public.clientes;
drop policy if exists "public_delete_clientes" on public.clientes;

create policy "public_select_clientes" on public.clientes
for select using (true);
create policy "public_insert_clientes" on public.clientes
for insert with check (true);
create policy "public_update_clientes" on public.clientes
for update using (true) with check (true);
create policy "public_delete_clientes" on public.clientes
for delete using (true);

drop policy if exists "public_select_clientes_pendentes" on public.clientes_pendentes;
drop policy if exists "public_insert_clientes_pendentes" on public.clientes_pendentes;
drop policy if exists "public_update_clientes_pendentes" on public.clientes_pendentes;
drop policy if exists "public_delete_clientes_pendentes" on public.clientes_pendentes;

create policy "public_select_clientes_pendentes" on public.clientes_pendentes
for select using (true);
create policy "public_insert_clientes_pendentes" on public.clientes_pendentes
for insert with check (true);
create policy "public_update_clientes_pendentes" on public.clientes_pendentes
for update using (true) with check (true);
create policy "public_delete_clientes_pendentes" on public.clientes_pendentes
for delete using (true);

grant select, insert, update, delete on table public.clientes to anon, authenticated;
grant select, insert, update, delete on table public.clientes_pendentes to anon, authenticated;
