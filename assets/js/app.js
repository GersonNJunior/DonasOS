const App=(()=>{
  const KEY='donasDaMassaStudio_v11';
  const SUPABASE_DEFAULT_URL='https://dhhydjqhvnbxgfxwevpo.supabase.co';
  const SUPABASE_DEFAULT_KEY='sb_publishable_Nb7k0jdnUgyJGnWnYrCOtA_ruhlT3Bv';
  const SUPABASE_REST=()=>((db?.sync?.supabaseUrl)||SUPABASE_DEFAULT_URL).replace(/\/rest\/v1\/?$/,'').replace(/\/$/,'')+'/rest/v1';
  const SUPABASE_KEY=()=>((db?.sync?.supabaseAnonKey)||SUPABASE_DEFAULT_KEY).trim();
  let supabaseLojaId=null;
  let supabaseBusy=false;
  let supabaseLastLoad=0;
  const OLDS=['donasDaMassaStudio_v10','donasDaMassaStudio_v09','donasDaMassaStudio_v08','donasDaMassaStudio_v07','donasDaMassaStudio_v06','donasDaMassaStudio_v05'];
  const fmt=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  const onlineId=(prefix='REG')=>prefix+'-'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,8).toUpperCase();
  const hoje=()=>new Date().toISOString().slice(0,10);
  const STATUS=['Aguardando confirmação','Pedido Feito','Preparando','Pedido Pronto','Entregue'];
  const PAGAMENTOS=['PIX','Dinheiro','Débito','Crédito','iFood','Outro'];
  const norm=s=>(s||'').replace(/\D/g,'');
  const el=id=>document.getElementById(id);
  const val=id=>el(id)?.value||'';
  const num=id=>Number(val(id)||0);
  const categorias=()=>['Massa','Molho','Proteína','Complemento','Finalização','Bebida','Sobremesa'];
  const allCategorias=()=>['Massa','Molho','Proteína','Complemento','Finalização','Bebida','Sobremesa','Insumo','Embalagem'];
  const multiple=cat=>['Proteína','Complemento','Finalização','Bebida','Sobremesa'].includes(cat);
  const iconeCat=cat=>({Massa:'🍝',Molho:'🍅','Proteína':'🥓',Complemento:'🧀','Finalização':'🌿',Bebida:'🥤',Sobremesa:'🍮',Insumo:'📦',Embalagem:'🛍️'}[cat]||'•');
  const ICONES=[['🍝','Massa / macarrão'],['🍜','Massa / ninho'],['🥣','Molho / preparo'],['🍅','Molho tradicional'],['🥛','Molho branco'],['🌿','Finalização / ervas'],['🥓','Bacon'],['🍗','Frango'],['🥩','Carne'],['🍖','Calabresa / carne suína'],['🧀','Queijo'],['🌽','Milho'],['🫒','Azeitona'],['🧅','Cebola'],['🥕','Legume'],['🌶️','Pimenta'],['🧄','Alho'],['🥤','Bebida'],['💧','Água'],['🍮','Sobremesa'],['🍫','Chocolate'],['📦','Insumo'],['🛍️','Embalagem'],['🍴','Talher'],['❤️','Favorito']];
  function compraIcone(c){const vinc=c.itemId?db.itens.find(i=>i.id===c.itemId):null;if(vinc)return vinc.imagem?`<img class="tiny-img" src="${vinc.imagem}" alt="">`:(vinc.icone||iconeCat(vinc.categoria));const nome=(c.produto||'').toLowerCase();const porNome=db.itens.find(i=>(i.nome||'').toLowerCase()===nome);if(porNome)return porNome.imagem?`<img class="tiny-img" src="${porNome.imagem}" alt="">`:(porNome.icone||iconeCat(porNome.categoria));if(nome.includes('azeit'))return '🫒';if(nome.includes('milho'))return '🌽';if(nome.includes('queijo')||nome.includes('mussarela')||nome.includes('parmes'))return '🧀';if(nome.includes('bacon'))return '🥓';if(nome.includes('leite'))return '🥛';return iconeCat(c.categoria)}
  function statusClass(st){return 'status-'+String(st||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}

  function item(nome,categoria,preco,custo,estoque,minimo,unidade,icone,imagem='',porcao=1){return{id:uid(),nome,categoria,preco,custo,estoque,minimo,unidade,icone,imagem,porcao,obs:'',ativo:true}}
  function seed(){return{version:'4.0.1-donas-online-home',config:{nome:'Donas da Massa',nomeInterno:'Donas OS',slogan:'Seu macarrão. Seu jeito.',cnpj:'',email:'',enderecoEmpresa:'',instagram:'',pix:'',whatsapp:'',taxaEntrega:0,raioEntrega:'',tempoPreparo:20,complementosGratis:2,proteinasGratis:1,metaDiaria:1000,modoOperacao:false},itens:[
    item('Penne','Massa',18,6,30,5,'un','🍝'),item('Caracolino','Massa',18,6,30,5,'un','🍝'),item('Espaguete','Massa',18,6,30,5,'un','🍝'),
    item('Tradicional','Molho',7,2.5,20,4,'un','🍅'),item('Branco','Molho',7,2.8,20,4,'un','🥛'),
    item('Bacon','Proteína',8,3.5,2000,300,'g','🥓','',100),item('Frango','Proteína',8,3,2000,300,'g','🍗','',100),item('Calabresa','Proteína',8,3.2,2000,300,'g','', 'assets/img/ingredientes/calabresa.png',100),item('Carne Moída','Proteína',8,3.5,2000,300,'g','🥩','',100),
    item('Milho','Complemento',3,1,3000,500,'g','🌽','',80),item('Azeitona','Complemento',3,1,2000,300,'g','🫒','',50),item('Mussarela','Complemento',4,1.8,3000,500,'g','🧀','',80),item('Cebola','Complemento',3,.8,2000,300,'g','🧅','',50),
    item('Cebolinha','Finalização',0,.3,1000,200,'g','🌿','',20),item('Parmesão','Finalização',4,1.6,1500,250,'g','🧀','',30),
    item('Coca-Cola 350ml','Bebida',6,3,15,5,'un','🥤'),item('Água','Bebida',3,1,15,5,'un','💧')],pedidos:[],clientes:[],financeiro:[],marketing:[],favoritos:[],compras:[],receitas:[],producoes:[]}}
  function migrate(x){const base=seed();x.version='4.0.1-donas-online-home';x.config={...base.config,...(x.config||{})}; if(x.config.whatsapp===undefined)x.config.whatsapp='';x.itens=(x.itens||base.itens).map(i=>{let icon=i.icone||iconeCat(i.categoria);if((i.nome||'').toLowerCase().includes('calabresa')&&icon==='🌭')icon='🍖';return{...i,unidade:i.unidade||'un',porcao:Number(i.porcao||1),icone:icon,imagem:(i.imagem||(((i.nome||'').toLowerCase().includes('calabresa'))?'assets/img/ingredientes/calabresa.png':'')),ativo:i.ativo!==false,obs:i.obs||''}});x.pedidos=(x.pedidos||[]).map(p=>{const st=(p.status==='Concluído')?'Entregue':(p.status||'Entregue');let itens=(p.itens||[]).map(i=>({...i,qtdUsada:Number(i.qtdUsada||i.qtd||i.quantidadeUsada||1),porcao:Number(i.porcao||1)}));return{...p,itens,pratos:p.pratos||[{nome:'Prato 1',itens}],status:st,financeiroLancado:p.financeiroLancado??(p.status==='Concluído'||st==='Entregue'||(x.financeiro||[]).some(m=>m.origem==='pedido'&&m.pedidoId===p.id)),pagamento:p.pagamento||'',pagamentoPrevisto:p.pagamentoPrevisto||p.pagamento||'PIX'}});x.clientes=x.clientes||[];x.financeiro=x.financeiro||[];x.marketing=(x.marketing||[]).map(m=>({
      ...m,
      ativo:m.ativo!==false,
      exibirInterno:m.exibirInterno!==false,
      exibirPortal:m.exibirPortal!==false,
      posicao:m.posicao||'Vitrine',
      inicio:m.inicio||'',
      fim:m.fim||'',
      botao:m.botao||'',
      modoBanner:m.modoBanner||'informativo',
      alturaBanner:m.alturaBanner||260
    }));x.favoritos=x.favoritos||[];x.compras=x.compras||[];x.receitas=x.receitas||[];x.producoes=x.producoes||[];x.mural=x.mural||[];x.fechamentos=x.fechamentos||[];x.logs=x.logs||[];
    x.sync={modo:'online',status:'supabase beta',fila:[],lastSync:'',supabaseUrl:SUPABASE_DEFAULT_URL,supabaseAnonKey:SUPABASE_DEFAULT_KEY,lojaAberta:false,horarioModo:'manual',horarios:{sex:{ativo:true,inicio:'18:00',fim:'23:00'},sab:{ativo:true,inicio:'18:00',fim:'23:00'},dom:{ativo:true,inicio:'18:00',fim:'22:00'}},...(x.sync||{})};x.sync.horarios={sex:{ativo:true,inicio:'18:00',fim:'23:00'},sab:{ativo:true,inicio:'18:00',fim:'23:00'},dom:{ativo:true,inicio:'18:00',fim:'22:00'},...(x.sync.horarios||{})};
    x.itens=x.itens.map(i=>({...i,onlineId:i.onlineId||onlineId('ITEM'),updatedAt:i.updatedAt||new Date().toISOString(),syncStatus:i.syncStatus||'local'}));
    x.clientes=x.clientes.map(c=>({...c,onlineId:c.onlineId||onlineId('CLI'),updatedAt:c.updatedAt||new Date().toISOString(),syncStatus:c.syncStatus||'local'}));
    x.compras=x.compras.map(c=>({...c,onlineId:c.onlineId||onlineId('COMP'),updatedAt:c.updatedAt||new Date().toISOString(),syncStatus:c.syncStatus||'local'}));
    x.receitas=x.receitas.map(r=>({...r,onlineId:r.onlineId||onlineId('REC'),updatedAt:r.updatedAt||new Date().toISOString(),syncStatus:r.syncStatus||'local'}));
    x.pedidos=x.pedidos.map(p=>({...p,onlineId:p.onlineId||onlineId('PED'),updatedAt:p.updatedAt||new Date().toISOString(),syncStatus:p.syncStatus||'local',timeline:p.timeline||[{status:p.status||'Pedido Feito',data:p.data||new Date().toISOString()}]}));delete x.producao;return x}
  const Data={load(){try{let raw=localStorage.getItem(KEY);if(!raw){for(const k of OLDS){raw=localStorage.getItem(k);if(raw)break;}}return raw?migrate(JSON.parse(raw)):migrate(seed())}catch(e){return seed()}},save(db){try{const cur=localStorage.getItem(KEY);if(cur)localStorage.setItem(KEY+'_last_good',cur);localStorage.setItem(KEY,JSON.stringify(db));}catch(e){alert('Não foi possível salvar os dados. O armazenamento do navegador pode estar cheio.')}}};
  let db=Data.load();
  let pedido=novoPedido();
  let editBuffer=null;
  let marketingImageTemp='';
  let receitaTemp=[];
  let portalPedido={itens:{},qtd:{}};
  let portalPratos=[];
  let portalClienteIdentificado=null;
  function log(acao,detalhes=''){db.logs=db.logs||[];db.logs.unshift({id:uid(),acao,detalhes,data:new Date().toISOString()});db.logs=db.logs.slice(0,300)}
  function novoPedido(){return{itens:{},qtd:{},pratos:[],cliente:'',telefone:'',tipo:'Balcão',pagamentoPrevisto:'PIX',obs:'',endereco:'',bairro:'',clienteId:'',editandoId:'',editandoNumero:''}}
  function save(){Data.save(db);if(el('compraData')&&!el('compraData').value)el('compraData').value=hoje();renderAll();aplicarModoOperacao();const last=localStorage.getItem(KEY+'_last_page');if(last&&el('page-'+last))page(last)}
  function toast(msg){const t=el('toast');t.textContent=msg;t.className='show';setTimeout(()=>t.className='',2600)}
  function isPublicClient(){try{const q=new URLSearchParams(location.search);return document.body.classList.contains('public-client')||(!q.has('admin')&&!String(location.hash||'').includes('admin'));}catch(e){return document.body.classList.contains('public-client')}}
  function page(id){if(isPublicClient())id='portal';document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));el('page-'+id)?.classList.add('active');document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));const activeBtn=document.querySelector(`.nav button[data-page="${id}"]`);if(activeBtn){const parent=activeBtn.closest('details');if(parent)parent.open=true;}try{localStorage.setItem(KEY+'_last_page',id)}catch(e){}el('pageTitle').textContent={pdv:'Montar Pedido',dashboard:'Início',operacao:'Operação',insights:'Insights',relatorios:'Relatórios',marketing:'Campanhas',pedidos:'Pedidos',estoque:'Estoque',compras:'Compras',producao:'Produção',clientes:'Clientes',financeiro:'Financeiro',config:'Configurações',online:'Online Ready',portal:'Donas Online',cozinha:'Cozinha'}[id]||id;const main=document.querySelector('.main');if(main)main.scrollTop=0;window.scrollTo({top:0,left:0,behavior:'auto'});const pg=el('page-'+id);if(pg)pg.scrollTop=0}
  function syncPedido(){pedido.cliente=val('clientePedido');pedido.telefone=val('telefonePedido');pedido.tipo=val('tipoPedido')||'Balcão';pedido.pagamentoPrevisto=val('pagamentoPedido')||'PIX';pedido.obs=val('obsPedido');pedido.endereco=val('enderecoPedido');pedido.bairro=val('bairroPedido')}
  function isSelected(item){const v=pedido.itens[item.categoria];return Array.isArray(v)?v.includes(item.id):v===item.id}
  function defaultQtd(item){return unidadeInteira(item)?Math.max(1,Math.round(Number(item.porcao||1))):Number(item.porcao||1)}
  function unidadeInteira(item){return ['un','cx'].includes(String(item.unidade||'un').toLowerCase())}
  function normalizarQtd(item,q){let n=Number(q||0);if(unidadeInteira(item))return Math.max(1,Math.round(n||1));return Math.max(0.1,Math.round((n||0.1)*10)/10)}
  function porcoesItem(i){return Math.max(1,Math.ceil(Number(i.qtdUsada||1)/Math.max(Number(i.porcao||1),0.01)))}
  function toggleItem(id){const item=db.itens.find(i=>i.id===id);if(!item)return;if(Number(item.estoque||0)<=0&&!isSelected(item))return toast('Item sem estoque');if(multiple(item.categoria)){pedido.itens[item.categoria]=pedido.itens[item.categoria]||[];const arr=pedido.itens[item.categoria];if(arr.includes(id)){pedido.itens[item.categoria]=arr.filter(x=>x!==id);delete pedido.qtd[id]}else{pedido.itens[item.categoria]=[...arr,id];pedido.qtd[id]=defaultQtd(item)}}else{if(pedido.itens[item.categoria]===id){pedido.itens[item.categoria]=null;delete pedido.qtd[id]}else{pedido.itens[item.categoria]=id;pedido.qtd[id]=defaultQtd(item)}}if(el('compraData')&&!el('compraData').value)el('compraData').value=hoje();renderAll();aplicarModoOperacao();const last=localStorage.getItem(KEY+'_last_page');if(last&&el('page-'+last))page(last)}
  function setQtdItem(id,q){const item=db.itens.find(i=>i.id===id);if(!item)return;const n=normalizarQtd(item,q);if(n>Number(item.estoque||0))toast('Atenção: quantidade maior que o estoque atual');pedido.qtd[id]=n;renderResumo();renderProgress();renderSteps()}
  function selectedItems(){return Object.entries(pedido.itens).flatMap(([cat,v])=>Array.isArray(v)?v.map(id=>db.itens.find(i=>i.id===id)).filter(Boolean):[db.itens.find(i=>i.id===v)].filter(Boolean)).map(i=>({...i,qtdUsada:Number(pedido.qtd[i.id]||defaultQtd(i)),porcao:Number(i.porcao||1)}))}
  function applyPrices(sel){
    const limites={Complemento:Number(db.config.complementosGratis||0), 'Proteína':Number(db.config.proteinasGratis||0)};
    const usados={Complemento:0, 'Proteína':0};
    return sel.map(i=>{
      const mult=Math.max(1,Number(i.qtdUsada||1)/Math.max(Number(i.porcao||1),0.01));
      const porcoes=porcoesItem(i);
      let porcoesGratis=0;
      if(i.categoria==='Complemento'||i.categoria==='Proteína'){
        const rest=Math.max(0,(limites[i.categoria]||0)-(usados[i.categoria]||0));
        porcoesGratis=Math.min(rest,porcoes);
        usados[i.categoria]=(usados[i.categoria]||0)+porcoes;
      }
      const porcoesPagas=Math.max(0,porcoes-porcoesGratis);
      const gratis=porcoesPagas===0 && porcoesGratis>0;
      const valorCobrado=(i.categoria==='Complemento'||i.categoria==='Proteína')?Number(i.preco||0)*porcoesPagas:Number(i.preco||0)*mult;
      return{...i,porcoes,porcoesGratis,porcoesPagas,gratis,valorCobrado,custoCalculado:Number(i.custo||0)*mult}
    })
  }
  function pricedItems(){return applyPrices(selectedItems())}
  function currentPrato(){const itens=pricedItems();return{nome:'Prato '+(pedido.pratos.length+1),itens,total:itens.reduce((a,i)=>a+Number(i.valorCobrado||0),0),custo:itens.reduce((a,i)=>a+Number(i.custoCalculado||0),0)}}
  function pedidoTotal(){syncPedido();let t=pedido.pratos.reduce((a,p)=>a+Number(p.total||0),0);const atual=currentPrato();if(atual.itens.length)t+=atual.total;if(pedido.tipo==='Delivery')t+=Number(db.config.taxaEntrega||0);return t}
  function pedidoCusto(){let c=pedido.pratos.reduce((a,p)=>a+Number(p.custo||0),0);const atual=currentPrato();if(atual.itens.length)c+=atual.custo;return c}
  function pedidosPagos(){return db.pedidos.filter(p=>p.financeiroLancado||p.status==='Entregue')}
  function validarPrato(itens=selectedItems()){
    if(!itens.length){toast('Selecione ao menos um item');return false}
    const somenteAvulsos=itens.every(i=>['Bebida','Sobremesa'].includes(i.categoria));
    if(!somenteAvulsos){
      if(!itens.find(i=>i.categoria==='Massa')){toast('Escolha a massa');return false}
      if(!itens.find(i=>i.categoria==='Molho')){toast('Escolha o molho');return false}
    }
    for(const i of itens){if(Number(i.qtdUsada||1)>Number(i.estoque||0)){toast('Estoque insuficiente: '+i.nome);return false}}
    return true
  }
  function limparSelecaoPrato(){pedido.itens={};pedido.qtd={};if(el('compraData')&&!el('compraData').value)el('compraData').value=hoje();renderAll();aplicarModoOperacao();const last=localStorage.getItem(KEY+'_last_page');if(last&&el('page-'+last))page(last)}
  function adicionarPratoPedido(){const itens=selectedItems();if(!validarPrato(itens))return;pedido.pratos.push(currentPrato());limparSelecaoPrato();toast('Prato adicionado ao pedido')}
  function itensDoPedido(){let pratos=[...pedido.pratos];const atual=currentPrato();if(atual.itens.length)pratos.push(atual);return pratos.flatMap(p=>p.itens)}
  function deepCopy(obj){return JSON.parse(JSON.stringify(obj))}
  function baixarEstoque(itens){(itens||[]).forEach(i=>{const item=db.itens.find(x=>x.id===i.id);if(item)item.estoque=Number(item.estoque||0)-Number(i.qtdUsada||1)})}
  function devolverEstoque(itens){(itens||[]).forEach(i=>{const item=db.itens.find(x=>x.id===i.id);if(item)item.estoque=Number(item.estoque||0)+Number(i.qtdUsada||1)})}
  function recalcularPratos(pratos){const flat=(pratos||[]).flatMap(p=>p.itens||[]);return{itens:flat,subtotal:(pratos||[]).reduce((a,p)=>a+Number(p.total||0),0),custo:(pratos||[]).reduce((a,p)=>a+Number(p.custo||0),0)}}

  function buscarClientesPedido(){const q=norm(val('telefonePedido'));const box=el('clientesEncontrados');if(!box)return;if(q.length<4){box.className='client-results hidden';box.innerHTML='';return}const achados=db.clientes.filter(c=>norm(c.telefone).includes(q)||norm(c.telefone).slice(-8).includes(q.slice(-8))).slice(0,6);if(!achados.length){box.className='client-results';box.innerHTML='<span>Nenhum cliente encontrado. O pedido poderá cadastrar um novo.</span>';return}box.className='client-results';box.innerHTML=achados.map(c=>`<button type="button" onclick="App.selecionarClientePedido('${c.id}')"><strong>${c.nome}</strong><small>${c.telefone||''}${c.endereco?' • '+c.endereco:''}</small></button>`).join('')}
  function selecionarClientePedido(id){const c=db.clientes.find(x=>x.id===id);if(!c)return;pedido.clienteId=c.id;el('clientePedido').value=c.nome||'';el('telefonePedido').value=c.telefone||'';el('enderecoPedido').value=c.endereco||'';el('bairroPedido').value=c.bairro||'';const box=el('clientesEncontrados');if(box){box.className='client-results hidden';box.innerHTML=''}toast('Cliente selecionado. Alterações neste pedido não mudam o cadastro.')}

  function renderFavoritos(){const box=el('favoritosBox');if(!box)return;const favs=db.favoritos||[];if(!favs.length){box.innerHTML='<div class="favorite-empty">Nenhuma receita pronta ainda. Salve favoritos a partir de pedidos finalizados.</div>';return}box.innerHTML=`<div class="favorite-row"><select id="favoritoSelect"><option value="">Receitas prontas / favoritos...</option>${favs.map(f=>`<option value="${f.id}">${f.nome}</option>`).join('')}</select><button class="secondary" onclick="App.usarFavorito()">Aplicar</button></div><small class="hint">Use para preencher combinações comuns e acelerar o atendimento.</small>`}
  function usarFavorito(id){const fid=id||val('favoritoSelect');if(!fid)return toast('Escolha uma receita pronta');const f=(db.favoritos||[]).find(x=>x.id===fid);if(!f)return;pedido.pratos=deepCopy(f.pratos||[]);pedido.itens={};pedido.qtd={};renderAll();toast('Receita pronta adicionada ao pedido')}
  function removerFavorito(id){if(!confirm('Remover esta receita pronta?'))return;db.favoritos=(db.favoritos||[]).filter(f=>f.id!==id);save();toast('Receita pronta removida')}

  function renderSteps(){const root=el('steps');if(!root)return;root.innerHTML=categorias().map(cat=>{const itens=db.itens.filter(i=>i.categoria===cat&&i.ativo!==false);if(!itens.length)return'';const regra=cat==='Complemento'?`até ${db.config.complementosGratis||0} porções grátis`:cat==='Proteína'?`até ${db.config.proteinasGratis||0} porções grátis`:cat==='Bebida'||cat==='Sobremesa'?'pode adicionar avulso':multiple(cat)?'seleção múltipla':'escolha 1';return `<section class="step"><div class="step-head"><h3>${iconeCat(cat)} ${cat}</h3><small>${regra}</small></div><div class="option-grid">${itens.map(i=>{const low=Number(i.estoque||0)<=Number(i.minimo||0),sel=isSelected(i);const step=unidadeInteira(i)?'1':'0.1';const min=unidadeInteira(i)?'1':'0.1';const qtd=pedido.qtd[i.id]||defaultQtd(i);return `<button class="option ${sel?'selected':''} ${low?'low':''}" onclick="App.toggleItem('${i.id}')">${(cat==='Complemento'||cat==='Proteína')&&sel?'<em class="free-tag">regra por porção</em>':''}<div class="icon">${i.imagem?`<img src="${i.imagem}" alt="${i.nome}">`:(i.icone||iconeCat(cat))}</div><strong>${i.nome}</strong><span>${fmt(i.preco)}</span><small class="stock-mini">Estoque: ${i.estoque||0} ${i.unidade||'un'}</small>${sel?`<label class="qty-inline" onclick="event.stopPropagation()">Usar <input type="number" min="${min}" step="${step}" value="${qtd}" onchange="App.setQtdItem('${i.id}',this.value)"> ${i.unidade||'un'}</label>`:''}</button>`}).join('')}</div></section>`}).join('');renderProgress()}
  function renderProgress(){const items=selectedItems(),cats=['Massa','Molho','Proteína','Complemento','Finalização'];document.querySelectorAll('.progress span').forEach((s,i)=>s.classList.toggle('active',items.some(x=>x.categoria===cats[i]))) }
  function renderResumo(){syncPedido();el('deliveryBox')?.classList.toggle('hidden',pedido.tipo!=='Delivery');const atual=currentPrato(),box=el('resumoPedido');if(!atual.itens.length){box.className='summary empty-summary';box.textContent='Selecione os itens do prato'}else{box.className='summary';box.innerHTML=atual.itens.map(i=>`<div class="summary-item"><div><strong>${i.nome}</strong><br><small>${i.categoria} • ${i.qtdUsada} ${i.unidade||'un'}${(i.categoria==='Complemento'||i.categoria==='Proteína')?` • ${i.porcoesGratis||0} grátis / ${i.porcoesPagas||0} paga(s)`:''}</small></div><span class="${i.valorCobrado===0?'discount':''}">${i.valorCobrado===0?'Grátis':fmt(i.valorCobrado)}</span></div>`).join('')}const pb=el('pratosPedido');if(pb){pb.classList.toggle('hidden',pedido.pratos.length===0);pb.innerHTML=pedido.pratos.map((p,idx)=>`<div class="plate-chip"><strong>${p.nome}</strong><span>${p.itens.map(i=>i.nome).join(', ')}</span><b>${fmt(p.total)}</b><button onclick="App.removerPratoPedido(${idx})" type="button">×</button></div>`).join('')}el('totalPedido').textContent=fmt(pedidoTotal())}
  function removerPratoPedido(idx){pedido.pratos.splice(idx,1);renderAll();toast('Prato removido do pedido')}

  function finalizarPedido(){syncPedido();let pratos=[...pedido.pratos];const atual=currentPrato();if(atual.itens.length){if(!validarPrato(selectedItems()))return;pratos.push(atual)}if(!pratos.length)return toast('Adicione ao menos um prato ao pedido');const todos=pratos.flatMap(p=>p.itens);for(const i of todos){const item=db.itens.find(x=>x.id===i.id);if(!item||Number(item.estoque||0)<Number(i.qtdUsada||1))return toast('Estoque insuficiente: '+i.nome)}const subtotal=pratos.reduce((a,p)=>a+p.total,0);const entrega=pedido.tipo==='Delivery'?Number(db.config.taxaEntrega||0):0;const custo=pratos.reduce((a,p)=>a+p.custo,0);const numero=pedido.editandoNumero||String(db.pedidos.length+1).padStart(4,'0');const p={id:pedido.editandoId||uid(),numero,cliente:pedido.cliente||'Cliente balcão',telefone:pedido.telefone,tipo:pedido.tipo,pagamento:'',pagamentoPrevisto:pedido.pagamentoPrevisto||'PIX',obs:pedido.obs,endereco:pedido.endereco,bairro:pedido.bairro,clienteId:pedido.clienteId||'',pratos,itens:todos,total:subtotal+entrega,custo,lucro:subtotal+entrega-custo,status:'Pedido Feito',financeiroLancado:false,estoqueBaixado:true,origem:'interno',data:new Date().toISOString(),timeline:[{status:pedido.editandoNumero?'Pedido editado':'Pedido Feito',data:new Date().toISOString()}]};db.pedidos.unshift(p);log(pedido.editandoNumero?'Pedido editado':'Pedido criado','#'+p.numero+' • '+fmt(p.total));baixarEstoque(todos);editBuffer=null;salvarClienteAutomatico(p);limparPedido(false);save();toast(pedido.editandoNumero?'Pedido editado e reenviado para produção.':'Pedido registrado. Aguardando preparo e pagamento.')}
  function salvarClienteAutomatico(p){if(p.clienteId)return;if(!p.telefone&&!p.cliente)return;const tel=norm(p.telefone);const existe=db.clientes.find(c=>tel&&norm(c.telefone)===tel);if(existe)return;db.clientes.push({id:uid(),nome:p.cliente,telefone:p.telefone,endereco:p.endereco,bairro:p.bairro,obs:'Criado automaticamente por pedido',createdAt:new Date().toISOString()})}
  function limparPedido(show=true){if(show&&editBuffer){if(confirm('Cancelar edição e restaurar o pedido original?')){db.pedidos.unshift(editBuffer.pedido);if(editBuffer.financeiro)db.financeiro.unshift(editBuffer.financeiro);baixarEstoque(editBuffer.pedido.itens||[]);log('Edição cancelada','#'+editBuffer.pedido.numero);editBuffer=null}else{return}}pedido=novoPedido();['clientePedido','telefonePedido','obsPedido','enderecoPedido','bairroPedido'].forEach(id=>{if(el(id))el(id).value=''});if(el('tipoPedido'))el('tipoPedido').value='Balcão';if(el('pagamentoPedido'))el('pagamentoPedido').value='PIX';const box=el('clientesEncontrados');if(box){box.className='client-results hidden';box.innerHTML=''}renderAll();if(show)toast('Pedido limpo')}
  function atualizarStatus(id,status){const p=db.pedidos.find(x=>x.id===id);if(!p)return;if(status==='Entregue'){abrirPagamento(id);return}p.status=status;p.timeline=p.timeline||[];p.timeline.push({status,data:new Date().toISOString()});save();supabaseAtualizarPedido(p);toast('Status atualizado: '+status)}
  function abrirPagamento(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;el('modalContent').innerHTML=`<div class="receipt"><h2>Finalizar Pedido #${p.numero}</h2><p class="muted">Forma prevista: <b>${p.pagamentoPrevisto||'PIX'}</b>. Confirme ou altere abaixo. Só depois disso entra no financeiro.</p><div class="field"><label>Forma de pagamento</label><select id="pagamentoFinal">${PAGAMENTOS.map(pg=>`<option ${pg===(p.pagamento||p.pagamentoPrevisto||'PIX')?'selected':''}>${pg}</option>`).join('')}</select></div><div class="summary-item"><strong>Total</strong><strong>${fmt(p.total)}</strong></div><button class="primary full" onclick="App.confirmarPagamento('${id}')">Confirmar pagamento e entregar</button><button class="secondary full" onclick="App.fecharModal()">Cancelar</button></div>`;el('modal').classList.remove('hidden')}
  function confirmarPagamento(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;const pg=val('pagamentoFinal')||'PIX';p.status='Entregue';p.pagamento=pg;p.timeline=p.timeline||[];p.timeline.push({status:'Entregue',data:new Date().toISOString(),pagamento:pg});if(!p.financeiroLancado){db.financeiro.unshift({id:uid(),tipo:'entrada',desc:'Pedido #'+p.numero+' ('+pg+')',valor:p.total,data:new Date().toISOString(),origem:'pedido',pedidoId:p.id});p.financeiroLancado=true;p.dataPagamento=new Date().toISOString()}save();supabaseAtualizarPedido(p);fecharModal();toast('Pedido entregue e contabilizado')}
  function excluirPedido(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;el('modalContent').innerHTML=`<div class="receipt"><h2>Excluir Pedido #${p.numero}</h2><p class="muted">A exclusão também remove a entrada financeira deste pedido, caso ela já tenha sido contabilizada.</p><label class="check-line"><input id="excluirSemRetorno" type="checkbox"> Foi devolução/perda/erro depois do preparo. Não devolver itens ao estoque.</label><button class="danger-btn full" onclick="App.confirmarExcluirPedido('${id}')">Excluir pedido</button><button class="secondary full" onclick="App.fecharModal()">Cancelar</button></div>`;el('modal').classList.remove('hidden')}
  function confirmarExcluirPedido(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;const semRetorno=!!el('excluirSemRetorno')?.checked;if(!semRetorno){(p.itens||[]).forEach(i=>{const item=db.itens.find(x=>x.id===i.id);if(item)item.estoque=Number(item.estoque||0)+Number(i.qtdUsada||1)})}db.financeiro=db.financeiro.filter(m=>m.pedidoId!==id);db.pedidos=db.pedidos.filter(x=>x.id!==id);log('Pedido excluído','#'+p.numero+(semRetorno?' • sem retorno ao estoque':' • estoque devolvido'));save();fecharModal();toast(semRetorno?'Pedido excluído sem retorno de estoque':'Pedido excluído e estoque restaurado')}

  function escolherIcone(icon){if(icon&&el('itemIcone'))el('itemIcone').value=icon}
  function salvarItem(){const id=val('itemId'),nome=val('itemNome').trim();if(!nome)return toast('Informe o nome');const data={nome,categoria:val('itemCategoria'),preco:num('itemPreco'),custo:num('itemCusto'),estoque:num('itemEstoque'),minimo:num('itemMinimo'),unidade:val('itemUnidade')||'un',porcao:num('itemPorcao')||1,icone:val('itemIcone')||val('itemIconeLista')||iconeCat(val('itemCategoria')),imagem:val('itemImagem'),obs:val('itemObs'),ativo:true};let savedId=id;if(id){const idx=db.itens.findIndex(i=>i.id===id);if(idx>=0)db.itens[idx]={...db.itens[idx],...data}}else{savedId=uid();db.itens.push({id:savedId,...data})}limparFormItem(false);save();setTimeout(()=>{const row=document.querySelector(`[data-item-id="${savedId}"]`);if(row){row.classList.add('editing-item');setTimeout(()=>row.classList.remove('editing-item'),1200)}},80);toast('Item salvo')}
  function editarItem(id){const i=db.itens.find(x=>x.id===id);if(!i)return;el('formItemTitulo').textContent='✏️ Editando: '+i.nome;el('formItemTitulo').classList.add('editing-title');el('itemId').value=i.id;el('itemNome').value=i.nome;el('itemCategoria').value=i.categoria;el('itemPreco').value=i.preco||0;el('itemCusto').value=i.custo||0;el('itemEstoque').value=i.estoque||0;el('itemMinimo').value=i.minimo||0;el('itemUnidade').value=i.unidade||'un';if(el('itemPorcao'))el('itemPorcao').value=i.porcao||1;el('itemIcone').value=i.icone||'';if(el('itemIconeLista'))el('itemIconeLista').value=i.icone||'';if(el('itemImagem'))el('itemImagem').value=i.imagem||'';el('itemObs').value=i.obs||'';page('estoque');renderListas();setTimeout(()=>{el('itemNome')?.focus();document.querySelector(`[data-item-id="${id}"]`)?.scrollIntoView({block:'nearest',behavior:'smooth'});},80)}
  function limparFormItem(show=true){['itemId','itemNome','itemPreco','itemCusto','itemEstoque','itemMinimo','itemPorcao','itemIcone','itemImagem','itemObs'].forEach(id=>{if(el(id))el(id).value=''});if(el('itemCategoria'))el('itemCategoria').value='Massa';if(el('itemUnidade'))el('itemUnidade').value='un';if(el('itemIconeLista'))el('itemIconeLista').value='';if(el('formItemTitulo')){el('formItemTitulo').textContent='Cadastrar item';el('formItemTitulo').classList.remove('editing-title')}renderListas();if(show)toast('Formulário limpo')}
  function removerItem(id){if(!confirm('Remover este item?'))return;db.itens=db.itens.filter(i=>i.id!==id);save();toast('Item removido')}

  function salvarCliente(){const id=val('clienteId'),nome=val('cliNome').trim();if(!nome)return toast('Informe o nome');const data={nome,telefone:val('cliTelefone'),endereco:val('cliEndereco'),obs:val('cliObs'),updatedAt:new Date().toISOString()};if(id){const idx=db.clientes.findIndex(c=>c.id===id);if(idx>=0)db.clientes[idx]={...db.clientes[idx],...data}}else db.clientes.push({id:uid(),createdAt:new Date().toISOString(),...data});limparCliente(false);save();toast('Cliente salvo')}
  function editarCliente(id){const c=db.clientes.find(x=>x.id===id);if(!c)return;el('clienteId').value=c.id;el('cliNome').value=c.nome||'';el('cliTelefone').value=c.telefone||'';el('cliEndereco').value=c.endereco||'';el('cliObs').value=c.obs||'';page('clientes')}
  function limparCliente(show=true){['clienteId','cliNome','cliTelefone','cliEndereco','cliObs'].forEach(id=>{if(el(id))el(id).value=''});if(show)toast('Formulário limpo')}
  function removerCliente(id){if(!confirm('Remover cliente?'))return;db.clientes=db.clientes.filter(c=>c.id!==id);save();toast('Cliente removido')}
  function salvarMovimentacao(){const desc=val('movDesc').trim(),valor=num('movValor'),tipo=val('movTipo');if(!desc||!valor)return toast('Preencha descrição e valor');db.financeiro.unshift({id:uid(),desc,valor,tipo,data:new Date().toISOString(),origem:'manual'});log('Movimentação manual',desc+' • '+tipo+' • '+fmt(valor));['movDesc','movValor'].forEach(id=>el(id).value='');save();toast('Movimentação salva')}
  function removerMovimentacao(id){if(!confirm('Remover movimentação?'))return;db.financeiro=db.financeiro.filter(m=>m.id!==id);save();toast('Movimentação removida')}
  function salvarConfig(){db.config.nome=val('cfgNome')||'Donas da Massa';db.config.slogan=val('cfgSlogan')||'Seu macarrão. Seu jeito.';db.config.cnpj=val('cfgCnpj');db.config.email=val('cfgEmail');db.config.enderecoEmpresa=val('cfgEnderecoEmpresa');db.config.instagram=val('cfgInstagram');db.config.pix=val('cfgPix');db.config.whatsapp=norm(val('cfgWhatsapp'));db.config.taxaEntrega=num('cfgTaxa');db.config.raioEntrega=val('cfgRaioEntrega');db.config.tempoPreparo=num('cfgTempoPreparo')||0;db.config.complementosGratis=num('cfgGratis');db.config.proteinasGratis=num('cfgProteinasGratis');db.config.metaDiaria=num('cfgMetaDiaria')||0;db.config.nomeInterno=val('cfgNomeInterno')||'Donas OS';db.config.modoOperacao=!!el('cfgModoOperacao')?.checked;save();aplicarModoOperacao();toast('Configurações salvas')}

  function carregarImagemMarketing(e){const file=e.target.files?.[0];if(!file)return;const r=new FileReader();r.onload=ev=>{marketingImageTemp=ev.target.result;if(el('mkImagem'))el('mkImagem').value=marketingImageTemp;toast('Imagem carregada')};r.readAsDataURL(file)}
  function chk(id){return !!el(id)?.checked}
  function salvarMarketing(){
    const id=val('mkId'),titulo=val('mkTitulo').trim();
    const imagem=val('mkImagem')||marketingImageTemp;
    if(!titulo&&!imagem)return toast('Informe um título ou uma imagem para a campanha');
    const data={
      tipo:val('mkTipo'),
      titulo:titulo||'Campanha',
      descricao:val('mkDescricao'),
      link:val('mkLink'),
      botao:val('mkBotao')||'Saiba mais',
      imagem,
      modoBanner:val('mkModoBanner')||'informativo',
      alturaBanner:num('mkAlturaBanner')||260,
      posicao:val('mkPosicao')||'Vitrine',
      ativo:val('mkAtivo')!=='false',
      inicio:val('mkInicio'),
      fim:val('mkFim'),
      exibirInterno:chk('mkInterno'),
      exibirPortal:chk('mkPortal'),
      updatedAt:new Date().toISOString()
    };
    if(!data.exibirInterno&&!data.exibirPortal)return toast('Escolha onde a campanha será exibida');
    if(id){const idx=db.marketing.findIndex(m=>m.id===id);if(idx>=0)db.marketing[idx]={...db.marketing[idx],...data}}
    else db.marketing.unshift({id:uid(),createdAt:new Date().toISOString(),...data});
    limparMarketing(false);save();toast('Campanha salva')
  }
  function editarMarketing(id){
    const m=db.marketing.find(x=>x.id===id);if(!m)return;
    el('formMarketingTitulo').textContent='Editar campanha';el('mkId').value=m.id;el('mkTipo').value=m.tipo||'Parceiro';el('mkTitulo').value=m.titulo||'';el('mkDescricao').value=m.descricao||'';el('mkLink').value=m.link||'';el('mkBotao').value=m.botao||'';el('mkImagem').value=m.imagem||'';if(el('mkPosicao'))el('mkPosicao').value=m.posicao||'Vitrine';if(el('mkAtivo'))el('mkAtivo').value=(m.ativo!==false?'true':'false');if(el('mkInicio'))el('mkInicio').value=m.inicio||'';if(el('mkFim'))el('mkFim').value=m.fim||'';if(el('mkInterno'))el('mkInterno').checked=m.exibirInterno!==false;if(el('mkPortal'))el('mkPortal').checked=m.exibirPortal!==false;if(el('mkModoBanner'))el('mkModoBanner').value=m.modoBanner||'informativo';if(el('mkAlturaBanner'))el('mkAlturaBanner').value=String(m.alturaBanner||260);page('marketing')
  }
  function limparMarketing(show=true){
    ['mkId','mkTitulo','mkDescricao','mkLink','mkBotao','mkImagem','mkInicio','mkFim'].forEach(id=>{if(el(id))el(id).value=''});
    if(el('mkTipo'))el('mkTipo').value='Parceiro';if(el('mkPosicao'))el('mkPosicao').value='Vitrine';if(el('mkAtivo'))el('mkAtivo').value='true';if(el('mkInterno'))el('mkInterno').checked=true;if(el('mkPortal'))el('mkPortal').checked=true;if(el('mkModoBanner'))el('mkModoBanner').value='informativo';if(el('mkAlturaBanner'))el('mkAlturaBanner').value='260';
    if(el('formMarketingTitulo'))el('formMarketingTitulo').textContent='Cadastrar campanha';marketingImageTemp='';if(show)toast('Formulário limpo')
  }
  function removerMarketing(id){if(!confirm('Remover campanha?'))return;db.marketing=db.marketing.filter(m=>m.id!==id);save();toast('Campanha removida')}

  function statusClass(st){return st==='Pedido Feito'?'novo':st==='Preparando'?'prep':st==='Pedido Pronto'?'pronto':'entregue'}
  function statusActions(p){let a='';if(p.status==='Aguardando confirmação')a=`<button class="mini primary" onclick="App.confirmarPedidoPortal('${p.id}')">Confirmar pedido</button>`;else if(p.status==='Pedido Feito')a=`<button class="mini primary" onclick="App.atualizarStatus('${p.id}','Preparando')">Preparando</button>`;else if(p.status==='Preparando')a=`<button class="mini primary" onclick="App.atualizarStatus('${p.id}','Pedido Pronto')">Pronto</button>`;else if(p.status==='Pedido Pronto')a=`<button class="mini primary" onclick="App.atualizarStatus('${p.id}','Entregue')">Entregar / pagar</button>`;else a=`<span class="pill green">${p.pagamento||'Pago'}</span>`;return a+`<button class="mini danger-btn" onclick="App.excluirPedido('${p.id}')">excluir</button>`}
  function pedidoCard(p){return `<div class="pedido-card"><div class="pedido-top"><strong>#${p.numero}</strong><span class="status ${statusClass(p.status)}">${p.status}</span></div><small>${new Date(p.data).toLocaleString('pt-BR')} • ${p.tipo} • prev. ${p.pagamentoPrevisto||'PIX'}</small><p><b>${p.cliente}</b></p><div class="pedido-itens">${p.itens.map(i=>`<span>${i.nome} ${i.qtdUsada?`(${i.qtdUsada}${i.unidade||''})`:''}</span>`).join('')}</div><div class="pedido-bottom"><b>${fmt(p.total)}</b><div class="list-actions">${statusActions(p)}<button class="mini secondary" onclick="App.abrirEditarDadosPedido('${p.id}')">dados</button><button class="mini secondary" onclick="App.editarPedido('${p.id}')">editar</button><button class="mini secondary" onclick="App.verPedido('${p.id}')">detalhes</button></div></div></div>`}
  function renderKanban(){const k=el('kanbanPedidos');if(!k)return;k.innerHTML=STATUS.map(st=>{const ps=db.pedidos.filter(p=>(p.status||'Pedido Feito')===st);return `<div class="kanban-col"><h3>${st}<span>${ps.length}</span></h3><div class="kanban-scroll">${ps.map(pedidoCard).join('')||'<p class="muted small-pad">Nenhum pedido</p>'}</div></div>`}).join('')}
  function renderCozinha(){const k=el('cozinhaBoard');if(!k)return;const ativos=db.pedidos.filter(p=>!p.financeiroLancado&&p.status!=='Entregue');if(!ativos.length){k.innerHTML='<div class="card"><h3>Nenhum pedido em preparo</h3><p class="muted">Quando um pedido for registrado, ele aparecerá aqui automaticamente.</p></div>';return}const ordem=['Pedido Feito','Preparando','Pedido Pronto'];k.innerHTML=ordem.map(st=>{const grupo=ativos.filter(p=>p.status===st);return `<section class="kitchen-column ${statusClass(st)}"><header><strong>${st}</strong><span>${grupo.length}</span></header>${grupo.map(p=>`<div class="kitchen-ticket ${statusClass(p.status)}"><div><span class="pill status-pill">${p.status}</span><h3>Pedido #${p.numero}</h3><p>${p.tipo} • ${p.cliente||'Cliente balcão'}</p></div>${(p.pratos||[{nome:'Prato 1',itens:p.itens||[]}]).map(pr=>`<div class="kitchen-plate"><strong>${pr.nome}</strong>${pr.itens.map(i=>`<span>${i.nome} • ${i.qtdUsada||1} ${i.unidade||'un'}</span>`).join('')}</div>`).join('')}<div class="kitchen-actions">${statusActions(p)}</div></div>`).join('')||'<p class="muted small-column">Nenhum pedido nesta etapa.</p>'}</section>`}).join('')}
  function campanhaValida(m,alvo='portal'){
    if(!m||m.ativo===false)return false;
    if(alvo==='portal'&&m.exibirPortal===false)return false;
    if(alvo==='interno'&&m.exibirInterno===false)return false;
    const today=hoje();
    if(m.inicio&&m.inicio>today)return false;
    if(m.fim&&m.fim<today)return false;
    return true;
  }
  function campanhasAtivas(alvo='portal'){return (db.marketing||[]).filter(m=>campanhaValida(m,alvo))}
  function campanhaDestinoLabel(m){const d=[];if(m.exibirInterno!==false)d.push('Donas OS');if(m.exibirPortal!==false)d.push('Portal');return d.join(' + ')||'sem destino'}
  function renderMarketing(){
    const lista=el('listaMarketing');if(!lista)return;
    lista.innerHTML=(db.marketing||[]).map(m=>{const ativo=campanhaValida(m,'portal')||campanhaValida(m,'interno');return `<div class="marketing-list-item ${m.ativo===false?'muted-item':''}">${m.imagem?`<img src="${m.imagem}" alt="${m.titulo}">`:'<div class="mk-noimg">Sem imagem</div>'}<div><span class="pill">${m.tipo||'Campanha'}</span> <span class="pill ${m.ativo===false?'':'green'}">${m.ativo===false?'Inativa':(ativo?'Ativa':'Fora do período')}</span><strong>${m.titulo}</strong><p>${m.descricao||''}</p><small>Exibição: ${campanhaDestinoLabel(m)} • Posição: ${m.posicao||'Vitrine'}${m.inicio||m.fim?` • ${m.inicio||'sem início'} até ${m.fim||'sem fim'}`:''}</small>${m.link?`<small>${m.link}</small>`:''}<div class="list-actions"><button class="mini secondary" onclick="App.editarMarketing('${m.id}')">editar</button><button class="mini danger-btn" onclick="App.removerMarketing('${m.id}')">remover</button></div></div></div>`}).join('')||'<p class="muted">Nenhuma campanha cadastrada ainda.</p>';
    const cards=document.querySelectorAll('.marketing-strip .marketing-card');if(cards.length){const interno=campanhasAtivas('interno');const parceiro=interno.find(m=>m.tipo==='Parceiro')||interno[0];const banner=interno.find(m=>m.tipo==='Banner'||m.tipo==='Promoção'||m.tipo==='Destaque');if(parceiro){cards[0].innerHTML=`<span>${parceiro.tipo}</span><strong>${parceiro.titulo}</strong><p>${parceiro.descricao||'Parceiro cadastrado na Central de Campanhas.'}</p>`}if(banner){cards[2].innerHTML=`<span>${banner.tipo}</span><strong>${banner.titulo}</strong><p>${banner.descricao||'Campanha cadastrada.'}</p>`}}
  }

  function renderListas(){const filtro=val('filtroCategoria'),busca=val('buscaItem').toLowerCase();const itens=db.itens.filter(i=>(!filtro||i.categoria===filtro)&&(!busca||i.nome.toLowerCase().includes(busca)));el('listaItens').innerHTML=itens.map(i=>{const pct=Math.min(100,Number(i.estoque||0)/Math.max(Number(i.minimo||1)*3,1)*100);const low=Number(i.estoque||0)<=Number(i.minimo||0);const editing=val('itemId')===i.id;return `<div class="list-item ${editing?'editing-item':''}" data-item-id="${i.id}"><div style="flex:1"><strong>${i.imagem?`<img class="tiny-img" src="${i.imagem}" alt="">`:(i.icone||iconeCat(i.categoria))} ${i.nome}${editing?'<span class="edit-note">editando agora</span>':''}</strong><br><span class="pill">${i.categoria}</span> <small>${fmt(i.preco)} • custo ${fmt(i.custo)} • porção ${i.porcao||1} ${i.unidade||'un'} • estoque ${i.estoque} ${i.unidade||'un'}</small><div class="stockbar ${low?'low':''}"><b style="width:${pct}%"></b></div></div><div class="list-actions"><button class="mini secondary" onclick="App.editarItem('${i.id}')">editar</button><button class="mini danger-btn" onclick="App.removerItem('${i.id}')">remover</button></div></div>`}).join('')||'<p class="muted">Nenhum item cadastrado.</p>';const pedidos=db.pedidos.slice(0,60);el('listaPedidos').innerHTML=pedidos.map(p=>`<div class="list-item"><div><strong>Pedido #${p.numero}</strong><br><small>${new Date(p.data).toLocaleString('pt-BR')} • ${p.cliente} • ${p.status} • prev. ${p.pagamentoPrevisto||'PIX'} • ${p.pagamento||'pagamento pendente'}</small></div><div class="list-actions"><b>${fmt(p.total)}</b>${statusActions(p)}<button class="mini secondary" onclick="App.abrirEditarDadosPedido('${p.id}')">dados</button><button class="mini secondary" onclick="App.editarPedido('${p.id}')">editar</button><button class="mini secondary" onclick="App.verPedido('${p.id}')">detalhes</button></div></div>`).join('')||'<p class="muted">Nenhum pedido registrado.</p>';el('ultimosPedidos').innerHTML=db.pedidos.slice(0,8).map(p=>`<div class="list-item"><div><strong>Pedido #${p.numero}</strong><br><small>${p.cliente} • ${p.status}</small></div><b>${fmt(p.total)}</b></div>`).join('')||'<p class="muted">Nenhum pedido ainda.</p>';const count={};pedidosPagos().forEach(p=>p.itens.forEach(i=>count[i.nome]=(count[i.nome]||0)+Number(i.qtdUsada||1)));el('rankingItens').innerHTML=Object.entries(count).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([n,q])=>`<div class="list-item"><strong>${n}</strong><span class="pill">${q} uso</span></div>`).join('')||'<p class="muted">Sem dados de vendas concluídas.</p>';el('alertasEstoque').innerHTML=db.itens.filter(i=>Number(i.estoque||0)<=Number(i.minimo||0)).map(i=>`<div class="list-item"><div><strong>${i.nome}</strong><br><small>${i.categoria}</small></div><span class="pill red">${i.estoque} ${i.unidade||'un'}</span></div>`).join('')||'<p class="muted">Nenhum alerta de estoque.</p>';el('listaClientes').innerHTML=db.clientes.map(c=>{const total=pedidosPagos().filter(p=>p.cliente===c.nome||p.telefone===c.telefone).reduce((a,p)=>a+p.total,0);return `<div class="list-item"><div><strong>${c.nome}</strong><br><small>${c.telefone||'sem telefone'} • compras ${fmt(total)}</small></div><div class="list-actions"><button class="mini secondary" onclick="App.editarCliente('${c.id}')">editar</button><button class="mini danger-btn" onclick="App.removerCliente('${c.id}')">remover</button></div></div>`}).join('')||'<p class="muted">Nenhum cliente cadastrado.</p>';el('listaMovimentacoes').innerHTML=db.financeiro.slice(0,30).map(m=>`<div class="list-item"><div><strong>${m.desc}</strong><br><small>${new Date(m.data).toLocaleString('pt-BR')} • ${m.tipo}</small></div><div class="list-actions"><b class="${m.tipo==='entrada'?'discount':''}">${fmt(m.valor)}</b>${m.origem==='manual'?`<button class="mini danger-btn" onclick="App.removerMovimentacao('${m.id}')">remover</button>`:''}</div></div>`).join('')||'<p class="muted">Nenhuma movimentação.</p>';renderMural();renderFechamentos();renderLogs();renderKanban();renderCozinha();renderMarketing();renderInsights();renderCompras();renderProducao()}

  function renderInsights(){const box=el('insightsDia');if(!box)return;const pagos=pedidosPagos();const baixos=db.itens.filter(i=>Number(i.estoque||0)<=Number(i.minimo||0));const count={};pagos.forEach(p=>p.itens.forEach(i=>count[i.nome]=(count[i.nome]||0)+1));const top=Object.entries(count).sort((a,b)=>b[1]-a[1])[0];let arr=[];if(baixos.length)arr.push(`⚠ ${baixos[0].nome} está abaixo do mínimo. Vale repor antes do próximo atendimento.`);if(top)arr.push(`🏆 Item mais usado até agora: ${top[0]}. Pode virar sugestão do chef.`);if(db.pedidos.some(p=>!p.financeiroLancado))arr.push('🍳 Existem pedidos em andamento. Use a aba Cozinha para acompanhar o preparo.');if(!arr.length)arr.push('Tudo pronto para iniciar as vendas. Quando houver pedidos, este painel trará sugestões automáticas.');box.innerHTML=arr.map(x=>`<div class="insight-item">${x}</div>`).join('')}


  function horarioAtualLoja(){
    const sync=db.sync||{};
    if(sync.horarioModo!=='automatico')return {aberta:!!sync.lojaAberta,modo:'manual',detalhe:sync.lojaAberta?'aberta manualmente':'fechada manualmente'};
    const d=new Date();
    const dia=['dom','seg','ter','qua','qui','sex','sab'][d.getDay()];
    const h=(sync.horarios||{})[dia];
    if(!h||!h.ativo)return {aberta:false,modo:'automatico',detalhe:'fora dos dias de atendimento'};
    const atual=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
    const aberta=atual>=(h.inicio||'00:00')&&atual<=(h.fim||'23:59');
    return {aberta,modo:'automatico',detalhe:`${dia.toUpperCase()} ${h.inicio||'--:--'} às ${h.fim||'--:--'}`};
  }
  function diagnosticos(){
    const st=horarioAtualLoja();
    const backupRaw=localStorage.getItem(KEY+'_last_good');
    const low=db.itens.filter(i=>Number(i.estoque||0)<=Number(i.minimo||0));
    const aguardando=db.pedidos.filter(p=>['Aguardando confirmação','Pedido Feito'].includes(p.status)).length;
    return [
      {nome:'Loja',ok:st.aberta,warn:!st.aberta,detalhe:st.aberta?'Portal liberado para pedidos externos':`Fechada (${st.detalhe})`},
      {nome:'WhatsApp',ok:norm(db.config.whatsapp||'').length>=10,detalhe:norm(db.config.whatsapp||'').length>=10?'Número configurado':'Configure o chip da loja em Configurações'},
      {nome:'PIX',ok:!!(db.config.pix||'').trim(),warn:!(db.config.pix||'').trim(),detalhe:(db.config.pix||'').trim()?'Chave PIX cadastrada':'PIX ainda não cadastrado'},
      {nome:'Instagram',ok:!!(db.config.instagram||'').trim(),warn:!(db.config.instagram||'').trim(),detalhe:(db.config.instagram||'').trim()?'Instagram cadastrado':'Instagram não cadastrado'},
      {nome:'Backup seguro',ok:!!backupRaw,warn:!backupRaw,detalhe:backupRaw?'Existe ponto seguro local':'Faça um backup/exportação antes da operação'},
      {nome:'Estoque crítico',ok:low.length===0,warn:low.length>0,detalhe:low.length?`${low.length} item(ns) abaixo do mínimo`:'Nenhum item abaixo do mínimo'},
      {nome:'Pedidos pendentes',ok:aguardando===0,warn:aguardando>0,detalhe:aguardando?`${aguardando} pedido(s) aguardando ação`:'Nenhum pedido parado no início do fluxo'},
      {nome:'Portal Cliente',ok:true,detalhe:'Portal local funcionando; pronto para futuro link online'}
    ];
  }
  function renderDiagList(list){
    return `<div class="diagnostic-list">${list.map(d=>{const cls=d.ok?'ok':(d.warn?'warn':'bad');const label=d.ok?'OK':(d.warn?'Atenção':'Erro');return `<div class="diag-item ${cls}"><div><strong>${d.nome}</strong><small>${d.detalhe||''}</small></div><span class="diag-badge">${label}</span></div>`}).join('')}</div>`
  }
  function renderOperacao(){
    const st=horarioAtualLoja();
    const pend=db.pedidos.filter(p=>['Aguardando confirmação','Pedido Feito'].includes(p.status)).length;
    const prep=db.pedidos.filter(p=>p.status==='Preparando').length;
    const pronto=db.pedidos.filter(p=>p.status==='Pedido Pronto').length;
    if(el('opLoja'))el('opLoja').textContent=st.aberta?'Aberta':'Fechada';
    if(el('opLojaDetalhe'))el('opLojaDetalhe').textContent=st.detalhe;
    if(el('opAguardando'))el('opAguardando').textContent=pend;
    if(el('opPreparando'))el('opPreparando').textContent=prep;
    if(el('opProntos'))el('opProntos').textContent=pronto;
    const diag=diagnosticos();
    if(el('diagnosticoLista'))el('diagnosticoLista').innerHTML=renderDiagList(diag);
    const tasks=[];
    if(!norm(db.config.whatsapp||''))tasks.push('Configurar WhatsApp da loja');
    if(!(db.config.pix||'').trim())tasks.push('Cadastrar PIX');
    const low=db.itens.filter(i=>Number(i.estoque||0)<=Number(i.minimo||0));
    if(low.length)tasks.push('Conferir estoque baixo: '+low.slice(0,3).map(i=>i.nome).join(', '));
    if(!localStorage.getItem(KEY+'_last_good'))tasks.push('Exportar backup antes da operação');
    if(!st.aberta)tasks.push('Abrir loja quando iniciar atendimento');
    if(el('checklistAbertura'))el('checklistAbertura').innerHTML=tasks.length?tasks.map(t=>`<div class="operation-row"><span>${t}</span><span class="pill red">pendente</span></div>`).join(''):'<div class="diag-item ok"><div><strong>Tudo pronto</strong><small>Não há pendências críticas para abrir a operação.</small></div><span class="diag-badge">OK</span></div>';
    if(el('rotinaHoje'))el('rotinaHoje').innerHTML=`<div class="operation-row"><span>Tempo médio cadastrado</span><b>${Number(db.config.tempoPreparo||0)} min</b></div><div class="operation-row"><span>Taxa de entrega</span><b>${fmt(db.config.taxaEntrega||0)}</b></div><div class="operation-row"><span>Raio/área de entrega</span><b>${db.config.raioEntrega||'não definido'}</b></div><div class="operation-row"><span>Pedidos na fila</span><b>${pend+prep+pronto}</b></div>`;
    const hojePagos=pedidosPagos().filter(p=>(p.dataPagamento||p.data||'').slice(0,10)===hoje());
    const fatHoje=hojePagos.reduce((a,p)=>a+Number(p.total||0),0);
    if(el('opResumo'))el('opResumo').innerHTML=`<div class="operation-row"><span>Pedidos entregues hoje</span><b>${hojePagos.length}</b></div><div class="operation-row"><span>Faturamento hoje</span><b>${fmt(fatHoje)}</b></div><div class="operation-row"><span>WhatsApp</span><b>${norm(db.config.whatsapp||'')?'configurado':'pendente'}</b></div><div class="operation-row"><span>PIX</span><b>${(db.config.pix||'').trim()?'configurado':'pendente'}</b></div>`;
  }
  function renderDashboard(){const entradas=db.financeiro.filter(m=>m.tipo==='entrada').reduce((a,m)=>a+m.valor,0),saidas=db.financeiro.filter(m=>m.tipo==='saida').reduce((a,m)=>a+m.valor,0),pagos=pedidosPagos(),pagosHoje=pagos.filter(p=>(p.dataPagamento||p.data||'').slice(0,10)===hoje()),fat=pagos.reduce((a,p)=>a+p.total,0),fatHoje=pagosHoje.reduce((a,p)=>a+p.total,0),luc=pagos.reduce((a,p)=>a+p.lucro,0),meta=Number(db.config.metaDiaria||0),pct=meta?Math.min(100,(fatHoje/meta)*100):0;el('sideCaixa').textContent=fmt(entradas-saidas);el('dashPedidosHoje').textContent=pagosHoje.length;el('dashFaturamento').textContent=fmt(fat);el('dashTicket').textContent=fmt(pagos.length?fat/pagos.length:0);el('dashLucro').textContent=fmt(luc);el('finEntradas').textContent=fmt(entradas);el('finSaidas').textContent=fmt(saidas);el('finSaldo').textContent=fmt(entradas-saidas);el('finLucro').textContent=fmt(luc);el('pedidoNumero').textContent='#'+String(db.pedidos.length+1).padStart(4,'0');if(el('metaValorHoje'))el('metaValorHoje').textContent=fmt(meta);if(el('metaPercentual'))el('metaPercentual').textContent=Math.round(pct)+'%';if(el('metaBarra'))el('metaBarra').style.width=pct+'%';if(el('modoOperacaoBtn'))el('modoOperacaoBtn').textContent=db.config.modoOperacao?'Desativar modo operação':'Ativar modo operação';renderOperacao()}
  function renderConfig(){const brandName=document.querySelector('.brand strong');if(brandName)brandName.textContent=db.config.nome||'Donas da Massa';const internal=el('internalName');if(internal)internal.textContent=(db.config.nomeInterno||'Donas OS')+' v2.4';el('cfgNome').value=db.config.nome||'';if(el('cfgSlogan'))el('cfgSlogan').value=db.config.slogan||'';if(el('cfgCnpj'))el('cfgCnpj').value=db.config.cnpj||'';if(el('cfgEmail'))el('cfgEmail').value=db.config.email||'';if(el('cfgEnderecoEmpresa'))el('cfgEnderecoEmpresa').value=db.config.enderecoEmpresa||'';el('cfgInstagram').value=db.config.instagram||'';el('cfgPix').value=db.config.pix||'';if(el('cfgWhatsapp'))el('cfgWhatsapp').value=db.config.whatsapp||'';el('cfgTaxa').value=db.config.taxaEntrega||0;if(el('cfgRaioEntrega'))el('cfgRaioEntrega').value=db.config.raioEntrega||'';if(el('cfgTempoPreparo'))el('cfgTempoPreparo').value=db.config.tempoPreparo||0;el('cfgGratis').value=db.config.complementosGratis||0;if(el('cfgProteinasGratis'))el('cfgProteinasGratis').value=db.config.proteinasGratis??1;if(el('cfgMetaDiaria'))el('cfgMetaDiaria').value=db.config.metaDiaria||0;if(el('cfgNomeInterno'))el('cfgNomeInterno').value=db.config.nomeInterno||'Donas OS';if(el('cfgModoOperacao'))el('cfgModoOperacao').checked=!!db.config.modoOperacao}
  function renderSelects(){const fc=el('filtroCategoria');if(fc&&fc.options.length<=1)fc.innerHTML='<option value="">Todas as categorias</option>'+allCategorias().map(c=>`<option>${c}</option>`).join('');const fcc=el('filtroCompraCategoria');if(fcc&&fcc.options.length<=1)fcc.innerHTML='<option value="">Todas as categorias</option>'+allCategorias().map(c=>`<option>${c}</option>`).join('');const cie=el('compraItemEstoque');if(cie){const atual=cie.value;cie.innerHTML='<option value="">Criar novo / não vincular agora</option>'+db.itens.map(i=>`<option value="${i.id}">${i.nome} (${i.categoria})</option>`).join('');cie.value=atual||''}
    const rp=el('receitaProduto');if(rp){const atual=rp.value;rp.innerHTML='<option value="">Selecione o produto produzido</option>'+db.itens.filter(i=>['Molho','Massa','Insumo','Complemento','Finalização'].includes(i.categoria)).map(i=>`<option value="${i.id}">${i.nome} (${i.categoria})</option>`).join('');rp.value=atual||''}
    const ri=el('receitaInsumo');if(ri){const atual=ri.value;ri.innerHTML='<option value="">Selecione o insumo</option>'+db.itens.map(i=>`<option value="${i.id}">${i.nome} • estoque ${i.estoque||0} ${i.unidade||'un'}</option>`).join('');ri.value=atual||''}
    const pr=el('producaoReceita');if(pr){const atual=pr.value;pr.innerHTML='<option value="">Selecione uma ficha técnica</option>'+(db.receitas||[]).map(r=>{const prod=db.itens.find(i=>i.id===r.produtoId);return `<option value="${r.id}">${prod?prod.nome:'Produto removido'} • rende ${r.rendimento} ${r.unidade}</option>`}).join('');pr.value=atual||''}
    const is=el('itemIconeLista');if(is&&is.options.length<=1)is.innerHTML='<option value="">Escolha um ícone...</option>'+ICONES.map(([ico,desc])=>`<option value="${ico}">${ico} ${desc}</option>`).join('')}
  function verPedido(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;el('modalContent').innerHTML=`<div class="receipt"><h2>Pedido #${p.numero}</h2><p class="muted">${new Date(p.data).toLocaleString('pt-BR')} • ${p.tipo} • ${p.status} • previsto ${p.pagamentoPrevisto||'PIX'} • ${p.pagamento||'pagamento pendente'}</p><div class="order-detail"><strong>Cliente: ${p.cliente}</strong>${p.telefone?`<span>Telefone: ${p.telefone}</span>`:''}${p.endereco?`<span>Endereço: ${p.endereco} ${p.bairro||''}</span>`:''}${p.talher?`<span>Talher: ${p.talher}</span>`:''}<hr>${(p.pratos||[{nome:'Prato 1',itens:p.itens||[]}]).map(pr=>`<div class="prato-detail"><strong>${pr.nome}</strong>${pr.itens.map(i=>`<div class="summary-item"><span>${i.nome}<small> • ${i.categoria} • ${i.qtdUsada||1} ${i.unidade||'un'}</small></span><b>${i.gratis?'Grátis':fmt(i.valorCobrado??i.preco)}</b></div>`).join('')}</div>`).join('')}<hr><div class="summary-item"><strong>Total</strong><strong>${fmt(p.total)}</strong></div><div class="summary-item"><span>Custo estimado</span><span>${fmt(p.custo)}</span></div><div class="summary-item"><span>Lucro estimado</span><span>${fmt(p.lucro)}</span></div>${p.obs?`<p><strong>Obs:</strong> ${p.obs}</p>`:''}<div class="timeline"><strong>Linha do tempo</strong>${(p.timeline||[]).map(t=>`<span>${new Date(t.data).toLocaleString('pt-BR')} • ${t.status}${t.pagamento?' • '+t.pagamento:''}</span>`).join('')}</div><button class="secondary full" onclick="App.salvarFavoritoPedido('${p.id}')">Salvar como receita pronta</button><button class="secondary full" onclick="App.abrirEditarDadosPedido('${p.id}')">Editar dados / entrega</button><button class="secondary full" onclick="App.editarPedido('${p.id}')">Editar itens do pedido</button><button class="danger-btn full" onclick="App.excluirPedido('${p.id}')">Excluir pedido</button></div></div>`;el('modal').classList.remove('hidden')}

  function salvarFavoritoPedido(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;const nome=prompt('Nome da receita pronta:', 'Receita #'+p.numero);if(!nome)return;db.favoritos=db.favoritos||[];db.favoritos.unshift({id:uid(),nome,pratos:p.pratos||[{nome:'Prato 1',itens:p.itens||[]}],createdAt:new Date().toISOString()});save();toast('Receita pronta salva')}

  function abrirEditarDadosPedido(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;el('modalContent').innerHTML=`<div class="receipt"><h2>Editar dados do pedido #${p.numero}</h2><p class="muted">Altere cliente, retirada/delivery, endereço e pagamento previsto sem mudar o cadastro do cliente.</p><div class="field"><label>Cliente</label><input id="editCliente" value="${(p.cliente||'').replace(/"/g,'&quot;')}"></div><div class="field"><label>Telefone</label><input id="editTelefone" value="${(p.telefone||'').replace(/"/g,'&quot;')}"></div><div class="field"><label>Tipo</label><select id="editTipo"><option value="Balcão" ${p.tipo!=='Delivery'?'selected':''}>Retirada / Balcão</option><option value="Delivery" ${p.tipo==='Delivery'?'selected':''}>Delivery</option></select></div><div class="field"><label>Endereço</label><input id="editEndereco" value="${(p.endereco||'').replace(/"/g,'&quot;')}" placeholder="Rua, número, complemento"></div><div class="field"><label>Bairro</label><input id="editBairro" value="${(p.bairro||'').replace(/"/g,'&quot;')}"></div><div class="field"><label>Pagamento previsto</label><select id="editPgPrev">${PAGAMENTOS.map(pg=>`<option ${pg===(p.pagamentoPrevisto||'PIX')?'selected':''}>${pg}</option>`).join('')}</select></div><div class="field"><label>Observação</label><textarea id="editObs">${p.obs||''}</textarea></div><button class="primary full" onclick="App.salvarDadosPedido('${id}')">Salvar dados</button><button class="secondary full" onclick="App.fecharModal()">Cancelar</button></div>`;el('modal').classList.remove('hidden')}
  function salvarDadosPedido(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;const antigoTipo=p.tipo;p.cliente=val('editCliente')||p.cliente;p.telefone=val('editTelefone');p.tipo=val('editTipo')||'Balcão';p.endereco=val('editEndereco');p.bairro=val('editBairro');p.pagamentoPrevisto=val('editPgPrev')||'PIX';p.obs=val('editObs');const oldEntrega=antigoTipo==='Delivery'?Number(db.config.taxaEntrega||0):0;const newEntrega=p.tipo==='Delivery'?Number(db.config.taxaEntrega||0):0;if(oldEntrega!==newEntrega){p.total=Number(p.total||0)-oldEntrega+newEntrega;p.lucro=Number(p.total||0)-Number(p.custo||0);const mov=db.financeiro.find(m=>m.origem==='pedido'&&m.pedidoId===id);if(mov)mov.valor=p.total}p.timeline=p.timeline||[];p.timeline.push({status:'Dados alterados',data:new Date().toISOString()});log('Dados do pedido alterados','#'+p.numero+' • '+p.tipo);save();fecharModal();toast('Dados do pedido atualizados')}
  function editarPedido(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;if(!confirm('Editar os itens do pedido #'+p.numero+'? O pedido sairá da fila temporariamente e voltará após registrar novamente.'))return;const mov=db.financeiro.find(m=>m.origem==='pedido'&&m.pedidoId===id);editBuffer={pedido:deepCopy(p),financeiro:mov?deepCopy(mov):null};devolverEstoque(p.itens||[]);db.pedidos=db.pedidos.filter(x=>x.id!==id);db.financeiro=db.financeiro.filter(m=>m.pedidoId!==id);pedido=novoPedido();pedido.pratos=deepCopy(p.pratos||[{nome:'Prato 1',itens:p.itens||[]}]);pedido.cliente=p.cliente||'';pedido.telefone=p.telefone||'';pedido.tipo=p.tipo||'Balcão';pedido.pagamentoPrevisto=p.pagamentoPrevisto||p.pagamento||'PIX';pedido.obs=p.obs||'';pedido.endereco=p.endereco||'';pedido.bairro=p.bairro||'';pedido.clienteId=p.clienteId||'';pedido.editandoId=p.id;pedido.editandoNumero=p.numero;['clientePedido','telefonePedido','obsPedido','enderecoPedido','bairroPedido'].forEach(id2=>{if(el(id2))el(id2).value=pedido[{clientePedido:'cliente',telefonePedido:'telefone',obsPedido:'obs',enderecoPedido:'endereco',bairroPedido:'bairro'}[id2]]||''});if(el('tipoPedido'))el('tipoPedido').value=pedido.tipo==='Delivery'?'Delivery':'Balcão';if(el('pagamentoPedido'))el('pagamentoPedido').value=pedido.pagamentoPrevisto;log('Edição iniciada','#'+p.numero);save();fecharModal();page('pdv');toast('Pedido carregado para edição. Ajuste e registre novamente.')}


  function aplicarModoOperacao(){document.body.classList.toggle('modo-operacao',!!db.config.modoOperacao);document.querySelectorAll('.nav button').forEach(b=>{const keep=['pdv','pedidos','cozinha','dashboard'].includes(b.dataset.page);b.style.display=(db.config.modoOperacao&&!keep)?'none':''})}
  function alternarModoOperacao(){db.config.modoOperacao=!db.config.modoOperacao;save();aplicarModoOperacao();toast(db.config.modoOperacao?'Modo operação ativado':'Modo operação desativado')}
  function adicionarMural(){const texto=val('muralTexto').trim();if(!texto)return toast('Escreva um lembrete');db.mural=db.mural||[];db.mural.unshift({id:uid(),texto,data:new Date().toISOString(),feito:false});el('muralTexto').value='';save();toast('Lembrete adicionado')}
  function concluirMural(id){const m=(db.mural||[]).find(x=>x.id===id);if(m)m.feito=!m.feito;save()}
  function removerMural(id){db.mural=(db.mural||[]).filter(x=>x.id!==id);save();toast('Lembrete removido')}
  function renderMural(){const box=el('muralLista');if(!box)return;box.innerHTML=(db.mural||[]).slice(0,8).map(m=>`<div class="mural-item ${m.feito?'done':''}"><button onclick="App.concluirMural('${m.id}')">${m.feito?'✓':'○'}</button><span>${m.texto}</span><button class="danger" onclick="App.removerMural('${m.id}')">×</button></div>`).join('')||'<p class="muted">Nenhum lembrete no mural.</p>'}
  function resumoHoje(){const pagos=pedidosPagos().filter(p=>(p.dataPagamento||p.data||'').slice(0,10)===hoje()),entradas=db.financeiro.filter(m=>m.tipo==='entrada'&&(m.data||'').slice(0,10)===hoje()).reduce((a,m)=>a+Number(m.valor||0),0),saidas=db.financeiro.filter(m=>m.tipo==='saida'&&(m.data||'').slice(0,10)===hoje()).reduce((a,m)=>a+Number(m.valor||0),0),lucro=pagos.reduce((a,p)=>a+Number(p.lucro||0),0),porPg={};pagos.forEach(p=>porPg[p.pagamento||'Não informado']=(porPg[p.pagamento||'Não informado']||0)+Number(p.total||0));return{pagos,entradas,saidas,lucro,porPg}}
  function fecharCaixa(){const r=resumoHoje();el('modalContent').innerHTML=`<div class="receipt"><h2>Fechamento do dia</h2><p class="muted">${new Date().toLocaleDateString('pt-BR')} • ${(db.config.nomeInterno||'Donas OS')}</p><div class="stats-grid modal-stats"><article class="stat"><span>Pedidos</span><strong>${r.pagos.length}</strong></article><article class="stat"><span>Entradas</span><strong>${fmt(r.entradas)}</strong></article><article class="stat"><span>Saídas</span><strong>${fmt(r.saidas)}</strong></article><article class="stat"><span>Lucro</span><strong>${fmt(r.lucro)}</strong></article></div><h3>Formas de pagamento</h3>${Object.entries(r.porPg).map(([k,v])=>`<div class="summary-item"><span>${k}</span><b>${fmt(v)}</b></div>`).join('')||'<p class="muted">Nenhum pagamento concluído hoje.</p>'}<hr><button class="primary full" onclick="App.registrarFechamento()">Registrar fechamento</button><button class="secondary full" onclick="window.print()">Imprimir / salvar PDF</button></div>`;el('modal').classList.remove('hidden')}
  function registrarFechamento(){const r=resumoHoje();db.fechamentos=db.fechamentos||[];if(db.fechamentos.some(f=>f.data===hoje())){if(!confirm('Já existe fechamento de hoje. Registrar outro mesmo assim?'))return}db.fechamentos.unshift({id:uid(),data:hoje(),pedidos:r.pagos.length,entradas:r.entradas,saidas:r.saidas,lucro:r.lucro,porPagamento:r.porPg,createdAt:new Date().toISOString()});log('Fechamento registrado',hoje()+' • '+r.pagos.length+' pedidos');save();fecharModal();toast('Fechamento registrado')}
  function renderFechamentos(){const box=el('listaFechamentos');if(!box)return;box.innerHTML=(db.fechamentos||[]).slice(0,12).map(f=>`<div class="list-item"><div><strong>${new Date(f.data+'T12:00:00').toLocaleDateString('pt-BR')}</strong><br><small>${f.pedidos} pedidos • lucro ${fmt(f.lucro)}</small></div><b>${fmt(f.entradas-f.saidas)}</b></div>`).join('')||'<p class="muted">Nenhum fechamento registrado.</p>'}
  function renderLogs(){const box=el('listaLogs');if(!box)return;box.innerHTML=(db.logs||[]).slice(0,80).map(l=>`<div class="log-item"><span>${new Date(l.data).toLocaleString('pt-BR')}</span><strong>${l.acao}</strong><small>${l.detalhes||''}</small></div>`).join('')||'<p class="muted">Nenhuma ação registrada ainda.</p>'}
  function fecharModal(){el('modal').classList.add('hidden')}
  function validarBackup(obj){if(!obj||typeof obj!=='object')throw new Error('Backup vazio');if(!Array.isArray(obj.itens)&&!Array.isArray(obj.pedidos)&&!Array.isArray(obj.clientes))throw new Error('Estrutura não reconhecida');return true}
  function exportarBackup(){log('Backup exportado','Arquivo JSON gerado');Data.save(db);const pacote={...db,exportadoEm:new Date().toISOString(),origem:'Donas OS'};const blob=new Blob([JSON.stringify(pacote,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='DonasDaMassa_backup_'+new Date().toISOString().slice(0,10)+'.json';a.click();toast('Backup exportado')}
  function importarBackup(e){const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>{try{const obj=JSON.parse(ev.target.result);validarBackup(obj);const atual=localStorage.getItem(KEY);if(atual)localStorage.setItem(KEY+'_before_import_'+Date.now(),atual);db=migrate(obj);log('Backup importado',file.name);save();toast('Backup importado com segurança')}catch(err){toast('Arquivo inválido ou incompatível')}};r.readAsText(file)}
  function restaurarUltimoSeguro(){const raw=localStorage.getItem(KEY+'_last_good');if(!raw)return toast('Nenhum ponto seguro encontrado');if(!confirm('Restaurar o último ponto seguro salvo neste navegador?'))return;try{db=migrate(JSON.parse(raw));log('Restauração','Último ponto seguro restaurado');save();toast('Dados restaurados')}catch(e){toast('Não foi possível restaurar')}}
  function limparLogs(){if(!confirm('Limpar histórico de ações?'))return;db.logs=[];save();toast('Logs limpos')}
  function custoUnitarioCompra(c){const q=Number(c.qtd||0),v=Number(c.valor||0);return q>0?v/q:0}
  function salvarCompra(){
    const id=val('compraId'),produto=val('compraProduto').trim();
    if(!produto)return toast('Informe o produto comprado');
    const qtd=Number(val('compraQtd')||0),valor=Number(val('compraValor')||0);
    if(qtd<=0)return toast('Informe a quantidade da compra');
    if(valor<0)return toast('Informe um valor válido');
    const data={produto,local:val('compraLocal').trim(),data:val('compraData')||hoje(),qtd,unidade:val('compraUnidade')||'un',valor,categoria:val('compraCategoria')||'Insumo',itemId:val('compraItemEstoque'),addEstoque:!!el('compraAddEstoque')?.checked,financeiro:!!el('compraFinanceiro')?.checked,obs:val('compraObs'),custoUnitario:0};
    data.custoUnitario=custoUnitarioCompra(data);
    let compraId=id||uid();
    if(id){
      const idx=db.compras.findIndex(c=>c.id===id);
      if(idx>=0)db.compras[idx]={...db.compras[idx],...data};
    }else{
      db.compras=db.compras||[];
      db.compras.unshift({id:compraId,...data,createdAt:new Date().toISOString()});
    }
    if(data.addEstoque && !id){
      let item=data.itemId?db.itens.find(i=>i.id===data.itemId):null;
      if(item){
        item.estoque=Number(item.estoque||0)+qtd;
        item.custo=data.custoUnitario||item.custo||0;
        item.obs=item.obs||data.local||data.obs||'';
      }else{
        db.itens.push({id:uid(),nome:produto,categoria:data.categoria,preco:0,custo:data.custoUnitario,estoque:qtd,minimo:0,unidade:data.unidade,icone:iconeCat(data.categoria),imagem:'',porcao:unidadeInteira({unidade:data.unidade})?1:Math.max(0.1,Math.round(qtd*10)/10),obs:data.local||data.obs||'',ativo:true});
      }
    }
    if(data.financeiro && !id){
      db.financeiro.unshift({id:uid(),desc:'Compra: '+produto+(data.local?' • '+data.local:''),valor:valor,tipo:'saida',data:new Date(data.data+'T12:00:00').toISOString(),origem:'compra',compraId});
    }
    log(id?'Compra editada':'Compra registrada',produto+' • '+fmt(valor));
    limparCompra(false);save();toast('Compra salva')
  }
  function editarCompra(id){const c=(db.compras||[]).find(x=>x.id===id);if(!c)return;el('compraId').value=c.id;el('compraProduto').value=c.produto||'';el('compraLocal').value=c.local||'';el('compraData').value=c.data||hoje();el('compraQtd').value=c.qtd||0;el('compraUnidade').value=c.unidade||'un';el('compraValor').value=c.valor||0;el('compraCategoria').value=c.categoria||'Insumo';el('compraItemEstoque').value=c.itemId||'';el('compraAddEstoque').checked=!!c.addEstoque;el('compraFinanceiro').checked=!!c.financeiro;el('compraObs').value=c.obs||'';el('formCompraTitulo').textContent='Editar compra';page('compras')}
  function limparCompra(render=true){['compraId','compraProduto','compraLocal','compraQtd','compraValor','compraObs'].forEach(id=>{if(el(id))el(id).value=''});if(el('compraData'))el('compraData').value=hoje();if(el('compraUnidade'))el('compraUnidade').value='un';if(el('compraCategoria'))el('compraCategoria').value='Insumo';if(el('compraItemEstoque'))el('compraItemEstoque').value='';if(el('compraAddEstoque'))el('compraAddEstoque').checked=true;if(el('compraFinanceiro'))el('compraFinanceiro').checked=true;if(el('formCompraTitulo'))el('formCompraTitulo').textContent='Lançar compra';if(render)renderAll()}
  function removerCompra(id){const c=(db.compras||[]).find(x=>x.id===id);if(!c)return;if(!confirm('Remover este registro de compra? Isso não altera automaticamente estoque ou financeiro já lançados.'))return;db.compras=(db.compras||[]).filter(x=>x.id!==id);log('Compra removida',c.produto);save();toast('Compra removida')}
  function renderCompras(){
    if(!el('listaCompras'))return;
    const busca=(val('buscaCompra')||'').toLowerCase(),cat=val('filtroCompraCategoria');
    const compras=(db.compras||[]).filter(c=>(!cat||c.categoria===cat)&&(!busca||(c.produto||'').toLowerCase().includes(busca)||(c.local||'').toLowerCase().includes(busca)||(c.obs||'').toLowerCase().includes(busca)));
    const totalMes=(db.compras||[]).filter(c=>(c.data||'').slice(0,7)===hoje().slice(0,7)).reduce((a,c)=>a+Number(c.valor||0),0);
    const porLocal={};(db.compras||[]).forEach(c=>{if((c.data||'').slice(0,7)===hoje().slice(0,7))porLocal[c.local||'Sem local']=(porLocal[c.local||'Sem local']||0)+Number(c.valor||0)});
    const topLocal=Object.entries(porLocal).sort((a,b)=>b[1]-a[1])[0];
    el('resumoCompras').innerHTML=`<div class="stats-grid compact-stats"><article class="stat"><span>Gasto no mês</span><strong>${fmt(totalMes)}</strong></article><article class="stat"><span>Registros</span><strong>${(db.compras||[]).length}</strong></article></div>${topLocal?`<div class="list-item"><div><strong>Maior local do mês</strong><br><small>${topLocal[0]}</small></div><b>${fmt(topLocal[1])}</b></div>`:'<p class="muted">Sem compras registradas ainda.</p>'}`;
    el('listaCompras').innerHTML=compras.slice(0,120).map(c=>`<div class="list-item"><div style="flex:1"><strong>${compraIcone(c)} ${c.produto}</strong><br><span class="pill">${c.categoria}</span> <small>${new Date((c.data||hoje())+'T12:00:00').toLocaleDateString('pt-BR')} • ${c.local||'sem local'} • ${c.qtd} ${c.unidade} • ${fmt(c.valor)} • ${fmt(c.custoUnitario)}/${c.unidade}</small>${c.obs?`<br><small>${c.obs}</small>`:''}</div><div class="list-actions"><button class="mini secondary" onclick="App.editarCompra('${c.id}')">editar</button><button class="mini danger-btn" onclick="App.removerCompra('${c.id}')">remover</button></div></div>`).join('')||'<p class="muted">Nenhuma compra encontrada.</p>';
  }

  function renderReceitaTemp(){const box=el('receitaInsumosTemp');if(!box)return;box.innerHTML=receitaTemp.length?receitaTemp.map((it,idx)=>{const item=db.itens.find(i=>i.id===it.itemId);return `<div class="list-item compact"><div><strong>${item?item.nome:'Item removido'}</strong><br><small>${it.qtd} ${item?item.unidade||'un':''}</small></div><button class="mini danger-btn" onclick="App.removerInsumoReceita(${idx})">remover</button></div>`}).join(''):'<p class="muted">Nenhum insumo adicionado à ficha.</p>'}
  function adicionarInsumoReceita(){const itemId=val('receitaInsumo'),qtd=Number(val('receitaInsumoQtd')||0);if(!itemId)return toast('Selecione o insumo');if(qtd<=0)return toast('Informe a quantidade usada');const item=db.itens.find(i=>i.id===itemId);receitaTemp.push({itemId,qtd,unidade:item?.unidade||'un'});el('receitaInsumoQtd').value='';renderReceitaTemp();renderProducao()}
  function removerInsumoReceita(idx){receitaTemp.splice(idx,1);renderReceitaTemp();renderProducao()}
  function limparReceita(render=true){receitaTemp=[];['receitaId','receitaRendimento'].forEach(id=>{if(el(id))el(id).value=''});if(el('receitaProduto'))el('receitaProduto').value='';if(el('receitaUnidade'))el('receitaUnidade').value='L';if(el('formReceitaTitulo'))el('formReceitaTitulo').textContent='Cadastrar ficha técnica';renderReceitaTemp();if(render)renderAll()}
  function salvarReceita(){const id=val('receitaId'),produtoId=val('receitaProduto'),rendimento=Number(val('receitaRendimento')||0),unidade=val('receitaUnidade')||'L';if(!produtoId)return toast('Selecione o produto produzido');if(rendimento<=0)return toast('Informe o rendimento da receita');if(!receitaTemp.length)return toast('Adicione pelo menos um insumo');const obj={produtoId,rendimento,unidade,insumos:receitaTemp.map(x=>({...x})),updatedAt:new Date().toISOString()};if(id){const idx=(db.receitas||[]).findIndex(r=>r.id===id);if(idx>=0)db.receitas[idx]={...db.receitas[idx],...obj}}else{db.receitas=db.receitas||[];db.receitas.unshift({id:uid(),...obj,createdAt:new Date().toISOString()})}const prod=db.itens.find(i=>i.id===produtoId);log(id?'Ficha técnica editada':'Ficha técnica criada',prod?.nome||'produto');limparReceita(false);save();toast('Ficha técnica salva')}
  function editarReceita(id){const r=(db.receitas||[]).find(x=>x.id===id);if(!r)return;el('receitaId').value=r.id;el('receitaProduto').value=r.produtoId||'';el('receitaRendimento').value=r.rendimento||0;el('receitaUnidade').value=r.unidade||'L';receitaTemp=(r.insumos||[]).map(x=>({...x}));el('formReceitaTitulo').textContent='Editar ficha técnica';renderReceitaTemp();page('producao')}
  function removerReceita(id){const r=(db.receitas||[]).find(x=>x.id===id);if(!r)return;if(!confirm('Remover esta ficha técnica?'))return;db.receitas=(db.receitas||[]).filter(x=>x.id!==id);log('Ficha técnica removida',id);save();toast('Ficha técnica removida')}
  function registrarProducao(){const receitaId=val('producaoReceita'),qtd=Number(val('producaoQtd')||0);const r=(db.receitas||[]).find(x=>x.id===receitaId);if(!r)return toast('Selecione uma ficha técnica');if(qtd<=0)return toast('Informe a quantidade produzida');const fator=qtd/Number(r.rendimento||1);let custo=0;for(const ins of r.insumos||[]){const item=db.itens.find(i=>i.id===ins.itemId);const usado=Number(ins.qtd||0)*fator;if(!item)return toast('Um insumo da ficha não existe mais');if(Number(item.estoque||0)<usado)return toast(`Estoque insuficiente: ${item.nome} (precisa ${usado.toFixed(2)} ${item.unidade||'un'})`);}
    for(const ins of r.insumos||[]){const item=db.itens.find(i=>i.id===ins.itemId);const usado=Number(ins.qtd||0)*fator;item.estoque=Number(item.estoque||0)-usado;custo+=Number(item.custo||0)*(usado/Math.max(Number(item.porcao||1),1));}
    const prod=db.itens.find(i=>i.id===r.produtoId);if(!prod)return toast('Produto produzido não existe mais');prod.estoque=Number(prod.estoque||0)+qtd;if(qtd>0)prod.custo=Math.round((custo/qtd)*100)/100;db.producoes=db.producoes||[];db.producoes.unshift({id:uid(),receitaId,produtoId:r.produtoId,qtd,unidade:r.unidade,custo,data:new Date().toISOString(),insumos:(r.insumos||[]).map(ins=>({...ins,qtdUsada:Number(ins.qtd||0)*fator}))});log('Produção registrada',`${prod.nome} • ${qtd} ${r.unidade}`);el('producaoQtd').value='';save();toast('Produção registrada')}
  function renderProducao(){renderReceitaTemp();const lr=el('listaReceitas'),lp=el('listaProducoes'),pv=el('previewProducao');if(!lr)return;lr.innerHTML=(db.receitas||[]).map(r=>{const prod=db.itens.find(i=>i.id===r.produtoId);const custo=(r.insumos||[]).reduce((a,ins)=>{const item=db.itens.find(i=>i.id===ins.itemId);return a+(item?Number(item.custo||0)*(Number(ins.qtd||0)/Math.max(Number(item.porcao||1),1)):0)},0);return `<div class="list-item"><div style="flex:1"><strong>${prod?prod.nome:'Produto removido'}</strong><br><small>Rende ${r.rendimento} ${r.unidade} • custo estimado ${fmt(custo)}</small><br><small>${(r.insumos||[]).map(ins=>{const it=db.itens.find(i=>i.id===ins.itemId);return `${it?it.nome:'Item removido'} ${ins.qtd} ${it?it.unidade||'un':''}`}).join(' • ')}</small></div><div class="list-actions"><button class="mini secondary" onclick="App.editarReceita('${r.id}')">editar</button><button class="mini danger-btn" onclick="App.removerReceita('${r.id}')">remover</button></div></div>`}).join('')||'<p class="muted">Nenhuma ficha técnica cadastrada.</p>';
    if(lp)lp.innerHTML=(db.producoes||[]).slice(0,60).map(p=>{const prod=db.itens.find(i=>i.id===p.produtoId);return `<div class="list-item"><div><strong>${prod?prod.nome:'Produto removido'}</strong><br><small>${new Date(p.data).toLocaleString('pt-BR')} • ${p.qtd} ${p.unidade} • custo ${fmt(p.custo)}</small></div></div>`}).join('')||'<p class="muted">Nenhuma produção registrada.</p>';
    if(pv){const r=(db.receitas||[]).find(x=>x.id===val('producaoReceita'));const qtd=Number(val('producaoQtd')||0);if(!r){pv.innerHTML='<p class="muted">Selecione uma ficha para ver os insumos necessários.</p>'}else{const fator=qtd>0?qtd/Number(r.rendimento||1):1;pv.innerHTML=`<h4>Insumos necessários ${qtd>0?'para '+qtd+' '+r.unidade:'por receita'}</h4>`+(r.insumos||[]).map(ins=>{const it=db.itens.find(i=>i.id===ins.itemId);const precisa=Number(ins.qtd||0)*fator;const ok=it&&Number(it.estoque||0)>=precisa;return `<div class="list-item compact"><div><strong>${it?it.nome:'Item removido'}</strong><br><small>Precisa ${precisa.toFixed(2)} ${it?it.unidade||'un':''} • estoque ${it?it.estoque:0}</small></div><span class="pill ${ok?'':'red'}">${ok?'ok':'baixo'}</span></div>`}).join('')}}}


  function renderInsights(){
    if(!el('insFaturamentoHoje'))return;
    const today=hoje();
    const pedidosBase=(db.pedidos||[]).filter(p=>p.financeiroLancado||p.status==='Entregue');
    const pedidosHoje=pedidosBase.filter(p=>(p.dataPagamento||p.data||'').slice(0,10)===today);
    const ontem=new Date();ontem.setDate(ontem.getDate()-1);const ontemStr=ontem.toISOString().slice(0,10);
    const pedidosOntem=pedidosBase.filter(p=>(p.dataPagamento||p.data||'').slice(0,10)===ontemStr);
    const faturamento=pedidosHoje.reduce((a,p)=>a+Number(p.total||0),0);
    const fatOntem=pedidosOntem.reduce((a,p)=>a+Number(p.total||0),0);
    const custo=pedidosHoje.reduce((a,p)=>a+Number(p.custo||0),0);
    const lucro=faturamento-custo;
    const ticket=pedidosHoje.length?faturamento/pedidosHoje.length:0;
    el('insFaturamentoHoje').textContent=fmt(faturamento);
    el('insPedidosHoje').textContent=pedidosHoje.length;
    el('insTicketHoje').textContent=fmt(ticket);
    el('insLucroHoje').textContent=fmt(lucro);

    const variacao=fatOntem?((faturamento-fatOntem)/fatOntem*100):0;
    if(el('insComparativo')){
      el('insComparativo').innerHTML=`<div class="big-number ${variacao>=0?'positive':'negative'}">${fatOntem?(variacao>=0?'▲ ':'▼ ')+Math.abs(variacao).toFixed(1)+'%':'—'}</div><p class="muted">comparado com ontem (${fmt(fatOntem)})</p><div class="list-item compact"><strong>Ontem</strong><b>${fmt(fatOntem)}</b></div><div class="list-item compact"><strong>Hoje</strong><b>${fmt(faturamento)}</b></div>`;
    }
    const meta=Number(db.config.metaDiaria||0);
    const pct=meta?Math.min(100,(faturamento/meta)*100):0;
    const hora=new Date().getHours();
    const fatorDia=Math.max(0.15,Math.min(1,hora/22));
    const previsao=fatorDia>0?faturamento/fatorDia:faturamento;
    if(el('insMetaSprint')){
      el('insMetaSprint').innerHTML=`<div class="goal-head"><strong>${fmt(meta)}</strong><span>${Math.round(pct)}%</span></div><div class="goal-bar"><b style="width:${pct}%"></b></div><div class="list-item compact"><strong>Previsão do dia</strong><b>${fmt(previsao)}</b></div><small class="muted">Estimativa simples baseada no horário atual. Ficará mais precisa com mais histórico.</small>`;
    }

    const porCat={Massa:{},Molho:{},Proteína:{},Complemento:{},Finalização:{},Bebida:{},Sobremesa:{}};
    const consumo={};
    pedidosBase.forEach(p=>(p.pratos||[{itens:p.itens||[]}]).forEach(pr=>(pr.itens||[]).forEach(i=>{const cat=i.categoria||'Outros';if(porCat[cat])porCat[cat][i.nome]=(porCat[cat][i.nome]||0)+Math.max(1,Number(i.porcoes||1));consumo[i.nome]=consumo[i.nome]||{qtd:0,unidade:i.unidade||'un',categoria:cat};consumo[i.nome].qtd+=Number(i.qtdUsada||i.qtd||1)})));
    function bars(obj){const arr=Object.entries(obj||{}).sort((a,b)=>b[1]-a[1]).slice(0,5);const max=arr[0]?.[1]||1;return arr.length?arr.map(([n,q])=>`<div class="ins-bar"><div><strong>${n}</strong><span>${q.toFixed(q%1?1:0)} porções</span></div><b><i style="width:${Math.max(6,q/max*100)}%"></i></b></div>`).join(''):'<p class="muted">Ainda não há dados suficientes.</p>'}
    el('insRankingCategorias').innerHTML=['Massa','Molho','Proteína','Complemento'].map(c=>`<div class="ins-section"><h4>${c}</h4>${bars(porCat[c])}</div>`).join('');
    const cons=Object.entries(consumo).sort((a,b)=>b[1].qtd-a[1].qtd).slice(0,12);
    el('insConsumoItens').innerHTML=cons.length?cons.map(([n,o])=>`<div class="list-item compact"><div><strong>${n}</strong><br><small>${o.categoria}</small></div><b>${Number(o.qtd).toFixed(o.qtd%1?1:0)} ${o.unidade}</b></div>`).join(''):'<p class="muted">O consumo aparecerá conforme os pedidos forem entregues.</p>';

    const pagamentos={};pedidosHoje.forEach(p=>{const k=p.pagamento||p.pagamentoPrevisto||'Não informado';pagamentos[k]=(pagamentos[k]||0)+Number(p.total||0)});
    const maxPg=Math.max(...Object.values(pagamentos),1);
    if(el('insPagamentoSprint'))el('insPagamentoSprint').innerHTML=Object.entries(pagamentos).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="ins-bar"><div><strong>${k}</strong><span>${fmt(v)} • ${faturamento?(v/faturamento*100).toFixed(0):0}%</span></div><b><i style="width:${Math.max(8,v/maxPg*100)}%"></i></b></div>`).join('')||'<p class="muted">Nenhum pagamento concluído hoje.</p>';

    const clienteKeys=new Set(), recorrentes=new Set();
    pedidosHoje.forEach(p=>{const k=p.clienteId||norm(p.telefone)||p.cliente;if(k)clienteKeys.add(k)});
    const anteriores=pedidosBase.filter(p=>(p.data||'').slice(0,10)!==today).map(p=>p.clienteId||norm(p.telefone)||p.cliente).filter(Boolean);
    clienteKeys.forEach(k=>{if(anteriores.includes(k))recorrentes.add(k)});
    if(el('insClientesSprint'))el('insClientesSprint').innerHTML=`<div class="stats-grid compact-stats"><article class="stat"><span>Clientes hoje</span><strong>${clienteKeys.size}</strong></article><article class="stat"><span>Recorrentes</span><strong>${recorrentes.size}</strong></article></div><small class="muted">Recorrente = cliente com pedido anterior registrado.</small>`;

    function minutesBetween(a,b){const t1=new Date(a||0).getTime(),t2=new Date(b||0).getTime();return (t1&&t2&&t2>t1)?(t2-t1)/60000:0}
    const tempos=pedidosBase.map(p=>{const tl=p.timeline||[];const ini=tl[0]?.data||p.data;const fim=(tl.find(t=>t.status==='Entregue')||tl[tl.length-1]||{}).data||p.dataPagamento;return minutesBetween(ini,fim)}).filter(Boolean);
    const tempoMedio=tempos.length?tempos.reduce((a,b)=>a+b,0)/tempos.length:0;
    if(el('insTempoSprint'))el('insTempoSprint').innerHTML=`<div class="big-number">${tempoMedio?tempoMedio.toFixed(0)+' min':'—'}</div><p class="muted">tempo médio entre criação e entrega</p><div class="list-item compact"><strong>Pedidos medidos</strong><b>${tempos.length}</b></div>`;

    const diasSemana={};pedidosBase.forEach(p=>{const d=new Date(p.data||Date.now());const key=d.toLocaleDateString('pt-BR',{weekday:'long'});diasSemana[key]=diasSemana[key]||{qtd:0,total:0};diasSemana[key].qtd++;diasSemana[key].total+=Number(p.total||0)});
    const melhorDia=Object.entries(diasSemana).sort((a,b)=>b[1].total-a[1].total)[0];
    if(el('insTendenciaSprint'))el('insTendenciaSprint').innerHTML=melhorDia?`<div class="list-item compact"><div><strong>Dia mais forte</strong><br><small>${melhorDia[1].qtd} pedidos no histórico</small></div><b>${melhorDia[0]}</b></div><div class="list-item compact"><strong>Total histórico</strong><b>${fmt(melhorDia[1].total)}</b></div>`:'<p class="muted">As tendências aparecerão quando houver mais dias de venda.</p>';
    const recorde=Math.max(...Object.values(diasSemana).map(o=>o.total),0);
    const conquistas=[];
    if(faturamento && faturamento>=recorde)conquistas.push('🏆 Hoje está entre os melhores dias registrados.');
    if(meta && faturamento>=meta)conquistas.push('🎯 Meta diária atingida.');
    if(pedidosBase.length>=100)conquistas.push('🎉 Mais de 100 pedidos registrados no Donas OS.');
    if(el('insConquistasSprint'))el('insConquistasSprint').innerHTML=conquistas.length?conquistas.map(x=>`<div class="insight-item">${x}</div>`).join(''):'<p class="muted">Conquistas aparecerão conforme o histórico crescer.</p>';

    const compras=(db.compras||[]).slice().sort((a,b)=>(b.data||'').localeCompare(a.data||''));
    const porProduto={};compras.forEach(c=>{const k=(c.produto||'').toLowerCase().trim();if(!k)return;porProduto[k]=porProduto[k]||[];porProduto[k].push(c)});
    const cards=Object.values(porProduto).slice(0,8).map(list=>{list.sort((a,b)=>Number(a.custoUnitario||999999)-Number(b.custoUnitario||999999));const best=list[0];const last=list.slice().sort((a,b)=>(b.data||'').localeCompare(a.data||''))[0];const diff=last&&best?Number(last.custoUnitario||0)-Number(best.custoUnitario||0):0;return `<div class="list-item compact"><div><strong>${best.produto}</strong><br><small>Melhor: ${best.local||'sem local'} • ${fmt(best.custoUnitario)}/${best.unidade}</small><br><small>Última: ${last.local||'sem local'} • ${fmt(last.custoUnitario)}/${last.unidade}${diff>0?' • acima do melhor '+fmt(diff):''}</small></div></div>`}).join('');
    el('insCompras').innerHTML=cards||'<p class="muted">Registre compras para comparar preços por mercado/local.</p>';
    const alertas=[];
    (db.itens||[]).filter(i=>Number(i.estoque||0)<=Number(i.minimo||0)).slice(0,6).forEach(i=>alertas.push(`⚠ ${i.nome} está abaixo do mínimo (${i.estoque} ${i.unidade})`));
    const topMolho=Object.entries(porCat.Molho||{}).sort((a,b)=>b[1]-a[1])[0];if(topMolho)alertas.push(`🍅 Molho campeão: ${topMolho[0]} (${topMolho[1]} porções).`);
    const topProteina=Object.entries(porCat['Proteína']||{}).sort((a,b)=>b[1]-a[1])[0];if(topProteina)alertas.push(`🥓 Proteína mais usada: ${topProteina[0]}. Planeje o estoque.`);
    if(meta>0)alertas.push(faturamento>=meta?`🎯 Meta diária batida: ${fmt(faturamento)} de ${fmt(meta)}.`:`🎯 Faltam ${fmt(Math.max(0,meta-faturamento))} para bater a meta diária.`);
    el('insAlertas').innerHTML=alertas.length?alertas.map(x=>`<div class="insight-item">${x}</div>`).join(''):'<p class="muted">Nenhum alerta no momento.</p>';
    const horas={};pedidosBase.forEach(p=>{const h=new Date(p.data||Date.now()).getHours();horas[h]=(horas[h]||0)+1});
    const harr=Object.entries(horas).sort((a,b)=>b[1]-a[1]).slice(0,8);const hmax=harr[0]?.[1]||1;
    el('insHorarios').innerHTML=harr.length?harr.map(([h,q])=>`<div class="ins-bar"><div><strong>${h}h</strong><span>${q} pedidos</span></div><b><i style="width:${Math.max(8,q/hmax*100)}%"></i></b></div>`).join(''):'<p class="muted">Os horários aparecerão após mais pedidos entregues.</p>';
    const lastByClient={};(db.pedidos||[]).forEach(p=>{const key=p.clienteId||norm(p.telefone)||p.cliente;if(!key)return;const d=p.data||'';if(!lastByClient[key]||d>lastByClient[key].data)lastByClient[key]={data:d,nome:p.cliente||'Cliente',telefone:p.telefone||''}});
    const agora=Date.now();const sumidos=Object.values(lastByClient).map(c=>({...c,dias:Math.floor((agora-new Date(c.data||agora).getTime())/86400000)})).filter(c=>c.dias>=20).sort((a,b)=>b.dias-a.dias).slice(0,8);
    el('insClientes').innerHTML=sumidos.length?sumidos.map(c=>`<div class="list-item compact"><div><strong>${c.nome}</strong><br><small>${c.telefone||''}</small></div><b>${c.dias} dias</b></div>`).join(''):'<p class="muted">Nenhum cliente sumido identificado ainda.</p>';
  }


  function filtroPeriodoData(){
    const p=val('relPeriodo')||'hoje';
    const now=new Date();
    if(p==='todos')return ()=>true;
    if(p==='hoje'){const h=hoje();return d=>(d||'').slice(0,10)===h;}
    const dias=Number(p||7);const ini=new Date(now.getFullYear(),now.getMonth(),now.getDate()-dias+1).getTime();
    return d=>new Date(d||0).getTime()>=ini;
  }
  function renderRelatorios(){
    if(!el('relFaturamento'))return;
    const inRange=filtroPeriodoData();
    const pedidos=(db.pedidos||[]).filter(p=>(p.financeiroLancado||p.status==='Entregue')&&inRange(p.data));
    const faturamento=pedidos.reduce((a,p)=>a+Number(p.total||0),0);
    const custo=pedidos.reduce((a,p)=>a+Number(p.custo||0),0);
    el('relFaturamento').textContent=fmt(faturamento);
    el('relPedidos').textContent=pedidos.length;
    el('relTicket').textContent=fmt(pedidos.length?faturamento/pedidos.length:0);
    el('relLucro').textContent=fmt(faturamento-custo);

    const pagamentos={};pedidos.forEach(p=>{const k=p.pagamento||p.pagamentoPrevisto||'Não informado';pagamentos[k]=(pagamentos[k]||0)+Number(p.total||0)});
    el('relPagamentos').innerHTML=Object.entries(pagamentos).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="list-item compact"><strong>${k}</strong><b>${fmt(v)}</b></div>`).join('')||'<p class="muted">Nenhum pagamento no período.</p>';

    const consumo={};pedidos.forEach(p=>(p.itens||[]).forEach(i=>{consumo[i.nome]=consumo[i.nome]||{qtd:0,unidade:i.unidade||'un',categoria:i.categoria||''};consumo[i.nome].qtd+=Number(i.qtdUsada||1)}));
    el('relConsumo').innerHTML=Object.entries(consumo).sort((a,b)=>b[1].qtd-a[1].qtd).slice(0,15).map(([n,o])=>`<div class="list-item compact"><div><strong>${n}</strong><br><small>${o.categoria}</small></div><b>${Number(o.qtd).toFixed(o.qtd%1?1:0)} ${o.unidade}</b></div>`).join('')||'<p class="muted">Nenhum consumo registrado.</p>';

    const clientes={};pedidos.forEach(p=>{const k=p.cliente||'Cliente balcão';clientes[k]=clientes[k]||{qtd:0,total:0,tel:p.telefone||''};clientes[k].qtd+=1;clientes[k].total+=Number(p.total||0)});
    el('relClientes').innerHTML=Object.entries(clientes).sort((a,b)=>b[1].total-a[1].total).slice(0,12).map(([n,o])=>`<div class="list-item compact"><div><strong>${n}</strong><br><small>${o.tel||''} • ${o.qtd} pedido(s)</small></div><b>${fmt(o.total)}</b></div>`).join('')||'<p class="muted">Nenhum cliente no período.</p>';

    const compras=(db.compras||[]).filter(c=>inRange(c.data||c.createdAt));
    const totalCompras=compras.reduce((a,c)=>a+Number(c.valor||c.valorTotal||0),0);
    const porCompra={};compras.forEach(c=>{const k=c.produto||'Sem nome';porCompra[k]=porCompra[k]||{qtd:0,total:0,unidade:c.unidade||'un'};porCompra[k].qtd+=Number(c.qtd||0);porCompra[k].total+=Number(c.valor||c.valorTotal||0)});
    el('relCompras').innerHTML=`<div class="list-item compact"><strong>Total comprado</strong><b>${fmt(totalCompras)}</b></div>`+(Object.entries(porCompra).sort((a,b)=>b[1].total-a[1].total).slice(0,10).map(([n,o])=>`<div class="list-item compact"><div><strong>${n}</strong><br><small>${Number(o.qtd).toFixed(o.qtd%1?1:0)} ${o.unidade}</small></div><b>${fmt(o.total)}</b></div>`).join('')||'<p class="muted">Sem compras no período.</p>');

    const dias={};pedidos.forEach(p=>{const d=(p.data||'').slice(0,10);dias[d]=dias[d]||{qtd:0,total:0};dias[d].qtd++;dias[d].total+=Number(p.total||0)});
    const darr=Object.entries(dias).sort((a,b)=>a[0].localeCompare(b[0]));const max=darr.reduce((m,[,o])=>Math.max(m,o.total),1);
    el('relDias').innerHTML=darr.map(([d,o])=>`<div class="ins-bar"><div><strong>${new Date(d+'T12:00:00').toLocaleDateString('pt-BR')}</strong><span>${o.qtd} pedidos • ${fmt(o.total)}</span></div><b><i style="width:${Math.max(6,o.total/max*100)}%"></i></b></div>`).join('')||'<p class="muted">Sem vendas no período.</p>';

    const abertos=(db.pedidos||[]).filter(p=>!p.financeiroLancado&&p.status!=='Entregue').length;
    const cancelados=(db.logs||[]).filter(l=>(l.acao||'').toLowerCase().includes('exclu')).length;
    const producoes=(db.producoes||[]).filter(p=>inRange(p.data)).length;
    el('relOperacional').innerHTML=`<div class="list-item compact"><strong>Pedidos em aberto</strong><b>${abertos}</b></div><div class="list-item compact"><strong>Produções registradas</strong><b>${producoes}</b></div><div class="list-item compact"><strong>Exclusões registradas em logs</strong><b>${cancelados}</b></div><div class="list-item compact"><strong>Margem estimada</strong><b>${faturamento?((faturamento-custo)/faturamento*100).toFixed(1):0}%</b></div>`;
  }


  function imprimirRelatorio(){
    renderRelatorios();
    const inRange=filtroPeriodoData();
    const periodoSel=el('relPeriodo');
    const periodoTexto=periodoSel ? periodoSel.options[periodoSel.selectedIndex].text : 'Período atual';
    const pedidos=(db.pedidos||[]).filter(p=>(p.financeiroLancado||p.status==='Entregue')&&inRange(p.data));
    const faturamento=pedidos.reduce((a,p)=>a+Number(p.total||0),0);
    const custo=pedidos.reduce((a,p)=>a+Number(p.custo||0),0);
    const lucro=faturamento-custo;
    const pagamentos={};pedidos.forEach(p=>{const k=p.pagamento||p.pagamentoPrevisto||'Não informado';pagamentos[k]=(pagamentos[k]||0)+Number(p.total||0)});
    const consumo={};pedidos.forEach(p=>(p.itens||[]).forEach(i=>{consumo[i.nome]=consumo[i.nome]||{qtd:0,unidade:i.unidade||'un',categoria:i.categoria||''};consumo[i.nome].qtd+=Number(i.qtdUsada||1)}));
    const clientes={};pedidos.forEach(p=>{const k=p.cliente||'Cliente balcão';clientes[k]=clientes[k]||{qtd:0,total:0,tel:p.telefone||''};clientes[k].qtd+=1;clientes[k].total+=Number(p.total||0)});
    const compras=(db.compras||[]).filter(c=>inRange(c.data||c.createdAt));
    const totalCompras=compras.reduce((a,c)=>a+Number(c.valor||c.valorTotal||0),0);
    const porCompra={};compras.forEach(c=>{const k=c.produto||'Sem nome';porCompra[k]=porCompra[k]||{qtd:0,total:0,unidade:c.unidade||'un',locais:{}};porCompra[k].qtd+=Number(c.qtd||0);porCompra[k].total+=Number(c.valor||c.valorTotal||0);if(c.local)porCompra[k].locais[c.local]=(porCompra[k].locais[c.local]||0)+1});
    const dias={};pedidos.forEach(p=>{const d=(p.data||'').slice(0,10);dias[d]=dias[d]||{qtd:0,total:0};dias[d].qtd++;dias[d].total+=Number(p.total||0)});
    const abertos=(db.pedidos||[]).filter(p=>!p.financeiroLancado&&p.status!=='Entregue').length;
    const producoes=(db.producoes||[]).filter(p=>inRange(p.data)).length;
    const line=(arr,empty)=>arr.length?arr.join(''): `<tr><td colspan="3" class="muted-cell">${empty}</td></tr>`;
    const moneyRows=Object.entries(pagamentos).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${k}</td><td></td><td class="right">${fmt(v)}</td></tr>`);
    const consumoRows=Object.entries(consumo).sort((a,b)=>b[1].qtd-a[1].qtd).slice(0,25).map(([n,o])=>`<tr><td>${n}</td><td>${o.categoria||'-'}</td><td class="right">${Number(o.qtd).toFixed(o.qtd%1?1:0)} ${o.unidade}</td></tr>`);
    const clienteRows=Object.entries(clientes).sort((a,b)=>b[1].total-a[1].total).slice(0,25).map(([n,o])=>`<tr><td>${n}<br><small>${o.tel||''}</small></td><td class="right">${o.qtd}</td><td class="right">${fmt(o.total)}</td></tr>`);
    const compraRows=Object.entries(porCompra).sort((a,b)=>b[1].total-a[1].total).slice(0,25).map(([n,o])=>`<tr><td>${n}<br><small>${Object.keys(o.locais).slice(0,3).join(', ')||'-'}</small></td><td class="right">${Number(o.qtd).toFixed(o.qtd%1?1:0)} ${o.unidade}</td><td class="right">${fmt(o.total)}</td></tr>`);
    const diaRows=Object.entries(dias).sort((a,b)=>a[0].localeCompare(b[0])).map(([d,o])=>`<tr><td>${new Date(d+'T12:00:00').toLocaleDateString('pt-BR')}</td><td class="right">${o.qtd}</td><td class="right">${fmt(o.total)}</td></tr>`);
    el('modalContent').innerHTML=`
      <div class="print-report">
        <header class="print-head">
          <div>
            <h2>${db.config.nomeEmpresa||'Donas da Massa'}</h2>
            <p>Relatório gerencial • ${periodoTexto}</p>
          </div>
          <strong>${new Date().toLocaleDateString('pt-BR')}</strong>
        </header>
        <section class="print-kpis">
          <div><span>Faturamento</span><b>${fmt(faturamento)}</b></div>
          <div><span>Pedidos</span><b>${pedidos.length}</b></div>
          <div><span>Ticket médio</span><b>${fmt(pedidos.length?faturamento/pedidos.length:0)}</b></div>
          <div><span>Lucro estimado</span><b>${fmt(lucro)}</b></div>
        </section>
        <section class="print-grid two">
          <div><h3>Formas de pagamento</h3><table><tbody>${line(moneyRows,'Nenhum pagamento no período.')}</tbody></table></div>
          <div><h3>Resumo operacional</h3><table><tbody>
            <tr><td>Pedidos em aberto</td><td></td><td class="right">${abertos}</td></tr>
            <tr><td>Produções registradas</td><td></td><td class="right">${producoes}</td></tr>
            <tr><td>Margem estimada</td><td></td><td class="right">${faturamento?(lucro/faturamento*100).toFixed(1):0}%</td></tr>
            <tr><td>Total comprado</td><td></td><td class="right">${fmt(totalCompras)}</td></tr>
          </tbody></table></div>
        </section>
        <section><h3>Itens mais consumidos</h3><table><thead><tr><th>Item</th><th>Categoria</th><th class="right">Consumo</th></tr></thead><tbody>${line(consumoRows,'Nenhum consumo registrado.')}</tbody></table></section>
        <section><h3>Vendas por dia</h3><table><thead><tr><th>Data</th><th class="right">Pedidos</th><th class="right">Total</th></tr></thead><tbody>${line(diaRows,'Sem vendas no período.')}</tbody></table></section>
        <section class="print-grid two">
          <div><h3>Clientes do período</h3><table><thead><tr><th>Cliente</th><th class="right">Pedidos</th><th class="right">Total</th></tr></thead><tbody>${line(clienteRows,'Nenhum cliente no período.')}</tbody></table></div>
          <div><h3>Compras do período</h3><table><thead><tr><th>Produto / local</th><th class="right">Qtd</th><th class="right">Total</th></tr></thead><tbody>${line(compraRows,'Sem compras no período.')}</tbody></table></div>
        </section>
        <footer>Gerado pelo Donas OS • ${new Date().toLocaleString('pt-BR')}</footer>
        <div class="print-actions"><button class="primary" onclick="window.print()">Imprimir / salvar PDF</button><button class="secondary" onclick="App.fecharModal()">Fechar</button></div>
      </div>`;
    el('modal').classList.remove('hidden');
  }



  function supabaseHeaders(extra={}){return {'apikey':SUPABASE_KEY(),'Authorization':'Bearer '+SUPABASE_KEY(),'Content-Type':'application/json',...extra}}
  function supabaseAtivo(){return !!SUPABASE_KEY() && !!SUPABASE_REST()}
  async function supabaseRequest(path,opts={}){
    if(!supabaseAtivo())throw new Error('Supabase não configurado');
    const res=await fetch(SUPABASE_REST()+path,{...opts,headers:{...supabaseHeaders(opts.headers||{})}});
    const txt=await res.text();
    if(!res.ok)throw new Error(txt||('Erro Supabase '+res.status));
    try{return txt?JSON.parse(txt):null}catch(e){return txt}
  }
  async function supabaseGetLoja(){
    db.sync=db.sync||{modo:'online',status:'supabase beta',fila:[],lastSync:'',supabaseUrl:SUPABASE_DEFAULT_URL,supabaseAnonKey:SUPABASE_DEFAULT_KEY,lojaAberta:false,horarioModo:'manual',horarios:{sex:{ativo:true,inicio:'18:00',fim:'23:00'},sab:{ativo:true,inicio:'18:00',fim:'23:00'},dom:{ativo:true,inicio:'18:00',fim:'22:00'}}};
    if(supabaseLojaId)return supabaseLojaId;
    const lojas=await supabaseRequest('/lojas?select=*&limit=1');
    let loja=Array.isArray(lojas)?lojas[0]:null;
    if(!loja){
      const criada=await supabaseRequest('/lojas?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({nome:db.config.nome||'Donas da Massa',slogan:db.config.slogan||'Seu macarrão. Seu jeito.'})});
      loja=criada?.[0];
    }
    if(loja){
      supabaseLojaId=loja.id;
      if(loja.nome)db.config.nome=loja.nome;
      if(loja.slogan)db.config.slogan=loja.slogan;
      if(loja.whatsapp!==null&&loja.whatsapp!==undefined)db.config.whatsapp=loja.whatsapp||db.config.whatsapp||'';
      if(loja.instagram!==null&&loja.instagram!==undefined)db.config.instagram=loja.instagram||db.config.instagram||'';
      if(loja.pix!==null&&loja.pix!==undefined)db.config.pix=loja.pix||db.config.pix||'';
      if(loja.loja_aberta!==undefined)db.sync.lojaAberta=!!loja.loja_aberta;
    }
    return supabaseLojaId;
  }
  async function supabaseSalvarLoja(){
    try{
      const loja_id=await supabaseGetLoja(); if(!loja_id)return;
      await supabaseRequest('/lojas?id=eq.'+encodeURIComponent(loja_id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({nome:db.config.nome||'Donas da Massa',slogan:db.config.slogan||'Seu macarrão. Seu jeito.',whatsapp:db.config.whatsapp||'',instagram:db.config.instagram||'',pix:db.config.pix||'',loja_aberta:!!db.sync.lojaAberta})});
      db.sync.status='online';db.sync.lastSync=new Date().toISOString();Data.save(db);
    }catch(e){console.warn('Supabase loja:',e);db.sync.status='erro ao salvar loja'}
  }
  function mapPedidoSupabase(row,itens=[],cliente=null){
    const data=row.criado_em||row.created_at||new Date().toISOString();
    const numero=(row.codigo||'').split('-').pop()||String((db.pedidos||[]).length+1).padStart(4,'0');
    const mappedItens=(itens||[]).map(i=>({id:i.id,nome:i.nome,tipo:i.tipo,categoria:i.tipo,quantidade:i.quantidade,qtdUsada:Number(i.quantidade||1),unidade:'un',preco:Number(i.preco||0),valorCobrado:Number(i.preco||0)}));
    return {id:'sb_'+row.id,supabase_id:row.id,onlineId:row.codigo||row.id,numero,cliente:cliente?.nome||row.cliente_nome||'Cliente online',telefone:cliente?.telefone||row.cliente_telefone||'',tipo:row.tipo_entrega==='delivery'?'Delivery':'Balcão',pagamento:'',pagamentoPrevisto:row.forma_pagamento||'PIX',talher:row.talher?'Sim':'Não',obs:row.observacao||'',endereco:cliente?.endereco||'',bairro:cliente?.bairro||'',clienteId:cliente?.id||'',pratos:[{id:'pr_'+row.id,nome:'Pedido online',itens:mappedItens,total:Number(row.valor_total||0),custo:0}],itens:mappedItens,total:Number(row.valor_total||0),custo:0,lucro:Number(row.valor_total||0),status:({aguardando_confirmacao:'Aguardando confirmação',pedido_feito:'Pedido Feito',preparando:'Preparando',pedido_pronto:'Pedido Pronto',entregue:'Entregue'}[row.status]||row.status||'Aguardando confirmação'),financeiroLancado:row.status==='entregue',estoqueBaixado:false,origem:'supabase',data,timeline:[{status:'Importado do Supabase',data}],syncStatus:'sincronizado'};
  }
  async function supabaseCarregarPedidos(){
    if(supabaseBusy)return; supabaseBusy=true;
    try{
      await supabaseGetLoja();
      const rows=await supabaseRequest('/pedidos?select=*&order=criado_em.desc&limit=80');
      const ids=(rows||[]).map(r=>r.id);
      let itens=[];let clientes=[];
      if(ids.length){
        itens=await supabaseRequest('/pedido_itens?select=*&pedido_id=in.('+ids.join(',')+')');
        const cids=[...new Set((rows||[]).map(r=>r.cliente_id).filter(Boolean))];
        if(cids.length)clientes=await supabaseRequest('/clientes?select=*&id=in.('+cids.join(',')+')');
      }
      let novos=0;
      (rows||[]).forEach(r=>{
        if((db.pedidos||[]).some(p=>p.supabase_id===r.id||p.onlineId===r.codigo))return;
        const pi=itens.filter(i=>i.pedido_id===r.id);
        const cli=clientes.find(c=>c.id===r.cliente_id)||null;
        db.pedidos.unshift(mapPedidoSupabase(r,pi,cli));novos++;
      });
      if(novos){db.pedidos.sort((a,b)=>new Date(b.data||0)-new Date(a.data||0));Data.save(db);renderAll();toast(novos+' pedido(s) online recebido(s)');}
      db.sync.status='online';db.sync.lastSync=new Date().toISOString();Data.save(db);
    }catch(e){console.warn('Supabase pedidos:',e);db.sync.status='erro: '+String(e.message||e).slice(0,90);Data.save(db)}
    finally{supabaseBusy=false;supabaseLastLoad=Date.now()}
  }
  async function supabaseSalvarClientePedido(p){
    await supabaseGetLoja();
    const tel=norm(p.telefone||'');
    let existente=null;
    if(tel){
      try{const found=await supabaseRequest('/clientes?select=*&telefone=eq.'+encodeURIComponent(tel)+'&limit=1');existente=found?.[0]||null;}catch(e){}
    }
    const payload={loja_id:supabaseLojaId,nome:p.cliente||'Cliente',telefone:tel,endereco:p.endereco||'',bairro:p.bairro||'',observacao:p.obs||''};
    if(existente){await supabaseRequest('/clientes?id=eq.'+encodeURIComponent(existente.id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify(payload)});return existente.id;}
    const created=await supabaseRequest('/clientes?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)});
    return created?.[0]?.id||null;
  }
  function statusParaSupabase(st){return {'Aguardando confirmação':'aguardando_confirmacao','Pedido Feito':'pedido_feito','Preparando':'preparando','Pedido Pronto':'pedido_pronto','Entregue':'entregue'}[st]||'aguardando_confirmacao'}
  async function supabaseEnviarPedido(p){
    try{
      const loja_id=await supabaseGetLoja();
      const cliente_id=await supabaseSalvarClientePedido(p);
      const codigo=p.onlineId||('DM-'+hoje().replace(/-/g,'')+'-'+(p.numero||uid()));
      const payload={loja_id,cliente_id,codigo,tipo_entrega:(p.tipo==='Delivery'?'delivery':'retirada'),status:statusParaSupabase(p.status||'Aguardando confirmação'),forma_pagamento:p.pagamentoPrevisto||'PIX',talher:(p.talher==='Sim'||p.talher===true),observacao:p.obs||'',valor_total:Number(p.total||0)};
      const created=await supabaseRequest('/pedidos?select=*',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)});
      const row=created?.[0]; if(!row)throw new Error('Pedido sem retorno do Supabase');
      p.supabase_id=row.id;p.onlineId=row.codigo;p.syncStatus='sincronizado';
      const itens=(p.itens||[]).map(i=>({pedido_id:row.id,tipo:i.categoria||i.tipo||'Item',nome:i.nome,quantidade:Number(i.qtdUsada||i.quantidade||1),preco:Number(i.valorCobrado??i.preco??0),observacao:''}));
      if(itens.length)await supabaseRequest('/pedido_itens',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(itens)});
      db.sync.status='online';db.sync.lastSync=new Date().toISOString();Data.save(db);
      return true;
    }catch(e){console.warn('Erro ao enviar pedido Supabase:',e);p.syncStatus='erro';p.syncErro=String(e.message||e);db.sync.status='erro ao enviar pedido';Data.save(db);return false;}
  }
  async function supabaseAtualizarPedido(p){
    if(!p?.supabase_id)return;
    try{await supabaseRequest('/pedidos?id=eq.'+encodeURIComponent(p.supabase_id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({status:statusParaSupabase(p.status),forma_pagamento:p.pagamento||p.pagamentoPrevisto||'PIX',valor_total:Number(p.total||0)})});}catch(e){console.warn('Update pedido Supabase:',e)}
  }
  async function supabaseInicializar(){
    try{await supabaseGetLoja();await supabaseCarregarPedidos();setInterval(()=>{if(!isPublicClient())supabaseCarregarPedidos()},8000);}catch(e){console.warn('Supabase init:',e)}
  }

  function renderOnlineReady(){
    if(!el('onlineStatus'))return;
    const sync=db.sync||{modo:'local',status:'offline',fila:[]};
    const loja=horarioAtualLoja();
    const contagens={pedidos:(db.pedidos||[]).length,clientes:(db.clientes||[]).length,itens:(db.itens||[]).length,compras:(db.compras||[]).length,receitas:(db.receitas||[]).length,producoes:(db.producoes||[]).length};
    const total=Object.values(contagens).reduce((a,b)=>a+b,0);
    const comId=['pedidos','clientes','itens','compras','receitas','producoes'].reduce((acc,k)=>acc+(db[k]||[]).filter(x=>x.onlineId).length,0);
    el('onlineStatus').innerHTML=`<div class="db-box"><strong>Modo atual:</strong> ${sync.modo==='online'?'Online/Supabase':'Local/offline'}<br><strong>Status:</strong> ${sync.status||'offline'}<br><strong>Loja online:</strong> ${loja.aberta?'Aberta':'Fechada'}<br><strong>Registros preparados:</strong> ${comId}/${total}</div>`;
    el('onlineContagens').innerHTML=Object.entries(contagens).map(([k,v])=>`<div class="list-item compact"><strong>${k[0].toUpperCase()+k.slice(1)}</strong><b>${v}</b></div>`).join('');
    el('onlineChecklist').innerHTML=[
      ['IDs universais',comId===total],['Camada de dados isolada',true],['Backups compatíveis',true],['Modo Local/Online configurável',true],['Chave Supabase cadastrável',!!sync.supabaseUrl&&!!sync.supabaseAnonKey],['Loja aberta/fechada',true],['Fila de sincronização futura',true]
    ].map(([t,ok])=>`<div class="list-item compact"><span>${ok?'✅':'⬜'} ${t}</span></div>`).join('');
    if(el('syncModo'))el('syncModo').value=sync.modo||'local';
    if(el('syncLojaAberta'))el('syncLojaAberta').checked=!!sync.lojaAberta;if(el('syncHorarioModo'))el('syncHorarioModo').value=sync.horarioModo||'manual';['sex','sab','dom'].forEach(k=>{const h=(sync.horarios||{})[k]||{};const cap=k.charAt(0).toUpperCase()+k.slice(1);if(el('hor'+cap+'Ativo'))el('hor'+cap+'Ativo').checked=!!h.ativo;if(el('hor'+cap+'Ini'))el('hor'+cap+'Ini').value=h.inicio||'';if(el('hor'+cap+'Fim'))el('hor'+cap+'Fim').value=h.fim||'';});
    if(el('syncSupabaseUrl'))el('syncSupabaseUrl').value=sync.supabaseUrl||'';
    if(el('syncSupabaseKey'))el('syncSupabaseKey').value=sync.supabaseAnonKey||'';
  }
  function salvarOnlineReady(){
    db.sync=db.sync||{};
    db.sync.modo=val('syncModo')||'local';
    db.sync.lojaAberta=!!el('syncLojaAberta')?.checked;db.sync.horarioModo=val('syncHorarioModo')||'manual';db.sync.horarios={sex:{ativo:!!el('horSexAtivo')?.checked,inicio:val('horSexIni')||'18:00',fim:val('horSexFim')||'23:00'},sab:{ativo:!!el('horSabAtivo')?.checked,inicio:val('horSabIni')||'18:00',fim:val('horSabFim')||'23:00'},dom:{ativo:!!el('horDomAtivo')?.checked,inicio:val('horDomIni')||'18:00',fim:val('horDomFim')||'22:00'}};
    db.sync.supabaseUrl=val('syncSupabaseUrl').trim();
    db.sync.supabaseAnonKey=val('syncSupabaseKey').trim();
    db.sync.status=db.sync.modo==='online'?'preparado':'offline';
    db.sync.updatedAt=new Date().toISOString();
    log('Configuração online atualizada',db.sync.modo+' • loja '+(db.sync.lojaAberta?'aberta':'fechada'));
    save();supabaseSalvarLoja();toast('Configuração Online Ready salva');
  }
  function prepararIdsOnline(){
    ['pedidos','clientes','itens','compras','receitas','producoes'].forEach(k=>{(db[k]||[]).forEach(x=>{if(!x.onlineId)x.onlineId=onlineId(k.slice(0,4).toUpperCase());x.updatedAt=x.updatedAt||new Date().toISOString();x.syncStatus=x.syncStatus||'local';});});
    log('IDs online verificados','Registros preparados para futura sincronização');
    save();toast('IDs universais verificados');
  }


  function portalSelectedItems(){const sel=Object.keys(portalPedido.itens||{}).filter(id=>portalPedido.itens[id]).map(id=>{const it=db.itens.find(i=>i.id===id);if(!it)return null;const qtd=normalizarQtd(it,portalPedido.qtd[id]||defaultQtd(it));return {...it,qtdUsada:qtd,porcao:Number(it.porcao||1)};}).filter(Boolean);return applyPrices(sel)}
  function portalCurrentPrato(){const itens=portalSelectedItems();if(!itens.length)return null;const total=itens.reduce((a,i)=>a+Number(i.valorCobrado||0),0);const custo=itens.reduce((a,i)=>a+Number(i.custoCalculado||0),0);const temBase=itens.some(i=>['Massa','Molho','Proteína','Complemento','Finalização'].includes(i.categoria));return {id:uid(),nome:temBase?'Prato '+(portalPratos.length+1):'Itens avulsos',itens,total,custo};}
  function limparSelecaoExclusivaPortal(categoria,idNovo){
    if(!['Massa','Molho'].includes(categoria))return;
    (db.itens||[]).filter(i=>i.categoria===categoria&&i.id!==idNovo).forEach(i=>{delete portalPedido.itens[i.id];delete portalPedido.qtd[i.id];});
  }
  function portalPedidoCompleto(){const atual=portalCurrentPrato();return [...portalPratos,...(atual?[atual]:[])];}
  function portalFlattenItens(pratos){return (pratos||[]).flatMap(pr=>pr.itens||[])}
  function adicionarPratoPortal(){if(!horarioAtualLoja().aberta)return toast('Loja online está fechada.');const prato=portalCurrentPrato();if(!prato)return toast('Selecione itens para adicionar ao pedido.');portalPratos.push({...prato,nome:'Prato '+(portalPratos.length+1)});portalPedido={itens:{},qtd:{}};renderPortalCliente();toast('Prato adicionado ao carrinho. Você pode montar outro.');}
  function removerPratoPortal(id){portalPratos=portalPratos.filter(p=>p.id!==id);portalPratos=portalPratos.map((p,i)=>({...p,nome:p.nome.startsWith('Prato')?'Prato '+(i+1):p.nome}));renderPortalCliente();toast('Prato removido do pedido.');}
  function itensVisiveisPortal(){
    const cats=['Massa','Molho','Proteína','Complemento','Finalização','Bebida','Sobremesa'];
    const grupos=cats.map(cat=>({cat,itens:(db.itens||[]).filter(i=>i.categoria===cat&&i.ativo!==false)})).filter(g=>g.itens.length);
    return grupos;
  }
  function portalCategoryId(cat){return 'portalCat'+String(cat||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]/g,'')}
  function scrollPortalTo(id){
    const target=el(id); if(!target)return;
    target.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function scrollPortalToCategory(cat){
    const target=el(portalCategoryId(cat));
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    else { scrollPortalTo('portalItens'); toast((cat||'Categoria')+' ainda não disponível no cardápio.'); }
  }
  function renderPortalMarketing(){
    const box=el('portalMarketing');if(!box)return;
    const campanhas=campanhasAtivas('portal');
    if(!campanhas.length){box.innerHTML='';return;}
    const banner=campanhas.find(m=>(m.posicao||'').toLowerCase().includes('banner'))||campanhas[0];
    const vitrine=campanhas.filter(m=>m.id!==banner.id && !((m.posicao||'').toLowerCase().includes('rodapé'))).slice(0,4);
    const altura=Math.max(120,Math.min(620,Number(banner.alturaBanner||260)));
    const apenasImagem=(banner.modoBanner==='imagem'&&banner.imagem);
    const bannerHtml=apenasImagem
      ? `<div class="portal-hero-campaign image-only" style="--banner-h:${altura}px">${banner.imagem?`<img src="${banner.imagem}" alt="${banner.titulo||'Campanha'}">`:''}</div>`
      : `<div class="portal-hero-campaign" style="--banner-h:${altura}px">${banner.imagem?`<img src="${banner.imagem}" alt="${banner.titulo||'Campanha'}">`:''}<div><span class="pill">${banner.tipo||'Campanha'}</span><h3>${banner.titulo||''}</h3><p>${banner.descricao||''}</p>${banner.link?`<a href="${banner.link}" target="_blank">${banner.botao||'Saiba mais'}</a>`:''}</div></div>`;
    box.innerHTML=bannerHtml+(vitrine.length?`<div class="card portal-campaigns"><h3>Novidades, promoções e parceiros</h3><div class="campaign-grid">${vitrine.map(m=>`<div class="campaign-card">${m.imagem?`<img src="${m.imagem}" alt="${m.titulo||'Campanha'}">`:''}<div><span class="pill">${m.tipo||'Campanha'}</span><strong>${m.titulo||''}</strong><small>${m.descricao||''}</small>${m.link?`<a href="${m.link}" target="_blank">${m.botao||'Saiba mais'}</a>`:''}</div></div>`).join('')}</div></div>`:'');
  }

  function renderAvisoLojaFechada(aberta){
    let box=el('portalClosedNotice');
    const frame=document.querySelector('.online-phone-frame');
    if(!frame)return;
    if(!box){
      box=document.createElement('div');
      box.id='portalClosedNotice';
      box.className='portal-closed-notice hidden';
      frame.prepend(box);
    }
    if(aberta){box.classList.add('hidden');box.innerHTML='';return;}
    const w=norm(db.config.whatsapp||'');
    const insta=(db.config.instagram||'').trim().replace(/^@/,'');
    const contatos=[
      w?`<a href="https://wa.me/55${w}" target="_blank">📲 Fale conosco pelo WhatsApp</a>`:'',
      insta?`<a href="https://instagram.com/${insta}" target="_blank">📷 Acompanhe nosso Instagram</a>`:''
    ].filter(Boolean).join('');
    box.classList.remove('hidden');
    box.innerHTML=`<div class="portal-closed-card"><button class="portal-closed-close" onclick="document.getElementById('portalClosedNotice')?.classList.add('hidden')">×</button><strong>🍝 No momento estamos fechados</strong><p>Nosso cardápio continua disponível para consulta.<br>Assim que abrirmos, você poderá realizar seu pedido por aqui.</p>${contatos?`<div class="portal-closed-links">${contatos}</div>`:''}</div>`;
  }

  function renderPortalCliente(){
    const status=el('portalLojaStatus');if(!status)return;
    const loja=horarioAtualLoja();
    const aberta=loja.aberta;
    status.className='online-store-status '+(aberta?'open':'closed');
    status.innerHTML=aberta?'🟢 Loja aberta':'🔴 Loja fechada';
    renderAvisoLojaFechada(aberta);
    if(el('onlineTempoPreparo'))el('onlineTempoPreparo').textContent='Preparo médio: '+Number(db.config.tempoPreparo||20)+' min';
    if(el('onlineWelcomeText'))el('onlineWelcomeText').textContent=aberta?'Veja o cardápio sem cadastro. Para pedir, monte seu prato e confirme seus dados no final.':'Estamos fechados para novos pedidos, mas você pode conhecer o cardápio e planejar seu próximo macarrão.';
    if(el('portalTelefoneFinal')&&val('portalTelefoneFinal')!==val('portalTelefone'))el('portalTelefoneFinal').value=val('portalTelefone');
    el('portalEnderecoBox')?.classList.toggle('hidden',val('portalTipo')!=='Delivery');
    if(val('portalTipo')!=='Delivery'&&el('portalConfirmaEndereco'))el('portalConfirmaEndereco').checked=false;
    renderPortalMarketing();
    const grupos=itensVisiveisPortal();
    const hasCat=cat=>grupos.some(g=>g.cat===cat&&g.itens.length);
    el('onlineBebidasBtn')?.classList.toggle('hidden',!hasCat('Bebida'));
    el('onlineSobremesasBtn')?.classList.toggle('hidden',!hasCat('Sobremesa'));
    const box=el('portalItens');
    if(box){
      if(!grupos.length){
        box.innerHTML='<div class="empty-summary">Nenhum item disponível no cardápio. Cadastre itens ativos em Estoque nas categorias Massa, Molho, Proteína, Complemento, Finalização, Bebida ou Sobremesa.</div>';
      }else{
        box.innerHTML=grupos.map(({cat,itens})=>`<section class="portal-cat" id="${portalCategoryId(cat)}"><h4>${iconeCat(cat)} ${cat}</h4><div class="portal-grid">${itens.map(i=>{const sel=!!portalPedido.itens[i.id];const semEstoque=Number(i.estoque||0)<=0;const step=unidadeInteira(i)?'1':'0.1';const min=unidadeInteira(i)?'1':'0.1';const qtd=portalPedido.qtd[i.id]||defaultQtd(i);return `<button class="option compact-option ${sel?'selected':''} ${semEstoque?'disabled-option':''}" ${semEstoque?'disabled':''} onclick="App.togglePortalItem('${i.id}')"><div class="icon small-icon">${i.imagem?`<img src="${i.imagem}" alt="${i.nome}">`:(i.icone||iconeCat(cat))}</div><strong>${i.nome}</strong><span>${semEstoque?'Esgotado':fmt(i.preco)}</span>${semEstoque?'<small class="stock-mini alert-text">Sem estoque. Escolha outro item.</small>':''}${sel&&!semEstoque?`<label class="qty-inline" onclick="event.stopPropagation()">No prato <input type="number" min="${min}" step="${step}" value="${qtd}" onchange="App.setPortalQtd('${i.id}',this.value)"> ${i.unidade||'un'}</label>`:''}</button>`}).join('')}</div></section>`).join('')
      }
    }
    const current=aberta?portalCurrentPrato():null;const pratos=portalPedidoCompleto();const entrega=(val('portalTipo')==='Delivery'?Number(db.config.taxaEntrega||0):0);const total=pratos.reduce((a,p)=>a+Number(p.total||0),0)+entrega;
    const resumo=el('portalResumo');if(resumo){if(!aberta){resumo.className='summary empty-summary';const w=norm(db.config.whatsapp||'');const insta=(db.config.instagram||'').trim().replace(/^@/,'');const contatos=[w?`<a class="inline-link" href="https://wa.me/55${w}" target="_blank">📲 Fale conosco pelo WhatsApp</a>`:'',insta?`<a class="inline-link" href="https://instagram.com/${insta}" target="_blank">📷 Acompanhe nosso Instagram</a>`:''].filter(Boolean).join('<br>');resumo.innerHTML='<strong>🍝 No momento estamos fechados</strong><br><br>Nosso cardápio continua disponível para consulta.<br>Assim que abrirmos, você poderá realizar seu pedido por aqui.'+(contatos?'<br><br>'+contatos:'')}else if(!pratos.length){resumo.className='summary empty-summary';resumo.textContent='Selecione itens para simular o pedido do cliente'}else{resumo.className='summary';resumo.innerHTML=pratos.map((pr,idx)=>`<div class="summary-block"><div class="summary-item"><strong>${pr.nome}${idx===portalPratos.length&&current?' (em montagem)':''}</strong>${idx<portalPratos.length?`<button class="mini danger" onclick="App.removerPratoPortal('${pr.id}')">Remover</button>`:''}</div>${(pr.itens||[]).map(i=>`<div class="summary-item"><div><strong>${i.nome}</strong><br><small>${i.categoria} • ${i.qtdUsada} ${i.unidade||'un'}${(i.categoria==='Complemento'||i.categoria==='Proteína')?` • ${i.porcoesGratis||0} grátis / ${i.porcoesPagas||0} paga(s)`:''}</small></div><span class="${i.valorCobrado===0?'discount':''}">${i.valorCobrado===0?'Grátis':fmt(i.valorCobrado)}</span></div>`).join('')}<div class="summary-item"><small>Subtotal</small><strong>${fmt(pr.total||0)}</strong></div></div>`).join('')+(entrega?`<div class="summary-item"><strong>Entrega</strong><strong>${fmt(entrega)}</strong></div>`:'')+`<div class="summary-item total-line"><strong>Total previsto</strong><strong>${fmt(total)}</strong></div>`}}
    renderOnlineFloatingCart(pratos,total,aberta,current);
  }
  function renderOnlineFloatingCart(pratos,total,aberta,current){const bar=el('onlineFloatingCart');if(!bar)return;const qtd=(pratos||[]).length;if(!aberta||!qtd){bar.classList.add('hidden');bar.innerHTML='';return;}const finalizados=portalPratos.length;const emMontagem=current?1:0;const label=qtd===1?'1 item no pedido':`${qtd} itens no pedido`;const detalhe=[finalizados?`${finalizados} salvo(s) no carrinho`:null,emMontagem?'1 em montagem':null].filter(Boolean).join(' • ')||'Revise antes de finalizar';bar.classList.remove('hidden');bar.innerHTML=`<div><strong>🛒 ${label} • ${fmt(total)}</strong><small>${detalhe}</small></div><button onclick="App.scrollPortalTo('portalCheckout')">Finalizar</button>`;}
  function togglePortalItem(id){if(!horarioAtualLoja().aberta)return toast('Loja online está fechada.');const it=db.itens.find(i=>i.id===id);if(!it)return;if(Number(it.estoque||0)<=0)return toast('Este item está sem estoque. Escolha outro.');const vaiSelecionar=!portalPedido.itens[id];if(vaiSelecionar)limparSelecaoExclusivaPortal(it.categoria,id);portalPedido.itens[id]=vaiSelecionar;if(portalPedido.itens[id]&&!portalPedido.qtd[id])portalPedido.qtd[id]=defaultQtd(it||{});if(!portalPedido.itens[id])delete portalPedido.qtd[id];const selecionado=portalPedido.itens[id];renderPortalCliente();if(selecionado){toast((it.categoria==='Massa'||it.categoria==='Molho')?it.nome+' selecionado para o prato':it.nome+' adicionado ao prato');setTimeout(()=>{const btn=[...document.querySelectorAll('.compact-option')].find(b=>b.textContent.includes(it.nome));if(btn){btn.classList.add('just-added');setTimeout(()=>btn.classList.remove('just-added'),700)}},40)}}
  function setPortalQtd(id,v){const it=db.itens.find(i=>i.id===id);if(!it)return;portalPedido.qtd[id]=normalizarQtd(it,v);renderPortalCliente()}
  function telefoneCombina(a,b){const A=norm(a),B=norm(b);if(!A||!B)return false;if(A===B)return true;if(A.length>=8&&B.endsWith(A))return true;if(B.length>=8&&A.endsWith(B))return true;return false}
  function portalTelefoneValor(){return norm(val('portalTelefoneFinal')||val('portalTelefone'))}
  function setPortalTelefone(v){if(el('portalTelefone'))el('portalTelefone').value=v||'';if(el('portalTelefoneFinal'))el('portalTelefoneFinal').value=v||''}
  function sincronizarTelefonePortal(origem){const v=(origem==='final'?val('portalTelefoneFinal'):val('portalTelefone'));setPortalTelefone(v);buscarClientePortal(false)}
  function irParaCheckoutPortal(){scrollPortalTo('portalCheckout');setTimeout(()=>{const f=el('portalTelefoneFinal')||el('portalTelefone')||el('portalCliente');if(f)f.focus();},220)}
  function pedidosDoCliente(c){if(!c)return [];return (db.pedidos||[]).filter(p=>telefoneCombina(p.telefone,c.telefone)||((p.cliente||'').toLowerCase()===(c.nome||'').toLowerCase())).sort((a,b)=>new Date(b.data)-new Date(a.data))}
  function formatarUltimoPedido(p){if(!p)return '';const itens=(p.itens||[]).slice(0,5).map(i=>i.nome).join(', ');return `<div class="last-order"><strong>Último pedido #${p.numero}</strong><br><small>${itens||'sem itens'} • ${fmt(p.total||0)}</small><br><button class="mini secondary" onclick="App.repetirUltimoPedidoPortal('${p.id}')">Repetir último pedido</button></div>`}
  function buscarClientePortal(showToast=false){const tel=portalTelefoneValor();const box=el('portalClienteStatus');if(!box)return;if(tel.length<8){portalClienteIdentificado=null;box.className='portal-welcome muted';box.innerHTML='Informe o telefone para buscar cadastro, histórico e último pedido.';return null}const c=(db.clientes||[]).find(x=>telefoneCombina(tel,x.telefone));if(!c){portalClienteIdentificado=null;box.className='portal-welcome warn-box';box.innerHTML='Não encontramos seu cadastro. Você pode continuar olhando o cardápio; ao pedir, preencherá os dados obrigatórios.';if(showToast)toast('Cliente não encontrado. Continue como novo cliente.');return null}portalClienteIdentificado=c;if(el('portalCliente'))el('portalCliente').value=c.nome||'';setPortalTelefone(c.telefone||tel);if(el('portalEndereco')&&(c.endereco||''))el('portalEndereco').value=c.endereco||'';const ult=pedidosDoCliente(c)[0];box.className='portal-welcome ok-box';box.innerHTML=`<strong>Bem-vindo de volta, ${c.nome}!</strong><br><small>Dados preenchidos automaticamente. Se for delivery, confirme o endereço antes de enviar o pedido.</small>${formatarUltimoPedido(ult)}`;if(showToast)toast('Cliente localizado');renderPortalCliente();return c}
  function repetirUltimoPedidoPortal(id){const p=(db.pedidos||[]).find(x=>x.id===id);if(!p)return;portalPedido={itens:{},qtd:{}};portalPratos=[];const pratosFonte=(p.pratos&&p.pratos.length)?p.pratos:[{nome:'Prato 1',itens:p.itens||[]}];pratosFonte.forEach((pr,idx)=>{const itens=(pr.itens||[]).filter(i=>db.itens.find(x=>x.id===i.id));if(!itens.length)return;const precificados=applyPrices(itens.map(i=>{const base=db.itens.find(x=>x.id===i.id)||i;return {...base,qtdUsada:Number(i.qtdUsada||i.qtd||i.quantidadeUsada||1),porcao:Number(i.porcao||base.porcao||1)}}));portalPratos.push({id:uid(),nome:pr.nome||('Prato '+(idx+1)),itens:precificados,total:precificados.reduce((a,i)=>a+Number(i.valorCobrado||0),0),custo:precificados.reduce((a,i)=>a+Number(i.custoCalculado||0),0)});});renderPortalCliente();toast('Último pedido carregado no portal')}

  function limparPortalCliente(){portalPedido={itens:{},qtd:{}};portalPratos=[];portalClienteIdentificado=null;['portalCliente','portalTelefone','portalTelefoneFinal','portalEndereco','portalBairro','portalObs'].forEach(id=>{const x=el(id);if(x)x.value=''});if(el('portalConfirmaEndereco'))el('portalConfirmaEndereco').checked=false;if(el('portalClienteStatus')){el('portalClienteStatus').className='portal-welcome muted';el('portalClienteStatus').innerHTML='Informe o telefone para buscar cadastro, histórico e último pedido.'}if(el('portalTipo'))el('portalTipo').value='Retirada';if(el('portalPagamento'))el('portalPagamento').value='PIX';if(el('portalTalher'))el('portalTalher').value='Não';if(el('portalWhatsapp'))el('portalWhatsapp').textContent='Nenhum pedido externo criado ainda.';renderPortalCliente();toast('Portal limpo')}
  function mensagemWhatsPedido(p,itens,total){
    const linhas=[
      'Olá, Donas da Massa! Fiz um pedido pelo cardápio online.',
      '',
      `Pedido #${p.numero}`,
      `Cliente: ${p.cliente||''}`,
      `Telefone: ${p.telefone||''}`,
      `Tipo: ${p.tipo||''}`
    ];
    if(p.talher)linhas.push(`Talher: ${p.talher}`);
    if((p.tipo||'')==='Delivery' && p.endereco)linhas.push(`Endereço: ${p.endereco} - ${p.bairro||''}`);
    linhas.push('', 'Itens:');
    const pratosMsg=(p.pratos&&p.pratos.length)?p.pratos:[{nome:'Pedido',itens}];
    pratosMsg.forEach((pr,idx)=>{linhas.push(`${pr.nome||('Prato '+(idx+1))}:`);(pr.itens||[]).forEach(i=>linhas.push(`- ${i.nome} ${i.qtdUsada} ${i.unidade||'un'}${(i.categoria==='Complemento'||i.categoria==='Proteína')?` (${i.porcoesGratis||0} grátis / ${i.porcoesPagas||0} paga)`:''}`));});
    linhas.push('', `Total previsto: ${fmt(total)}`, `Pagamento previsto: ${p.pagamentoPrevisto||'A combinar'}`, '', 'Aguardando confirmação.');
    return linhas.join('\n');
  }
  function whatsappUrl(msg){const loja=norm(db.config.whatsapp||'');return loja?`https://wa.me/55${loja}?text=${encodeURIComponent(msg)}`:`https://wa.me/?text=${encodeURIComponent(msg)}`}
  function copiarTexto(txt){navigator.clipboard?.writeText(txt).then(()=>toast('Mensagem copiada')).catch(()=>toast('Não foi possível copiar automaticamente'))}
  function validarDadosPortal(){
    const telefone=portalTelefoneValor();
    const cliente=val('portalCliente').trim();
    const tipo=val('portalTipo')||'Retirada';
    const endereco=val('portalEndereco').trim();
    const bairro=val('portalBairro').trim();
    if(telefone.length<10 || telefone.length>13){(el('portalTelefoneFinal')||el('portalTelefone'))?.focus();return 'Informe um WhatsApp válido com DDD.'}
    if(cliente.length<3){el('portalCliente')?.focus();return 'Informe o nome do cliente.'}
    if(tipo==='Delivery'){
      if(endereco.length<8 || !/\d/.test(endereco)){el('portalEndereco')?.focus();return 'Para delivery, informe endereço completo com número e complemento se houver.'}
      if(bairro.length<2){el('portalBairro')?.focus();return 'Para delivery, informe o bairro.'}
      if(!el('portalConfirmaEndereco')?.checked){el('portalConfirmaEndereco')?.focus();return 'Confirme o endereço de entrega deste pedido.'}
    }
    return '';
  }
  async function criarPedidoPortal(){
    if(!horarioAtualLoja().aberta)return toast('No momento estamos fechados para novos pedidos. O cardápio segue disponível para consulta.');
    const erro=validarDadosPortal();if(erro)return toast(erro);
    const pratos=portalPedidoCompleto();if(!pratos.length)return toast('Selecione ao menos um item no portal');
    const itens=portalFlattenItens(pratos);
    const cliente=val('portalCliente').trim();const telefone=portalTelefoneValor();const tipo=val('portalTipo')||'Retirada';const talher=val('portalTalher')||'Não';
    const entrega=tipo==='Delivery'?Number(db.config.taxaEntrega||0):0;const total=pratos.reduce((a,pr)=>a+Number(pr.total||0),0)+entrega;const custo=pratos.reduce((a,pr)=>a+Number(pr.custo||0),0);
    const numero=String(db.pedidos.length+1).padStart(4,'0');
    const p={id:uid(),onlineId:onlineId('PED'),numero,cliente,telefone,tipo:tipo==='Retirada'?'Balcão':tipo,pagamento:'',pagamentoPrevisto:val('portalPagamento')||'PIX',talher,obs:val('portalObs'),endereco:val('portalEndereco').trim(),bairro:val('portalBairro').trim(),clienteId:portalClienteIdentificado?.id||'',pratos:pratos.map((pr,idx)=>({...pr,nome:pr.nome||('Prato '+(idx+1))})),itens,total,custo,lucro:total-custo,status:'Aguardando confirmação',financeiroLancado:false,estoqueBaixado:false,origem:'portal-local',data:new Date().toISOString(),timeline:[{status:'Aguardando confirmação',data:new Date().toISOString()}],syncStatus:'local'};
    db.pedidos.unshift(p);salvarClienteAutomatico(p);log('Pedido externo recebido','#'+p.numero+' • aguardando confirmação');save();
    const enviadoSupabase=await supabaseEnviarPedido(p);
    if(enviadoSupabase){log('Pedido sincronizado no Supabase','#'+p.numero);}
    const msg=mensagemWhatsPedido(p,itens,total);
    const whats=whatsappUrl(msg);
    window._ultimaMensagemPortal=msg;
    el('portalWhatsapp').innerHTML=`<strong>Pedido #${p.numero} criado.</strong><br><br><div class="whatsapp-actions"><a class="primary inline-link" href="${whats}" target="_blank">Abrir WhatsApp da loja</a><button class="secondary" onclick="App.copiarMensagemPortal()">Copiar mensagem</button></div><pre class="whatsapp-preview">${msg.replace(/</g,'&lt;')}</pre><small>Envie a mensagem pelo WhatsApp para confirmar pagamento e preparo.</small>`;
    portalPedido={itens:{},qtd:{}};portalPratos=[];renderPortalCliente();
    setTimeout(()=>{scrollPortalTo('portalWhatsapp');try{window.open(whats,'_blank')}catch(e){}},180);
    toast('Pedido criado. Abrindo WhatsApp...')
  }
  function copiarMensagemPortal(){copiarTexto(window._ultimaMensagemPortal||'')}
  function confirmarPedidoPortal(id){const p=db.pedidos.find(x=>x.id===id);if(!p)return;for(const i of (p.itens||[])){const item=db.itens.find(x=>x.id===i.id);if(!item||Number(item.estoque||0)<Number(i.qtdUsada||1))return toast('Estoque insuficiente: '+i.nome)}if(!p.estoqueBaixado){baixarEstoque(p.itens||[]);p.estoqueBaixado=true}p.status='Pedido Feito';p.timeline=p.timeline||[];p.timeline.push({status:'Pedido Feito',data:new Date().toISOString(),detalhes:'Pedido externo confirmado'});log('Pedido externo confirmado','#'+p.numero);save();supabaseAtualizarPedido(p);toast('Pedido confirmado e enviado para preparo')}

  function renderAll(){renderSelects();renderFavoritos();renderSteps();renderResumo();renderListas();renderDashboard();renderConfig();renderInsights();renderRelatorios();renderOnlineReady();renderPortalCliente();renderOperacao()}
  function init(){try{const q=new URLSearchParams(location.search);if(!q.has('admin')&&!String(location.hash||'').includes('admin'))document.body.classList.add('public-client');else document.body.classList.add('admin-mode');}catch(e){document.body.classList.add('public-client')}document.querySelectorAll('.nav button').forEach(b=>b.addEventListener('click',()=>page(b.dataset.page)));['clientePedido','tipoPedido','pagamentoPedido','obsPedido','enderecoPedido','bairroPedido'].forEach(id=>{if(el(id))el(id).addEventListener('input',renderResumo)});
    if(el('producaoQtd')) el('producaoQtd').addEventListener('input',()=>{renderProducao();});
    if(el('producaoReceita')) el('producaoReceita').addEventListener('change',()=>{renderProducao();});if(el('telefonePedido')){el('telefonePedido').addEventListener('input',()=>{renderResumo();buscarClientesPedido()})}if(el('portalTelefone')){el('portalTelefone').addEventListener('input',()=>sincronizarTelefonePortal('top'));el('portalTelefone').addEventListener('change',()=>buscarClientePortal(false))}if(el('portalTelefoneFinal')){el('portalTelefoneFinal').addEventListener('input',()=>sincronizarTelefonePortal('final'));el('portalTelefoneFinal').addEventListener('change',()=>buscarClientePortal(false))}if(el('compraData')&&!el('compraData').value)el('compraData').value=hoje();renderAll();aplicarModoOperacao();const last=localStorage.getItem(KEY+'_last_page');if(isPublicClient())page('portal');else if(last&&el('page-'+last))page(last);supabaseInicializar()}
  return{init,page,renderAll,toggleItem,setQtdItem,adicionarPratoPedido,removerPratoPedido,finalizarPedido,limparPedido,atualizarStatus,confirmarPagamento,excluirPedido,confirmarExcluirPedido,escolherIcone,salvarItem,editarItem,limparFormItem,removerItem,salvarCliente,editarCliente,limparCliente,removerCliente,salvarMovimentacao,removerMovimentacao,salvarConfig,verPedido,fecharModal,exportarBackup,importarBackup,buscarClientesPedido,selecionarClientePedido,carregarImagemMarketing,salvarMarketing,editarMarketing,limparMarketing,removerMarketing,salvarFavoritoPedido,alternarModoOperacao,adicionarMural,concluirMural,removerMural,fecharCaixa,registrarFechamento,restaurarUltimoSeguro,limparLogs,salvarCompra,editarCompra,limparCompra,removerCompra,adicionarInsumoReceita,removerInsumoReceita,salvarReceita,editarReceita,removerReceita,limparReceita,registrarProducao,renderProducao,renderRelatorios,imprimirRelatorio,salvarOnlineReady,prepararIdsOnline,usarFavorito,removerFavorito,abrirEditarDadosPedido,salvarDadosPedido,editarPedido,renderPortalCliente,scrollPortalTo,scrollPortalToCategory,irParaCheckoutPortal,sincronizarTelefonePortal,togglePortalItem,setPortalQtd,adicionarPratoPortal,removerPratoPortal,limparPortalCliente,criarPedidoPortal,copiarMensagemPortal,confirmarPedidoPortal,buscarClientePortal,repetirUltimoPedidoPortal}
})();
document.addEventListener('DOMContentLoaded',App.init);
