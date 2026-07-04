# DonasOS 1.0 RC - Inauguração

Pacote final pré-inauguração com foco em estabilidade, segurança mínima e acabamento operacional.

## Alterações

- Proteção simples do ADM com senha padrão inicial `donas2026`.
- Tela neutra de carregamento para evitar piscada do painel ao abrir o portal.
- Configurações com modo de edição protegido para evitar retorno de valores antes de salvar.
- Campo de finalizações grátis nas configurações.
- Finalização entra na mesma regra de itens grátis/pagos.
- Pedidos exibem origem: Online ou Interno.
- Mensagem do WhatsApp limpa, sem g, ml, kg ou unidades técnicas.
- Estoque exibido com no máximo 2 casas decimais.
- Exclusão de ingredientes passa a exigir confirmação real do Supabase e recarrega a lista do banco.
- Lista de ingredientes do estoque passa a respeitar o Supabase como fonte principal.

## Testes principais

1. Acessar `/` e confirmar que não pisca o ADM.
2. Acessar `/#admin`, usar senha `donas2026` e entrar no painel.
3. Alterar Configurações e aguardar antes de salvar: os valores não devem voltar sozinhos.
4. Salvar Configurações e conferir em outro navegador.
5. Excluir ingrediente e conferir em outro navegador se desapareceu.
6. Fazer pedido online e conferir mensagem do WhatsApp sem unidades técnicas.
7. Fazer pedido interno e online e conferir origem no ADM.
8. Conferir estoque com 2 casas decimais.
9. Configurar finalizações grátis e testar cobrança da segunda finalização.
