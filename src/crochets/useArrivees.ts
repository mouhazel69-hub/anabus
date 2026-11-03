import type { Ligne } from '../donnees/types';
import type { TypeStatut } from '../composants/Statut';
import { sourcePositions } from '../donnees/simulateur';
import { etatPassage, prochainsPassages, type Passage } from '../logique/arrivees';
import { arretsDe, nomComplet } from '../logique/catalogue';
import { arretLePlusProche, formaterDistance, lignesPresDe, pointParDefaut, RAYON_ZONE } from '../logique/presDeVous';
import { trouverArret } from '../logique/catalogue';
import { ARRET_PAR_DEFAUT } from '../data/demo/lignes';
import { t } from '../i18n';
import { useMaintenant } from './useTempsReel';
import type { EtatPosition } from './usePosition';

/** Les propriétés d'une CarteArrivee pour le prochain bus d'une ligne à un arrêt. */
export interface ProprietesCarte {
  ligne: string;
  destination: string;
  arret: string;
  minutes: number;
  statut: TypeStatut;
  motStatut?: string;
  miseAJour: string;
}

export function proprietesCarte(ligne: Ligne, indexArret: number, passage: Passage): ProprietesCarte {
  const etat = etatPassage(ligne, passage);
  return {
    ligne: ligne.numero,
    destination: t('vers', { destination: ligne.destination }),
    arret: nomComplet(arretsDe(ligne)[indexArret], ligne),
    minutes: passage.minutes,
    statut: etat.statut,
    motStatut: etat.mot,
    miseAJour: etat.detail,
  };
}

export const lienLigne = (ligne: Ligne, indexArret: number) => `/ligne/${ligne.numero}?arret=${ligne.arrets[indexArret]}`;

/** Le prochain bus d'une ligne à un arrêt, prêt pour une CarteArrivee (Mes lignes, Alertes). */
export function useProchainBus(ligne: Ligne | undefined, indexArret: number) {
  const maintenant = useMaintenant();
  if (!ligne || indexArret < 0) return undefined;
  const [prochain] = prochainsPassages(ligne, indexArret, sourcePositions.positions(ligne.numero, maintenant), maintenant);
  return prochain ? proprietesCarte(ligne, indexArret, prochain) : undefined;
}

/** « Près de vous » : les lignes proches de l'usager, triées de la plus proche à la plus lointaine. */
export function useArriveesPresDe(position: EtatPosition) {
  const maintenant = useMaintenant();
  const parDefaut = trouverArret(ARRET_PAR_DEFAUT)!;

  let point = pointParDefaut();
  let message: string | undefined;
  let legende = t('arret', { nom: parDefaut.nom });

  if (position.etat === 'connue') {
    const proche = arretLePlusProche(position.coord);
    if (proche.distance > RAYON_ZONE) {
      message = t('accueil.loin', { nom: parDefaut.nom });
    } else {
      point = position.coord;
      const d = formaterDistance(proche.distance);
      legende = t('accueil.arretDistance', { nom: proche.arret.nom, distance: t(d.cle, { n: d.n }) });
    }
  } else if (position.etat === 'refusee') {
    message = t('accueil.positionRefusee');
  } else {
    legende = t('accueil.positionEnCours');
  }

  const arrivees = lignesPresDe(point)
    .map(({ ligne, indexArret }) => {
      const [prochain] = prochainsPassages(ligne, indexArret, sourcePositions.positions(ligne.numero, maintenant), maintenant);
      return prochain && { ligne, carte: proprietesCarte(ligne, indexArret, prochain), lien: lienLigne(ligne, indexArret) };
    })
    .filter((x): x is NonNullable<typeof x> => !!x)
    .sort((a, b) => a.carte.minutes - b.carte.minutes);

  return { arrivees, legende, message };
}
