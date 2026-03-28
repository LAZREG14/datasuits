# 🎓 DataSuits — Portail de Soutenances

Plateforme web pour la formation **Data Analyst & Intelligence Artificielle** de DataSuits.  
Gestion des projets de soutenance, banque de sujets imposés, quiz interactif et dashboard analytique.

---

## 📁 Structure du projet

```
datasuits/
├── index.html          ← Page principale (HTML structure)
├── css/
│   └── style.css       ← Tous les styles (glassmorphism, responsive)
├── js/
│   ├── config.js       ← 🔧 Configuration (Firebase, formateurs, technos, programme)
│   ├── data.js         ← 📊 Données initiales (projets, sujets, quiz)
│   ├── firebase.js     ← 🔥 Opérations Firebase (CRUD, sync temps réel)
│   ├── ui.js           ← 🎨 Rendu interface (cards, dashboard, icônes)
│   └── app.js          ← ⚙️ Logique app (auth, navigation, filtres, init)
└── README.md           ← Ce fichier
```

### Quel fichier modifier ?

| Je veux…                                        | Fichier          |
|-------------------------------------------------|------------------|
| Ajouter un formateur / changer un mot de passe  | `js/config.js`   |
| Changer la config Firebase                       | `js/config.js`   |
| Ajouter une technologie / badge                 | `js/config.js` + `css/style.css` |
| Modifier les données fictives de départ         | `js/data.js`     |
| Ajouter des questions au quiz                   | `js/data.js`     |
| Changer le design / couleurs / animations       | `css/style.css`  |
| Modifier le rendu des cartes                    | `js/ui.js`       |
| Modifier la logique de navigation / CRUD        | `js/app.js`      |
| Modifier la structure HTML des pages            | `index.html`     |
| Changer le logo                                 | `js/config.js` (LOGO_URL) + `index.html` |
| Mettre de vraies photos des formateurs          | `js/config.js` (champ photo) |

---

## 🚀 Déploiement sur GitHub Pages

### 1. Créer le dépôt
```bash
git init
git add .
git commit -m "Initial commit - DataSuits"
git remote add origin https://github.com/VOTRE-USER/datasuits-site.git
git push -u origin main
```

### 2. Activer GitHub Pages
1. GitHub → **Settings** → **Pages**
2. Source : `Deploy from a branch`
3. Branch : `main` / `/ (root)`
4. **Save** → site accessible en ~1 minute

### 3. URL du site
```
https://VOTRE-USER.github.io/datasuits-site/
```

---

## 🔥 Configuration Firebase

Le fichier `js/config.js` contient la configuration Firebase. Pour la modifier :

```javascript
var FIREBASE_CONFIG = {
  apiKey: "VOTRE_CLE",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "000000",
  appId: "1:000000:web:xxxxxx"
};
```

### Règles Firestore (mode test)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

---

## 🔑 Identifiants formateurs

| Formateur         | Login        | Mot de passe      |
|-------------------|--------------|--------------------|
| Mustapha LAZREG   | `m.lazreg`   | `datasuits2026`    |
| Samy WAHBI        | `s.wahbi`    | `datasuits2026`    |
| Reda SOUNNI       | `r.sounni`   | `datasuits2026`    |

> Modifiables dans `js/config.js` → tableau `FORMATEURS`

---

## 📋 Fonctionnalités

### Pour les apprenants
- Parcourir les soutenances passées
- Consulter les sujets imposés (avec PDF et dataset)
- **Réserver un sujet** (popup de saisie du nom)
- Filtrer par promo, technologie, disponibilité
- Sauvegarder des favoris
- Quiz Data & IA interactif (10 questions aléatoires)

### Pour les formateurs (après login)
- Ajouter / modifier / supprimer des projets
- Ajouter / modifier / supprimer des sujets
- Gérer les réservations de sujets
- Dashboard analytique (technos, promos, activité, stats sujets)
- Toutes les modifications synchronisées via Firebase

---

## 🏷️ Format des promotions

Format : **PMMYY** (P + mois sur 2 chiffres + année sur 2 chiffres)

| Code   | Signification         |
|--------|----------------------|
| P0125  | Janvier 2025         |
| P0326  | Mars 2026            |
| P0923  | Septembre 2023       |
| P1224  | Décembre 2024        |

---

## 🖼️ Photos des formateurs

Les photos actuelles utilisent [ui-avatars.com](https://ui-avatars.com) (initiales générées).  
Pour mettre de vraies photos :

1. Ajoutez vos images dans un dossier `photos/` du dépôt
2. Modifiez le champ `photo` dans `js/config.js` :

```javascript
photo: 'photos/lazreg.jpg',
```

---

## 📦 Hébergement des datasets

Structure recommandée pour le dépôt de données :

```
DataSuits/projets-soutenances/
├── sujets/
│   ├── S-001/
│   │   ├── dataset.zip
│   │   └── sujet.pdf
│   ├── S-002/
│   │   ├── dataset.zip
│   │   └── sujet.pdf
│   └── ...
└── README.md
```

Les URLs de téléchargement pointent vers `GITHUB_BASE/raw/main/sujets/...`  
Modifiez `GITHUB_BASE` dans `js/config.js` pour pointer vers votre dépôt.
