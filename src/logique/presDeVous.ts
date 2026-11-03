import type { Arret, Coord, Ligne } from '../donnees/types';
import { arretsDe, toutesLesLignes, tousLesArrets, trouverArret } from './catalogue';
import { distance } from './geo';
import { ARRET_PAR_DEFAUT } from '../data/demo/lignes';

/** Une ligne est « près de vous » si l'un de ses arrêts est à moins de 1,5 km. */
export const RAYON_PROCHE = 1500;
/** Au-delà de 20 km de tout arrêt, l'usager est hors de la zone couverte. */
export const RAYON_ZONE = 20_000;

export interface LignePresDeVous { ligne: Ligne; indexArret: number; arret: Arret; distance: number }

/** L'arrêt le plus proche d'un point, toutes lignes confondues. */
export function arretLePlusProche(point: Coord): { arret: Arret; distance: number } {
  return tousLesArrets()
    .map((arret) => ({ arret, distance: distance(point, arret.coord) }))
    .sort((a, b) => a.distance - b.distance)[0];
}

/** Pour chaque ligne qui passe près du point, son arrêt le plus proche. */
export function lignesPresDe(point: Coord, lignes: Ligne[] = toutesLesLignes()): LignePresDeVous[] {
  return lignes
    .map((ligne) => {
      const candidats = arretsDe(ligne)
        // Le terminus ne compte pas : aucun bus n'y monte vers la destination.
        .slice(0, -1)
        .map((arret, i) => ({ ligne, indexArret: i, arret, distance: distance(point, arret.coord) }));
      return candidats.sort((a, b) => a.distance - b.distance)[0];
    })
    .filter((x): x is LignePresDeVous => !!x && x.distance <= RAYON_PROCHE);
}

/** Le point de départ de « Près de vous » quand la position est refusée ou trop loin. */
export function pointParDefaut(): Coord {
  return trouverArret(ARRET_PAR_DEFAUT)!.coord;
}

/** « 120 m » ou « 1,2 km », arrondi pour rester lisible. */
export function formaterDistance(m: number): { cle: 'distanceM' | 'distanceKm'; n: string } {
  if (m < 1000) return { cle: 'distanceM', n: String(Math.max(10, Math.round(m / 10) * 10)) };
  return { cle: 'distanceKm', n: (Math.round(m / 100) / 10).toLocaleString('fr-FR') };
}

/** L'index de l'arrêt d'une ligne le plus proche d'un point. */
export function indexArretProche(ligne: Ligne, point: Coord): number {
  const arrets = arretsDe(ligne).slice(0, -1);
  let meilleur = 0;
  arrets.forEach((a, i) => { if (distance(point, a.coord) < distance(point, arrets[meilleur].coord)) meilleur = i; });
  return meilleur;
}
