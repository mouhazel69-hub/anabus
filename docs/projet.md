# Ana Bus — dossier de projet (résumé)

Résumé du dossier de projet du 21 octobre 2026. Les chiffres viennent des sources listées en fin de document.

## Le problème

À Dakar, l'usager attend à l'arrêt sans savoir où est son bus ni quand il arrivera. Il ne peut ni s'organiser, ni changer de moyen de transport à temps.

- L'appli officielle Dem Dikk permet d'acheter des tickets et de chercher un itinéraire, mais des usagers réclament encore le suivi GPS des bus dans leurs avis.
- Des lecteurs demandent une carte des lignes et regrettent de devoir demander aux passants quel bus prendre.
- Chaque appli officielle couvre son propre réseau ; aucune ne réunit Dem Dikk, Tata et BRT.

## La solution

Un seul geste : taper le numéro du bus pour le voir sur la carte, avec le temps d'arrivée.

1. L'usager ouvre Ana Bus dans son navigateur ou dans l'appli, sans créer de compte.
2. Il tape le numéro de sa ligne (par exemple B1) ou choisit son arrêt.
3. Il voit les bus de la ligne en direct, avec le temps estimé jusqu'à son arrêt.
4. Il peut demander une alerte quand le bus approche.

Au lancement : recherche par numéro, carte en direct, temps d'arrivée. Ensuite : alertes, lignes favorites, signalements (bus plein, panne, déviation), français et wolof, itinéraires combinant plusieurs réseaux.

## Le terrain : trois réseaux

| Réseau | Exploitant | Chiffres clés | Outil numérique actuel |
| --- | --- | --- | --- |
| Minibus Tata | AFTU (opérateurs privés) | Plus de 2 000 bus, plus d'un million de passagers par jour | Billetterie électronique en plein conflit entre deux systèmes |
| Dakar Dem Dikk | Société publique | 370 nouveaux bus ; centre de contrôle avec GPS des bus inauguré le 6 juillet 2026 | Appli Dem Dikk : tickets, itinéraires, alertes |
| BRT (SunuBRT) | Dakar Mobilité, sous l'autorité du CETUD | 18,3 km, 23 stations, un bus toutes les 6 min sur la B1 | Appli SunuBRT : horaires, itinéraires, ticket QR |

Un projet financé par l'Europe prévoit aussi 14 lignes de rabattement, 380 bus au gaz, environ 700 arrêts et un système d'information voyageurs.

## Ce qui existe déjà

Au moins six projets ont tenté de résoudre ce problème depuis 2012, et en 2026 les usagers réclament toujours le suivi en direct : le besoin reste ouvert.

| Année | Projet | Ce qu'il propose |
| --- | --- | --- |
| 2026 | Centre de contrôle Dem Dikk | GPS des bus côté exploitant, objectif : information voyageurs unifiée |
| 2025 | Appli Dem Dikk, nouvelle version | Géolocalisation des arrêts, fidélité, notifications |
| 2024 | Appli SunuBRT | Horaires, prochains passages, ticket mobile, BRT seulement |
| Récent | Bus Bi | Itinéraires Tata et Dem Dikk, covoiturage |
| 2019 | SunuBus | Arrivées en temps réel, positions partagées par les passagers, 74 lignes |
| 2018 | Weego | Temps d'arrivée en temps réel, lancée à Dakar, aujourd'hui active au Maroc |
| 2012 | Sama Yoon, Dakar Bus Time | Heure d'arrivée et position par téléphone ; horaires et itinéraires |

## Ce qui rend Ana Bus différent

- Tous les réseaux au même endroit : Dem Dikk, Tata et BRT.
- Un seul geste : taper le numéro, sans inscription.
- Le web d'abord : un site léger, sans téléchargement.
- Une voix locale : nom et slogan en wolof, interface en français et en wolof.
- Les usagers participent : signalements et partage de position.
- Une marque soignée, avec sa mascotte Kaay.

## Les données : la position des bus

| Source | Fonctionnement | Atouts | Limites |
| --- | --- | --- | --- |
| Participative | Les passagers à bord partagent leur position depuis le site | Démarrage rapide, aucun accord nécessaire | Précision variable, il faut beaucoup d'utilisateurs actifs |
| Partenariat opérateur | Accès aux positions GPS de la flotte (Dem Dikk les suit depuis juillet 2026) | Précis, tous les bus du réseau | Dépend d'un accord, délais |
| Traceurs propres | Boîtiers GPS posés avec des propriétaires de minibus | Données maîtrisées | Coût du matériel |

Choix retenu : démarrer en participatif sur une ou deux lignes pour prouver l'usage, puis présenter les résultats à Dem Dikk pour accéder à ses données GPS.

## Feuille de route

1. **Préparer** : nom, domaine, marque, logo et identité (fait).
2. **Prototype** : site léger, recherche par numéro, carte en direct. Validation 1 : un bus visible en direct. **C'est le travail confié à Claude Code** (phase 1, données simulées).
3. **Pilote** : une ou deux lignes test, mode participatif, retours d'usagers. Validation 2 : un usage quotidien prouvé.
4. **Lancement** : plus de lignes, accords avec les opérateurs, appli mobile.

## Modèle économique

Gratuit pour l'usager. Revenus envisagés : publicité locale près des arrêts, offre de tableaux de bord pour les opérateurs, vente de tickets intégrée si les opérateurs l'autorisent, concours et subventions.

## Porteurs du projet

- **Mouhamed Abdallah Lo (MALO)** : créateur visuel freelance à Dakar, designer depuis 2019, photographe, vidéaste, motion designer et artiste IA. Marque, expérience usager, contenus vidéo.
- **Seyda Mariama Wade** : développeuse, marketing digital et design graphique. Développement du service et stratégie digitale.

Partenaires visés : Dakar Dem Dikk, CETUD, AFTU, incubateurs et concours.

## Sources

- Centre de contrôle Dem Dikk, Ndarinfo : https://www.ndarinfo.com/Transport-a-Dakar-Dakar-Dem-Dikk-se-dote-d-une-tour-de-controle-numerique-pour-gerer-ses-bus-en-temps-reel_a45471.html
- Appli Dem Dikk, App Store : https://apps.apple.com/sn/app/dem-dikk/id6476461159?l=fr-FR
- Avis sur l'appli Dem Dikk, MWM : https://mwm.ai/apps/dem-dikk/6476461159
- Appli SunuBRT, App Store : https://apps.apple.com/ge/app/sunubrt/id6476969132
- SunuBRT, lignes et tarifs, Senego : https://senego.com/sunubrt-a-dakar-lignes-tarifs-et-regles-pratiques-pour-voyager-sur-183-km_2007353.html
- Bus Tata et Transpay, OSIRIS : https://www.osiris.sn/transport-urbain-les-bus-tata-bientot-a-l-arret-aftu-transpay-en-cause.html
- Réseau de bus de Dakar, Commission européenne : https://international-partnerships.ec.europa.eu/policies/global-gateway/development-dakar-bus-public-transport-network-senegal_en
- SunuBus, Financial Afrik : https://www.financialafrik.com/2019/03/26/microsoft-soutient-les-start-ups-pour-stimuler-la-croissance-economique-au-senegal
- Weego, Médias24 : https://medias24.com/2019/11/19/startups-initiative-212-founders-weego-la-startup-qui-veut-revolutionner-la-mobilite-au-maroc-et-au-senegal-6016/
- Bus Bi, MWM : https://mwm.ai/apps/bus-bi/1661159390
