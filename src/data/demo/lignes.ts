import type { Coord, Ligne } from '../../donnees/types';
import { ARRETS } from './arrets';

/**
 * Trace un parcours « en équerre » entre les arrêts, comme dans les rues :
 * on avance d'abord en longitude, puis en latitude, en alternant à chaque tronçon.
 */
function tracer(arrets: string[]): Coord[] {
  const points = arrets.map((id) => {
    const arret = ARRETS.find((a) => a.id === id);
    if (!arret) throw new Error(`Arrêt inconnu : ${id}`);
    return arret.coord;
  });
  const trace: Coord[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]];
    const coude: Coord = i % 2 ? [b[0], a[1]] : [a[0], b[1]];
    trace.push(coude, b);
  }
  return trace;
}

function ligne(l: Omit<Ligne, 'trace'>): Ligne {
  return { ...l, trace: tracer(l.arrets) };
}

// DONNÉES FICTIVES : numéros, tracés, ordres d'arrêts, nombres de bus, vitesses et retards inventés.
export const LIGNES: Ligne[] = [
  ligne({
    numero: '2', reseau: 'ddd', destination: 'Daroukhane', bus: 4, vitesse: 18, direct: true,
    arrets: ['petersen', 'colobane', 'hlm', 'patte-doie', 'daroukhane'],
  }),
  ligne({
    numero: '20', reseau: 'ddd', destination: 'Place Leclerc', bus: 2, vitesse: 17, direct: true,
    arrets: ['grand-medine', 'liberte-6', 'sacre-coeur', 'fass', 'place-leclerc'],
  }),
  ligne({
    numero: '23', reseau: 'ddd', destination: 'Petersen', bus: 5, vitesse: 22, direct: true,
    arrets: ['parcelles', 'grand-yoff', 'liberte-6', 'sacre-coeur', 'colobane', 'petersen'],
  }),
  ligne({
    numero: '25', reseau: 'tata', destination: 'Keur Massar', bus: 3, vitesse: 20, direct: false,
    arrets: ['colobane', 'hlm', 'patte-doie', 'pikine', 'keur-massar'],
  }),
  ligne({
    numero: 'B1', reseau: 'brt', destination: 'Guédiawaye', bus: 5, vitesse: 24, direct: true,
    arrets: ['petersen', 'colobane', 'grand-medine', 'parcelles', 'guediawaye'],
  }),
  ligne({
    numero: '16A', reseau: 'tata', destination: 'Keur Massar', bus: 4, vitesse: 18, direct: true,
    arrets: ['colobane', 'sacre-coeur', 'liberte-6', 'grand-yoff', 'pikine', 'keur-massar'],
    incident: { minutes: 8, raison: 'Embouteillage à Colobane' },
  }),
];

/** L'arrêt par défaut quand la position de l'usager est inconnue. */
export const ARRET_PAR_DEFAUT = 'liberte-6';
