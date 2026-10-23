# Composants de référence

Implémentation de référence (React 18, sans JSX) : `bundle.js` + `bundle.css`, types dans `index.d.ts`. À réécrire proprement en composants TypeScript dans le projet, avec les mêmes noms, props et rendus.

## Bouton

Le bouton d'action d'Ana Bus, avec un libellé qui dit exactement ce qui va se passer.

**À fournir** : `children` (le libellé, un verbe : « Voir le bus », « Suivre cette ligne »), `variante`, éventuellement `icone` et `taille`. Toutes les propriétés d'un `<button>` passent (`onClick`, `disabled`, `type`).

- `principal` : aplat `jaune`, texte `sur-jaune`. Une seule fois par écran, pour l'action qui fait avancer.
- `secondaire` : bord `trait-fort`, texte `encre`. Les autres actions.
- `discret` : texte `lien`, sans fond. Actions de troisième rang (« Changer d'arrêt »).
- `taille="lg"` (56 px) sur les écrans d'accueil et les affiches interactives ; `md` (48 px) partout ailleurs.

À faire : garder le même mot du bouton au message qui suit (« Suivre cette ligne » → « Ligne suivie »).
À éviter : deux boutons jaunes côte à côte, un libellé en majuscules, une flèche ajoutée au libellé.

## BadgeLigne

Le numéro d'une ligne dans sa pilule jaune, écrit comme sur le bus.

**À fournir** : `ligne` (une chaîne : `"23"`, `"B1"`, `"16A"`), éventuellement `reseau` (`"Dem Dikk"`, `"Tata"`, `"BRT"`) et `taille`.

- Aplat `jaune`, chiffres `sur-jaune` en Atkinson Hyperlegible Next ExtraBold, style `ligne`, cerclé de `sur-jaune` pour rester lisible sur fond blanc.
- `taille="lg"` en tête d'écran de ligne ; `md` dans les listes et les cartes.
- Les lecteurs d'écran entendent « Ligne 23 ».

À faire : le même badge partout où une ligne est nommée (carte, liste, alerte).
À éviter : changer la couleur selon le réseau, écrire le numéro en Unbounded, abréger (« L23 »).

## Statut

La pastille qui dit où en est le bus : une couleur, un picto et un mot, toujours ensemble.

**À fournir** : `type` (`direct`, `proche`, `retard`, `prevu`) ; `children` seulement pour préciser le mot (« Retard de 8 min »).

| `type` | Mot par défaut | Rendu |
| --- | --- | --- |
| `direct` | En direct | `vert` sur `vert-doux`, point qui pulse |
| `proche` | Arrive | aplat `vert`, texte `sur-vert`, picto bus |
| `retard` | Retard | `corail` sur `corail-doux`, picto alerte |
| `prevu` | Horaire prévu | `encre-douce` sur `fond-carte`, picto horloge |

À faire : dire la raison d'un retard quand elle est connue, dans le texte qui suit la pastille.
À éviter : une pastille sans mot, un vert ou un corail employé pour décorer, plus d'une pastille par bus.

## CarteArrivee

La carte d'un bus attendu à un arrêt : la ligne, la destination, les minutes et l'état, lisibles d'un coup d'œil.

**À fournir** : `ligne`, `destination` (« Vers Petersen »), `minutes` (un nombre), et selon les données `arret` (« Arrêt Liberté 6 »), `statut`, `motStatut` (« Retard de 8 min ») et `miseAJour` (« Mis à jour il y a 20 s »). Elle prend la largeur de son conteneur, jusqu'à 380 px.

- Les minutes sont le plus grand chiffre de l'écran (style `minutes`, chiffres tabulaires).
- À 1 min ou moins, « Mu ngi ñëw » remplace le chiffre, en Unbounded `vert`.
- Sans `statut`, la carte choisit : `proche` sous 3 min, `direct` au-delà.
- Fond `fond-eleve`, `ombre-feuille`, `rayon-md` : elle flotte au-dessus de la carte.

À faire : empiler les cartes de la plus proche à la plus lointaine ; afficher l'heure de mise à jour quand la position est en direct.
À éviter : un compte à rebours en secondes, une carte sans ligne, plusieurs pastilles par carte.

## RechercheLigne

Le champ « numéro du bus » et son bouton : le premier geste de l'appli, toujours en haut de l'écran.

**À fournir** : `onSubmit` (reçoit le numéro saisi) ; au choix `valeur` + `onChange` (contrôlé) ou `defaut` (libre). `placeholder` et `action` changent le texte d'aide et le libellé du bouton.

- Champ de 48 px, bord `trait-fort`, texte saisi en gras `encre` ; au focus, bord `bleu` et `anneau-focus`.
- Le bouton est le `Bouton` principal de l'écran : « Voir le bus ».
- Le libellé « Numéro du bus » est lu par les lecteurs d'écran.

À faire : accepter les lettres (« B1 », « 16A ») et proposer les lignes proches sous le champ.
À éviter : un second bouton jaune sur le même écran, un texte d'aide qui disparaît au profit d'un libellé vide.

## RepereBus

Le bus sur la carte : un disque jaune cerclé de nuit qui porte l'avant du bus du logo, avec l'étiquette de sa ligne.

**À fournir** : `ligne` (l'étiquette), `direct` (`false` quand la position est estimée : pas d'onde), et `style` pour le placer en absolu sur la carte. Le conteneur de la carte est en `position: relative`.

- Disque `jaune`, contour et picto `sur-jaune`, `ombre-feuille` : il se voit sur un fond clair comme sombre.
- L'onde jaune n'apparaît que pour une position en direct ; elle s'arrête si l'usager a réduit les animations.
- Étiquette de ligne en aplat `nuit`, texte `sur-nuit`.

À faire : tracer la ligne suivie en `bleu` sous le repère, arrêts en disques `fond` cerclés d'`encre`.
À éviter : un repère d'une autre couleur pour un autre réseau, deux ondes à l'écran pour le même bus.
