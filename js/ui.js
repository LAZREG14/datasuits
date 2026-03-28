/* ================================================================
   ui.js — Rendu de l'interface (cards, grilles, dashboard…)
   ================================================================ */

/* ── ICÔNES SVG ── */
var IC = {
  dl:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  gh:     '<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor"/></svg>',
  heart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  eye:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  edit:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  pdf:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  user:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  cal:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
};

/* ── Helpers ── */
function getBadgeClass(name) { return BADGE_MAP[name] || 'b-python'; }
function badgesHTML(arr) { return (arr||[]).map(function(b) { return '<span class="badge '+getBadgeClass(b)+'">'+b+'</span>'; }).join(''); }
function getFormateur(id) { return FORMATEURS.find(function(f) { return f.id === id; }); }
function formateurName(id) { var f = getFormateur(id); return f ? f.prenom+' '+f.nom : '—'; }
function isFormateur() { return Store.user && Store.user.role === 'formateur'; }

function toast(msg, icon, dur) {
  icon = icon || 'check'; dur = dur || 2500;
  var c = document.getElementById('toasts'), t = document.createElement('div');
  t.className = 'toast';
  var cols = { check:'var(--emerald)', heart:'var(--pink)', trash:'var(--red)', dl:'var(--cyan)', shield:'var(--amber)', close:'var(--red)' };
  t.innerHTML = '<span style="color:'+(cols[icon]||'var(--cyan)')+'">'+IC[icon]+'</span>' + msg;
  c.appendChild(t);
  setTimeout(function() { t.classList.add('out'); setTimeout(function() { t.remove(); }, 300); }, dur);
}

function animateNumber(el, target) {
  var start = 0;
  var step = function(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / 900, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function revealCards(container) {
  requestAnimationFrame(function() {
    container.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('vis'); });
  });
}

/* ── Stats hero ── */
function computeStats() {
  var promos = new Set(Store.projects.map(function(p) { return p.promo; }));
  var allB = Store.projects.reduce(function(a,p) { return a.concat(p.badges||[]); }, [])
    .concat(Store.subjects.reduce(function(a,s) { return a.concat(s.badges||[]); }, []));
  var dispo = Store.subjects.filter(function(s) { return s.status === 'dispo'; }).length;
  return { pr: Store.projects.length, su: Store.subjects.length, pm: promos.size, tc: new Set(allB).size, fv: Store.favs.size, fm: FORMATEURS.length, dispo: dispo };
}

function renderStats() {
  var s = computeStats();
  var items = [
    { n: s.pr, l: 'Projets' }, { n: s.su, l: 'Sujets' }, { n: s.dispo, l: 'Disponibles' },
    { n: s.pm, l: 'Promos' }, { n: s.tc, l: 'Technos' }, { n: s.fm, l: 'Formateurs' }
  ];
  document.getElementById('statsBar').innerHTML = items.map(function(x) {
    return '<div class="st"><div class="st-n" data-t="'+x.n+'">0</div><div class="st-l">'+x.l+'</div></div>';
  }).join('');
  document.querySelectorAll('#statsBar .st-n').forEach(function(e) { animateNumber(e, +e.dataset.t); });
}

/* ── Formateurs ── */
function renderFormateurs() {
  document.getElementById('fmRow').innerHTML = FORMATEURS.map(function(f) {
    var cur = Store.user && Store.user.id === f.id;
    return '<div class="fm-card"'+(cur?' style="border-color:rgba(245,158,11,.3)"':'')+'>' +
      '<div class="fm-photo" style="background:'+f.color+'">' +
        '<img src="'+f.photo+'" alt="'+f.prenom+'" onerror="this.style.display=\'none\'"/>' +
        '<span class="fm-ini">'+f.prenom[0]+f.nom[0]+'</span>' +
        '<div class="fm-on '+(f.online?'y':'n')+'"></div>' +
      '</div>' +
      '<h4>'+f.prenom+' '+f.nom+'</h4>' +
      '<p class="fm-t">'+f.titre+'</p>' +
      '<div class="fm-sp">'+f.spec.split(', ').map(function(s) { return '<span class="fm-sp-t">'+s+'</span>'; }).join('')+'</div>' +
      (cur ? '<span class="fm-you">Connecté</span>' : '') +
    '</div>';
  }).join('');
}

