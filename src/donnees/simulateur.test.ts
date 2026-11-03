import { describe, expect, it, vi } from 'vitest';
import { SimulateurPositions, PERIODE_SIGNAL } from './simulateur';
import { longueurLigne, toutesLesLignes, trouverLigne } from '../logique/catalogue';
import { projeter } from '../logique/geo';

describe('simulateur', () => {
  const sim = new SimulateurPositions();
  const t0 = 1_800_000_000_000;

  it('donne autant de bus que la ligne en compte', () => {
    for (const l of toutesLesLignes()) expect(sim.positions(l.numero, t0)).toHaveLength(l.bus);
    expect(sim.positions('999', t0)).toEqual([]);
  });
  it('fait avancer les bus le long du tracé à la vitesse de la ligne', () => {
    const ligne = trouverLigne('23')!;
    const avant = sim.positions('23', t0)[0];
    const apres = sim.positions('23', t0 + 6 * PERIODE_SIGNAL)[0];
    const parcouru = projeter(ligne.trace, apres.coord) - projeter(ligne.trace, avant.coord);
    const attendu = ((apres.instant - avant.instant) / 1000) * (ligne.vitesse / 3.6);
    // Modulo un éventuel retour au départ.
    expect(Math.abs(((parcouru % longueurLigne(ligne)) + longueurLigne(ligne)) % longueurLigne(ligne) - attendu)).toBeLessThan(5);
  });
  it('envoie les positions par à-coups, au plus toutes les 10 s', () => {
    const p = sim.positions('23', t0)[0];
    expect(t0 - p.instant).toBeGreaterThanOrEqual(0);
    expect(t0 - p.instant).toBeLessThan(PERIODE_SIGNAL);
  });
  it('marque « prévu » les lignes sans position en direct', () => {
    expect(sim.positions('25', t0).every((p) => p.source === 'prevu')).toBe(true);
    expect(sim.positions('23', t0).some((p) => p.source === 'direct')).toBe(true);
  });
  it('prévient ses abonnés à chaque intervalle', () => {
    vi.useFakeTimers();
    const s = new SimulateurPositions(undefined, 1000);
    const rappel = vi.fn();
    const fin = s.abonner(rappel);
    vi.advanceTimersByTime(3000);
    expect(rappel).toHaveBeenCalledTimes(3);
    fin();
    vi.advanceTimersByTime(3000);
    expect(rappel).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });
});
