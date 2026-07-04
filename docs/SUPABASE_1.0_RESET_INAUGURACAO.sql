-- DonasOS v1.0 - Reset seguro para iniciar a operação real
-- Objetivo: zerar dados de TESTE antes da inauguração, mantendo cardápio, imagens, porções, preços, configurações e fichas técnicas.
-- Execute UMA VEZ no Supabase, somente quando tiver certeza que quer apagar os testes.

begin;

-- 1) Remove pedidos e itens dos pedidos de teste
with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
), pedidos_alvo as (
  select p.id from public.pedidos p
  where p.loja_id in (select id from alvo_loja)
)
delete from public.pedido_itens pi
where pi.pedido_id in (select id from pedidos_alvo);

with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
)
delete from public.pedidos p
where p.loja_id in (select id from alvo_loja);

-- 2) Remove clientes e cadastros pendentes de teste
with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
)
delete from public.clientes_pendentes cp
where cp.loja_id in (select id from alvo_loja);

with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
)
delete from public.clientes c
where c.loja_id in (select id from alvo_loja);

-- 3) Remove movimentações financeiras, compras e produções de teste
with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
)
delete from public.financeiro_movimentacoes fm
where fm.loja_id in (select id from alvo_loja);

with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
)
delete from public.compras c
where c.loja_id in (select id from alvo_loja);

with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
)
delete from public.producoes p
where p.loja_id in (select id from alvo_loja);

-- 4) Zera estoque e custo médio, mantendo itens, unidades, porções, imagens, preços e categorias
with alvo_loja as (
  select id from public.lojas order by criado_em asc limit 1
)
update public.estoque_itens ei
set estoque = 0,
    custo = 0,
    atualizado_em = now()
where ei.loja_id in (select id from alvo_loja);

-- 5) Mantém cupons cadastrados, mas zera contador de uso
update public.cupons
set usados = 0,
    atualizado_em = now()
where loja_id in (select id from public.lojas order by criado_em asc limit 1)
   or loja_id is null;

-- 6) Reinicia numeração dos pedidos para começar em #1 na operação real
-- Se preferir começar em outro número, troque 1 pelo número anterior ao primeiro pedido desejado.
do $$
begin
  if exists (select 1 from pg_class where relkind = 'S' and relname = 'donas_pedido_numero_seq') then
    perform setval('public.donas_pedido_numero_seq', 1, false);
  end if;
end $$;

commit;

-- Conferência rápida depois de rodar:
-- select count(*) as pedidos from public.pedidos;
-- select count(*) as clientes from public.clientes;
-- select count(*) as financeiro from public.financeiro_movimentacoes;
-- select count(*) as compras from public.compras;
-- select count(*) as producoes from public.producoes;
-- select nome, estoque, custo from public.estoque_itens order by categoria, nome;
