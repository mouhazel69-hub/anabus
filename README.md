# Ana Bus

**Ana bus bi ?** Ana Bus montre où se trouve votre bus à Dakar et dans combien de minutes il arrive à votre arrêt. Tapez le numéro de la ligne, voyez le bus sur la carte.

*bul xaar ba sonn*

Un projet porté par Mouhamed Abdallah Lo et Seyda Mariama Wade.

Site en ligne : https://mouhazel69-hub.github.io/anabus/

> **Démo : données fictives.** Les six lignes (2, 20, 23, 25, B1, 16A), leurs tracés, leurs arrêts, leurs bus et leurs retards sont inventés. Seuls les noms de quartiers sont réels.

## Ce que fait la phase 1

| Adresse | Écran |
| --- | --- |
| `/` | Le site : page d'accueil |
| `/app` | L'appli : recherche et bus près de vous |
| `/bienvenue` | Premier lancement : Kaay et le choix de la langue |
| `/recherche` | Recherche de ligne ; `?q=230` affiche « Aucune ligne 230 » |
| `/ligne/23` | Suivi d'une ligne : carte, minutes, « Me prévenir », « Signaler un problème » |
| `/mes-lignes` | Lignes favorites |
| `/alertes` | Alertes actives |
| `/design` | La charte vivante : variables, polices, logos, pictos et composants |

- Un **simulateur** fait rouler les bus le long de leur tracé. Le temps d'arrivée vient de la distance qui reste et de la vitesse moyenne, et se met à jour chaque seconde.
- À 3 min ou moins, le statut devient « Arrive ». À 1 min ou moins, « Mu ngi ñëw » remplace le chiffre.
- Les favoris, les alertes, les signalements et les lignes récentes restent sur l'appareil (pas de compte).
- Les notifications ne marchent que tant qu'Ana Bus est ouvert. Si l'usager les refuse, l'alerte s'affiche dans l'appli.
- L'appli s'installe (PWA) et garde l'appli, les lignes et les arrêts en cache pour les connexions faibles.

Pas encore (phase 2) : serveur, comptes, vraies positions de bus, notifications appli fermée.

## Lancer le projet sur votre ordinateur

Il faut [Node.js](https://nodejs.org) (version LTS) et [Git](https://git-scm.com).

```
git clone https://github.com/mouhazel69-hub/anabus.git
cd anabus
npm install
npm run dev
```

Ouvrez ensuite http://localhost:5173.

| Commande | Ce qu'elle fait |
| --- | --- |
| `npm run dev` | Lance l'appli en local ; la page se recharge à chaque modification |
| `npm test` | Lance les tests (temps d'arrivée, recherche, simulateur, textes) |
| `npm run build` | Vérifie les types et prépare la version en ligne dans `dist/` |
| `npm run preview` | Ouvre la version de `dist/` sur http://localhost:4173/anabus/ |

## Mise en ligne

Chaque envoi sur la branche `main` lance `.github/workflows/deploiement.yml` : GitHub construit le site et le publie sur GitHub Pages. Le réglage du dépôt doit être Settings, Pages, Source : « GitHub Actions ».

## Où trouver quoi

| Dossier | Contenu |
| --- | --- |
| `src/composants/` | Bouton, BadgeLigne, Statut, CarteArrivee, RechercheLigne, RepereBus, ArretListe, Kaay, BarreNavigation, FeuilleBas, BoutonRond, ChoixOptions |
| `src/ecrans/` | Les écrans de l'appli ; `suivi/` pour le suivi et ses feuilles |
| `src/site/` | La page d'accueil du site |
| `src/carte/` | La carte MapLibre et le restylage du fond OpenFreeMap |
| `src/donnees/` | Le modèle de données, l'interface `SourcePositions` et le simulateur |
| `src/data/demo/` | Les données fictives : réseaux, arrêts, lignes |
| `src/logique/` | Les calculs : distances, temps d'arrivée, recherche, seuils, « près de vous » |
| `src/i18n/` | Les textes : `fr.ts` (français) et `wo.ts` (wolof, à traduire) |
| `src/stockage/` | Ce qui reste sur l'appareil (localStorage) |
| `src/styles/` | Copie de `design/tokens.css`, des polices et les styles de base |
| `public/icones/` | Icônes PNG de la PWA, générées par `scripts/generer-icones.mjs` |
| `docs/`, `design/`, `maquettes/` | Le kit de marque (ne pas modifier `design/`) |

## Traduire en wolof

Ouvrez `src/i18n/wo.ts`. Chaque ligne marquée `// À traduire` contient encore le texte français : remplacez-le par la traduction validée et retirez le commentaire. Gardez les `{valeurs}` entre accolades telles quelles. Seules les phrases de marque sont déjà en wolof (« Ana bus bi ? », « Mu ngi ñëw », « bul xaar ba sonn »).

## Passer aux vraies positions (phase 2)

Les écrans ne connaissent que l'interface `SourcePositions` (`src/donnees/types.ts`). Pour brancher une source en direct (Supabase, puis les GPS des opérateurs), écrivez une classe qui la respecte et remplacez une seule ligne à la fin de `src/donnees/simulateur.ts` :

```ts
export const sourcePositions: SourcePositions = new SimulateurPositions();
```

## Carte

Le fond vient d'[OpenFreeMap](https://openfreemap.org) (OpenStreetMap, gratuit, sans clé ; l'attribution « © OpenStreetMap » reste affichée). Il est repeint avec les couleurs de la charte. Sans connexion, la carte garde un fond uni et montre quand même la ligne, les arrêts et les bus.
