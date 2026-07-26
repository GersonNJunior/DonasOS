-- DonasOS 1.1.15.30 — correção definitiva de edição/exclusão de clientes
-- Execute uma vez no Supabase: SQL Editor > New query > Run.
-- Cria funções controladas para o ADM beta, evitando divergências de RLS.

create or replace function public.donas_salvar_cliente_adm(
  p_id uuid,
  p_loja_id uuid,
  p_nome text,
  p_telefone text,
  p_cep text default '',
  p_rua text default '',
  p_numero text default '',
  p_complemento text default '',
  p_endereco text default '',
  p_bairro text default '',
  p_cidade text default '',
  p_uf text default '',
  p_observacao text default ''
)
returns setof public.clientes
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  v_id := p_id;

  if v_id is null then
    select id into v_id
      from public.clientes
     where loja_id = p_loja_id
       and telefone = p_telefone
     limit 1;
  end if;

  if v_id is null then
    insert into public.clientes
      (loja_id,nome,telefone,cep,rua,numero,complemento,endereco,bairro,cidade,uf,observacao)
    values
      (p_loja_id,p_nome,p_telefone,p_cep,p_rua,p_numero,p_complemento,p_endereco,p_bairro,p_cidade,p_uf,p_observacao)
    returning id into v_id;
  else
    update public.clientes
       set nome = p_nome,
           telefone = p_telefone,
           cep = p_cep,
           rua = p_rua,
           numero = p_numero,
           complemento = p_complemento,
           endereco = p_endereco,
           bairro = p_bairro,
           cidade = p_cidade,
           uf = p_uf,
           observacao = p_observacao
     where id = v_id
       and loja_id = p_loja_id;
  end if;

  return query select * from public.clientes where id = v_id and loja_id = p_loja_id;
end;
$$;

create or replace function public.donas_remover_cliente_adm(
  p_id uuid,
  p_loja_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Preserva os pedidos antigos, removendo somente o vínculo com o cadastro.
  update public.pedidos
     set cliente_id = null
   where cliente_id = p_id
     and loja_id = p_loja_id;

  delete from public.clientes
   where id = p_id
     and loja_id = p_loja_id;

  return not exists (
    select 1 from public.clientes where id = p_id and loja_id = p_loja_id
  );
end;
$$;

create or replace function public.donas_remover_clientes_recusados(
  p_loja_id uuid
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total integer;
begin
  delete from public.clientes_pendentes
   where loja_id = p_loja_id
     and status = 'reprovado';
  get diagnostics v_total = row_count;
  return v_total;
end;
$$;

grant execute on function public.donas_salvar_cliente_adm(uuid,uuid,text,text,text,text,text,text,text,text,text,text,text) to anon, authenticated;
grant execute on function public.donas_remover_cliente_adm(uuid,uuid) to anon, authenticated;
grant execute on function public.donas_remover_clientes_recusados(uuid) to anon, authenticated;
