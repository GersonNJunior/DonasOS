# Donas OS 1.1.2 - Etapa 1

## Incluído
- CEP opcional no pedido.
- Busca automática de endereço via CEP.
- Campos separados de endereço: rua, número, complemento, bairro, cidade e UF.
- Tabela de clientes pendentes para aprovação manual do ADM.
- Cliente novo não entra automaticamente em clientes oficiais.
- Cliente antigo é identificado pelo telefone.
- Pedido de cliente antigo não altera cadastro oficial automaticamente.
- Telefone único para clientes oficiais no Supabase.
- Evita pendentes duplicados com o mesmo telefone enquanto aguardam aprovação.

## Regra de cadastro
Cliente novo: gera cliente pendente para aprovação.
Cliente antigo: apenas vincula o pedido ao cadastro existente pelo telefone. Alteração de endereço/nome do cliente oficial deverá ser feita manualmente pelo ADM.
