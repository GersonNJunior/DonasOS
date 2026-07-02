-- Donas OS 1.2.4 - Cupons inativos e unidades de estoque/porção
-- Execute no Supabase antes de testar esta versão.

alter table public.estoque_itens
  add column if not exists porcao_unidade text not null default 'un';

alter table public.compras
  add column if not exists quantidade_estoque numeric not null default 0,
  add column if not exists unidade_estoque text not null default 'un';

-- Garante que compras antigas continuem compatíveis.
update public.compras
set quantidade_estoque = quantidade,
    unidade_estoque = unidade
where coalesce(quantidade_estoque, 0) = 0;

-- Garante que itens antigos tenham unidade de porção preenchida.
update public.estoque_itens
set porcao_unidade = unidade
where porcao_unidade is null or porcao_unidade = '';
