// Textes en wolof. Seules les phrases de marque sont validées : « Ana bus bi ? », « Mu ngi ñëw »,
// « bul xaar ba sonn » et « Kaay ». Tout le reste garde la valeur française en attendant la
// traduction fournie par l'équipe : ne traduisez rien vous-même.
import type { Cle } from './fr';

export const wo: Record<Cle, string> = {
  'demo.bandeau': 'Démo : données fictives', // À traduire
  'horsConnexion': "Hors connexion : données d'il y a {minutes} min.", // À traduire
  'retour': 'Retour', // À traduire
  'retourAccueil': "Retour à l'accueil", // À traduire
  'fermer': 'Fermer', // À traduire
  'min': 'min', // À traduire
  'minutes': '{minutes} min', // À traduire
  'muNgiNew': 'Mu ngi ñëw',
  'ligne': 'Ligne {ligne}', // À traduire
  'ligneVh': 'Ligne ', // À traduire
  'vers': 'Vers {destination}', // À traduire
  'arret': 'Arrêt {nom}', // À traduire
  'station': 'Station {nom}', // À traduire
  'maj': 'Mis à jour il y a {secondes} s', // À traduire
  'positionInconnue': 'Position inconnue pour la ligne {ligne}', // À traduire
  'positionInconnueSuivi': 'Position inconnue pour la ligne {ligne}. Horaire prévu : {minutes} min.', // À traduire
  'retardDe': 'Retard de {minutes} min', // À traduire
  'busEnCirculation': '{reseau}, {n} bus en circulation', // À traduire
  'horairesSeulement': '{reseau}, horaires prévus seulement', // À traduire
  'distanceM': '{n} m', // À traduire
  'distanceKm': '{n} km', // À traduire
  'statut.direct': 'En direct', // À traduire
  'statut.proche': 'Arrive', // À traduire
  'statut.retard': 'Retard', // À traduire
  'statut.prevu': 'Horaire prévu', // À traduire
  'recherche.libelle': 'Numéro du bus', // À traduire
  'recherche.action': 'Voir le bus', // À traduire
  'recherche.placeholderAppli': 'Ex. 23 ou B1', // À traduire
  'recherche.placeholderSite': 'Numéro du bus, ex. 23', // À traduire
  'repere.bus': 'Bus ligne {ligne}', // À traduire
  'repere.direct': ', position en direct', // À traduire
  'repere.estime': ', position estimée', // À traduire
  'arrets.votreArret': 'votre arrêt', // À traduire
  'arrets.terminus': 'terminus', // À traduire
  'nav.libelle': 'Navigation principale', // À traduire
  'nav.accueil': 'Accueil', // À traduire
  'nav.mesLignes': 'Mes lignes', // À traduire
  'nav.alertes': 'Alertes', // À traduire
  'bienvenue.titre': "Salut, moi c'est Kaay.", // À traduire
  'bienvenue.texte': 'Je vous dis où est votre bus et dans combien de minutes il arrive. Sans inscription.', // À traduire
  'bienvenue.langue': "Langue de l'appli", // À traduire
  'langue.fr': 'Français',
  'langue.wo': 'Wolof',
  'bienvenue.action': "C'est parti", // À traduire
  'accueil.titre': 'Ana bus bi ?',
  'accueil.texte': 'Tapez le numéro de votre bus pour le voir arriver.', // À traduire
  'accueil.presDeVous': 'Près de vous', // À traduire
  'accueil.arretDistance': 'Arrêt {nom}, à {distance}', // À traduire
  'accueil.positionRefusee': 'Autorisez la position pour voir les arrêts près de vous.', // À traduire
  'accueil.positionEnCours': 'Recherche de votre position.', // À traduire
  'accueil.arretParDefaut': 'Arrêt {nom}, arrêt par défaut', // À traduire
  'accueil.aucunBus': 'Aucun bus attendu près de vous pour le moment.', // À traduire
  'recherche.recentes': 'Vos lignes récentes', // À traduire
  'recherche.commencant': 'Lignes commençant par {saisie}', // À traduire
  'recherche.toutes': 'Toutes les lignes', // À traduire
  'recherche.aucunDebut': 'Aucune ligne ne commence par {saisie}.', // À traduire
  'recherche.aideTitre': 'Vous ne connaissez pas le numéro ?', // À traduire
  'recherche.aideTexte': 'Voyez les bus qui passent à votre arrêt.', // À traduire
  'recherche.arretsProches': 'Arrêts proches', // À traduire
  'aucune.titre': 'Aucune ligne {numero}', // À traduire
  'aucune.texte': "Vérifiez le numéro écrit à l'avant du bus. Vous cherchiez peut-être :", // À traduire
  'aucune.aide': 'Pas sûr du numéro ? Voyez les bus qui passent près de vous.', // À traduire
  'suivi.carte': 'Carte de la ligne {ligne}', // À traduire
  'suivi.avantVotreArret': 'avant votre arrêt, {arret}', // À traduire
  'suivi.avant': 'avant {arret}', // À traduire
  'suivi.mePrevenir': 'Me prévenir à {minutes} min', // À traduire
  'suivi.alerteActive': 'Alerte à {minutes} min', // À traduire
  'suivi.signaler': 'Signaler un problème', // À traduire
  'suivi.ajouterFavori': 'Ajouter à mes lignes', // À traduire
  'suivi.retirerFavori': 'Retirer de mes lignes', // À traduire
  'suivi.favoriAjoute': 'Ligne {ligne} ajoutée à mes lignes.', // À traduire
  'suivi.changerArret': "Changer d'arrêt", // À traduire
  'suivi.votreArret': 'Votre arrêt', // À traduire
  'suivi.busSuivants': 'Bus suivants', // À traduire
  'suivi.positionDirect': 'Position en direct', // À traduire
  'suivi.horairePrevu': 'Horaire prévu', // À traduire
  'suivi.aucunBus': 'Aucun bus attendu à cet arrêt pour le moment.', // À traduire
  'suivi.arretUsagerCarte': '{arret}, votre arrêt', // À traduire
  'carte.zoomer': 'Zoomer', // À traduire
  'carte.dezoomer': 'Dézoomer', // À traduire
  'carte.meLocaliser': 'Me localiser', // À traduire
  'carte.legendeBus': 'Bus de la ligne {ligne}', // À traduire
  'carte.legendeTrajet': 'Trajet', // À traduire
  'carte.legendeArret': 'Arrêt', // À traduire
  'carte.votrePosition': 'Votre position', // À traduire
  'accueil.loin': "Vous êtes loin des lignes de la démo : voici l'arrêt {nom}.", // À traduire
  'carte.positionRefusee': 'Position indisponible. Autorisez la position dans votre navigateur.', // À traduire
  'prevenir.titre': "Vous prévenir avant l'arrivée", // À traduire
  'prevenir.texte': "Ligne {ligne} vers {destination}, à l'arrêt {arret}. La notification arrive tant qu'Ana Bus reste ouvert.", // À traduire
  'prevenir.legende': "Délai de l'alerte", // À traduire
  'prevenir.option': 'Quand il est à {minutes} min', // À traduire
  'prevenir.activer': "Activer l'alerte", // À traduire
  'prevenir.annuler': 'Annuler', // À traduire
  'prevenir.confirmation': 'Alerte activée : ligne {ligne}, à {minutes} min de {arret}.', // À traduire
  'prevenir.refusee': 'Notifications refusées. Ana Bus vous préviendra dans l\'appli.', // À traduire
  'notif.titre': 'Ana Bus',
  'notif.texte': 'Le {ligne} vers {destination} arrive à {arret} dans {minutes} min.', // À traduire
  'notif.texteProche': 'Le {ligne} vers {destination} arrive à {arret}.', // À traduire
  'signaler.titre': 'Signaler un problème', // À traduire
  'signaler.texte': "Ligne {ligne} vers {destination}, à l'arrêt {arret}. Votre signalement aide les autres usagers.", // À traduire
  'signaler.legende': 'Type de problème', // À traduire
  'signaler.plein': 'Bus plein', // À traduire
  'signaler.panne': 'Panne', // À traduire
  'signaler.deviation': 'Déviation', // À traduire
  'signaler.passe': "Passé sans s'arrêter", // À traduire
  'signaler.envoyer': 'Envoyer le signalement', // À traduire
  'signaler.confirmation': 'Signalement envoyé. Merci.', // À traduire
  'mesLignes.titre': 'Mes lignes', // À traduire
  'mesLignes.texte': "Vos trajets de tous les jours, en un coup d'œil.", // À traduire
  'mesLignes.ajouter': 'Ajouter une ligne', // À traduire
  'mesLignes.vide': 'Aucune ligne enregistrée. Ouvrez une ligne, puis touchez « Ajouter à mes lignes ».', // À traduire
  'mesLignes.retirer': 'Retirer la ligne {ligne}', // À traduire
  'alertes.titre': 'Alertes', // À traduire
  'alertes.texte': 'Les alertes actives sur cet appareil.', // À traduire
  'alertes.vide': 'Aucune alerte active. Ouvrez une ligne, puis touchez « Me prévenir ».', // À traduire
  'alertes.detail': 'Alerte à {minutes} min de {arret}', // À traduire
  'alertes.supprimer': "Supprimer l'alerte", // À traduire
  'introuvable.titre': 'Page introuvable', // À traduire
  'introuvable.texte': "Cette adresse n'existe pas. Revenez à l'accueil pour chercher votre bus.", // À traduire
  'introuvable.action': "Aller à l'accueil", // À traduire
  'site.accueil': 'Ana Bus, accueil', // À traduire
  'site.nav.comment': 'Comment ça marche', // À traduire
  'site.nav.reseaux': 'Les réseaux', // À traduire
  'site.nav.appli': "L'appli", // À traduire
  'site.voirMonBus': 'Voir mon bus', // À traduire
  'site.hero.titre': 'Ana bus bi ?',
  'site.hero.texte': "Tapez le numéro de votre bus et voyez-le arriver en direct sur la carte. Sans inscription, sur le site ou dans l'appli.", // À traduire
  'site.hero.bientot': 'Bientôt pour les bus Dem Dikk, Tata et BRT.', // À traduire
  'site.comment.titre': 'Comment ça marche', // À traduire
  'site.comment.texte': "Ana Bus suit les bus en temps réel et calcule le temps qu'il leur reste jusqu'à votre arrêt.", // À traduire
  'site.etape1.titre': 'Tapez le numéro', // À traduire
  'site.etape1.texte': 'Le numéro écrit sur le bus : 23, B1, 16A. Ana Bus le reconnaît tout de suite.', // À traduire
  'site.etape2.titre': 'Voyez-le sur la carte', // À traduire
  'site.etape2.texte': 'Le bus avance en direct sur sa ligne, avec le nombre de minutes avant votre arrêt.', // À traduire
  'site.etape3.titre': 'Partez au bon moment', // À traduire
  'site.etape3.texte': 'Demandez une alerte : votre téléphone vous prévient quand le bus approche.', // À traduire
  'site.muNgi.texte': "Quand votre bus est à moins d'une minute, Ana Bus vous le dit comme on le dit à l'arrêt : il arrive.", // À traduire
  'site.muNgi.langues': "L'appli parle français et wolof.", // À traduire
  'site.reseaux.titre': 'Tous les bus de Dakar au même endroit', // À traduire
  'site.reseaux.texte': 'Une seule appli pour les trois grands réseaux. Nous commençons par une ligne pilote, puis nous ajoutons les autres.', // À traduire
  'site.reseaux.ddd': 'Les bus de la société publique, en ville et en banlieue.', // À traduire
  'site.reseaux.tata': "Les minibus des opérateurs de l'AFTU, le plus grand réseau de la ville.", // À traduire
  'site.reseaux.brt': 'Les bus rapides sur voie réservée, de Guédiawaye à Petersen.', // À traduire
  'site.bientot': 'Bientôt', // À traduire
  'site.appli.titre': 'Ana Bus dans votre poche', // À traduire
  'site.appli.texte': "Retrouvez vos lignes, recevez une alerte avant l'arrivée du bus, et gardez Ana Bus léger, même avec une petite connexion.", // À traduire
  'site.appli.android': 'Bientôt sur Android', // À traduire
  'site.appli.iphone': 'Bientôt sur iPhone', // À traduire
  'site.appli.apercu': "Aperçu de l'accueil de l'appli", // À traduire
  'site.pied.signature': 'bul xaar ba sonn',
  'site.pied.texte': 'Un projet né à Dakar, porté par Mouhamed Abdallah Lo et Seyda Mariama Wade.', // À traduire
  'site.pied.copyright': '© 2026 Ana Bus, Dakar', // À traduire
  'site.pied.liens': 'Liens du site', // À traduire
};
