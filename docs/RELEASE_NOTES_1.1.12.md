# DonasOS 1.1.12 - Correção Busca WhatsApp Cliente

- Normaliza telefone/WhatsApp antes de buscar cliente.
- Remove máscara, espaços, traços, parênteses e prefixo +55 da comparação.
- Recarrega clientes oficiais do Supabase quando a busca local não encontra cadastro.
- Evita criar cliente pendente quando já existe cliente oficial com telefone equivalente.
- Evita aprovação duplicada quando o telefone já pertence a cliente oficial.
