# Ana Bus

Ana Bus montre où se trouve un bus à Dakar et dans combien de minutes il arrive à l'arrêt de l'usager. On tape le numéro de la ligne, on voit le bus sur la carte et le temps d'attente. Signature : **Ana Bus — bul xaar ba sonn** (wolof : « n'attends plus jusqu'à l'épuisement »).

Équipe : Mouhamed Abdallah Lo (MALO), marque, design et vidéo, qui apprend HTML, CSS et JavaScript ; Seyda Mariama Wade, développement, marketing digital et design graphique.

## Où trouver quoi

| Chemin | Contenu |
| --- | --- |
| `docs/projet.md` | Le dossier de projet résumé : problème, réseaux, concurrence, données, feuille de route |
| `docs/charte.md` | La charte de marque : ton, couleurs, typographie, carte, mascotte, accessibilité. **Elle fait foi.** |
| `docs/ecrans.md` | Chaque écran : route, contenu, textes exacts, états, interactions |
| `design/tokens.css`, `design/tokens.json` | Les variables de design : couleurs (thèmes clair et sombre), espaces, arrondis, ombres, polices |
| `design/fonts/` | Unbounded et Atkinson Hyperlegible Next en woff2 (licence OFL dans `design/licences/`) |
| `design/logos/`, `design/icones/`, `design/mascotte/` | Les SVG officiels. Ne redessine jamais le logo ni Kaay. |
| `design/composants-reference/` | L'implémentation de référence des 6 composants (React sans JSX) et leurs règles d'usage |
| `maquettes/png/` | Les captures de référence de chaque écran : `appli/`, `site/`, `marque/` |
| `maquettes/html/` | Les mêmes maquettes en HTML statique, à ouvrir dans un navigateur pour lire les valeurs exactes |

Si une maquette et un document se contredisent, demande avant de choisir.

## Pile technique recommandée

Garde-la sauf raison forte, et dis-le si tu t'en écartes.

- Vite, React 18, TypeScript, React Router.
- CSS simple : un fichier `.css` par composant, qui n'utilise que les variables de `design/tokens.css`. Pas de framework CSS, pas de couleur écrite en dur.
- Carte : MapLibre GL JS avec un fond OpenStreetMap vectoriel sans clé (par exemple OpenFreeMap ; vérifie ses conditions d'usage), restylé sobre et désaturé comme dans `docs/charte.md`, section « Carte ».
- PWA avec vite-plugin-pwa : installable, `start_url` sur `/app`, lignes et arrêts mis en cache pour les connexions faibles.
- Tests : Vitest pour la logique (temps d'arrivée, recherche, simulateur).
- Déploiement : GitHub Pages par GitHub Actions, en réglant la base d'URL du dépôt. GitHub Pages gratuit demande un dépôt public ; si le dépôt reste privé, propose Netlify ou Vercel (offres gratuites).
- Phase 2, plus tard : Supabase (Postgres et Realtime) pour les positions partagées par les passagers et les signalements.

Prévois une interface `SourcePositions` : aujourd'hui `SimulateurPositions`, demain une source en direct (Supabase, puis les GPS des opérateurs), sans toucher aux écrans.

## Données

- Modèle inspiré du format GTFS : réseaux (Dakar Dem Dikk, Tata / AFTU, BRT), lignes (numéro tel qu'écrit sur le bus, destination, réseau, tracé), arrêts (nom, coordonnées), passages prévus, positions de bus (ligne, coordonnées, heure, source : `direct`, `prevu` ou `participatif`).
- **Toutes les données actuelles sont fictives.** Les noms de quartiers (Liberté 6, Sacré-Cœur, Colobane, Petersen, Grand Médine, Guédiawaye, Keur Massar, Daroukhane, Place Leclerc) sont réels ; les numéros, tracés, ordres d'arrêts et temps ne le sont pas. Range-les dans `src/data/demo/` et affiche un bandeau discret « Démo : données fictives » tant qu'elles servent.
- N'invente jamais de données présentées comme réelles.

## Règles de marque à respecter dans le code

Résumé ; le détail est dans `docs/charte.md`.

- **Couleurs** : uniquement par variables. `--jaune` est le bus (badge de ligne, repère, un seul bouton principal par écran). `--vert` veut dire « arrive » ou « en direct », `--corail` veut dire « retard » ; jamais décoratifs, toujours accompagnés d'un mot et d'un picto.
- **Typographie** : Unbounded pour les titres seulement. Atkinson Hyperlegible Next pour tout le reste, et toujours pour les numéros de ligne et les minutes, en chiffres tabulaires.
- **Minutes** : le plus grand chiffre de l'écran. À 3 min ou moins, statut « Arrive » ; à 1 min ou moins, « Mu ngi ñëw » remplace le chiffre.
- **Kaay**, la mascotte : seulement sur la bienvenue, les écrans sans résultat ou en erreur, la notification « Mu ngi ñëw » et l'état sans données (expression dodo). Jamais sur la carte, dans le suivi ou à côté des minutes. Version `-contour` sur fond sombre.
- **Ton** : direct, calme, précis ; vouvoiement en français. Nombres en chiffres, casse de phrase, pas de majuscules d'étiquette, pas d'emoji, pas de point d'exclamation.
- **Typographie française** : espace insécable avant `? ! : ;` et à l'intérieur des guillemets « ».
- **Wolof** : seules les phrases de marque sont validées (« Ana bus bi ? », « Mu ngi ñëw », « bul xaar ba sonn », « Kaay »). Ne traduis rien d'autre toi-même : crée les clés dans le fichier wolof avec la valeur française et le commentaire `// À traduire`.

## Accessibilité et performance

- Contraste d'au moins 4,5:1 pour le texte et 3:1 pour les bords et les pictos, dans les deux thèmes.
- Zones tactiles d'au moins 48 px, focus visible avec `--anneau-focus`, vrais `<button>`, `<a>` et `<label>`.
- Le badge de ligne est lu « Ligne 23 » par les lecteurs d'écran.
- Avec `prefers-reduced-motion`, coupe l'onde du repère et le point qui pulse.
- Utilisable dès 360 px de large, lisible en plein soleil, léger sur une connexion 3G : pas de bibliothèque lourde inutile, images en SVG.

## Façon de travailler

- Avance par petites étapes. À la fin de chacune : ce qui a changé, comment le tester, et une explication simple en français du code important, car Mouhamed apprend.
- Commentaires de code en français ; noms de composants et d'écrans en français, comme dans la charte.
- Compare ton rendu aux PNG de `maquettes/png/` avant de dire qu'un écran est fini.
- Ne modifie pas `design/` (sources officielles) : copie ce dont tu as besoin dans `src/`.
- Quand une information manque, pose la question au lieu d'inventer.

## Lien utile

Fichier Figma avec les fondations, les composants et deux écrans de l'appli : https://www.figma.com/design/wGqhj49LtL3ZgZkPCDsFJB (facultatif ; le kit fait foi).
