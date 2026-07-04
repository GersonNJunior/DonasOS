-- DonasOS 1.0 RC3 - Sequência única de pedidos (versão corrigida)
-- Rode uma única vez no SQL Editor do Supabase.
-- Objetivo: evitar dois pedidos com o mesmo número quando dois clientes pedem ao mesmo tempo.
-- Esta versão usa SEQUENCE nativa do PostgreSQL, sem tabela de contador.

create sequence if not exists public.donas_pedido_numero_seq
  as integer
  increment by 1
  minvalue 1
  start with 1
  cache 1;

-- Ajusta a sequência para continuar após o maior número já usado nos pedidos existentes.
do $$
declare
  maior_codigo integer := 0;
  atual_seq integer := 0;
  novo_valor integer := 0;
begin
  select coalesce(max((regexp_match(codigo, '(\d+)$'))[1]::integer), 0)
    into maior_codigo
    from public.pedidos
   where codigo ~ '\d+$';

  select last_value
    into atual_seq
    from public.donas_pedido_numero_seq;

  novo_valor := greatest(coalesce(maior_codigo,0), coalesce(atual_seq,0));

  if novo_valor > 0 then
    perform setval('public.donas_pedido_numero_seq', novo_valor, true);
  else
    perform setval('public.donas_pedido_numero_seq', 1, false);
  end if;
end $$;

create or replace function public.donas_proximo_pedido(p_loja_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
begin
  -- p_loja_id fica mantido no parâmetro para compatibilidade com o sistema atual.
  -- Como a Donas da Massa usa uma única loja, a sequência é global e única.
  return nextval('public.donas_pedido_numero_seq')::integer;
end;
$$;

grant execute on function public.donas_proximo_pedido(uuid) to anon, authenticated;
