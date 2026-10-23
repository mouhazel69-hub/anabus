# Ana Bus — les écrans

Chaque écran a sa maquette dans `maquettes/png/` et sa version HTML statique dans `maquettes/html/` (même nom). Les textes entre guillemets sont à reprendre tels quels. Toutes les lignes, arrêts et minutes sont des exemples fictifs.

## Navigation

- **Téléphone (appli)** : barre en bas avec trois onglets, Accueil (`/app`), Mes lignes (`/mes-lignes`) et Alertes (`/alertes`, la liste des alertes actives, sur le modèle de Mes lignes). La barre apparaît sur ces trois écrans et disparaît sur le suivi, la recherche et la bienvenue. Elle figure dans le fichier Figma, pas sur les PNG.
- **Ordinateur (site)** : en-tête avec le logo, « Comment ça marche », « Les réseaux », « L'appli » et le bouton principal « Voir mon bus ».
- La route `/ligne/:numero` est la même sur les deux : la mise en page change à partir de 1024 px de large.

## Règles communes

- **Temps d'arrivée** : plus de 3 min, chiffre et statut « En direct » ; 3 min ou moins, statut « Arrive » ; 1 min ou moins, « Mu ngi ñëw » à la place du chiffre.
- **Mise à jour** : « Mis à jour il y a 20 s ». Sans position en direct, statut « Horaire prévu » et texte « Position inconnue pour la ligne 16A. Horaire prévu : 12 min. »
- **Retard** : statut « Retard de 8 min », suivi de la raison quand elle est connue (« Embouteillage à Colobane »).
- **Hors connexion** : bandeau « Hors connexion : données d'il y a 3 min. »
- **Chargement** : silhouettes grises des cartes, jamais d'écran blanc.
- **Erreur** : Kaay « oups » avec une phrase qui dit quoi faire.
- **Démo** : bandeau discret « Démo : données fictives » tant que les données sont inventées.

## 00. Bienvenue — `/bienvenue`

Maquette `appli/00-bienvenue.png`. Ne s'affiche qu'au premier lancement.

- Haut jaune de 430 px aux coins inférieurs arrondis à 40 px, logo en haut à gauche, Kaay « salut » (version contour) en 290 px.
- Titre (Unbounded 28 px) : « Salut, moi c'est Kaay. »
- Texte : « Je vous dis où est votre bus et dans combien de minutes il arrive. Sans inscription. »
- Choix de la langue en deux pilules : « Français » (choisi par défaut) et « Wolof » (`aria-pressed`).
- Bouton principal pleine largeur, grande taille : « C'est parti », vers `/app`.
- La maquette montre trois points de pagination : garde une seule diapositive et retire les points, sauf avis contraire.

## 01. Accueil — `/app`

Maquette `appli/01-accueil.png`.

- En-tête blanc : logo (132 px), titre « Ana bus bi ? » (Unbounded 30 px), texte « Tapez le numéro de votre bus pour le voir arriver. », puis RechercheLigne (placeholder « Ex. 23 ou B1 », bouton « Voir le bus »).
- Fond `--fond-carte` : titre de section « Près de vous » et légende « Arrêt Liberté 6, à 120 m ».
- Liste de CarteArrivee triées de la plus proche à la plus lointaine. Exemples : 23 « Vers Petersen » à 1 min (Mu ngi ñëw) ; B1 « Vers Guédiawaye » à 4 min ; 16A « Vers Keur Massar » à 17 min, « Retard de 8 min », « Embouteillage à Colobane ».
- Toucher une carte ouvre `/ligne/:numero`.
- Position refusée : arrêt par défaut et texte « Autorisez la position pour voir les arrêts près de vous. »

## 02. Recherche — `/recherche`

Maquette `appli/02-recherche.png`.

- En-tête : bouton retour (44 px) et RechercheLigne avec la saisie en cours.
- « Vos lignes récentes » : BadgeLigne cliquables.
- « Lignes commençant par 2 » : une rangée par ligne, avec le badge dans une colonne de 52 px, la destination (corps fort), le réseau et le nombre de bus en légende (« Dem Dikk, 4 bus en circulation »), un chevron, et un filet sous chaque rangée. Une ligne sans position en direct affiche « Tata, horaires prévus seulement ».
- Bloc d'aide sur `--fond-carte` : « Vous ne connaissez pas le numéro ? », « Voyez les bus qui passent à votre arrêt. », bouton secondaire « Arrêts proches » (picto arrêt).

