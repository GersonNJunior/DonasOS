-- Donas OS 1.1.2 - Etapa 1: endereço por CEP + clientes pendentes
-- Execute no Supabase em SQL Editor > New query > Run antes de publicar esta versão.

-- 1) Campos completos de endereço em clientes oficiais
alter table public.clientes add column if not exists cep text;
alter table public.clientes add column if not exists rua text;
alter table public.clientes add column if not exists numero text;
alter table public.clientes add column if not exists complemento text;
alter table public.clientes add column if not exists cidade text;
alter table public.clientes add column if not exists uf text;
alter table public.clientes add column if not exists observacao text;

-- 2) Campos de cliente/endereço também no pedido.
-- Assim o pedido funciona mesmo sem criar cadastro oficial do cliente.
alter table public.pedidos add column if not exists cliente_nome text;
alter table public.pedidos add column if not exists cliente_telefone text;
alter table public.pedidos add column if not exists cep text;
alter table public.pedidos add column if not exists rua text;
alter table public.pedidos add column if not exists numero_endereco text;
alter table public.pedidos add column if not exists complemento text;
alter table public.pedidos add column if not exists endereco text;
alter table public.pedidos add column if not exists bairro text;
alter table public.pedidos add column if not exists cidade text;
alter table public.pedidos add column if not exists uf text;

-- 3) Tabela separada para dados enviados por clientes ainda não aprovados.
-- Nada entra em public.clientes automaticamente.
create table if not exists public.clientes_pendentes (
  id uuid primary key default gen_random_uuid(),
  loja_id uuid references public.lojas(id) on delete cascade,
  nome text,
  telefone text,
  cep text,
  rua text,
  numero text,
  complemento text,
  endereco text,
  bairro text,
  cidade text,
  uf text,
  observacao text,
  pedido_codigo text,
  status text not null default 'pendente',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_clientes_pendentes_status on public.clientes_pendentes(status);
create index if not exists idx_clientes_pendentes_telefone on public.clientes_pendentes(telefone);

alter table public.clientes_pendentes enable row level security;

drop policy if exists "public_select_clientes_pendentes" on public.clientes_pendentes;
drop policy if exists "public_insert_clientes_pendentes" on public.clientes_pendentes;
drop policy if exists "public_update_clientes_pendentes" on public.clientes_pendentes;

-- Políticas temporárias para beta sem login. Na fase de login ADM, vamos restringir.
create policy "public_select_clientes_pendentes" on public.clientes_pendentes
for select using (true);

create policy "public_insert_clientes_pendentes" on public.clientes_pendentes
for insert with check (true);

create policy "public_update_clientes_pendentes" on public.clientes_pendentes
for update using (true) with check (true);

-- 4) Ajuste de integridade: cliente oficial deve ser único por telefone em cada loja.
-- Como o sistema salva telefone apenas com números, esta trava evita clientes duplicados.
alter table public.clientes add column if not exists bairro text;

create unique index if not exists idx_clientes_loja_telefone_unico
on public.clientes(loja_id, telefone)
where telefone is not null and telefone <> '';

-- Evita repetição de cliente pendente com mesmo telefone enquanto ainda está aguardando aprovação.
create unique index if not exists idx_clientes_pendentes_loja_telefone_pendente_unico
on public.clientes_pendentes(loja_id, telefone)
where telefone is not null and telefone <> '' and status = 'pendente';
