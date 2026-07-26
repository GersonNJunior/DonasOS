DonasOS 1.1.15.21 — Tamanhos personalizados de pratos

IMPLEMENTADO
- Nova aba administrativa "Tamanhos dos Pratos".
- Cadastro de nome, preço, peso aproximado, descrição, massa crua em gramas, proteínas, complementos, ordem e status ativo.
- Tamanhos iniciais:
  Tradicional: R$ 25,00, aproximadamente 500 g, 100 g de massa, 2 proteínas e 4 complementos.
  Grande: R$ 35,00, aproximadamente 750 g, 150 g de massa, 3 proteínas e 5 complementos.
- Seleção de tamanho no Montar Pedido interno e na loja online.
- Limite automático de proteínas e complementos conforme o tamanho.
- Preço-base do tamanho somado aos adicionais pagos.
- Quantidade de massa usada no estoque/custo conforme o campo de gramas do tamanho.
- Snapshot do tamanho salvo dentro de cada prato do pedido.
- Ao reduzir o tamanho, escolhas excedentes são removidas automaticamente.

BANCO DE DADOS
- Não exige SQL novo. Os tamanhos ficam dentro da configuração JSON já sincronizada da loja.

TESTE RECOMENDADO
1. Abra Tamanhos dos Pratos e confirme os valores.
2. Monte um Tradicional e confira R$ 25,00.
3. Monte um Grande e confira R$ 35,00.
4. No Grande, selecione 3 proteínas e 5 complementos.
5. Tente adicionar uma 4ª proteína e um 6º complemento.
6. Troque Grande por Tradicional e confira a remoção dos excedentes.
7. Salve um pedido, reabra e confira tamanho e preço.
8. Repita o teste pela loja online.
