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

3 piliers essentiels :
- Saisie d’un match en < 10 secondes (sans clavier)
- Classement ELO automatisé et fiable
- Leaderboard local visible pour créer de la compétition

---

### 🔥 Génération de Hype automatique

- **DOMINANT WIN 💀** : victoire écrasante
- **CLOSE BATTLE 🍾** : match très serré
- **UPSET ⚡** : victoire surprise

---

## 🎨 2. Identité Visuelle & Thème Graphique

Style : **Esport premium**

| Variable | Couleur | Rôle |
|----------|--------|------|
| Background | #0B0F14 | fond principal |
| Card | #121824 | cartes |
| Border | #1E2A3A | bordures |
| Primary | #2DFF8F | actions / victoire |
| Danger | #FF4D4D | erreurs / défaite |
| Text | #E6EDF3 | texte principal |
| Muted | #8B98A9 | texte secondaire |

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
  elo INT DEFAULT 1000
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  team_a INT[],
  team_b INT[],
  score_a INT,
  score_b INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```
# ⚡ Logique ELO (robuste)
```js
async function updateElo(winnerIds, loserIds) {
  const K = 20;

  const promises = [
    ...winnerIds.map(id =>
      db.query(
        "UPDATE users SET elo = elo + $1 WHERE id = $2",
        [K, id]
      )
    ),
    ...loserIds.map(id =>
      db.query(
        "UPDATE users SET elo = elo - $1 WHERE id = $2",
        [K, id]
      )
    )
  ];

  await Promise.all(promises);
}
```