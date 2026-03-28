/* ================================================================
   firebase.js — Opérations Firebase Firestore
   ================================================================
   Gère la connexion, le CRUD et la synchronisation temps réel.
   Si Firebase n'est pas configuré, tout fonctionne en local.
   ================================================================ */

var db = null;
var firebaseReady = false;

/* ── Initialisation ── */
function initFirebase() {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    db.enablePersistence({ synchronizeTabs: true }).catch(function () {});
    return true;
  } catch (e) {
    console.error('Firebase init error:', e);
    return false;
  }
}

/* ── CRUD générique ── */
function fbSave(collection, doc) {
  if (!db) return Promise.resolve();
  return db.collection(collection).doc(doc.id).set(doc);
}

function fbDelete(collection, id) {
  if (!db) return Promise.resolve();
  return db.collection(collection).doc(id).delete();
}

function fbLoad(collection, orderBy) {
  if (!db) return Promise.resolve(null);
  return db.collection(collection).orderBy(orderBy).get().then(function (snap) {
    return snap.empty ? null : snap.docs.map(function (d) { return d.data(); });
  });
}

/* ── Seed : écrire les données par défaut si Firestore est vide ── */
function fbSeedIfEmpty() {
  if (!db) return Promise.resolve();
  return db.collection('projects').limit(1).get().then(function (snap) {
    if (!snap.empty) return; // déjà rempli
    var batch = db.batch();
    Store.projects.forEach(function (p) {
      batch.set(db.collection('projects').doc(p.id), p);
    });
    Store.subjects.forEach(function (s) {
      batch.set(db.collection('subjects').doc(s.id), s);
    });
    return batch.commit();
  });
}

/* ── Listeners temps réel ── */
function fbListenRealtime() {
  if (!db) return;

  db.collection('projects').onSnapshot(function (snap) {
    Store.projects = snap.docs.map(function (d) { return d.data(); });
    Store.projects.sort(function (a, b) { return b.date > a.date ? 1 : -1; });
    renderStats();
    buildFiltersProjects();
    filterProjects();
  });

  db.collection('subjects').onSnapshot(function (snap) {
    Store.subjects = snap.docs.map(function (d) { return d.data(); });
    Store.subjects.sort(function (a, b) { return a.id > b.id ? 1 : -1; });
    renderStats();
    buildFiltersSubjects();
    filterSubjects();
  });
}

/* ── Indicateur de statut Firebase ── */
function setFirebaseStatus(online) {
  var el = document.getElementById('fbSt');
  el.style.display = 'flex';
  el.className = 'fb-st ' + (online ? 'on' : 'off');
  document.getElementById('fbLb').textContent = online ? 'Firebase' : 'Hors-ligne';
}
