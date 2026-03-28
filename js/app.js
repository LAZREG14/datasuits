/* ================================================================
   app.js — Logique applicative (auth, nav, CRUD, quiz, filtres)
   ================================================================ */

/* ── State global ── */
var Store = {
  projects: DEFAULT_PROJECTS.slice(),
  subjects: DEFAULT_SUBJECTS.slice(),
  favs: new Set(),
  user: null,
  filterPromo: 'Tous',
  filterTech: 'Tous',
  activity: DEFAULT_ACTIVITY.slice()
};

var _idCounter = 100;
function uid() { return 'x' + (++_idCounter); }

/* ================================================================
   AUTH
   ================================================================ */
function doLogin() {
  var login = document.getElementById('loginUser').value.trim();
  var pass = document.getElementById('loginPass').value;
  var f = FORMATEURS.find(function(x) { return x.login === login && x.pass === pass; });
  if (!f) { document.getElementById('loginErr').classList.add('show'); return; }
  Store.user = { id: f.id, prenom: f.prenom, nom: f.nom, role: 'formateur', color: f.color, photo: f.photo };
  enterApp();
  toast('Bienvenue, ' + f.prenom + ' ' + f.nom, 'shield', 3000);
}

function guestLogin() {
  Store.user = { prenom: 'Apprenant', nom: '', role: 'apprenant', color: 'linear-gradient(135deg,#3b82f6,#00e5ff)' };
  enterApp();
  toast('Bienvenue sur DataSuits', 'check');
}

function enterApp() {
  document.getElementById('loginScreen').classList.add('hidden');
  var app = document.getElementById('app');
  app.classList.toggle('is-formateur', isFormateur());
  app.classList.add('visible');
  renderUserChip();
  renderFormateurs();
  renderStats();
  buildFiltersProjects(); filterProjects();
  buildFiltersSubjects(); filterSubjects();
  renderFavorites();
  renderProgram();
  startQuiz();
}

function logout() {
  Store.user = null;
  document.getElementById('app').classList.remove('visible', 'is-formateur');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginErr').classList.remove('show');
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  navigateTo('realisations');
}

function renderUserChip() {
  var u = Store.user; if (!u) return;
  var ini = (u.prenom[0] || '') + (u.nom ? u.nom[0] : '');
  document.getElementById('userChip').innerHTML =
    '<div class="uc-av" style="background:'+u.color+'">'+ini+'</div>' +
    '<span class="uc-name">'+u.prenom+' '+(u.nom||'')+'</span>' +
    '<span class="uc-role">'+(isFormateur()?'Formateur':'Apprenant')+'</span>' +
    '<div class="uc-out" onclick="logout()">'+IC.logout+'</div>';
}

/* ================================================================
   NAVIGATION
   ================================================================ */
