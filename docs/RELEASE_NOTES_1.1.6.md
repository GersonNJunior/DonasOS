# Donas OS 1.1.6

Correção de duplicidade em clientes pendentes.

- Remove duplicação visual entre registro local e Supabase.
- Deduplica lista de clientes pendentes por telefone e status.
- Mantém apenas um cadastro pendente por telefone.
- Adiciona trava no Supabase para impedir novos duplicados pendentes.
- Preserva pedidos normalmente.
