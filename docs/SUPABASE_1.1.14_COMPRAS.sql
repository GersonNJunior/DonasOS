-- Donas OS 1.1.14 - Compras no Supabase
-- Execute no Supabase em SQL Editor > New query > Run antes de publicar esta versão.

create table if not exists public.compras (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid references public.lojas(id) on delete cascade,
  codigo text,
  produto text not null,
  local text,
  data_compra date not null default current_date,
  quantidade numeric not null default 0,
  unidade text not null default 'un',
  valor_total numeric not null default 0,
  custo_unitario numeric not null default 0,
  categoria text not null default 'Insumo',
  estoque_item_id uuid references public.estoque_itens(id) on delete set null,
  adiciona_estoque boolean not null default true,
  lancar_financeiro boolean not null default true,
  observacao text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_compras_loja_data on public.compras(loja_id, data_compra desc);
create index if not exists idx_compras_produto on public.compras(produto);
create unique index if not exists idx_compras_loja_codigo_unico
on public.compras(loja_id, codigo)
where codigo is not null;

alter table public.compras enable row level security;

drop policy if exists "public_select_compras" on public.compras;
drop policy if exists "public_insert_compras" on public.compras;
drop policy if exists "public_update_compras" on public.compras;
drop policy if exists "public_delete_compras" on public.compras;

-- Políticas temporárias para beta sem login. Na fase de login ADM, vamos restringir.
create policy "public_select_compras" on public.compras
for select using (true);

create policy "public_insert_compras" on public.compras
for insert with check (true);

create policy "public_update_compras" on public.compras
for update using (true) with check (true);

create policy "public_delete_compras" on public.compras
for delete using (true);