/* ── Projets ── */
function renderProjects(data) {
  var g = document.getElementById('gridR'), e = document.getElementById('emptyR');
  if (!data.length) { g.innerHTML = ''; e.style.display = 'block'; return; }
  e.style.display = 'none';
  g.innerHTML = data.map(function(p, i) {
    var fv = Store.favs.has(p.id);
    var enc = getFormateur(p.enc);
    var en = enc ? enc.prenom+' '+enc.nom : '—';
    var ph = enc ? enc.photo : '';
    var sd = p.soutenance ? new Date(p.soutenance).toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'}) : '';
    return '<article class="card reveal" style="transition-delay:'+i*30+'ms">' +
      '<div class="card-top"><span class="card-promo">'+promoLabel(p.promo)+'</span>'+(sd?'<span class="card-sdate">'+IC.cal+' '+sd+'</span>':'')+'</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:4px">' +
        '<div class="card-student"><span class="av" style="background:linear-gradient(135deg,var(--violet),var(--cyan))">'+p.ini+'</span>'+p.student+'</div>' +
        '<div class="card-acts">' +
          '<button class="cib '+(fv?'fav':'')+'" onclick="toggleFavorite(\''+p.id+'\')">'+IC.heart+'</button>' +
          '<button class="cib card-admin" onclick="editProject(\''+p.id+'\')">'+IC.edit+'</button>' +
          '<button class="cib card-admin" onclick="deleteProject(\''+p.id+'\')" style="color:var(--red)">'+IC.trash+'</button>' +
        '</div>' +
      '</div>' +
      '<h3>'+p.title+'</h3>' +
      '<div class="card-enc">'+(ph?'<img src="'+ph+'" alt="">':'')+'Encadré par <strong style="margin-left:2px">'+en+'</strong></div>' +
      '<div class="badges">'+badgesHTML(p.badges)+'</div>' +
      '<div class="card-btns">' +
        '<a class="cb cb-gh" href="'+p.github+'" target="_blank">'+IC.gh+' GitHub</a>' +
        '<button class="cb cb-eye" onclick="showProjectDetail(\''+p.id+'\')">'+IC.eye+' Détails</button>' +
      '</div>' +
    '</article>';
  }).join('');
  revealCards(g);
}

/* ── Sujets ── */
function renderSubjects(data) {
  var g = document.getElementById('gridS'), e = document.getElementById('emptyS');
  if (!data.length) { g.innerHTML = ''; e.style.display = 'block'; return; }
  e.style.display = 'none';
  g.innerHTML = data.map(function(s, i) {
    var fv = Store.favs.has(s.id);
    var enc = getFormateur(s.enc);
    var en = enc ? enc.prenom+' '+enc.nom : '—';
    var ph = enc ? enc.photo : '';
    var isPris = s.status === 'pris';
    return '<article class="sc reveal" style="transition-delay:'+i*30+'ms">' +
      '<div class="sc-admin"><button class="cib" onclick="editSubject(\''+s.id+'\')">'+IC.edit+'</button><button class="cib" onclick="deleteSubject(\''+s.id+'\')" style="color:var(--red)">'+IC.trash+'</button></div>' +
      '<div class="sc-top"><span class="sc-id">'+s.id+'</span><span class="sc-status '+(isPris?'pris':'dispo')+'">'+(isPris?'Réservé':'Disponible')+'</span>' +
      '<button class="cib '+(fv?'fav':'')+'" onclick="toggleFavorite(\''+s.id+'\')" style="width:22px;height:22px;margin-left:auto">'+IC.heart+'</button></div>' +
      '<h3>'+s.title+'</h3><p>'+s.desc+'</p>' +
      '<div class="sc-enc">'+(ph?'<img src="'+ph+'" alt="">':'')+'Proposé par <strong style="margin-left:2px">'+en+'</strong></div>' +
      (isPris ? '<div class="sc-reserved">'+IC.user+' Réservé par <strong style="margin-left:2px">'+s.reserved_by+'</strong></div>' : '') +
      '<div class="diff"><span class="diff-l">Difficulté</span><div class="diff-d">'+[1,2,3].map(function(d){ return '<span class="dd '+(d<=s.diff?'on':'')+'"></span>'; }).join('')+'</div></div>' +
      '<div class="badges" style="margin-bottom:10px">'+badgesHTML(s.badges)+'</div>' +
      '<div class="sc-btns">' +
        (s.pdf_url ? '<a class="sc-btn sc-btn-pdf" href="'+s.pdf_url+'" target="_blank">'+IC.pdf+' PDF</a>' : '') +
        '<a class="sc-btn" href="'+s.data_url+'" target="_blank">'+IC.dl+' Dataset</a>' +
      '</div></article>';
  }).join('');
  revealCards(g);
}

/* ── Favoris ── */
function renderFavorites() {
  var g = document.getElementById('gridFav'), e = document.getElementById('emptyFav');
  var fp = Store.projects.filter(function(p) { return Store.favs.has(p.id); });
  var fs = Store.subjects.filter(function(s) { return Store.favs.has(s.id); });
  if (!fp.length && !fs.length) { g.innerHTML = ''; e.style.display = 'block'; return; }
  e.style.display = 'none';
  g.innerHTML = fp.map(function(p) {
    return '<article class="card reveal"><div class="card-top"><span class="card-promo">'+promoLabel(p.promo)+'</span><button class="cib fav" onclick="toggleFavorite(\''+p.id+'\')">'+IC.heart+'</button></div><h3>'+p.title+'</h3><div class="badges">'+badgesHTML(p.badges)+'</div><div class="card-btns"><a class="cb cb-gh" href="'+p.github+'" target="_blank">'+IC.gh+'</a></div></article>';
  }).join('') + fs.map(function(s) {
    return '<article class="sc reveal"><div class="sc-top"><span class="sc-id">'+s.id+'</span><button class="cib fav" onclick="toggleFavorite(\''+s.id+'\')" style="width:22px;height:22px;margin-left:auto">'+IC.heart+'</button></div><h3>'+s.title+'</h3><a class="sc-btn" href="'+s.data_url+'" target="_blank">'+IC.dl+' Dataset</a></article>';
  }).join('');
  revealCards(g);
  document.getElementById('favDot').classList.toggle('show', Store.favs.size > 0);
}

