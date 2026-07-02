-- Donas OS 1.2.3 - Reforço de permissões de cupons
-- Rode apenas se excluir/editar cupom ainda der erro no Supabase.

alter table public.cupons enable row level security;

drop policy if exists "cupons_select_public" on public.cupons;
create policy "cupons_select_public" on public.cupons
for select using (true);

drop policy if exists "cupons_insert_public" on public.cupons;
create policy "cupons_insert_public" on public.cupons
for insert with check (true);

drop policy if exists "cupons_update_public" on public.cupons;
create policy "cupons_update_public" on public.cupons
for update using (true) with check (true);

drop policy if exists "cupons_delete_public" on public.cupons;
create policy "cupons_delete_public" on public.cupons
for delete using (true);
