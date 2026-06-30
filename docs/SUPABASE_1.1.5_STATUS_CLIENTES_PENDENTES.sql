-- Donas OS 1.1.5 - Status e histórico de clientes pendentes
-- Execute no Supabase em SQL Editor > New query > Run antes de publicar esta versão.
-- Este script não apaga dados. Apenas adiciona campos de histórico e normaliza status vazio.

alter table public.clientes_pendentes add column if not exists aprovado_em timestamptz;
alter table public.clientes_pendentes add column if not exists reprovado_em timestamptz;
alter table public.clientes_pendentes add column if not exists observacao_adm text;

update public.clientes_pendentes
set status = 'pendente'
where status is null or trim(status) = '';

create index if not exists idx_clientes_pendentes_aprovado_em on public.clientes_pendentes(aprovado_em);
create index if not exists idx_clientes_pendentes_reprovado_em on public.clientes_pendentes(reprovado_em);