/* ── Programme ── */
function renderProgram() {
  document.getElementById('programList').innerHTML = PROGRAM.map(function(m) {
    return '<div class="program-item"><div class="program-num" style="background:'+m.color+'">'+m.n+'</div><div><h4>'+m.title+'</h4><p>'+m.desc+'</p></div></div>';
  }).join('');
}

/* ── Dashboard ── */
function renderDashboard() {
  var s = computeStats();
  var kpis = [
    { n: s.pr, l: 'Projets', c: 'var(--cyan)' }, { n: s.su, l: 'Sujets', c: 'var(--violet)' },
    { n: s.dispo, l: 'Disponibles', c: 'var(--emerald)' }, { n: s.pm, l: 'Promos', c: 'var(--blue)' },
    { n: s.fm, l: 'Formateurs', c: 'var(--amber)' }
  ];
  document.getElementById('dashKpis').innerHTML = kpis.map(function(k) {
    return '<div class="st"><div class="st-n" style="background:linear-gradient(135deg,'+k.c+',var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent" data-t="'+k.n+'">0</div><div class="st-l">'+k.l+'</div></div>';
  }).join('');
  document.querySelectorAll('#dashKpis .st-n').forEach(function(e) { animateNumber(e, +e.dataset.t); });

  // Tech bars
  var tc = {};
  Store.projects.concat(Store.subjects).forEach(function(x) { (x.badges||[]).forEach(function(b) { tc[b] = (tc[b]||0) + 1; }); });
  var sorted = Object.entries(tc).sort(function(a,b) { return b[1]-a[1]; }).slice(0,10);
  var mx = sorted[0] ? sorted[0][1] : 1;
  document.getElementById('techBars').innerHTML = sorted.map(function(e) {
    return '<div class="tr"><span class="tr-label" style="color:'+(BADGE_COLOR[e[0]]||'var(--cyan)')+'">'+e[0]+'</span><div class="tr-bg"><div class="tr-bar" style="width:'+Math.round(e[1]/mx*100)+'%;background:'+(BADGE_COLOR[e[0]]||'var(--cyan)')+'"></div></div><span class="tr-count">'+e[1]+'</span></div>';
  }).join('');

  // Promo bars
  var pc = {};
  Store.projects.forEach(function(p) { var l = promoLabel(p.promo); pc[l] = (pc[l]||0) + 1; });
  var ps = Object.entries(pc).sort();
  var mp = Math.max.apply(null, ps.map(function(x) { return x[1]; }));
  var cl = ['var(--cyan)','var(--violet)','var(--pink)','var(--blue)'];
  document.getElementById('promoBars').innerHTML = ps.map(function(e, i) {
    return '<div class="tr"><span class="tr-label" style="color:'+cl[i%4]+'">'+e[0].split(' (')[0]+'</span><div class="tr-bg"><div class="tr-bar" style="width:'+Math.round(e[1]/mp*100)+'%;background:'+cl[i%4]+'"></div></div><span class="tr-count">'+e[1]+'</span></div>';
  }).join('');

  // Activity
  document.getElementById('actFeed').innerHTML = Store.activity.slice(0,5).map(function(a) {
    return '<div class="act-item"><div class="act-icon" style="background:'+a.c+'15;color:'+a.c+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></div><span class="act-text">'+a.text+'</span><span class="act-time">'+a.time+'</span></div>';
  }).join('');

  // Subject stats
  var dp = Store.subjects.filter(function(s) { return s.status==='dispo'; }).length;
  var rp = Store.subjects.filter(function(s) { return s.status==='pris'; }).length;
  var tt = dp + rp || 1;
  document.getElementById('subjectStats').innerHTML =
    '<div class="tr"><span class="tr-label" style="color:var(--emerald)">Disponibles</span><div class="tr-bg"><div class="tr-bar" style="width:'+Math.round(dp/tt*100)+'%;background:var(--emerald)"></div></div><span class="tr-count">'+dp+'</span></div>' +
    '<div class="tr"><span class="tr-label" style="color:var(--amber)">Réservés</span><div class="tr-bg"><div class="tr-bar" style="width:'+Math.round(rp/tt*100)+'%;background:var(--amber)"></div></div><span class="tr-count">'+rp+'</span></div>';
}
