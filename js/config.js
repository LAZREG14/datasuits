/* ================================================================
   config.js — Configuration centrale de DataSuits
   ================================================================
   Modifiez ce fichier pour personnaliser :
   - La connexion Firebase
   - Les formateurs et leurs accès
   - Les technologies disponibles
   - L'URL de base GitHub pour les datasets
   ================================================================ */

/* ──────────────────────────────────────────────
   🔥 FIREBASE — Remplacez par votre config
   ────────────────────────────────────────────── */
var FIREBASE_CONFIG = {
  apiKey: "AIzaSyDIIA0thU_m3BG9daFgNMbxrP601dac_J0",
  authDomain: "datasuits-soutenance.firebaseapp.com",
  projectId: "datasuits-soutenance",
  storageBucket: "datasuits-soutenance.firebasestorage.app",
  messagingSenderId: "481372502136",
  appId: "1:481372502136:web:7b1264738e0bf589c9cc5b"
};

/* ──────────────────────────────────────────────
   🔗 GITHUB — URL de base pour les datasets
   ────────────────────────────────────────────── */
var GITHUB_BASE = 'https://github.com/DataSuits/projets-soutenances';

/* ──────────────────────────────────────────────
   🖼️ LOGO — URL du logo DataSuits
   ────────────────────────────────────────────── */
var LOGO_URL = 'https://raw.githubusercontent.com/lazreg14/datasuits/main/assets/ds_logo.png';

/* ──────────────────────────────────────────────
   👨‍🏫 FORMATEURS — Identifiants et profils
   ──────────────────────────────────────────────
   Pour ajouter un formateur :
   1. Ajoutez un objet dans ce tableau
   2. Donnez-lui un id unique (f4, f5…)
   3. Pour une vraie photo, remplacez l'URL photo
   ────────────────────────────────────────────── */
var FORMATEURS = [
  {
    id: 'f1',
    login: 'm.lazreg',
    pass: 'datasuits2026',
    prenom: 'Mustapha',
    nom: 'LAZREG',
    titre: 'Responsable pédagogique — Data Science & ML',
    spec: 'ML, Python, Deep Learning, Pandas',
    color: 'linear-gradient(135deg, #00e5ff, #3b82f6)',
    photo: 'https://ui-avatars.com/api/?name=Mustapha+Lazreg&background=0a0e1a&color=00e5ff&size=200&bold=true&font-size=0.33',
    online: true
  },
  {
    id: 'f2',
    login: 's.wahbi',
    pass: 'datasuits2026',
    prenom: 'Samy',
    nom: 'WAHBI',
    titre: 'Formateur — BI & Visualisation',
    spec: 'Power BI, Excel, SQL, Tableau',
    color: 'linear-gradient(135deg, #a855f7, #ec4899)',
    photo: 'https://ui-avatars.com/api/?name=Samy+Wahbi&background=0a0e1a&color=a855f7&size=200&bold=true&font-size=0.33',
    online: true
  },
  {
    id: 'f3',
    login: 'r.sounni',
    pass: 'datasuits2026',
    prenom: 'Reda',
    nom: 'SOUNNI',
    titre: 'Formateur — BDD & Data Engineering',
    spec: 'MySQL, PostgreSQL, ETL, Python',
    color: 'linear-gradient(135deg, #10b981, #00e5ff)',
    photo: 'https://ui-avatars.com/api/?name=Reda+Sounni&background=0a0e1a&color=10b981&size=200&bold=true&font-size=0.33',
    online: false
  }
];

/* ──────────────────────────────────────────────
   🛠️ TECHNOLOGIES — Liste des technos/badges
   ──────────────────────────────────────────────
   Pour ajouter une techno :
   1. Ajoutez le nom dans TECHS
   2. Ajoutez la classe CSS dans BADGE_MAP
   3. Ajoutez la couleur dans BADGE_COLOR
   4. Ajoutez le style CSS dans css/badges.css
   ────────────────────────────────────────────── */
