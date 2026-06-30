# Donas OS 1.1.5 - Histórico de aprovação de clientes

## Alterações
- Mantém registros em `clientes_pendentes` como histórico, em vez de apagar.
- Clientes pendentes exibem apenas cadastros com status `pendente`.
- Aprovados e reprovados aparecem na nova área "Histórico de aprovações".
- Aprovação grava `aprovado_em` no Supabase.
- Reprovação grava `reprovado_em` no Supabase.
- Reprovação mantém o pedido intacto.

## SQL necessário
Execute `docs/SUPABASE_1.1.5_STATUS_CLIENTES_PENDENTES.sql` no Supabase antes de publicar.
