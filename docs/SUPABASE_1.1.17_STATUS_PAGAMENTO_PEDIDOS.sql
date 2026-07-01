-- Donas OS 1.1.17 - Status de pagamento dos pedidos
-- Execute no Supabase em SQL Editor > New query > Run antes de publicar esta versão.

alter table public.pedidos
add column if not exists pago boolean not null default false;

alter table public.pedidos
add column if not exists status_pagamento text not null default 'pendente';

alter table public.pedidos
add column if not exists pago_em timestamptz;

create index if not exists idx_pedidos_loja_pago
on public.pedidos(loja_id, pago);

create index if not exists idx_pedidos_status_pagamento
on public.pedidos(status_pagamento);

-- Mantém compatibilidade com pedidos antigos que já estavam como entregues.
-- Caso prefira revisar manualmente, comente este bloco antes de executar.
update public.pedidos
set pago = true,
    status_pagamento = 'pago',
    pago_em = coalesce(pago_em, atualizado_em, criado_em)
where status = 'entregue'
  and coalesce(pago, false) = false;