var TECHS = [
  'Python', 'Power BI', 'MySQL', 'Excel', 'ML',
  'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn',
  'TensorFlow', 'Deep Learning', 'NLP', 'Stats', 'Scraping',
  'Tableau', 'MongoDB', 'API', 'PySpark', 'R',
  'Git', 'Power Query', 'VBA'
];

var BADGE_MAP = {
  'Python': 'b-python', 'Power BI': 'b-powerbi', 'MySQL': 'b-mysql',
  'Excel': 'b-excel', 'ML': 'b-ml', 'Pandas': 'b-pandas',
  'NumPy': 'b-python', 'Matplotlib': 'b-matplotlib', 'Seaborn': 'b-seaborn',
  'Scikit-learn': 'b-sklearn', 'TensorFlow': 'b-tensorflow',
  'Deep Learning': 'b-deeplearning', 'NLP': 'b-nlp', 'Stats': 'b-stats',
  'Scraping': 'b-scraping', 'Tableau': 'b-tableau', 'MongoDB': 'b-mongodb',
  'API': 'b-api', 'PySpark': 'b-pyspark', 'R': 'b-r', 'Git': 'b-git',
  'Power Query': 'b-powerquery', 'VBA': 'b-vba'
};

var BADGE_COLOR = {
  'Python': '#3b82f6', 'Power BI': '#f59e0b', 'MySQL': '#10b981',
  'Excel': '#22c55e', 'ML': '#a855f7', 'Pandas': '#93c5fd',
  'Matplotlib': '#fde047', 'Scikit-learn': '#d8b4fe', 'TensorFlow': '#fb923c',
  'Deep Learning': '#f9a8d4', 'NLP': '#fb7185', 'Stats': '#a5b4fc',
  'Scraping': '#ec4899', 'Tableau': '#60a5fa', 'MongoDB': '#4ade80',
  'API': '#c4b5fd', 'PySpark': '#fdba74', 'R': '#93c5fd', 'Git': '#fca5a5',
  'Power Query': '#86efac', 'VBA': '#6ee7b7', 'Seaborn': '#7dd3fc', 'NumPy': '#60a5fa'
};

/* ──────────────────────────────────────────────
   📅 PROMOTIONS — Format PMMYY
   ────────────────────────────────────────────── */
var MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

function promoLabel(code) {
  if (!code || code.length < 5) return code;
  var m = parseInt(code.substring(1, 3));
  var y = '20' + code.substring(3, 5);
  return MONTHS_FR[m - 1] + ' ' + y + ' (' + code + ')';
}

function generatePromoOptions() {
  var opts = [];
  for (var y = 23; y <= 27; y++) {
    for (var m = 1; m <= 12; m++) {
      opts.push('P' + String(m).padStart(2, '0') + String(y));
    }
  }
  return opts;
}

/* ──────────────────────────────────────────────
   📚 PROGRAMME DE FORMATION
   ────────────────────────────────────────────── */
var PROGRAM = [
  { n: 1, title: 'Excel & Analyse de données', desc: 'Fonctions avancées, TCD, Power Query, nettoyage.', color: 'var(--emerald)' },
  { n: 2, title: 'Bases de données & MySQL', desc: 'Modélisation relationnelle, SQL, jointures, optimisation.', color: 'var(--cyan)' },
  { n: 3, title: 'Python pour la Data', desc: 'Pandas, NumPy, Matplotlib, exploration et nettoyage.', color: 'var(--blue)' },
  { n: 4, title: 'Visualisation & Power BI', desc: 'Dashboards interactifs, DAX, storytelling data.', color: 'var(--amber)' },
  { n: 5, title: 'Machine Learning', desc: 'Scikit-learn, régression, classification, clustering.', color: 'var(--violet)' },
  { n: 6, title: 'Projet de soutenance', desc: 'Projet encadré sur données réelles, soutenance devant jury.', color: 'var(--pink)' }
];
