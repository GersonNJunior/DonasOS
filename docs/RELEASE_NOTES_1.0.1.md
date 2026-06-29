# Donas OS 1.0.1 - GO LIVE público/admin

## Alterações
- O link público agora abre somente o Donas Online, independente de celular, tablet ou computador.
- O painel administrativo fica acessível usando `?admin=1` no final do link.
- O fluxo de criação de pedido online agora destaca/abre o WhatsApp após concluir.
- O texto de quantidade no item selecionado foi ajustado para indicar quantidade no prato, não estoque.

## Importante
- Sem Supabase, pedidos feitos no celular do cliente não aparecem automaticamente no Donas OS em outro dispositivo.
- Para a inauguração, o fluxo seguro é: cliente faz pedido online → WhatsApp abre com mensagem → vocês confirmam pagamento/preparo.
- Supabase será a próxima etapa para sincronização em tempo real entre cliente e painel interno.