function navigateTo(page) {
  if (page === 'dashboard' && !isFormateur()) { toast('Accès formateur', 'shield'); return; }
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nl').forEach(function(l) { l.classList.remove('active'); });
  var link = document.querySelector('.nl[data-page="'+page+'"]');
  if (link) link.classList.add('active');
  document.getElementById('navLinks').classList.remove('open');
  if (page === 'favoris') renderFavorites();
  if (page === 'dashboard') renderDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Alias court pour le HTML
var go = navigateTo;

/* ================================================================
   FAVORIS
   ================================================================ */
function toggleFavorite(id) {
  if (Store.favs.has(id)) { Store.favs.delete(id); toast('Retiré', 'heart'); }
  else { Store.favs.add(id); toast('Favori ajouté', 'heart'); }
  renderStats(); filterProjects(); filterSubjects(); renderFavorites();
}
var tF = toggleFavorite; // alias

/* ================================================================
   FILTRES — Projets
   ================================================================ */
function buildFiltersProjects() {
  var promos = ['Tous'].concat([...new Set(Store.projects.map(function(r) { return r.promo; }))]);
  document.getElementById('filtersR').innerHTML = promos.map(function(x) {
    return '<button class="fb '+(x===Store.filterPromo?'active':'')+'" onclick="Store.filterPromo=\''+x+'\';buildFiltersProjects();filterProjects()">'+(x==='Tous'?x:promoLabel(x))+'</button>';
  }).join('');
}
var buildFR = buildFiltersProjects;

function filterProjects() {
  var q = (document.getElementById('searchR').value || '').toLowerCase();
  var d = Store.projects;
  if (Store.filterPromo !== 'Tous') d = d.filter(function(r) { return r.promo === Store.filterPromo; });
  if (q) d = d.filter(function(r) {
    return r.title.toLowerCase().indexOf(q)>=0 || r.student.toLowerCase().indexOf(q)>=0 ||
      (r.badges||[]).some(function(b) { return b.toLowerCase().indexOf(q)>=0; }) ||
      formateurName(r.enc).toLowerCase().indexOf(q)>=0 || promoLabel(r.promo).toLowerCase().indexOf(q)>=0;
  });
  renderProjects(d);
}
var filterR = filterProjects;

/* ================================================================
   FILTRES — Sujets
   ================================================================ */
function buildFiltersSubjects() {
  var techs = ['Tous', 'Disponibles'].concat([...new Set(Store.subjects.flatMap(function(s) { return s.badges||[]; }))]);
  document.getElementById('filtersS').innerHTML = techs.map(function(x) {
    return '<button class="fb '+(x===Store.filterTech?'active':'')+'" onclick="Store.filterTech=\''+x+'\';buildFiltersSubjects();filterSubjects()">'+x+'</button>';
  }).join('');
}
var buildFS = buildFiltersSubjects;

function filterSubjects() {
  var q = (document.getElementById('searchS').value || '').toLowerCase();
  var d = Store.subjects;
  if (Store.filterTech === 'Disponibles') d = d.filter(function(s) { return s.status === 'dispo'; });
  else if (Store.filterTech !== 'Tous') d = d.filter(function(s) { return (s.badges||[]).indexOf(Store.filterTech)>=0; });
  if (q) d = d.filter(function(s) {
    return s.title.toLowerCase().indexOf(q)>=0 || s.desc.toLowerCase().indexOf(q)>=0 ||
      (s.badges||[]).some(function(b) { return b.toLowerCase().indexOf(q)>=0; }) ||
      formateurName(s.enc).toLowerCase().indexOf(q)>=0;
  });
  renderSubjects(d);
}
var filterS = filterSubjects;

/* ================================================================
   DETAIL PROJET (modal)
   ================================================================ */
function showProjectDetail(id) {
  var p = Store.projects.find(function(x) { return x.id === id; });
  if (!p) return;
  var enc = getFormateur(p.enc);
  var sd = p.soutenance ? new Date(p.soutenance).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}) : '—';
  openModal(
    '<button class="md-close" onclick="closeModal()">'+IC.close+'</button>' +
    '<h3>'+p.title+'</h3>' +
    '<div class="di">' +
      '<div class="di-item"><label>Apprenant</label><span>'+p.student+'</span></div>' +
      '<div class="di-item"><label>Promotion</label><span>'+promoLabel(p.promo)+'</span></div>' +
      '<div class="di-item"><label>Soutenance</label><span>'+sd+'</span></div>' +
      '<div class="di-item"><label>Encadrant</label><span style="color:var(--amber)">'+formateurName(p.enc)+'</span></div>' +
    '</div>' +
    '<div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--brd)"><label style="margin:0 0 6px">Technologies</label><div class="badges">'+badgesHTML(p.badges)+'</div></div>' +
    (enc ? '<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--brd)"><div style="display:flex;align-items:center;gap:10px"><img src="'+enc.photo+'" style="width:36px;height:36px;border-radius:10px;border:2px solid var(--brd)"/><div><div style="font-weight:700;font-size:12px">'+enc.prenom+' '+enc.nom+'</div><div style="font-size:9px;color:var(--tx2)">'+enc.spec+'</div></div></div></div>' : '') +
    '<div class="md-btns"><a class="md-btn md-btn-p" href="'+p.github+'" target="_blank" style="text-align:center;text-decoration:none;color:#fff">'+IC.gh+' GitHub</a><button class="md-btn md-btn-s" onclick="closeModal()">Fermer</button></div>'
  );
}
var detP = showProjectDetail;

/* ================================================================
   CRUD — Projets
   ================================================================ */
