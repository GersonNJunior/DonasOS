-- Donas OS 1.1.23 - estrutura futura para cupons
create table if not exists public.cupons (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid null,
  nome text not null,
  tipo text not null default 'percentual',
  desconto numeric not null default 0,
  ativo boolean not null default true,
  observacao text null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create unique index if not exists cupons_nome_idx on public.cupons (lower(nome));


alter table if exists public.cupons
  add column if not exists valido_ate date,
  add column if not exists limite integer default 0,
  add column if not exists usados integer default 0;
