# DonasOS 1.1.15.14 — Parte 2.3

## Frete por endereço aproximado

- Mantém integralmente o endereço informado pelo cliente no cadastro e no pedido.
- Usa aproximações somente para localizar coordenadas de cálculo do frete.
- Tenta endereço completo, rua sem número, rua com cidade, CEP e bairro.
- Não exige mapa nem confirmação adicional do cliente.
- Informa quando o cálculo foi realizado pela região aproximada.
- Mantém a taxa fixa de segurança caso nenhuma tentativa funcione.
