-- Donas OS 1.1.6
-- Evita duplicidade de clientes pendentes pelo mesmo telefone.
-- Seguro: não apaga pedidos, clientes oficiais nem histórico aprovado/reprovado.

-- 1) Remove duplicados ainda pendentes, mantendo o registro mais recente de cada telefone.
WITH pendentes_repetidos AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY telefone
      ORDER BY criado_em DESC NULLS LAST, atualizado_em DESC NULLS LAST, id DESC
    ) AS rn
  FROM clientes_pendentes
  WHERE status = 'pendente'
    AND telefone IS NOT NULL
    AND telefone <> ''
)
DELETE FROM clientes_pendentes cp
USING pendentes_repetidos pr
WHERE cp.id = pr.id
  AND pr.rn > 1;

-- 2) Garante no banco que só exista 1 cadastro pendente por telefone.
CREATE UNIQUE INDEX IF NOT EXISTS ux_clientes_pendentes_telefone_pendente
ON clientes_pendentes (telefone)
WHERE status = 'pendente'
  AND telefone IS NOT NULL
  AND telefone <> '';