## 02 bis. Aucun résultat

Maquette `appli/02b-aucun-resultat.png`. Même route ; s'affiche quand le numéro n'existe pas.

- Kaay « oups » en 200 px.
- Titre : « Aucune ligne 230 ».
- Texte : « Vérifiez le numéro écrit à l'avant du bus. Vous cherchiez peut-être : », suivi de trois BadgeLigne grands, choisis parmi les numéros les plus proches de la saisie.
- Bloc en bas : « Pas sûr du numéro ? Voyez les bus qui passent près de vous. » et bouton secondaire « Arrêts proches ».

## 03. Suivi du bus — `/ligne/:numero` sur téléphone

Maquette `appli/03-suivi.png`.

- **Carte** plein écran, sobre et désaturée : tracé de la ligne en `--bleu` 5 px, arrêts en disques blancs cerclés d'encre, arrêt de l'usager plus grand en `--jaune-doux` avec étiquette, RepereBus (avec l'onde si la position est en direct).
- **En haut** : bouton retour rond de 44 px et pilule avec BadgeLigne et destination (« Vers Petersen »), tous deux sur `--fond-eleve` avec `--ombre-feuille`.
- **Feuille du bas** (fond élevé, coins hauts arrondis à 24 px, poignée), de haut en bas :
  - statut « En direct » et « Mis à jour il y a 20 s » ;
  - minutes en 64 px ExtraBold suivies de « min », puis « avant votre arrêt, Liberté 6 » ;
  - la liste des prochains arrêts (ArretListe) le long d'un trait bleu vertical : l'arrêt de l'usager surligné en `--jaune-doux` avec un point jaune et la mention « votre arrêt », les autres arrêts en points blancs, le terminus en point plein avec la mention « terminus », chacun avec son temps ;
  - le bouton principal « Me prévenir à 2 min » (picto horloge).
- À ajouter, absent de la maquette : un lien discret « Signaler un problème », qui ouvre la feuille 05.

## 04. Me prévenir — feuille sur le suivi

Maquette `appli/04-me-prevenir.png`.

- Le suivi reste visible, assombri par `--nuit` à 50 %.
- Titre : « Vous prévenir avant l'arrivée ».
- Texte (phase 1) : « Ligne 23 vers Petersen, à l'arrêt Liberté 6. La notification arrive tant qu'Ana Bus reste ouvert. » Le texte de la maquette, « même si l'appli est fermée », ne sera vrai qu'avec les notifications push de la phase 2.
- Trois choix radio de 56 px : « Quand il est à 2 min » (par défaut), « à 5 min », « à 10 min ». Le choix actif a un fond `--jaune-doux` et un bord `--bleu` de 2 px.
- Bouton principal pleine largeur « Activer l'alerte » (picto cloche) et bouton discret « Annuler ».
- Confirmation : « Alerte activée : ligne 23, à 2 min de Liberté 6. »
- Notification : titre « Ana Bus », texte « Le 23 vers Petersen arrive à Liberté 6 dans 2 min. » Sous 1 min, titre « Mu ngi ñëw » avec l'image de Kaay « mu-ngi-new ».

## 05. Signaler un problème — feuille sur le suivi

Maquette `appli/05-signaler.png`.

- Même présentation que « Me prévenir ».
- Titre : « Signaler un problème ».
- Texte : « Ligne 23 vers Petersen, à l'arrêt Liberté 6. Votre signalement aide les autres usagers. »
- Quatre choix : « Bus plein », « Panne », « Déviation », « Passé sans s'arrêter ».
- Bouton principal « Envoyer le signalement » (picto alerte) et bouton discret « Annuler ».
- Confirmation : « Signalement envoyé. Merci. » En phase 1, le signalement est enregistré sur l'appareil.

## 06. Mes lignes — `/mes-lignes`

Maquette `appli/06-mes-lignes.png`.

- En-tête blanc : bouton retour, titre « Mes lignes » (Unbounded 28 px), texte « Vos trajets de tous les jours, en un coup d'œil. »
- Groupes nommés par l'usager, par exemple « Matin, vers le travail » et « Soir, retour », chacun avec ses CarteArrivee. Une ligne sans position affiche « Horaire prévu » et « Position inconnue pour la ligne 16A ».
- Bouton secondaire pleine largeur « Ajouter une ligne » (picto plus), vers `/recherche`.
- Les favoris sont enregistrés sur l'appareil. Les groupes peuvent attendre : une seule liste suffit en phase 1.

## Site — page d'accueil `/`

Maquettes `site/site-accueil-ordinateur.png` et `site/site-accueil-telephone.png`. Largeur de contenu 1200 px ; toutes les grilles passent sur une colonne au téléphone.

1. **En-tête** : voir Navigation.
2. **Ouverture** : titre « Ana bus bi ? » (Unbounded, de 44 à 80 px selon la largeur) ; texte « Tapez le numéro de votre bus et voyez-le arriver en direct sur la carte. Sans inscription, sur le site ou dans l'appli. » ; RechercheLigne (« Numéro du bus, ex. 23 ») ; légende « Bientôt pour les bus Dem Dikk, Tata et BRT. » À droite, une carte arrondie à 24 px avec la ligne pilote, un repère et une CarteArrivee. Une vraie carte MapLibre en lecture seule est préférable ; à défaut, l'illustration SVG de la maquette.
3. **« Comment ça marche »** : texte « Ana Bus suit les bus en temps réel et calcule le temps qu'il leur reste jusqu'à votre arrêt. », puis trois étapes numérotées : « Tapez le numéro », « Voyez-le sur la carte », « Partez au bon moment ».
4. **Bandeau nuit** : « Mu ngi ñëw » en jaune (Unbounded, de 48 à 104 px), Kaay « mu-ngi-new » version contour, texte « Quand votre bus est à moins d'une minute, Ana Bus vous le dit comme on le dit à l'arrêt : il arrive. » et « L'appli parle français et wolof. », plus une CarteArrivee à 1 min.
5. **« Tous les bus de Dakar au même endroit »** : trois cartes de réseau (Dakar Dem Dikk, Tata, BRT), chacune avec le statut « Bientôt ».
6. **Bandeau jaune « Ana Bus dans votre poche »** : texte, deux boutons nuit « Bientôt sur Android » et « Bientôt sur iPhone », et un téléphone montrant l'accueil de l'appli.
7. **Pied de page nuit** : logo négatif, « bul xaar ba sonn » en jaune, « Un projet né à Dakar, porté par Mouhamed Abdallah Lo et Seyda Mariama Wade. », les liens, et « © 2026 Ana Bus, Dakar ».

## Site — suivi d'une ligne `/ligne/:numero` sur ordinateur

Maquettes `site/site-suivi-ordinateur.png` et `site/site-suivi-telephone.png`.

- **Panneau à gauche** (de 360 à 440 px, fond blanc, filet à droite), de haut en bas :
  - le logo et RechercheLigne avec la ligne en cours ;
  - un BadgeLigne grand, « Vers Petersen » et « Dakar Dem Dikk, 5 bus en circulation » ;
  - la liste « Votre arrêt » ;
  - le bloc des minutes (statut, mise à jour, chiffre en 64 px, « avant Liberté 6 ») ;
  - « Bus suivants » : « Position en direct » 12 min, « Horaire prévu » 25 min ;
  - le bouton principal « Me prévenir à 2 min ».
- **Carte à droite** : tracé, arrêts avec étiquettes (l'arrêt de l'usager marqué « Liberté 6, votre arrêt »), deux RepereBus (l'un en direct avec l'onde, l'autre estimé sans onde), boutons « Zoomer », « Dézoomer » et « Me localiser » en haut à droite (44 px), et une légende en bas à gauche (bus de la ligne, trajet, arrêt).
- Sur téléphone, le panneau passe au-dessus de la carte, comme sur la maquette téléphone.
