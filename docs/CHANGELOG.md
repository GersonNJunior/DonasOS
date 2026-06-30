
## 1.1.10 - Correção validação de estoque

- Corrige validação de estoque para pedidos com itens vindos do Supabase.
- Localiza item por ID, ID Supabase ou nome/categoria.
- Evita falsa mensagem de estoque insuficiente ao confirmar pedido.
- Agrupa quantidades do mesmo item antes de validar estoque.

# Changelog

## 1.0.0 - Produção GO LIVE
- Versão oficial candidata à produção.
- Donas Online homologado para publicação e QR Code.
- Incluída opção de talher no pedido online.
- Banner configurável: informativo ou apenas imagem, com tamanhos pequeno, médio, grande ou tela cheia.
- Donas Online limitado a 1 massa e 1 molho por prato.
- Retirada não envia endereço na mensagem do WhatsApp.
- Delivery exige confirmação de endereço.
- Base administrativa local preservada.


## 4.1.1.3 - GO LIVE: Carrinho e navegação
- Carrinho do Donas Online voltou a ficar fixo na coluna lateral, sem flutuar sobre o conteúdo.
- Ao trocar de menu/aba, a nova tela abre no topo automaticamente.

# Changelog

## 4.1.0 - Carrinho inteligente Donas Online
- Adicionada barra flutuante do carrinho no Donas Online, sempre visível durante a montagem do pedido.
- Barra mostra quantidade de itens/pratos, total previsto e botão rápido para finalizar.
- Adicionado feedback visual e mensagem ao selecionar itens no cardápio do cliente.
- Ajustes de experiência sem alterar regras de estoque, financeiro, pedidos ou campanhas.

## 4.0.4 - Estoque com edição fixa
- Aba Estoque reorganizada com formulário fixo e lista rolável.
- Ao editar um item no final da lista, não é mais necessário voltar ao topo da página.
- Item em edição recebe destaque visual e o formulário mostra o nome do item editado.
- Ajuste pequeno de UX sem alterar regras de pedido, financeiro, estoque ou Portal Cliente.


## 2.1.1 - Ajustes de Operação
- Pedido não redireciona mais automaticamente para a aba Pedidos após ser criado.
- Compras já vêm marcadas para lançar saída no financeiro.
- Cozinha reorganizada visualmente por status: Pedido Feito, Preparando e Pedido Pronto.
- Histórico de compras usa ícone do item vinculado/estoque quando possível.
- Menu reorganizado com módulos operacionais acima e módulos gerenciais abaixo do financeiro.

# Changelog — Donas OS

## 2.0.0 Core Modular
- Reorganização técnica do projeto.
- Adicionada documentação de arquitetura.
- Adicionada documentação de testes.
- Adicionado versionamento formal em `version.json`.
- Criadas pastas para futura separação em módulos.
- Preservada a aplicação funcional da v1.9.
- Mantida compatibilidade com dados locais existentes.

## 1.9.0
- Sprint 1: Inteligência Comercial.
- Dashboard e indicadores comerciais.
- Insights e relatórios gerenciais.

## 2.4.0 - Produção
- Criada aba Operação com painel operacional, diagnóstico e checklist de abertura.
- Expandida a Central da Empresa em Configurações com slogan, CNPJ, e-mail, endereço, tempo médio, raio/área de entrega.
- Online Ready agora possui modo manual/automático de funcionamento e horários para sexta, sábado e domingo.
- Portal Cliente passa a considerar o horário automático ao liberar ou bloquear pedidos.
- Diagnóstico verifica WhatsApp, PIX, Instagram, backup, estoque crítico, pedidos pendentes e portal.


## Release 3.0 — Portal Cliente Experiência
- Cliente pode visualizar o cardápio sem cadastro.
- Identificação opcional por WhatsApp antes do pedido.
- Busca automática de cliente já cadastrado pelo telefone.
- Boas-vindas para cliente recorrente e preenchimento automático dos dados.
- Histórico rápido com opção de repetir último pedido.
- Delivery exige confirmação explícita do endereço antes de criar pedido.
- Campanhas cadastradas em Marketing agora aparecem também no Portal Cliente.

## Release 3.1 — Portal Cliente Multi-pratos
- Portal Cliente agora permite montar vários pratos no mesmo pedido.
- Cada prato calcula separadamente proteínas/complementos grátis.
- Resumo externo mostra pratos adicionados e prato em montagem.
- Pedido externo grava `pratos` e `itens` de forma compatível com a cozinha e histórico.
- Mensagem de WhatsApp separa os itens por prato.


## Release 3.2 - Central de Campanhas no Portal Cliente
- Marketing passa a controlar campanhas internas e externas.
- Adicionada configuração de exibição por destino: Donas OS, Portal Cliente ou ambos.
- Adicionadas datas de validade, status e posição no Portal.
- Portal Cliente exibe banner principal e cards promocionais vindos da Central de Campanhas.

## Release 4.0.1 - Donas Online: Nova Home
- Primeira etapa do redesign do Donas Online.
- Nova Home com aparência de aplicativo, logo em destaque, slogan, status da loja e tempo médio.
- Cardápio, carrinho e finalização reorganizados em blocos visuais mais comerciais.
- Adicionada barra inferior de navegação no Donas Online.
- Campanhas do Portal continuam dinâmicas, agora com apresentação mais próxima de vitrine.
- A lógica aprovada foi preservada: múltiplos pratos, itens grátis, WhatsApp, cliente recorrente, validação de endereço e pedidos aguardando confirmação.

## Release 4.0.2 - Navegação e Organização
- Menu lateral do Donas OS agora permanece fixo durante a rolagem.
- Navegação reorganizada por módulos: Operação, Gestão e Administração.
- Administração agrupa Financeiro, Campanhas, Insights, Relatórios, Online Ready, Donas Online e Configurações.
- Donas Online: atalho de Bebidas agora rola diretamente para a seção de bebidas.
- Donas Online: Sobremesas fica oculta enquanto não houver itens cadastrados.
- Sistema passa a lembrar a última aba acessada.


## 4.1.1.4 - GO LIVE Talher e Banner
- Adicionada opção de talher no pedido online.
- Banner do Portal Cliente agora aceita modo apenas imagem e tamanho configurável.

## Release 1.1.8 - Ajustes de nomenclatura e navegação do portal
- Remove o atalho de Bebidas do topo do portal do cliente.
- Prepara o atalho de Pratos Prontos para uso futuro.
- Cliente recorrente passa a ser vinculado ao clicar no nome encontrado.
- Renomeia botões de ação do portal para linguagem mais clara ao cliente.
- Adiciona confirmação antes de limpar pedido.
- Ajusta navegação do carrinho pelo rodapé.
