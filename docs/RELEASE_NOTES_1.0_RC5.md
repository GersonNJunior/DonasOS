# DonasOS 1.0 RC5 - Correção de Scroll em Pedidos

## Correção
- Preserva a posição do scroll da página de Pedidos durante atualizações automáticas.
- Preserva o scroll individual das colunas do Kanban de Pedidos.
- Evita retorno ao topo ao recarregar dados do Supabase.

## Teste obrigatório
1. Abrir a aba Pedidos.
2. Rolar uma coluna/lista com muitos pedidos.
3. Aguardar a sincronização automática.
4. Confirmar que a tela permanece no mesmo ponto.