function openAddProject(existing) {
  if (!isFormateur()) return;
  var p = existing || { promo:'P0326', student:'', title:'', badges:[], github:'', soutenance:'', enc: Store.user.id };
  var isEdit = !!existing;
  var allPromos = generatePromoOptions();
  openModal(
    '<button class="md-close" onclick="closeModal()">'+IC.close+'</button>' +
    '<h3>'+(isEdit?'Modifier':'Ajouter un projet')+'</h3>' +
    '<label>Promotion</label><select id="m_pr">' + allPromos.map(function(x) { return '<option value="'+x+'" '+(x===p.promo?'selected':'')+'>'+promoLabel(x)+'</option>'; }).join('') + '</select>' +
    '<label>Nom de l\'apprenant</label><input id="m_st" value="'+p.student+'" placeholder="Prénom Nom"/>' +
    '<label>Titre du projet</label><textarea id="m_ti">'+p.title+'</textarea>' +
    '<label>Lien GitHub</label><input id="m_gh" value="'+(p.github||'')+'" placeholder="https://github.com/..."/>' +
    '<label>Date de soutenance</label><input id="m_sd" type="date" value="'+(p.soutenance||'')+'"/>' +
    '<label>Encadrant</label><select id="m_enc">' + FORMATEURS.map(function(f) { return '<option value="'+f.id+'" '+(f.id===p.enc?'selected':'')+'>'+f.prenom+' '+f.nom+'</option>'; }).join('') + '</select>' +
    '<label>Technologies</label><div class="check-group" id="m_tc">' + TECHS.map(function(t) { return '<span class="ct '+((p.badges||[]).indexOf(t)>=0?'ck':'')+'" onclick="this.classList.toggle(\'ck\')">'+t+'</span>'; }).join('') + '</div>' +
    '<div class="md-btns"><button class="md-btn md-btn-p" onclick="saveProject(\''+(isEdit?p.id:'')+'\')">'+(isEdit?'Enregistrer':'Ajouter')+'</button><button class="md-btn md-btn-s" onclick="closeModal()">Annuler</button></div>'
  );
}

function saveProject(editId) {
  var st = document.getElementById('m_st').value.trim();
  var ti = document.getElementById('m_ti').value.trim();
  var pr = document.getElementById('m_pr').value;
  var gh = document.getElementById('m_gh').value.trim();
  var sd = document.getElementById('m_sd').value;
  var enc = document.getElementById('m_enc').value;
  var badges = [].map.call(document.querySelectorAll('#m_tc .ck'), function(e) { return e.textContent; });
  if (!st || !ti) { toast('Champs requis', 'close'); return; }
  var ini = st.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0,2);
  if (editId) {
    var p = Store.projects.find(function(x) { return x.id === editId; });
    if (p) { p.promo=pr; p.student=st; p.ini=ini; p.title=ti; p.badges=badges; p.github=gh; p.soutenance=sd; p.enc=enc; fbSave('projects',p); }
    toast('Modifié', 'check');
  } else {
    var np = { id:uid(), promo:pr, student:st, ini:ini, title:ti, badges:badges, github:gh, soutenance:sd, date:new Date().toISOString().slice(0,10), enc:enc };
    Store.projects.unshift(np); fbSave('projects',np); toast('Projet ajouté', 'check');
    Store.activity.unshift({ text:'Nouveau : <strong>'+ti.slice(0,30)+'…</strong>', time:"À l'instant", c:'var(--cyan)' });
  }
  closeModal(); renderStats(); buildFiltersProjects(); filterProjects();
}
function editProject(id) { openAddProject(Store.projects.find(function(x) { return x.id===id; })); }
var editP = editProject;
function deleteProject(id) {
  if (!confirm('Supprimer ce projet ?')) return;
  Store.projects = Store.projects.filter(function(x) { return x.id!==id; });
  Store.favs.delete(id); fbDelete('projects',id);
  toast('Supprimé', 'trash'); renderStats(); buildFiltersProjects(); filterProjects(); renderFavorites();
}
var delP = deleteProject;

/* ================================================================
   CRUD — Sujets
   ================================================================ */
