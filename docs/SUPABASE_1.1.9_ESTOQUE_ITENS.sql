-- Donas OS 1.1.9 - Estoque/Itens no Supabase
-- Execute no Supabase em SQL Editor > New query > Run antes de publicar esta versão.

create table if not exists public.estoque_itens (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid references public.lojas(id) on delete cascade,
  nome text not null,
  categoria text not null default 'Insumo',
  preco numeric not null default 0,
  custo numeric not null default 0,
  estoque numeric not null default 0,
  minimo numeric not null default 0,
  unidade text not null default 'un',
  porcao numeric not null default 1,
  icone text,
  imagem text,
  observacao text,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_estoque_itens_loja_categoria on public.estoque_itens(loja_id, categoria);
create index if not exists idx_estoque_itens_nome on public.estoque_itens(nome);

create unique index if not exists idx_estoque_itens_loja_nome_categoria_unico
on public.estoque_itens(loja_id, lower(nome), lower(categoria));

alter table public.estoque_itens enable row level security;

drop policy if exists "public_select_estoque_itens" on public.estoque_itens;
drop policy if exists "public_insert_estoque_itens" on public.estoque_itens;
drop policy if exists "public_update_estoque_itens" on public.estoque_itens;
drop policy if exists "public_delete_estoque_itens" on public.estoque_itens;

-- Políticas temporárias para beta sem login. Na fase de login ADM, vamos restringir.
create policy "public_select_estoque_itens" on public.estoque_itens
for select using (true);

create policy "public_insert_estoque_itens" on public.estoque_itens
for insert with check (true);

create policy "public_update_estoque_itens" on public.estoque_itens
for update using (true) with check (true);

create policy "public_delete_estoque_itens" on public.estoque_itens
for delete using (true);
