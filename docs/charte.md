# Charte Ana Bus

Cette charte fait foi. Les noms entre accents graves (`jaune`, `titre-1`, `rayon-md`…) sont les variables de `design/tokens.css` (par exemple `var(--jaune)`) et les styles de texte de `design/tokens.json`. Les fichiers cités sont dans `design/logos/`, `design/mascotte/` et `design/icones/`.

Ana Bus montre où se trouve un bus à Dakar et dans combien de minutes il arrive. La marque répond à la question que chacun se pose à l'arrêt, « Ana bus bi ? », avec deux couleurs prises à la rue : le jaune des cars rapides et le bleu nuit de l'Atlantique. Elle doit se lire en une seconde, en plein soleil, sur un petit téléphone.

Signature : **Ana Bus — bul xaar ba sonn** (« n'attends plus jusqu'à l'épuisement »).

## Contenu et ton

Parlez comme un voisin bien informé : direct, calme, précis. L'usager attend sous le soleil ; chaque mot doit lui faire gagner du temps.

- Donnez l'information d'abord, la phrase ensuite : « 4 min », puis « Vers Petersen ».
- Écrivez les nombres en chiffres, toujours : « dans 4 min », jamais « dans quatre minutes ».
- Écrivez les lignes comme sur le bus : « Ligne 23 », « B1 », « 16A ».
- Phrases courtes, casse de phrase partout (« Voir le bus », pas « VOIR LE BUS »).
- En français, vouvoyez. En wolof, tutoyez, comme dans la rue : « bul xaar ».
- Le wolof est une voix de la marque, pas une décoration : « Mu ngi ñëw » remplace le chiffre quand le bus est à moins d'une minute ; « Ana bus bi ? » ouvre l'écran d'accueil.
- Pas d'emoji, pas de point d'exclamation, pas de superlatif.
- Quand l'information manque, dites-le et proposez la suite : « Position inconnue pour la ligne 23. Horaire prévu : 12 min. »
- Les erreurs ne s'excusent pas : « Aucune ligne 230. Vérifiez le numéro sur le bus. »
- Typographie française : espace insécable avant ? ! : ; et à l'intérieur des guillemets « », pour qu'aucun signe ne passe seul à la ligne.

| À écrire | À éviter |
| --- | --- |
| Voir le bus | Rechercher maintenant |
| Le bus arrive dans 4 min | Votre bus sera là d'ici quelques instants |
| Retard de 8 min, embouteillage à Colobane | Perturbation en cours |
| Mu ngi ñëw | Arrivée imminente ! |

## Logo

Le symbole est une bulle de parole qui sert aussi de repère sur une carte : la question « Ana ? ». Elle porte l'avant d'un bus. Le mot-symbole « ana bus » est dessiné en Unbounded Bold, en minuscules ; il ne se recompose jamais avec une police.

- `ana-bus-logo.svg` sur fond clair, `ana-bus-logo-negatif.svg` sur `nuit` ou une photo sombre.
- `ana-bus-symbole.svg` seul quand la place manque (favicon, repère, avatar de réseau social).
- `ana-bus-symbole-mono.svg` pour une impression à une couleur (tampon, gravure, ticket).
- `ana-bus-icone-app.svg` pour l'icône d'application et la photo de profil.
- `ana-bus-signature.svg` sur les affiches et la dernière image des vidéos.
- Zone de protection : la hauteur du pare-brise du bus (un sixième du symbole) tout autour.
- Tailles minimales : symbole 24 px, logo complet 32 px de haut.
- Ne changez ni les couleurs, ni les proportions, ni la place du mot-symbole. Pas d'ombre, de contour ou de dégradé. Sur une photo, posez le logo négatif sur une zone sombre et calme.

## Couleurs

Deux couleurs portent la marque ; deux autres ne servent qu'à dire un état.

- `jaune` est le bus. Réservez-le à ce qui représente un bus ou sa ligne : repère sur la carte, badge de ligne, bouton principal. Un seul bouton jaune par écran.
- En thème clair, `jaune` ne se pose jamais seul sur `fond` (1,6:1) : il porte toujours un contour ou un contenu `sur-jaune`.
- `encre` sert au texte sur `fond`, `fond-carte`, `fond-eleve` et les fonds doux ; `encre-douce` aux métadonnées, sur les trois fonds.
- `nuit` est l'aplat de marque : bandeaux, affiches, tuile de l'icône. Texte posé dessus en `sur-nuit`.
- `bleu` trace les lignes sur la carte et colore les liens (`lien`).
- `vert` veut dire « le bus arrive » ou « en direct », rien d'autre ; `corail` veut dire « retard ou incident », rien d'autre. Jamais pour décorer.
- Le fond des écrans reste `fond` ; la carte et les zones en retrait sont en `fond-carte` ; ce qui flotte au-dessus est en `fond-eleve` avec `ombre-feuille`.

## Typographie

Deux familles, deux rôles bien séparés.

- **Unbounded** (`display`) est la voix : le logo, les titres d'écran (`titre-1`, `titre-2`) et les grandes accroches (`marque`). Large et ronde, elle rappelle les lettres peintes des cars rapides.
- **Atkinson Hyperlegible Next** (`texte`) est tout ce qui se lit vite : le temps d'attente (`minutes`), les numéros de ligne (`ligne`), les arrêts (`corps-fort`), le texte (`corps`) et les métadonnées (`legende`). Elle distingue 1, l et I, 0 et O : un numéro de ligne se lit sans hésiter. Son zéro barré est voulu ; gardez-le.
- N'écrivez jamais un numéro de ligne en Unbounded : son 0 ressemble à son O.
- Le temps d'attente est le chiffre le plus grand de l'écran, en chiffres tabulaires, pour qu'il ne saute pas quand il change.
- Pas de majuscules pour les étiquettes ; pas d'italique pour accentuer un mot.

## Espace, arrondis, élévation

- Espacement sur une base de 4 px : `espace-4` pour la marge des écrans et des cartes, `espace-6` entre deux blocs, `espace-8` entre deux sections.
- Zones tactiles d'au moins 48 px de haut : boutons et champ de recherche.
- Arrondis doux comme la bulle du logo : `rayon-md` pour boutons, champs et cartes, `rayon-lg` pour les feuilles posées sur la carte, `rayon-plein` pour les badges de ligne, les pastilles et les repères.
- Une seule ombre, `ombre-feuille`, pour ce qui flotte au-dessus de la carte. Pas d'ombre sur le reste.

## États du bus

Chaque état porte une couleur, un picto et un mot ; la couleur ne suffit jamais seule.

| État | Pastille | Quand |
| --- | --- | --- |
| En direct | `vert` sur `vert-doux`, point qui pulse | La position vient du bus, à l'instant |
| Arrive | aplat `vert`, texte `sur-vert`, picto bus | Moins de 3 min ; sous 1 min, « Mu ngi ñëw » remplace le chiffre |
| Retard | `corail` sur `corail-doux`, picto alerte | Retard ou déviation, avec la raison quand elle est connue |
| Horaire prévu | `encre-douce` sur `fond-carte`, picto horloge | Pas de position en direct : l'heure vient de l'horaire |

« Arrive » (aplat foncé) et « Retard » (fond clair) se distinguent par la luminosité, pas seulement par la teinte, pour les personnes daltoniennes.

## Carte

- Le bus est un disque `jaune` cerclé de `sur-jaune`, avec l'avant du bus du logo et l'étiquette de sa ligne en `nuit` (`RepereBus`).
- La ligne suivie est tracée en `bleu`, 5 px ; les arrêts sont des disques `fond` cerclés d'`encre`. L'arrêt choisi est surligné en `jaune-doux`.
- Fond de carte sobre et désaturé, pour que seuls le bus et sa ligne ressortent.

## Images et mouvement

- Photos réelles de Dakar et de ses usagers : arrêts, BRT, cars Tata, lumière naturelle. Pas de banque d'images. La seule illustration de la marque est Kaay, la mascotte (ci-dessous).
- Un seul mouvement permanent : l'onde du bus en direct sur la carte. Le reste ne bouge qu'en réponse à un geste.
- Respectez « réduire les animations » : l'onde et le point pulsé s'arrêtent.

## Mascotte : Kaay

Kaay (« viens ! » en wolof) est le bus du symbole devenu personnage : ses phares sont ses yeux, ses rétroviseurs ses mains, son bandeau de destination porte son nom. Il rend la marque chaleureuse là où l'usager n'attend pas une information urgente.

| Expression | Fichier | Quand |
| --- | --- | --- |
| Content | `kaay-content.svg` | Bienvenue, profil, réseaux sociaux |
| Salut | `kaay-salut.svg` | Premier lancement, accueil des abonnés |
| Mu ngi ñëw | `kaay-mu-ngi-new.svg` | Notification : le bus arrive dans moins d'une minute |
| Oups | `kaay-oups.svg` | Aucun résultat, numéro inconnu, erreur |
| Dodo | `kaay-dodo.svg` | Pas de position en direct, service de nuit |

- Une seule apparition de Kaay par écran, à 48 px minimum.
- Sur `nuit`, une photo ou tout fond sombre, utilisez la version `-contour` (contour blanc) ; sur `fond`, `fond-carte` ou `jaune`, la version simple ou la version `-contour`.
- Kaay n'apparaît jamais sur la carte, dans le suivi d'un bus ni à côté des minutes d'attente : là, seule l'information compte.
- Il ne remplace jamais le logo et ne se recolore pas.
- Quand il parle, Kaay dit « je », vouvoie en français et tutoie en wolof, comme le reste de la marque : « Salut, moi c'est Kaay. »

## Iconographie

Pictos maison sur une grille de 24 px, trait de 2 px, extrémités arrondies, une seule encre (`encre`) : `recherche`, `arret`, `bus`, `horloge`, `alerte`, `direct`, et pour l'interface `retour`, `suivant`, `cloche`, `localiser`, `fermer`, `plus`, `moins`. Dans l'interface, ils prennent la couleur du texte voisin. Pas d'emoji à la place d'un picto.

## Accessibilité

- Texte à 4,5:1 au moins sur ses fonds, dans les deux thèmes ; chaque note de couleur nomme ses fonds.
- Focus clavier : `anneau-focus`, 2 px de la couleur du fond puis 2 px de `bleu` plein, sur tous les éléments actifs.
- Bord des champs en `trait-fort` (3:1), jamais en `trait`.
- Le badge de ligne lit « Ligne 23 » aux lecteurs d'écran, pas seulement « 23 ».

## Composants

L'implémentation de référence est dans `design/composants-reference/` (`bundle.js`, `bundle.css`, types dans `index.d.ts`, règles d'usage dans `README.md`). Réécris ces composants en TypeScript dans le projet avec les mêmes noms, propriétés et rendus : `Bouton`, `BadgeLigne`, `Statut`, `CarteArrivee`, `RechercheLigne`, `RepereBus`. Ajoute `ArretListe` (la liste des prochains arrêts du suivi), `Kaay` (une image de la mascotte avec son expression), la barre de navigation et la feuille du bas, sur le modèle des maquettes.

Construis un écran avec `RechercheLigne` en haut, `CarteArrivee` pour chaque bus attendu et `RepereBus` sur la carte ; `BadgeLigne` et `Statut` se réutilisent partout ailleurs, `Bouton` pour toute action.
