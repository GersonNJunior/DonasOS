# Reset de inauguração - DonasOS v1.0

Use o arquivo `SUPABASE_1.0_RESET_INAUGURACAO.sql` somente quando quiser limpar os dados de teste e iniciar a operação real.

## O que ele apaga
- Pedidos de teste
- Itens dos pedidos de teste
- Clientes de teste
- Clientes pendentes de teste
- Movimentações financeiras de teste
- Compras de teste
- Produções registradas em teste

## O que ele mantém
- Itens/ingredientes cadastrados
- Categorias
- Preços de venda
- Imagens
- Unidades
- Porções
- Fichas técnicas/receitas
- Configurações da loja
- Online Ready
- Cupons cadastrados

## O que ele zera
- Estoque dos itens
- Custo médio dos itens
- Contador de uso dos cupons
- Sequência de pedidos, voltando para #1

## Depois de rodar
1. Atualize o sistema com Ctrl+F5.
2. Confira Estoque: todos os itens devem estar com 0.
3. Confira Financeiro: sem movimentações.
4. Faça uma compra real para alimentar estoque e custo médio.
5. Faça um pedido teste pequeno, se desejar, e depois decida se apaga antes da inauguração.
