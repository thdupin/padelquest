🎾 PadelQuest — Guide de Développement & Spécifications (MVP)

Ce document rassemble l'ensemble des exigences, directives techniques, choix d'architecture et règles UX indispensables au développement et au bon fonctionnement de PadelQuest. Il fait office de référence incontournable pour maintenir la cohérence de la base de code.

🚀 1. Vision & Alignement Produit (GTM)

Le Positionnement : PadelQuest n'est pas une simple application de statistiques ou de réservation. C'est une couche sociale et compétitive posée au-dessus du padel local (un modèle hybride inspiré de Strava pour l'aspect communautaire/physique, Chess.com pour le système d'Ego/Ladder/ELO, et Playtomic pour le réseau).

Stratégie Go-To-Market (GTM) : L'approche doit être Hyper-Locale First. Le déploiement s'effectue dans un club pilote unique (ex: Paris 15, Clermont) auprès d'une communauté restreinte et active (50 à 200 joueurs) avant d'envisager une expansion géographique.

Objectif MVP : Focus absolu sur 3 piliers opérationnels :

Saisie d'un match sur le terrain en moins de 10 secondes.

Classement ELO fiable, automatisé et dynamique.

Leaderboard local visible de tous pour stimuler "l'effet ego" et l'esprit de revanche naturelle.

🎨 2. Identité Visuelle & Thème Graphique (Base44)

L'application adopte une charte graphique typée "Ligue Esport / Premium" pour maximiser l'impact visuel et l'engagement compétitif. Les variables de couleur Tailwind à respecter strictement sont :

Variable

Couleur hexadécimale

Description / Rôle

Background (bg)

#0B0F14

Noir bleuté profond (Gaming / Premium)

Cartes (card)

#121824

Bleu nuit texturé pour détacher les blocs

Bordures (border)

#1E2A3A

Bleu acier subtil pour délimiter les sections

Primaire (primary)

#2DFF8F

Vert néon électrique (Victoire, ELO positif, Actions principales)

Danger (danger)

#FF4D4D

Rouge vif (Défaite, ELO négatif, Actions destructrices/fautes)

Texte Principal (text)

#E6EDF3

Gris clair lumineux pour une lisibilité maximale

Muted (muted)

#8B98A9

Gris bleu pour les sous-titres et métadonnées secondaires

⚙️ 3. Directives Techniques & Architecture Frontend

📂 Structure des dossiers

L'application utilise Next.js avec l'App Router et TypeScript. Le dossier src/ sépare les composants réutilisables du routage :

frontend/
├── src/
│   ├── app/             # Système de routage (page.tsx, layout.tsx, match/page.tsx, profile/[id]/page.tsx)
│   ├── components/      # Composants isolés (DashboardStats.tsx, LeaderboardTable.tsx, RecentMatches.tsx)
│   └── lib/             # Fonctions utilitaires
│       └── utils.ts     # Configuration cn() pour Tailwind
├── package.json
├── tsconfig.json
├── postcss.config.js
└── tailwind.config.js


🛠️ Conventions de Code Cruciales

Zéro Emoji dans le code de l'interface utilisateur : Tous les indicateurs visuels (médailles, flammes, trophées, flèches) doivent impérativement utiliser les icônes vectorielles de Lucide React (Trophy, Crown, Zap, Flame, etc.) afin de maintenir la précision géométrique des maquettes Figma.

Utilisation systématique de cn() : L'importation et l'usage de la fonction utilitaire cn (basée sur clsx et tailwind-merge) sont obligatoires pour concaténer et surcharger dynamiquement les classes Tailwind sans générer de conflits :

import { cn } from "../../lib/utils";


Imports Relatifs de Sécurité : En raison des contraintes de cache de l'environnement de build Next.js / TypeScript, privilégier les chemins relatifs directs (ex: ../../lib/utils au lieu de @/lib/utils) pour l'import de la fonction cn afin de garantir une compilation robuste et sans faille.

🐳 4. Exigences d'Infrastructure & Docker

Pour éviter le problème classique du "ça marche sur ma machine", l'environnement de développement frontend doit être entièrement conteneurisé et aligné sur les exigences de Tailwind CSS.

PostCSS Requis : La configuration PostCSS doit explicitement exporter ses clés pour que Tailwind compile correctement le fichier globals.css :

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};


Dépendances Docker : Le fichier package.json injecté dans le conteneur doit obligatoirement inclure :

postcss & autoprefixer (pour la compilation css)

clsx & tailwind-merge (pour l'utilitaire cn())

lucide-react (pour l'ensemble des icônes)

Cycle de vie du cache Docker : Lors de modifications majeures de la structure ou des dépendances (ex: ajout d'un package), purger les volumes de cache Next.js et de compilation internes à Docker via la commande :

docker compose down -v && docker compose up --build


📱 5. Directives d'UX Terrain (La règle des 10 secondes)

Tunnel de saisie en 2 étapes : La page de saisie de match (/match) ne doit pas afficher un formulaire interminable et décourageant après l'effort physique.

Étape 1 (Choix du format et des joueurs) : Sélection du format (1v1 ou 2v2) et sélection des joueurs via des menus déroulants directement synchronisés avec la base de données.

Étape 2 (Saisie du score) : Permet de cliquer sur de gros boutons tactiles (scores de 0 à 3 sets) sans jamais ouvrir le clavier numérique du smartphone, éliminant les erreurs de frappe sur écran humide/fatigué.

Contextualisation automatique : L'application doit pré-remplir la case "TOI" avec le profil du joueur connecté (ex: Lucas Martin, ID #1) pour économiser de précieuses secondes lors du log de match.

Génération de Hype automatique : Le flux d'activité doit calculer l'écart de score pour attribuer dynamiquement des étiquettes virales et engageantes au format :

DOMINANT WIN 💀 : Victoire écrasante (ex: 2-0 sec ou gros écart de points).

CHAMPAGNE PADEL 🍾 : Match ultra-serré (ex: 2-1 ou tie-break haletant).

UPSET ⚡ : Victoire surprise des outsiders faisant chuter les leaders du classement.