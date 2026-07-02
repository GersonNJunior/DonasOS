-- Donas OS 1.2.0 - Operação: cupons, desconto em pedidos e apoio a custo médio

-- Cupons
create table if not exists public.cupons (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid null,
  nome text not null,
  tipo text not null default 'percentual',
  desconto numeric not null default 0,
  ativo boolean not null default true,
  observacao text null,
  valido_ate date null,
  limite integer not null default 0,
  usados integer not null default 0,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create unique index if not exists cupons_nome_idx on public.cupons (lower(nome));

alter table if exists public.cupons
  add column if not exists loja_id uuid null,
  add column if not exists nome text,
  add column if not exists tipo text default 'percentual',
  add column if not exists desconto numeric default 0,
  add column if not exists ativo boolean default true,
  add column if not exists observacao text,
  add column if not exists valido_ate date,
  add column if not exists limite integer default 0,
  add column if not exists usados integer default 0,
  add column if not exists criado_em timestamptz default now(),
  add column if not exists atualizado_em timestamptz default now();

-- Dados financeiros do pedido com desconto/cupom
alter table if exists public.pedidos
  add column if not exists subtotal_bruto numeric default 0,
  add column if not exists desconto numeric default 0,
  add column if not exists cupom_codigo text;

-- Permissões básicas para fase beta/anônima do projeto
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
