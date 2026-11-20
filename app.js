'use strict';
(() => {
  const WA = '5521997838067';
  const OFERTA_URL = 'https://xpafmvjlwgmhmvhfsqrg.supabase.co/functions/v1/api/oferta';
  document.documentElement.classList.add('js');
  const $ = (id) => document.getElementById(id);
  const SVGNS = 'http://www.w3.org/2000/svg';
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const waLink = (txt) => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(txt);
  const svg = (tag, attrs, pai) => {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (pai) pai.appendChild(el);
    return el;
  };

  /* ---------- links do WhatsApp com mensagem pronta ---------- */
  document.querySelectorAll('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa); });
  $('ano').textContent = String(new Date().getFullYear());

  /* ---------- menu ---------- */
  const menuBtn = $('menu-btn'), menu = $('menu');
  const fechaMenu = () => { menu.classList.remove('aberto'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Abrir menu'); };
  menuBtn.addEventListener('click', () => {
    const abre = !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', abre);
    menuBtn.setAttribute('aria-expanded', String(abre));
    menuBtn.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', fechaMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechaMenu(); });
  const topo = $('topo');
  const marcaTopo = () => topo.classList.toggle('rolou', window.scrollY > 8);
  window.addEventListener('scroll', marcaTopo, { passive: true }); marcaTopo();

  /* ---------- revelar ao rolar ---------- */
  if ('IntersectionObserver' in window && !reduz) {
    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    const mapa = document.querySelector('.mapa');
    const iom = new IntersectionObserver((ents) => ents.forEach((e) => mapa.classList.toggle('ativo', e.isIntersecting)));
    iom.observe(mapa);
  } else {
    document.querySelectorAll('.rv').forEach((el) => el.classList.add('vis'));
  }

  /* ---------- simulador ---------- */
  const COMODOS = [
    { id: 'garagem', nome: 'Garagem', x: 20, y: 20, w: 170, h: 170 },
    { id: 'sala', nome: 'Sala', x: 190, y: 20, w: 250, h: 200 },
    { id: 'cozinha', nome: 'Cozinha', x: 440, y: 20, w: 140, h: 200 },
    { id: 'externa', nome: 'Área externa', x: 20, y: 190, w: 170, h: 190 },
    { id: 'quarto', nome: 'Quarto', x: 190, y: 220, w: 200, h: 160 },
    { id: 'escritorio', nome: 'Escritório', x: 390, y: 220, w: 190, h: 160 }
  ];
  // b = [conforto, segurança, praticidade, controle, tempo]
  const RECURSOS = [
    { id: 'luz', nome: 'Iluminação inteligente', curto: 'Luzes', g: 'Automação', c: 'sala', x: 260, y: 90, b: [3, 1, 2, 2, 2], efeito: 'luz', dica: 'Luzes que acendem sozinhas ao anoitecer e criam clima com um toque.' },
    { id: 'cortina', nome: 'Cortinas motorizadas', curto: 'Cortinas', g: 'Automação', c: 'quarto', x: 240, y: 345, b: [3, 0, 2, 1, 2], dica: 'Cortinas que abrem com o sol e fecham na hora de dormir.' },
    { id: 'clima', nome: 'Climatização', curto: 'Ar', g: 'Automação', c: 'quarto', x: 340, y: 260, b: [3, 0, 2, 2, 1], efeito: 'frio', dica: 'O quarto já fresquinho quando você chega.' },
    { id: 'voz', nome: 'Assistente de voz', curto: 'Voz', g: 'Automação', c: 'cozinha', x: 510, y: 80, b: [2, 0, 3, 2, 2], dica: '“Alexa, boa noite”: e a casa inteira se prepara.' },
    { id: 'portao', nome: 'Portão automático', curto: 'Portão', g: 'Automação', c: 'garagem', x: 60, y: 60, b: [2, 2, 3, 2, 2], dica: 'O portão abre quando o seu carro chega.' },
    { id: 'cameras', nome: 'Câmeras', curto: 'Câmeras', g: 'Segurança', c: 'externa', x: 60, y: 230, b: [0, 3, 1, 3, 1], dica: 'Imagens ao vivo e gravações no celular, de onde estiver.' },
    { id: 'alarme', nome: 'Alarme e sensores', curto: 'Alarme', g: 'Segurança', c: 'sala', x: 400, y: 60, b: [0, 3, 1, 2, 1], dica: 'Sensores avisam no celular na hora em que algo acontece.' },
    { id: 'fechadura', nome: 'Fechadura digital', curto: 'Fechadura', g: 'Segurança', c: 'sala', x: 215, y: 190, b: [1, 2, 3, 3, 2], dica: 'Senha, digital ou celular. Libere a diarista sem entregar chave.' },
    { id: 'acesso', nome: 'Controle de acesso', curto: 'Interfone', g: 'Segurança', c: 'externa', x: 140, y: 340, b: [1, 3, 2, 3, 1], dica: 'Atenda o interfone pelo celular e veja quem está no portão.' },
    { id: 'rede', nome: 'Cabeamento estruturado', curto: 'Rede', g: 'Conectividade', c: 'escritorio', x: 540, y: 340, b: [1, 1, 1, 2, 1], dica: 'Infraestrutura organizada, estável e pronta para crescer.' },
    { id: 'wifi', nome: 'Wi-Fi profissional', curto: 'Wi-Fi', g: 'Conectividade', c: 'escritorio', x: 470, y: 280, b: [2, 1, 2, 2, 2], dica: 'Sinal forte em todos os cômodos, sem pontos cegos.' },
    { id: 'som', nome: 'Sonorização ambiente', curto: 'Som', g: 'Conectividade', c: 'sala', x: 330, y: 160, b: [3, 0, 1, 1, 0], dica: 'Música em cada ambiente, controlada pelo celular.' },
    { id: 'rastreador', nome: 'Rastreador veicular', curto: 'Rastreador', g: 'Veículo', c: 'garagem', x: 130, y: 130, b: [1, 3, 1, 3, 1], dica: 'Veja onde o carro está e bloqueie pelo app.' }
  ];
  const BENEF = ['Conforto', 'Segurança', 'Praticidade', 'Controle', 'Tempo'];
  const HUB = { x: 390, y: 220 };
  const ativos = new Set();
  const gC = $('comodos'), gF = $('fios'), gN = $('nos');
  const elComodo = {}, elNo = {}, elFio = {}, elBtn = {};

  COMODOS.forEach((c) => {
    const g = svg('g', { class: 'comodo' }, gC);
    svg('rect', { x: c.x, y: c.y, width: c.w, height: c.h, rx: 6 }, g);
    const t = svg('text', { x: c.x + 12, y: c.y + 22 }, g); t.textContent = c.nome;
    elComodo[c.id] = g;
  });
  RECURSOS.forEach((r) => {
    const f = svg('path', { class: 'fio', d: `M${HUB.x} ${HUB.y} L${r.x} ${r.y}`, visibility: 'hidden' }, gF);
    elFio[r.id] = f;
    const g = svg('g', { class: 'no', transform: `translate(${r.x} ${r.y})` }, gN);
    svg('circle', { class: 'h', r: 9 }, g);
    svg('circle', { class: 'n', r: 9 }, g);
    const t = svg('text', { y: 24, 'text-anchor': 'middle' }, g); t.textContent = r.curto;
    elNo[r.id] = g;
  });

  const grupos = {};
  RECURSOS.forEach((r) => { (grupos[r.g] = grupos[r.g] || []).push(r); });
  const opcoes = $('sim-opcoes');
  Object.keys(grupos).forEach((nome) => {
    const div = document.createElement('div'); div.className = 'grupo';
    const h = document.createElement('h3'); h.textContent = nome.toUpperCase(); div.appendChild(h);
    const box = document.createElement('div'); box.className = 'opts';
    grupos[nome].forEach((r) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'opt'; b.textContent = r.nome; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => alterna(r.id));
      box.appendChild(b); elBtn[r.id] = b;
    });
    div.appendChild(box); opcoes.appendChild(div);
  });

  const med = $('medidores');
  const tit = document.createElement('div'); tit.className = 'med-tit'; tit.textContent = 'SEU GANHO NO DIA A DIA'; med.appendChild(tit);
  const barras = BENEF.map((n) => {
    const l = document.createElement('div'); l.className = 'med';
    const s = document.createElement('span'); s.textContent = n;
    const bar = document.createElement('div'); bar.className = 'bar';
    const i = document.createElement('i'); bar.appendChild(i);
    const v = document.createElement('b'); v.textContent = '0';
    l.append(s, bar, v); med.appendChild(l);
    return { i, v };
  });
  const MAX = [0, 1, 2, 3, 4].map((k) => RECURSOS.reduce((s, r) => s + r.b[k], 0));
  const simWa = $('sim-wa'), dica = $('sim-dica');

  function atualiza(ultimo) {
    RECURSOS.forEach((r) => {
      const on = ativos.has(r.id);
      elNo[r.id].classList.toggle('on', on);
      elFio[r.id].setAttribute('visibility', on ? 'visible' : 'hidden');
      elBtn[r.id].setAttribute('aria-pressed', String(on));
    });
    COMODOS.forEach((c) => elComodo[c.id].classList.remove('luz', 'frio'));
    RECURSOS.forEach((r) => { if (ativos.has(r.id) && r.efeito) elComodo[r.c].classList.add(r.efeito); });
    if (ativos.has('luz')) ['sala', 'cozinha', 'escritorio'].forEach((c) => elComodo[c].classList.add('luz'));
    barras.forEach((b, k) => {
      let s = 0; ativos.forEach((id) => { s += RECURSOS.find((r) => r.id === id).b[k]; });
      const pct = Math.round(Math.min(100, (s / MAX[k]) * 160));
      b.i.style.width = pct + '%'; b.v.textContent = String(pct);
    });
    if (ativos.size) {
      const itens = RECURSOS.filter((r) => ativos.has(r.id)).map((r) => '• ' + r.nome).join('\n');
      simWa.href = waLink('Olá, RJDOMÓTICA! Montei minha casa inteligente no site e quero um orçamento com:\n' + itens);
      simWa.removeAttribute('aria-disabled'); simWa.removeAttribute('tabindex');
    } else {
      simWa.href = waLink('Olá, RJDOMÓTICA! Quero um orçamento para automatizar minha casa.');
      simWa.setAttribute('aria-disabled', 'true'); simWa.setAttribute('tabindex', '-1');
    }
    if (ultimo) dica.textContent = ultimo.dica;
    else if (!ativos.size) dica.textContent = 'Escolha um recurso ao lado para começar.';
  }
  function alterna(id) {
    const r = RECURSOS.find((x) => x.id === id);
    if (ativos.has(id)) { ativos.delete(id); atualiza(null); } else { ativos.add(id); atualiza(r); }
  }
  $('sim-limpar').addEventListener('click', () => { ativos.clear(); atualiza(null); });
  atualiza(null);

  /* ---------- cenários ---------- */
  const CENARIOS = [
    { id: 'chegar', nome: 'Chegar em casa', hora: '18:42', passos: [
      ['Portão', 'O portão abre ao reconhecer o seu carro', 'Rastreador e portão conversam entre si.'],
      ['Alarme', 'O alarme desarma sozinho', 'Só quando é você chegando.'],
      ['Luzes', 'Garagem, entrada e sala acendem', 'Na intensidade certa para a hora.'],
      ['Clima', 'O ar já deixou a sala em 23 °C', 'Ligado 15 minutos antes, pelo trajeto.'],
      ['Som', 'Sua playlist começa baixinho', 'Bem-vindo de volta.']
    ] },
    { id: 'dormir', nome: 'Hora de dormir', hora: '23:10', passos: [
      ['Voz', '“Alexa, boa noite”', 'Um comando dispara a rotina inteira.'],
      ['Luzes', 'Todas as luzes se apagam', 'Fica só a luz de corredor bem fraca.'],
      ['Fechadura', 'Portas trancadas e portão conferido', 'Se algo ficou aberto, você é avisado.'],
      ['Alarme', 'Alarme ativado no modo noite', 'Sensores externos ligados, internos livres.'],
      ['Cortinas', 'As cortinas fecham e o ar vai para 22 °C', 'Sono sem interrupções.']
    ] },
    { id: 'viajar', nome: 'Viajar tranquilo', hora: '07:30', passos: [
      ['Modo viagem', 'Ativado com um toque no celular', 'A casa entra em vigilância total.'],
      ['Simulação', 'Luzes acendem e apagam à noite', 'Parece que tem gente em casa.'],
      ['Câmeras', 'Imagens ao vivo onde você estiver', 'Com aviso de movimento no celular.'],
      ['Acesso', 'Libere o jardineiro pelo app', 'Senha temporária, só no horário combinado.'],
      ['Veículo', 'Carro na garagem, rastreado e bloqueado', 'Se ele se mover, você sabe na hora.']
    ] },
    { id: 'acordar', nome: 'Bom dia', hora: '06:45', passos: [
      ['Cortinas', 'As cortinas abrem devagar', 'Acordar com luz natural.'],
      ['Clima', 'O ar desliga e o quarto ventila', 'Economia de energia sem pensar nisso.'],
      ['Som', 'Notícias ou música na cozinha', 'Cada um no seu ambiente.'],
      ['Alarme', 'Alarme noturno desativado', 'A casa libera a circulação.'],
      ['Portão', 'Saindo de carro? O portão abre', 'E fecha atrás de você.']
    ] }
  ];
  const abas = $('cen-abas'), linha = $('cen-linha'), notifs = $('cel-notifs'), hora = $('cel-hora');
  let timers = [];
  function roda(cen) {
    timers.forEach(clearTimeout); timers = [];
    abas.querySelectorAll('.aba').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.id === cen.id)));
    linha.textContent = ''; notifs.textContent = ''; hora.textContent = cen.hora;
    const lis = cen.passos.map(([tag, tit, sub]) => {
      const li = document.createElement('li');
      const s = document.createElement('small'); s.textContent = tag.toUpperCase();
      const b = document.createElement('b'); b.textContent = tit;
      const sp = document.createElement('span'); sp.textContent = sub;
      li.append(s, b, sp); linha.appendChild(li);
      return li;
    });
    cen.passos.forEach(([tag, tit], i) => {
      const mostra = () => {
        lis[i].classList.add('vis');
        const n = document.createElement('div'); n.className = 'notif';
        const b = document.createElement('b'); b.textContent = 'RJDOMÓTICA · ' + tag.toUpperCase();
        n.append(b, document.createTextNode(tit));
        notifs.prepend(n);
        while (notifs.children.length > 4) notifs.lastChild.remove();
      };
      if (reduz) mostra(); else timers.push(setTimeout(mostra, 350 + i * 900));
    });
  }
  CENARIOS.forEach((cen, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'aba'; b.setAttribute('role', 'tab'); b.dataset.id = cen.id; b.textContent = cen.nome;
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.addEventListener('click', () => roda(cen));
    abas.appendChild(b);
  });
  if ('IntersectionObserver' in window) {
    let rodou = false;
    const ioc = new IntersectionObserver((ents) => {
      if (!rodou && ents[0].isIntersecting) { rodou = true; roda(CENARIOS[0]); ioc.disconnect(); }
    }, { threshold: 0.3 });
    ioc.observe($('cenarios'));
  } else roda(CENARIOS[0]);

  /* ---------- oferta do rastreador (rota pública, só leitura) ---------- */
  const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const num = (v) => (typeof v === 'number' && isFinite(v) && v > 0 && v < 100000 ? v : null);
  const ctrl = 'AbortController' in window ? new AbortController() : null;
  if (ctrl) setTimeout(() => ctrl.abort(), 6000);
  fetch(OFERTA_URL, { method: 'GET', mode: 'cors', credentials: 'omit', referrerPolicy: 'no-referrer', signal: ctrl ? ctrl.signal : undefined })
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      const o = j && j.oferta; if (!o) return;
      const promo = num(o.preco_promo), meses = num(o.meses_promo), inst = num(o.instalacao_promo), instCheia = num(o.instalacao_cheia);
      if (promo) $('of-mes').textContent = brl(promo);
      if (meses) $('of-meses').textContent = String(Math.round(meses));
      if (inst) $('of-inst').textContent = brl(inst);
      if (inst && instCheia && instCheia > inst) {
        const de = $('of-inst-de'); de.textContent = ' (em vez de ';
        const s = document.createElement('s'); s.textContent = brl(instCheia);
        de.append(s, document.createTextNode(')'));
      }
    })
    .catch(() => { /* mantém os valores padrão do HTML */ });

  /* ---------- orçamento pelo WhatsApp (nada é gravado no site) ---------- */
  const limpa = (s, max) => String(s || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
  $('form-orc').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.currentTarget, erro = $('o-erro');
    const nome = limpa(f.nome.value, 60);
    if (nome.length < 2) { erro.textContent = 'Digite seu nome para a gente saber com quem fala.'; f.nome.focus(); return; }
    erro.textContent = '';
    const bairro = limpa(f.bairro.value, 60);
    const tipo = limpa((f.querySelector('input[name=tipo]:checked') || {}).value, 20);
    const ints = [...f.querySelectorAll('input[name=int]:checked')].map((i) => i.value);
    const msg = limpa(f.msg.value, 500);
    let txt = 'Olá, RJDOMÓTICA! Meu nome é ' + nome + '.';
    if (bairro) txt += '\nBairro: ' + bairro;
    if (tipo) txt += '\nImóvel: ' + tipo;
    if (ints.length) txt += '\nTenho interesse em: ' + ints.join(', ');
    if (ativos.size) txt += '\nNo simulador escolhi: ' + RECURSOS.filter((r) => ativos.has(r.id)).map((r) => r.nome).join(', ');
    if (msg) txt += '\n' + msg;
    const a = document.createElement('a');
    a.href = waLink(txt); a.target = '_blank'; a.rel = 'noopener noreferrer';
    document.body.appendChild(a); a.click(); a.remove();
  });
})();
