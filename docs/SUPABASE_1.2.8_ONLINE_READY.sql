-- Donas OS 1.2.8 - Online Ready / Configurações no Supabase
-- Execute no Supabase SQL Editor antes de testar a versão 1.2.8.

alter table if exists public.lojas
  add column if not exists loja_aberta boolean default false,
  add column if not exists horario_modo text default 'manual',
  add column if not exists horarios jsonb default '{}'::jsonb,
  add column if not exists modo_dados text default 'online',
  add column if not exists config jsonb default '{}'::jsonb,
  add column if not exists atualizado_em timestamptz default now();

-- Permissões para fase beta sem login.
alter table public.lojas enable row level security;

drop policy if exists "public_select_lojas" on public.lojas;
create policy "public_select_lojas" on public.lojas
for select using (true);

drop policy if exists "public_insert_lojas" on public.lojas;
create policy "public_insert_lojas" on public.lojas
for insert with check (true);

drop policy if exists "public_update_lojas" on public.lojas;
create policy "public_update_lojas" on public.lojas
for update using (true) with check (true);
