Bonjour Claude. Tu vas construire la première version d'**Ana Bus**, une application web qui montre où se trouve un bus à Dakar et dans combien de minutes il arrive. Tout le travail de marque et de maquette est déjà fait : ton rôle est de le transformer en un produit qui fonctionne, fidèle aux maquettes.

## 0. Préparer le dépôt

Si le dépôt contient `ana-bus-kit.zip`, décompresse-le à la racine du dépôt (on doit y trouver `CLAUDE.md`, `docs/`, `design/`, `maquettes/`), supprime le zip, puis fais un premier commit « Ajout du kit Ana Bus ».

## 1. Comprendre avant de coder

1. Lis `CLAUDE.md`, puis `docs/projet.md`, `docs/charte.md` et `docs/ecrans.md`.
2. Regarde chaque image de `maquettes/png/` (appli, site, marque).
3. Pour les valeurs exactes (tailles, espacements, couleurs), lis `maquettes/html/` et `design/composants-reference/`.
4. Propose-moi un plan court : pile, arborescence, étapes, et ce que tu ne feras pas encore. **Attends mon accord avant de coder.**

## 2. Ce que tu construis : phase 1, un prototype complet sans serveur

Une seule application web installable (PWA), qui sert à la fois de site et d'appli.

| Route | Écran | Maquette de référence |
| --- | --- | --- |
| `/` | Site : page d'accueil | `site/site-accueil-ordinateur.png`, `site-accueil-telephone.png` |
| `/app` | Appli : recherche et arrivées près de vous | `appli/01-accueil.png` |
| `/bienvenue` | Premier lancement : Kaay, choix de la langue | `appli/00-bienvenue.png` |
| `/recherche` | Recherche de ligne, et « Aucune ligne » | `appli/02-recherche.png`, `02b-aucun-resultat.png` |
| `/ligne/:numero` | Suivi d'une ligne : carte et feuille sur téléphone, panneau et carte sur ordinateur | `appli/03-suivi.png`, `site/site-suivi-*.png` |
| `/mes-lignes` | Lignes favorites | `appli/06-mes-lignes.png` |
| feuilles du suivi | « Me prévenir » et « Signaler un problème » | `appli/04-me-prevenir.png`, `05-signaler.png` |

Ce que l'application doit faire :

- **Données de démonstration fictives** : six lignes (2, 20, 23, 25, B1, 16A) sur trois réseaux, avec des arrêts portant de vrais noms de quartiers mais des tracés inventés. Range-les dans `src/data/demo/` et affiche un bandeau discret « Démo : données fictives ».
- **Simulateur** : les bus avancent le long de leur tracé. Le temps d'arrivée se calcule à partir de leur position et d'une vitesse moyenne, et se met à jour toutes les quelques secondes, avec « Mis à jour il y a X s ».
- **Seuils d'affichage** : à 3 min ou moins, le statut devient « Arrive » ; à 1 min ou moins, « Mu ngi ñëw » remplace le chiffre.
- **Recherche** : par numéro, sans tenir compte des majuscules (« b1 » = « B1 »), avec suggestions par début de numéro et lignes récentes. Un numéro inconnu affiche l'écran « Aucune ligne » avec Kaay et des lignes proches.
- **Près de vous** : utilise la géolocalisation si l'usager l'autorise ; sinon, un arrêt par défaut, avec un message clair.
- **Me prévenir** : notification du navigateur à 2, 5 ou 10 min. Demande la permission au moment où l'usager active l'alerte, et prévois une alerte dans l'appli si elle est refusée.
- **Signaler un problème** : 4 choix, enregistrés localement pour l'instant, avec une confirmation.
- **Mes lignes** : favoris enregistrés sur l'appareil.
- **Langue** : français par défaut, wolof sélectionnable. Les clés sont prêtes, les traductions seront fournies plus tard (voir `CLAUDE.md`).
- **Thèmes** : clair et sombre selon le réglage du téléphone, avec les valeurs de `design/tokens.css`.
- **Installation** : l'icône vient de `design/logos/ana-bus-icone-app.svg` ; génère les PNG nécessaires.

Pas encore : serveur, comptes, vraies positions de bus, notifications quand l'appli est fermée. Ce sera la phase 2 (voir `docs/projet.md`).

## 3. Ordre de livraison

Livre en 6 étapes et arrête-toi après chacune pour que je teste :

1. **Socle** : Vite, React et TypeScript ; variables de design, polices, styles de base ; une page `/design` qui montre tous les composants, comme une charte vivante.
2. **Composants** : Bouton, BadgeLigne, Statut, CarteArrivee, RechercheLigne, RepereBus, ArretListe, Kaay, barre de navigation, feuille du bas.
3. **Écrans de l'appli** avec les données fictives : bienvenue, accueil, recherche, aucun résultat, mes lignes.
4. **Carte et suivi** : MapLibre, tracé, arrêts, repère animé, simulateur, minutes, feuilles « Me prévenir » et « Signaler ».
5. **Site** : page d'accueil et vue de suivi sur ordinateur, adaptées au téléphone.
6. **Finitions** : PWA, tests Vitest, mise en ligne (GitHub Pages si le dépôt est public, sinon Netlify ou Vercel), README en français.

## 4. « Fini », ça veut dire

- Chaque écran ressemble à sa maquette PNG : mêmes textes, couleurs, polices et espacements.
- Tout fonctionne à 360 px de large comme sur ordinateur, en thème clair et en thème sombre.
- Navigation au clavier, focus visible, contrastes respectés, mouvements réduits si l'usager le demande.
- Aucune couleur ni police écrite en dur en dehors des variables, et aucun texte wolof inventé.
- `npm run build` et `npm test` passent, et le site est en ligne.

À chaque étape, explique-moi simplement en français ce que tu as fait et comment le tester : je veux comprendre le code.
