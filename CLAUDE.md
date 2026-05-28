# 🎾 PadelQuest — Guide de Développement & Spécifications Globales (MVP)

Ce document rassemble l'ensemble des exigences, directives techniques, choix d'architecture, schémas de base de données et règles UX indispensables au développement et au bon fonctionnement de PadelQuest.

---

## 🚀 1. Vision, Alignement Produit (GTM) & Règle des 10s

### 🎯 Positionnement
PadelQuest n'est pas une simple application de statistiques ou de réservation.  
C'est une couche sociale et compétitive au-dessus du padel local.

Inspirations :
- Strava (aspect communautaire)
- Chess.com (ELO / ladder / compétition)
- Playtomic (réseau sportif)

---

### 📍 Stratégie Go-To-Market (GTM)
- Déploiement hyper-local first (club pilote unique)
- Communauté : 50 à 200 joueurs
- Expansion progressive ensuite

---

### 🎯 Objectif MVP

4 piliers essentiels :
- Saisie d’un match en < 10 secondes (sans clavier) via une interface ultra-fluide
- Classement ELO automatisé, dynamique et juste (gestion du 2v2)
- Leaderboard local visible pour créer de la compétition
- Gamification & Profils joueurs (historique, statistiques, rivalités)

---

### 🔥 Génération de Hype automatique & Badges

Des tags générés dynamiquement en fonction du résultat et de l'ELO des équipes :
- **DOMINANT WIN 💀** : Victoire écrasante (ex: 6-0, 6-1).
- **CLOSE BATTLE 🍾** : Match très serré (ex: 7-6 ou 3 sets serrés).
- **UPSET ⚡** : Victoire surprise (L'équipe avec un ELO moyen inférieur d'au moins 100 points gagne).

**🏆 Badges & Succès (Fun & Rétention) :**
- *First Blood* : Premier match joué.
- *Unstoppable* : Série de 3 victoires consécutives.
- *Nemesis* : Avoir battu le même joueur 3 fois de suite.

---

## 🎨 2. Identité Visuelle & Thème Graphique

Style : **Esport premium, dynamique et moderne** (Vibrant, Dark Mode, Glassmorphism).

| Variable | Couleur | Rôle |
|----------|--------|------|
| Background | #0B0F14 | fond principal (profond) |
| Card | rgba(18, 24, 36, 0.7) | cartes (avec backdrop-blur / glassmorphism) |
| Border | #1E2A3A | bordures subtiles |
| Primary | #2DFF8F | actions / victoire (Glow vert fluo) |
| Danger | #FF4D4D | erreurs / défaite (Glow rouge agressif) |
| Accent | #7C3AED | éléments rares / MVP / Badges |
| Text | #E6EDF3 | texte principal |
| Muted | #8B98A9 | texte secondaire |

**Règles UX :**
- Utilisation de micro-animations (hover effects, transitions de stats).
- Pas de valeurs "par défaut" du navigateur. Typographie moderne (ex: *Inter*, *Outfit*). |

---

## 📂 3. Structure Globale du Projet

```bash
padelquest/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── db.js
│   │   └── routes/
│   │       ├── users.js
│   │       ├── matches.js
│   │       └── leaderboard.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   │       └── utils.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
├── docker-compose.yml
└── claude.md
```

# ⚙️ 4. Backend (Fastify & PostgreSQL)  

## 🧱 Base de données
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  elo INT DEFAULT 1000,
  win_streak INT DEFAULT 0
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  team_a INT[],
  team_b INT[],
  score_a INT,
  score_b INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table optionnelle mais recommandée pour l'historique ELO
CREATE TABLE elo_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  match_id INT REFERENCES matches(id),
  elo_change INT,
  new_elo INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## ⚡ Logique ELO (Dynamique & Réaliste)
Pour être crédible, le ELO doit tenir compte de l'écart de niveau entre les équipes. L'ELO de l'équipe est la moyenne de l'ELO des joueurs.
```js
function calculateElo(teamA_Elo, teamB_Elo, scoreA, scoreB) {
  const K = 32; // Facteur d'ajustement
  const expectedA = 1 / (1 + Math.pow(10, (teamB_Elo - teamA_Elo) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (teamA_Elo - teamB_Elo) / 400));
  
  // Résultat: 1 pour victoire, 0 pour défaite (au padel, pas de nul)
  const actualA = scoreA > scoreB ? 1 : 0;
  const actualB = scoreB > scoreA ? 1 : 0;

  const newEloA = Math.round(teamA_Elo + K * (actualA - expectedA));
  const newEloB = Math.round(teamB_Elo + K * (actualB - expectedB));

  return { 
    changeA: newEloA - teamA_Elo, 
    changeB: newEloB - teamB_Elo 
  };
}
```
*Note : L'implémentation BDD devra récupérer les ELOs, calculer la moyenne par équipe, déterminer la variation avec `calculateElo`, puis appliquer cette même variation à chaque joueur de l'équipe pour récompenser/pénaliser équitablement le duo.*