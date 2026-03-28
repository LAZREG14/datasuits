/* ================================================================
   data.js — Données initiales (seed) de DataSuits
   ================================================================
   Ces données servent de base au premier lancement.
   Une fois Firebase connecté, elles sont écrites en BDD
   puis synchronisées en temps réel.
   ================================================================ */

var GB = GITHUB_BASE; // shortcut

/* ──────────────────────────────────────────────
   🎓 PROJETS DE SOUTENANCE
   ────────────────────────────────────────────── */
var DEFAULT_PROJECTS = [
  {
    id: 'p1', promo: 'P0125', student: 'Amina Benali', ini: 'AB',
    title: 'Prédiction du Churn client — Opérateur télécom',
    badges: ['Python', 'ML', 'Pandas', 'Power BI', 'Scikit-learn'],
    github: 'https://github.com/amina-benali/churn-prediction',
    date: '2025-06-15', soutenance: '2025-07-10', enc: 'f1'
  },
  {
    id: 'p2', promo: 'P0125', student: 'Yassine Khaldi', ini: 'YK',
    title: "Analyse des performances commerciales d'une chaîne de distribution",
    badges: ['Excel', 'MySQL', 'Power BI', 'Power Query'],
    github: 'https://github.com/yassine-khaldi/analyse-performances',
    date: '2025-06-12', soutenance: '2025-07-10', enc: 'f2'
  },
  {
    id: 'p3', promo: 'P0125', student: 'Sarah Medjaoui', ini: 'SM',
    title: 'Classification des avis clients par NLP (Sentiment Analysis)',
    badges: ['Python', 'NLP', 'ML', 'Pandas', 'Scikit-learn'],
    github: 'https://github.com/sarah-medjaoui/sentiment-nlp',
    date: '2025-06-10', soutenance: '2025-07-08', enc: 'f1'
  },
  {
    id: 'p4', promo: 'P0624', student: 'Karim Bouzid', ini: 'KB',
    title: "Dashboard KPIs logistiques e-commerce",
    badges: ['MySQL', 'Power BI', 'Excel', 'Power Query'],
    github: 'https://github.com/karim-bouzid/dashboard-kpis',
    date: '2024-06-20', soutenance: '2024-07-15', enc: 'f2'
  },
  {
    id: 'p5', promo: 'P0624', student: 'Lina Ferhat', ini: 'LF',
    title: 'Détection de fraudes bancaires via Machine Learning',
    badges: ['Python', 'ML', 'Stats', 'Pandas', 'Scikit-learn'],
    github: 'https://github.com/lina-ferhat/fraud-detection',
    date: '2024-06-18', soutenance: '2024-07-12', enc: 'f1'
  },
  {
    id: 'p6', promo: 'P0624', student: 'Omar Tazi', ini: 'OT',
    title: "Prédiction des prix immobiliers (Web Scraping + ML)",
    badges: ['Python', 'Scraping', 'ML', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/omar-tazi/immobilier',
    date: '2024-06-14', soutenance: '2024-07-12', enc: 'f3'
  },
  {
    id: 'p7', promo: 'P0923', student: 'Fatima Zohra Allali', ini: 'FA',
    title: "Segmentation clientèle par K-Means Clustering",
    badges: ['Python', 'ML', 'Power BI', 'Scikit-learn', 'Seaborn'],
    github: 'https://github.com/fatima-allali/segmentation',
    date: '2023-09-22', soutenance: '2023-10-20', enc: 'f1'
  },
  {
    id: 'p8', promo: 'P0923', student: 'Mehdi Rahmani', ini: 'MR',
    title: "Qualité de l'air — Analyse statistique (villes algériennes)",
    badges: ['Python', 'Stats', 'Excel', 'Matplotlib', 'Pandas'],
    github: 'https://github.com/mehdi-rahmani/air-quality',
    date: '2023-09-19', soutenance: '2023-10-18', enc: 'f3'
  },
  {
    id: 'p9', promo: 'P0923', student: 'Nour El Houda Djebbari', ini: 'ND',
    title: 'Automatisation du reporting RH (Python & Power BI)',
    badges: ['Python', 'Power BI', 'Excel', 'Pandas', 'VBA'],
    github: 'https://github.com/nour-djebbari/hr-reporting',
    date: '2023-09-16', soutenance: '2023-10-18', enc: 'f2'
  }
];

/* ──────────────────────────────────────────────
   📋 SUJETS IMPOSÉS
   ────────────────────────────────────────────── */
var DEFAULT_SUBJECTS = [
  {
    id: 'S-001',
    title: 'Prédiction des retards de livraison (Supply Chain)',
    desc: "15 000 commandes. Modèle prédictif des facteurs de retard logistique.",
    badges: ['Python', 'ML', 'Power BI', 'Pandas', 'Scikit-learn'],
    diff: 3,
    data_url: GB + '/raw/main/sujets/S-001/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-001/sujet.pdf',
    enc: 'f1', status: 'dispo', reserved_by: ''
  },
  {
    id: 'S-002',
    title: 'Dashboard épidémiologique régional',
    desc: "Suivi des maladies infectieuses par wilaya sur 5 ans.",
    badges: ['Excel', 'Power BI', 'Stats', 'Power Query'],
    diff: 2,
    data_url: GB + '/raw/main/sujets/S-002/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-002/sujet.pdf',
    enc: 'f2', status: 'dispo', reserved_by: ''
  },
  {
    id: 'S-003',
    title: 'Recommandation de films (Filtrage collaboratif)',
    desc: "100K évaluations. Moteur de recommandation Python.",
    badges: ['Python', 'ML', 'Pandas', 'Scikit-learn'],
    diff: 3,
    data_url: GB + '/raw/main/sujets/S-003/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-003/sujet.pdf',
    enc: 'f1', status: 'pris', reserved_by: 'Hamza Khelifi'
  },
  {
    id: 'S-004',
    title: "Modélisation BDD commerciale (ETL)",
    desc: "Nettoyage Excel → schéma relationnel MySQL → automatisation.",
    badges: ['Excel', 'MySQL', 'Python', 'Power Query', 'VBA'],
    diff: 2,
    data_url: GB + '/raw/main/sujets/S-004/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-004/sujet.pdf',
    enc: 'f3', status: 'dispo', reserved_by: ''
  },
  {
    id: 'S-005',
    title: "Anomalies énergétiques (IoT / Séries temporelles)",
    desc: "Capteurs IoT. Détection d'anomalies de consommation.",
    badges: ['Python', 'ML', 'Stats', 'Pandas', 'Matplotlib'],
    diff: 3,
    data_url: GB + '/raw/main/sujets/S-005/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-005/sujet.pdf',
    enc: 'f1', status: 'dispo', reserved_by: ''
  },
  {
    id: 'S-006',
    title: "Emploi tech en Afrique du Nord (Scraping)",
    desc: "Offres d'emploi scrappées. Compétences, salaires, tendances.",
    badges: ['Python', 'Scraping', 'Power BI', 'Pandas', 'Matplotlib'],
    diff: 2,
    data_url: GB + '/raw/main/sujets/S-006/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-006/sujet.pdf',
    enc: 'f2', status: 'dispo', reserved_by: ''
  },
  {
    id: 'S-007',
    title: 'Scoring crédit (Microfinance)',
    desc: "8 000 clients. Classification supervisée pour score de crédit.",
    badges: ['Python', 'ML', 'MySQL', 'Scikit-learn', 'Pandas'],
    diff: 3,
    data_url: GB + '/raw/main/sujets/S-007/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-007/sujet.pdf',
    enc: 'f1', status: 'pris', reserved_by: 'Carine Dupont'
  },
  {
    id: 'S-008',
    title: 'Reporting ventes — Excel & Power Query',
    desc: "TCD, macros VBA et Power Query connectés à MySQL.",
    badges: ['Excel', 'MySQL', 'Power BI', 'Power Query', 'VBA'],
    diff: 1,
    data_url: GB + '/raw/main/sujets/S-008/dataset.zip',
    pdf_url: GB + '/raw/main/sujets/S-008/sujet.pdf',
    enc: 'f2', status: 'dispo', reserved_by: ''
  }
];

/* ──────────────────────────────────────────────
   🧠 QUIZ — Questions Data & IA
   ──────────────────────────────────────────────
   Pour ajouter une question :
   { q: "Votre question ?", opts: ["A","B","C","D"], ans: 0 }
   ans = index (0-3) de la bonne réponse
   ────────────────────────────────────────────── */
var QUIZ_QUESTIONS = [
  { q: "Quel langage domine en Data Science ?", opts: ["Java", "Python", "C++", "PHP"], ans: 1 },
  { q: "Que signifie SQL ?", opts: ["Structured Query Language", "Simple Query Logic", "System Quality Level", "Standard Question Language"], ans: 0 },
  { q: "Quelle lib Python pour le Machine Learning ?", opts: ["Django", "Flask", "Scikit-learn", "BeautifulSoup"], ans: 2 },
  { q: "Un DataFrame Pandas est…", opts: ["Un graphique", "Un tableau 2D", "Une base de données", "Un modèle ML"], ans: 1 },
  { q: "Algorithme de classification ?", opts: ["Régression linéaire", "K-Means", "Random Forest", "PCA"], ans: 2 },
  { q: "Le R² mesure…", opts: ["La vitesse", "La qualité de l'ajustement", "Le nombre de variables", "La taille des données"], ans: 1 },
  { q: "L'outil Microsoft BI par excellence ?", opts: ["Excel seul", "Access", "Power BI", "Word"], ans: 2 },
  { q: "NLP signifie…", opts: ["New Learning Process", "Natural Language Processing", "Neural Logic Program", "Network Layer Protocol"], ans: 1 },
  { q: "K-Means est un algo de…", opts: ["Classification", "Régression", "Clustering", "Reinforcement"], ans: 2 },
  { q: "Métrique pour la classification binaire ?", opts: ["MSE", "R²", "F1-Score", "RMSE"], ans: 2 },
  { q: "GROUP BY en SQL sert à…", opts: ["Trier", "Grouper par valeur", "Supprimer doublons", "Joindre"], ans: 1 },
  { q: "Graphique idéal pour une distribution ?", opts: ["Camembert", "Histogramme", "Gantt", "Treemap"], ans: 1 },
  { q: "Pandas sert principalement à…", opts: ["Le web scraping", "La manipulation de données", "Le deep learning", "La visualisation 3D"], ans: 1 },
  { q: "Outil pour dashboards interactifs ?", opts: ["Jupyter", "Power BI", "VS Code", "Git"], ans: 1 },
  { q: "TensorFlow est utilisé pour…", opts: ["Le SQL", "Le Deep Learning", "Le web scraping", "Excel"], ans: 1 }
];

/* ──────────────────────────────────────────────
   📊 ACTIVITÉ RÉCENTE (seed)
   ────────────────────────────────────────────── */
var DEFAULT_ACTIVITY = [
  { text: '<strong>Amina Benali</strong> a soutenu son projet Churn', time: '2j', c: 'var(--cyan)' },
  { text: 'Sujet <strong>S-003</strong> réservé par Hamza Khelifi', time: '5j', c: 'var(--amber)' },
  { text: '<strong>Karim Bouzid</strong> — repo GitHub mis à jour', time: '1 sem.', c: 'var(--emerald)' },
  { text: '<strong>Lina Ferhat</strong> — code publié', time: '2 sem.', c: 'var(--blue)' }
];