function openAddSubject(existing) {
  if (!isFormateur()) return;
  var s = existing || { title:'', desc:'', badges:[], diff:2, data_url:'', pdf_url:'', enc:Store.user.id, status:'dispo', reserved_by:'' };
  var isEdit = !!existing;
  openModal(
    '<button class="md-close" onclick="closeModal()">'+IC.close+'</button>' +
    '<h3>'+(isEdit?'Modifier':'Ajouter un sujet')+'</h3>' +
    '<label>Titre du sujet</label><input id="ms_ti" value="'+s.title+'"/>' +
    '<label>Description / Problématique</label><textarea id="ms_de" style="min-height:70px">'+s.desc+'</textarea>' +
    '<label>Lien GitHub vers le dataset</label><input id="ms_dl" value="'+(s.data_url||'')+'" placeholder="https://github.com/.../dataset.zip"/>' +
    '<label>Lien PDF (sujet & problématique)</label><input id="ms_pdf" value="'+(s.pdf_url||'')+'" placeholder="https://github.com/.../sujet.pdf"/>' +
    '<label>Encadrant</label><select id="ms_enc">' + FORMATEURS.map(function(f) { return '<option value="'+f.id+'" '+(f.id===s.enc?'selected':'')+'>'+f.prenom+' '+f.nom+'</option>'; }).join('') + '</select>' +
    '<label>Statut</label><select id="ms_st"><option value="dispo" '+(s.status==='dispo'?'selected':'')+'>Disponible</option><option value="pris" '+(s.status==='pris'?'selected':'')+'>Réservé</option></select>' +
    '<label>Réservé par</label><input id="ms_rb" value="'+(s.reserved_by||'')+'" placeholder="Nom de l\'apprenant"/>' +
    '<label>Difficulté</label><select id="ms_di">'+[1,2,3].map(function(d) { return '<option value="'+d+'" '+(d===s.diff?'selected':'')+'>'+'★'.repeat(d)+' '+(d===1?'Facile':d===2?'Intermédiaire':'Avancé')+'</option>'; }).join('')+'</select>' +
    '<label>Technologies ciblées</label><div class="check-group" id="ms_tc">' + TECHS.map(function(t) { return '<span class="ct '+((s.badges||[]).indexOf(t)>=0?'ck':'')+'" onclick="this.classList.toggle(\'ck\')">'+t+'</span>'; }).join('') + '</div>' +
    '<div class="md-btns"><button class="md-btn md-btn-p" onclick="saveSubject(\''+(isEdit?s.id:'')+'\')">'+(isEdit?'Enregistrer':'Ajouter')+'</button><button class="md-btn md-btn-s" onclick="closeModal()">Annuler</button></div>'
  );
}

function saveSubject(editId) {
  var ti = document.getElementById('ms_ti').value.trim();
  var de = document.getElementById('ms_de').value.trim();
  var dl = document.getElementById('ms_dl').value.trim();
  var pdf = document.getElementById('ms_pdf').value.trim();
  var enc = document.getElementById('ms_enc').value;
  var st = document.getElementById('ms_st').value;
  var rb = document.getElementById('ms_rb').value.trim();
  var diff = +document.getElementById('ms_di').value;
  var badges = [].map.call(document.querySelectorAll('#ms_tc .ck'), function(e) { return e.textContent; });
  if (!ti) { toast('Titre requis', 'close'); return; }
  if (editId) {
    var s = Store.subjects.find(function(x) { return x.id === editId; });
    if (s) { s.title=ti; s.desc=de; s.diff=diff; s.badges=badges; s.data_url=dl; s.pdf_url=pdf; s.enc=enc; s.status=st; s.reserved_by=rb; fbSave('subjects',s); }
    toast('Modifié', 'check');
  } else {
    var ns = { id:'S-'+(Store.subjects.length+1).toString().padStart(3,'0'), title:ti, desc:de, diff:diff, badges:badges, data_url:dl||'#', pdf_url:pdf||'', enc:enc, status:st, reserved_by:rb };
    Store.subjects.push(ns); fbSave('subjects',ns); toast('Sujet ajouté', 'check');
  }
  closeModal(); renderStats(); buildFiltersSubjects(); filterSubjects();
}
function editSubject(id) { openAddSubject(Store.subjects.find(function(x) { return x.id===id; })); }
var editS = editSubject;
function deleteSubject(id) {
  if (!confirm('Supprimer ce sujet ?')) return;
  Store.subjects = Store.subjects.filter(function(x) { return x.id!==id; });
  Store.favs.delete(id); fbDelete('subjects',id);
  toast('Supprimé', 'trash'); renderStats(); buildFiltersSubjects(); filterSubjects(); renderFavorites();
}
var delS = deleteSubject;

/* ================================================================
   MODAL
   ================================================================ */
