# Donas OS 1.3.0 RC1

## Objetivo
Versão candidata para homologação da inauguração.

## Alterações
- Estabiliza o Online Ready para evitar retorno visual de horários enquanto o administrador está editando.
- Garante fluxo salvar → confirmar Supabase → recarregar formulário.
- Mantém Supabase como fonte de verdade para loja aberta/fechada e horários.
- Não adiciona novas funcionalidades; foco em estabilidade antes da varredura visual.

## Testes principais
1. Alterar horários e aguardar 10 segundos sem salvar.
2. Confirmar que os campos não voltam sozinhos durante a edição.
3. Salvar Online Ready.
4. Abrir em outro navegador e confirmar que loja e horários aparecem iguais.
5. Testar portal respeitando loja aberta/fechada.
