import type { Ligne, PositionBus, SourcePositions } from './types';
import { longueurLigne, toutesLesLignes, trouverLigne } from '../logique/catalogue';
import { pointA } from '../logique/geo';

/** Chaque bus envoie sa position toutes les 10 secondes (décalées d'un bus à l'autre). */
export const PERIODE_SIGNAL = 10_000;

/**
 * Le simulateur : il fait rouler des bus imaginaires le long du tracé de chaque ligne.
 *
 * Chaque bus avance à la vitesse moyenne de sa ligne. Arrivé au terminus, il repart du
 * premier arrêt. Les bus d'une ligne sont espacés régulièrement sur le parcours.
 * Le calcul ne dépend que de l'heure : tout le monde voit les mêmes bus au même endroit.
 */
export class SimulateurPositions implements SourcePositions {
  private abonnes = new Set<() => void>();
  private minuterie: ReturnType<typeof setInterval> | undefined;

  constructor(private lignes: Ligne[] = toutesLesLignes(), private intervalle = 1000) {}

  positions(numero: string, maintenant: number): PositionBus[] {
    const ligne = trouverLigne(numero);
    if (!ligne || !this.lignes.includes(ligne)) return [];
    const L = longueurLigne(ligne);
    const v = ligne.vitesse / 3.6; // km/h → m/s
    const tour = L / v; // durée d'un parcours complet, en secondes

    return Array.from({ length: ligne.bus }, (_, i) => {
      // Sans GPS (ligne sans direct, ou un bus sur trois), la position est estimée « maintenant » d'après l'horaire.
      const sansGps = !ligne.direct || i === 2;
      // Le bus envoie sa position par à-coups : on donne la dernière qu'il a envoyée.
      const decalage = (i * 3700) % PERIODE_SIGNAL;
      const instant = sansGps ? maintenant : Math.floor((maintenant + decalage) / PERIODE_SIGNAL) * PERIODE_SIGNAL - decalage;
      const secondes = instant / 1000 + (i * tour) / ligne.bus;
      const d = (secondes % tour) * v;
      return {
        id: `${ligne.numero}-${i + 1}`,
        ligne: ligne.numero,
        coord: pointA(ligne.trace, d),
        instant,
        source: sansGps ? 'prevu' : 'direct',
      };
    });
  }

  abonner(rappel: () => void): () => void {
    this.abonnes.add(rappel);
    if (!this.minuterie) {
      this.minuterie = setInterval(() => this.abonnes.forEach((r) => r()), this.intervalle);
    }
    return () => {
      this.abonnes.delete(rappel);
      if (this.abonnes.size === 0 && this.minuterie) {
        clearInterval(this.minuterie);
        this.minuterie = undefined;
      }
    };
  }
}

/** La source utilisée par toute l'appli. Pour passer au direct, on ne change que cette ligne. */
export const sourcePositions: SourcePositions = new SimulateurPositions();
