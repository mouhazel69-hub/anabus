import type { Ligne, PositionBus, SourceDonnee } from '../donnees/types';
import type { TypeStatut } from '../composants/Statut';
import { distancesArrets, longueurLigne } from './catalogue';
import { projeter } from './geo';
import { statutSelonMinutes } from './seuils';

/** Le passage d'un bus à un arrêt. */
export interface Passage {
  bus: string;
  /** Minutes avant l'arrivée à l'arrêt, retard compris. */
  minutes: number;
  /** Âge de la position, en secondes (« Mis à jour il y a 20 s »). */
  age: number;
  source: SourceDonnee;
  /** Où en est le bus sur la ligne, en mètres depuis le premier arrêt. */
  distance: number;
}

/** Un bus est « passé » quand il a dépassé l'arrêt de plus de 30 m. */
const MARGE_PASSE = 30;

/**
 * Les prochains passages à un arrêt, du plus proche au plus lointain.
 *
 * Pour chaque bus : on cherche où il est sur le tracé, la distance qui lui reste jusqu'à
 * l'arrêt, et on divise par la vitesse moyenne. On retire le temps écoulé depuis sa
 * dernière position, puis on ajoute le retard connu de la ligne.
 */
export function prochainsPassages(ligne: Ligne, indexArret: number, positions: PositionBus[], maintenant: number): Passage[] {
  const cible = distancesArrets(ligne)[indexArret];
  if (cible === undefined) return [];
  const v = ligne.vitesse / 3.6; // m/s
  const retard = ligne.incident?.minutes ?? 0;

  return positions
    .map((p) => {
      const distance = projeter(ligne.trace, p.coord);
      const age = Math.max(0, (maintenant - p.instant) / 1000);
      const secondes = (cible - distance) / v - age;
      return { p, distance, age, secondes };
    })
    .filter((x) => x.distance <= cible + MARGE_PASSE)
    .map((x) => ({
      bus: x.p.id,
      minutes: Math.max(0, Math.round(Math.max(0, x.secondes) / 60) + retard),
      age: Math.round(x.age),
      source: x.p.source,
      distance: x.distance,
    }))
    .sort((a, b) => a.minutes - b.minutes);
}

/** Les minutes d'un bus jusqu'à chacun des arrêts suivants de la ligne (pour ArretListe). */
export function minutesJusquAuxArrets(ligne: Ligne, passage: Passage): number[] {
  const v = ligne.vitesse / 3.6;
  const retard = ligne.incident?.minutes ?? 0;
  return distancesArrets(ligne).map((d) =>
    Math.max(0, Math.round(Math.max(0, (d - passage.distance) / v - passage.age) / 60) + retard),
  );
}

/** La part du parcours déjà faite, entre 0 et 1. */
export function avancement(ligne: Ligne, passage: Passage): number {
  return passage.distance / longueurLigne(ligne);
}

/** Ce qu'affichent la pastille et la ligne de détail pour un passage. */
export interface EtatPassage {
  statut: TypeStatut;
  /** Mot de la pastille s'il diffère du mot par défaut : « Retard de 8 min ». */
  mot?: string;
  /** La ligne sous la pastille : « Mis à jour il y a 20 s », « Embouteillage à Colobane »… */
  detail: string;
}

export function etatPassage(ligne: Ligne, passage: Passage): EtatPassage {
  if (passage.source === 'prevu') {
    return { statut: 'prevu', detail: `Position inconnue pour la ligne ${ligne.numero}` };
  }
  if (ligne.incident) {
    return { statut: 'retard', mot: `Retard de ${ligne.incident.minutes} min`, detail: ligne.incident.raison };
  }
  return { statut: statutSelonMinutes(passage.minutes), detail: `Mis à jour il y a ${passage.age} s` };
}
