import { describe, expect, it } from 'vitest';
import type { Ligne, PositionBus } from '../donnees/types';
import { distancesArrets, trouverLigne } from './catalogue';
import { pointA } from './geo';
import { etatPassage, prochainsPassages } from './arrivees';

const ligne23 = trouverLigne('23')!;
const v = ligne23.vitesse / 3.6; // m/s

/** Un bus posé à `d` mètres du début de la ligne, vu à l'instant `instant`. */
const bus = (id: string, d: number, instant = 0, source: PositionBus['source'] = 'direct'): PositionBus =>
  ({ id, ligne: '23', coord: pointA(ligne23.trace, d), instant, source });

describe('temps d\'arrivée', () => {
  const index = ligne23.arrets.indexOf('liberte-6');
  const cible = distancesArrets(ligne23)[index];

  it('divise la distance restante par la vitesse moyenne', () => {
    const [p] = prochainsPassages(ligne23, index, [bus('a', cible - v * 240)], 0);
    expect(p.minutes).toBe(4);
  });
  it('retire le temps écoulé depuis la dernière position', () => {
    const [p] = prochainsPassages(ligne23, index, [bus('a', cible - v * 240, 0)], 60_000);
    expect(p.minutes).toBe(3);
    expect(p.age).toBe(60);
  });
  it('ignore les bus déjà passés et trie du plus proche au plus lointain', () => {
    const passages = prochainsPassages(ligne23, index, [bus('loin', cible - v * 900), bus('passe', cible + 500), bus('pres', cible - v * 60)], 0);
    expect(passages.map((p) => p.bus)).toEqual(['pres', 'loin']);
  });
  it('ajoute le retard connu de la ligne', () => {
    const avecRetard: Ligne = { ...ligne23, numero: '23R', incident: { minutes: 8, raison: 'Embouteillage à Colobane' } };
    const [p] = prochainsPassages(avecRetard, index, [bus('a', cible - v * 240)], 0);
    expect(p.minutes).toBe(12);
    expect(etatPassage(avecRetard, p)).toMatchObject({ statut: 'retard', detail: 'Embouteillage à Colobane' });
  });
  it('donne le bon état selon les seuils et la source', () => {
    const [proche] = prochainsPassages(ligne23, index, [bus('a', cible - v * 120)], 0);
    expect(etatPassage(ligne23, proche).statut).toBe('proche');
    const [prevu] = prochainsPassages(ligne23, index, [bus('b', cible - v * 600, 0, 'prevu')], 0);
    expect(etatPassage(ligne23, prevu)).toMatchObject({ statut: 'prevu', detail: 'Position inconnue pour la ligne 23' });
  });
});
