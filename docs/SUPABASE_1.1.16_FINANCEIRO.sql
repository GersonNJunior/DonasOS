-- Donas OS 1.1.16 - Financeiro no Supabase
-- Execute no Supabase em SQL Editor > New query > Run antes de publicar esta versão.

create table if not exists public.financeiro_movimentacoes (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid references public.lojas(id) on delete cascade,
  codigo text,
  descricao text not null,
  tipo text not null default 'saida',
  valor numeric not null default 0,
  data_movimentacao timestamptz not null default now(),
  origem text not null default 'manual',
  observacao text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_financeiro_mov_loja_data on public.financeiro_movimentacoes(loja_id, data_movimentacao desc);
create index if not exists idx_financeiro_mov_tipo on public.financeiro_movimentacoes(tipo);
create unique index if not exists idx_financeiro_mov_loja_codigo_unico
on public.financeiro_movimentacoes(loja_id, codigo)
where codigo is not null;

alter table public.financeiro_movimentacoes enable row level security;

drop policy if exists "public_select_financeiro_movimentacoes" on public.financeiro_movimentacoes;
drop policy if exists "public_insert_financeiro_movimentacoes" on public.financeiro_movimentacoes;
drop policy if exists "public_update_financeiro_movimentacoes" on public.financeiro_movimentacoes;
drop policy if exists "public_delete_financeiro_movimentacoes" on public.financeiro_movimentacoes;

-- Políticas temporárias para beta sem login. Na fase de login ADM, vamos restringir.
create policy "public_select_financeiro_movimentacoes" on public.financeiro_movimentacoes
for select using (true);

create policy "public_insert_financeiro_movimentacoes" on public.financeiro_movimentacoes
for insert with check (true);

create policy "public_update_financeiro_movimentacoes" on public.financeiro_movimentacoes
for update using (true) with check (true);

create policy "public_delete_financeiro_movimentacoes" on public.financeiro_movimentacoes
for delete using (true);
