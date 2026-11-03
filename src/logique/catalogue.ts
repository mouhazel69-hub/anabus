import type { Arret, Ligne, Reseau } from '../donnees/types';
import { ARRETS } from '../data/demo/arrets';
import { LIGNES } from '../data/demo/lignes';
import { RESEAUX } from '../data/demo/reseaux';
import { longueur, projeter } from './geo';

// L'accès aux lignes, arrêts et réseaux. Les écrans passent par ici, jamais
// directement par les fichiers de démo : demain, seules ces fonctions changeront.

/** Met un numéro saisi sous la forme écrite sur le bus : « b1 » → « B1 », « ligne 23 » → « 23 ». */
export function normaliserNumero(saisie: string): string {
  return saisie.trim().toUpperCase().replace(/^LIGNE\s*/, '').replace(/\s+/g, '');
}

export function toutesLesLignes(): Ligne[] {
  return LIGNES;
}

/** La ligne qui porte ce numéro, quelle que soit la casse ; undefined si elle n'existe pas. */
export function trouverLigne(numero: string): Ligne | undefined {
  const n = normaliserNumero(numero);
  return LIGNES.find((l) => l.numero.toUpperCase() === n);
}

export function trouverArret(id: string): Arret | undefined {
  return ARRETS.find((a) => a.id === id);
}

export function tousLesArrets(): Arret[] {
  return ARRETS;
}

export function reseauDe(ligne: Ligne): Reseau {
  return RESEAUX.find((r) => r.id === ligne.reseau)!;
}

export function tousLesReseaux(): Reseau[] {
  return RESEAUX;
}

/** Les arrêts d'une ligne, dans l'ordre. */
export function arretsDe(ligne: Ligne): Arret[] {
  return ligne.arrets.map((id) => trouverArret(id)!);
}

/** « Arrêt Liberté 6 », ou « Station Grand Médine » sur le BRT. */
export function nomComplet(arret: Arret, ligne?: Ligne): string {
  return `${ligne?.reseau === 'brt' ? 'Station' : 'Arrêt'} ${arret.nom}`;
}

// Les distances des arrêts le long du tracé ne changent pas : on les calcule une fois.
const cacheDistances = new Map<string, number[]>();

/** À combien de mètres du début du tracé se trouve chaque arrêt de la ligne. */
export function distancesArrets(ligne: Ligne): number[] {
  let d = cacheDistances.get(ligne.numero);
  if (!d) {
    d = arretsDe(ligne).map((a) => projeter(ligne.trace, a.coord));
    cacheDistances.set(ligne.numero, d);
  }
  return d;
}

const cacheLongueurs = new Map<string, number>();
export function longueurLigne(ligne: Ligne): number {
  let l = cacheLongueurs.get(ligne.numero);
  if (l === undefined) { l = longueur(ligne.trace); cacheLongueurs.set(ligne.numero, l); }
  return l;
}
