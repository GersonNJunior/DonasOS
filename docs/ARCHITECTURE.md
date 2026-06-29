# Donas OS 2.0 — Arquitetura

Esta versão inaugura a organização técnica do Donas OS como produto modular.

## Objetivo
Manter o sistema funcionando como está, mas preparar a base para evoluções futuras sem quebrar estoque, histórico, pedidos, clientes e backups.

## Estrutura

```text
DonasOS/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── app.js              # Bundle funcional atual, preservado para estabilidade
│   │   ├── core/               # Núcleo planejado para refatoração gradual
│   │   ├── modules/            # Módulos planejados: pedidos, estoque, compras, etc.
│   │   └── adapters/           # Futuro LocalStorage/Supabase
│   └── img/
├── docs/
├── tests/
└── version.json
```

## Regra principal
Nenhuma funcionalidade nova deve alterar diretamente a estrutura de dados sem migração.

## Próxima etapa técnica
Aos poucos, funções do `assets/js/app.js` serão movidas para módulos menores, mantendo a aplicação funcionando a cada entrega.

## Compatibilidade
A chave local de dados deve continuar a mesma para não apagar dados já cadastrados no navegador.