function openModal(html) { document.getElementById('moC').innerHTML = html; document.getElementById('mo').classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeModal() { document.getElementById('mo').classList.remove('show'); document.body.style.overflow = ''; }
var openMo = openModal, closeMo = closeModal;

/* ================================================================
   QUIZ
   ================================================================ */
var quizState = { cur: 0, score: 0, answered: false, total: 10 };

function startQuiz() {
  quizState = { cur: 0, score: 0, answered: false, total: Math.min(10, QUIZ_QUESTIONS.length) };
  QUIZ_QUESTIONS.sort(function() { return Math.random() - 0.5; });
  renderQuizQuestion();
}

function renderQuizQuestion() {
  var q = QUIZ_QUESTIONS[quizState.cur];
  document.getElementById('quizBox').innerHTML =
    '<div class="quiz-progress">' + Array.from({length:quizState.total}, function(_,i) {
      return '<div class="quiz-dot '+(i<quizState.cur?'done':'')+(i===quizState.cur?' current':'')+'"></div>';
    }).join('') + '</div>' +
    '<div class="quiz-timer">Question '+(quizState.cur+1)+' / '+quizState.total+'</div>' +
    '<div class="quiz-q">'+q.q+'</div>' +
    '<div class="quiz-opts">' + q.opts.map(function(o,i) {
      return '<div class="quiz-opt" onclick="answerQuiz('+i+')">'+o+'</div>';
    }).join('') + '</div>';
}

function answerQuiz(i) {
  if (quizState.answered) return;
  quizState.answered = true;
  var q = QUIZ_QUESTIONS[quizState.cur];
  document.querySelectorAll('.quiz-opt').forEach(function(o,j) {
    o.classList.add('disabled');
    if (j === q.ans) o.classList.add('correct');
    if (j === i && j !== q.ans) o.classList.add('wrong');
  });
  if (i === q.ans) quizState.score++;
  if (quizState.cur < quizState.total - 1) {
    document.getElementById('quizBox').innerHTML += '<button class="quiz-next" onclick="quizState.cur++;quizState.answered=false;renderQuizQuestion()">Suivante →</button>';
  } else {
    setTimeout(showQuizResult, 800);
  }
}
var ansQ = answerQuiz;

function showQuizResult() {
  var pct = Math.round(quizState.score / quizState.total * 100);
  var msg = pct >= 80 ? 'Excellent !' : pct >= 50 ? 'Bien joué !' : 'Révisez les fondamentaux.';
  var col = pct >= 80 ? 'var(--emerald)' : pct >= 50 ? 'var(--amber)' : 'var(--red)';
  document.getElementById('quizBox').innerHTML =
    '<div class="quiz-result">' +
      '<div class="quiz-score" style="background:linear-gradient(135deg,'+col+',var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent">'+quizState.score+'/'+quizState.total+'</div>' +
      '<div style="font:600 13px/1 var(--font);margin-bottom:5px">'+pct+'%</div>' +
      '<div class="quiz-msg">'+msg+'</div>' +
      '<button class="quiz-restart" onclick="startQuiz()">Recommencer</button>' +
    '</div>';
}

/* ================================================================
   SCROLL & KEYBOARD
   ================================================================ */
window.addEventListener('scroll', function() {
  document.getElementById('stt').classList.toggle('show', window.scrollY > 200);
});

document.addEventListener('keydown', function(e) {
  if (['INPUT','TEXTAREA','SELECT'].indexOf(e.target.tagName) >= 0) return;
  if (e.key === 'Escape') closeModal();
});

/* ================================================================
   🚀 INITIALISATION
   ================================================================ */
(function() {
  var loadScreen = document.getElementById('loadingScreen');
  var loginScreen = document.getElementById('loginScreen');

  firebaseReady = initFirebase();

  if (firebaseReady) {
    setFirebaseStatus(true);
    fbSeedIfEmpty().then(function() {
      return Promise.all([fbLoad('projects','date'), fbLoad('subjects','id')]);
    }).then(function(results) {
      if (results[0]) Store.projects = results[0];
      if (results[1]) Store.subjects = results[1];
      fbListenRealtime();
      loadScreen.classList.add('hidden');
      loginScreen.classList.remove('hidden');
    }).catch(function() {
      setFirebaseStatus(false);
      loadScreen.classList.add('hidden');
      loginScreen.classList.remove('hidden');
    });
  } else {
    setFirebaseStatus(false);
    setTimeout(function() {
      loadScreen.classList.add('hidden');
      loginScreen.classList.remove('hidden');
    }, 500);
  }
})();
