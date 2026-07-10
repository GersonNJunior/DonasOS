# DonasOS 1.1.10 — Fluxo de reservas e edição segura

- Reservas ficam somente na aba Reservados até o botão **Iniciar pedido** ser acionado.
- A aba Reservados está liberada para os perfis Administrador e Operação/Produção.
- Ao iniciar uma reserva, ela entra na aba Pedidos como **Pedido Feito**.
- A edição de itens mantém o pedido visível e na mesma posição da fila.
- O editor carrega todos os pratos e ingredientes existentes, permitindo trocar itens ou adicionar novos pratos.
- Cancelar a edição mantém o pedido original sem alterações.
- O estoque é recalculado apenas ao salvar a edição, evitando zerar ou duplicar o pedido.
