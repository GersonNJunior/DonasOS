DonasOS 1.1.15.27 — Clientes e histórico de aprovações

- Edição de clientes agora exige confirmação real do Supabase antes de concluir.
- Exclusão de clientes remove o cadastro local e online, preservando pedidos existentes.
- Botão "Limpar histórico" remove aprovados/reprovados da lista sem apagar clientes aprovados ou pedidos.
- Incluído SQL de políticas para UPDATE e DELETE nas tabelas clientes e clientes_pendentes.

Obrigatório executar:
docs/SUPABASE_1.1.15.27_CLIENTES.sql
