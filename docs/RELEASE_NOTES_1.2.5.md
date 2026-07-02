# Donas OS 1.2.5 - Hardening de Persistência Supabase

Correção focada em impedir o comportamento de salvar e voltar ao valor anterior.

- Corrige payload de unidade da porção no Supabase (`porcao_unidade`).
- Exige confirmação real do Supabase ao salvar itens de estoque.
- Reverte alterações locais se o banco recusar a gravação.
- Recarrega estoque do Supabase após salvar item.
- Ajusta sincronização de estoque para retornar falha real quando houver erro.

Não há SQL novo além do SQL da versão 1.2.4.
