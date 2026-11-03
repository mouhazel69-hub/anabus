import { describe, expect, it } from 'vitest';
import type { Coord } from '../donnees/types';
import { distance, longueur, pointA, projeter } from './geo';

const trace: Coord[] = [[-17.46, 14.70], [-17.45, 14.70], [-17.45, 14.71]];

describe('géographie', () => {
  it('mesure environ 1,1 km pour un centième de degré de latitude', () => {
    expect(distance([-17.45, 14.70], [-17.45, 14.71])).toBeCloseTo(1112, -1);
  });
  it('retrouve un point à partir de sa distance sur le tracé, et inversement', () => {
    const L = longueur(trace);
    for (const part of [0, 0.25, 0.5, 0.9, 1]) {
      const p = pointA(trace, L * part);
      expect(projeter(trace, p)).toBeCloseTo(L * part, 0);
    }
  });
  it('projette un point à côté du tracé sur son point le plus proche', () => {
    const d = projeter(trace, [-17.455, 14.701]);
    expect(d).toBeCloseTo(distance(trace[0], [-17.455, 14.70]), -1);
  });
});
