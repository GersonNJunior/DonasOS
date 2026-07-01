-- Donas OS 1.1.15 - Produção no Supabase
-- Execute no Supabase em SQL Editor > New query > Run antes de publicar esta versão.

create table if not exists public.receitas (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid references public.lojas(id) on delete cascade,
  codigo text,
  produto_item_id uuid references public.estoque_itens(id) on delete set null,
  rendimento numeric not null default 0,
  unidade text not null default 'un',
  insumos jsonb not null default '[]'::jsonb,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_receitas_loja on public.receitas(loja_id);
create index if not exists idx_receitas_produto on public.receitas(produto_item_id);
create unique index if not exists idx_receitas_loja_codigo_unico
on public.receitas(loja_id, codigo)
where codigo is not null;

alter table public.receitas enable row level security;

drop policy if exists "public_select_receitas" on public.receitas;
drop policy if exists "public_insert_receitas" on public.receitas;
drop policy if exists "public_update_receitas" on public.receitas;
drop policy if exists "public_delete_receitas" on public.receitas;

-- Políticas temporárias para beta sem login. Na fase de login ADM, vamos restringir.
create policy "public_select_receitas" on public.receitas
for select using (true);

create policy "public_insert_receitas" on public.receitas
for insert with check (true);

create policy "public_update_receitas" on public.receitas
for update using (true) with check (true);

create policy "public_delete_receitas" on public.receitas
for delete using (true);

create table if not exists public.producoes (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid references public.lojas(id) on delete cascade,
  codigo text,
  receita_id uuid references public.receitas(id) on delete set null,
  produto_item_id uuid references public.estoque_itens(id) on delete set null,
  quantidade numeric not null default 0,
  unidade text not null default 'un',
  custo_total numeric not null default 0,
  data_producao timestamptz not null default now(),
  status text not null default 'finalizado',
  insumos jsonb not null default '[]'::jsonb,
  observacao text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_producoes_loja_data on public.producoes(loja_id, data_producao desc);
create index if not exists idx_producoes_produto on public.producoes(produto_item_id);
create index if not exists idx_producoes_receita on public.producoes(receita_id);
create unique index if not exists idx_producoes_loja_codigo_unico
on public.producoes(loja_id, codigo)
where codigo is not null;

alter table public.producoes enable row level security;

drop policy if exists "public_select_producoes" on public.producoes;
drop policy if exists "public_insert_producoes" on public.producoes;
drop policy if exists "public_update_producoes" on public.producoes;
drop policy if exists "public_delete_producoes" on public.producoes;

-- Políticas temporárias para beta sem login. Na fase de login ADM, vamos restringir.
create policy "public_select_producoes" on public.producoes
for select using (true);

create policy "public_insert_producoes" on public.producoes
for insert with check (true);

create policy "public_update_producoes" on public.producoes
for update using (true) with check (true);

create policy "public_delete_producoes" on public.producoes
for delete using (true);
