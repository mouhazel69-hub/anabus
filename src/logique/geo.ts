import type { Coord } from '../donnees/types';

// Petits calculs de géographie, sans bibliothèque : distances en mètres et
// position d'un point le long d'un tracé.

const RAYON_TERRE = 6371000; // en mètres
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Distance « à vol d'oiseau » entre deux points, en mètres (formule de haversine). */
export function distance(a: Coord, b: Coord): number {
  const dLat = rad(b[1] - a[1]);
  const dLng = rad(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLng / 2) ** 2;
  return 2 * RAYON_TERRE * Math.asin(Math.sqrt(h));
}

/** Longueur totale d'un tracé, en mètres. */
export function longueur(trace: Coord[]): number {
  let total = 0;
  for (let i = 1; i < trace.length; i++) total += distance(trace[i - 1], trace[i]);
  return total;
}

/** Le point situé à `d` mètres du début du tracé. */
export function pointA(trace: Coord[], d: number): Coord {
  let reste = Math.max(0, d);
  for (let i = 1; i < trace.length; i++) {
    const [a, b] = [trace[i - 1], trace[i]];
    const l = distance(a, b);
    if (reste <= l) {
      const t = l === 0 ? 0 : reste / l;
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    }
    reste -= l;
  }
  return trace[trace.length - 1];
}

/**
 * Projette un point sur le tracé : renvoie à combien de mètres du début du tracé
 * se trouve le point du tracé le plus proche. Sert à savoir où en est un bus sur sa ligne.
 */
export function projeter(trace: Coord[], p: Coord): number {
  let meilleure = Infinity;
  let resultat = 0;
  let parcouru = 0;
  // Petite approximation : sur quelques kilomètres, on peut traiter longitude et latitude
  // comme un plan, en corrigeant la longitude par le cosinus de la latitude.
  const k = Math.cos(rad(p[1]));
  for (let i = 1; i < trace.length; i++) {
    const [a, b] = [trace[i - 1], trace[i]];
    const ax = (b[0] - a[0]) * k, ay = b[1] - a[1];
    const px = (p[0] - a[0]) * k, py = p[1] - a[1];
    const l2 = ax * ax + ay * ay;
    const t = l2 === 0 ? 0 : Math.min(1, Math.max(0, (px * ax + py * ay) / l2));
    const proche: Coord = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const ecart = distance(p, proche);
    const l = distance(a, b);
    if (ecart < meilleure) { meilleure = ecart; resultat = parcouru + l * t; }
    parcouru += l;
  }
  return resultat;
}
