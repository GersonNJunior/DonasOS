-- DonasOS 1.1.15 - Pratos Feitos
-- Execute no SQL Editor do Supabase antes de publicar esta versão.
-- Correção: public.lojas.id é UUID, portanto pratos_feitos.loja_id também deve ser UUID.

create table if not exists public.pratos_feitos (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid not null references public.lojas(id) on delete cascade,
  codigo text not null,
  nome text not null,
  descricao text default '',
  preco numeric(12,2) not null default 0,
  modo text not null default 'fixo' check (modo in ('fixo','editavel')),
  regras jsonb not null default '{}'::jsonb,
  imagem text default '',
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (loja_id, codigo)
);

alter table public.pratos_feitos enable row level security;

drop policy if exists "pratos_feitos_leitura_publica" on public.pratos_feitos;
create policy "pratos_feitos_leitura_publica"
on public.pratos_feitos
for select
using (true);

drop policy if exists "pratos_feitos_escrita_publica" on public.pratos_feitos;
create policy "pratos_feitos_escrita_publica"
on public.pratos_feitos
for all
using (true)
with check (true);

create index if not exists pratos_feitos_loja_idx
on public.pratos_feitos (loja_id, ativo);
