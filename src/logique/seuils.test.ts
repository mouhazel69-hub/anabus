import { describe, expect, it } from 'vitest';
import { estMuNgiNew, statutSelonMinutes } from './seuils';

describe('seuils d\'affichage', () => {
  it('écrit « Mu ngi ñëw » à 1 min ou moins', () => {
    expect(estMuNgiNew(0)).toBe(true);
    expect(estMuNgiNew(1)).toBe(true);
    expect(estMuNgiNew(2)).toBe(false);
  });
  it('passe en « Arrive » à 3 min ou moins', () => {
    expect(statutSelonMinutes(3)).toBe('proche');
    expect(statutSelonMinutes(4)).toBe('direct');
  });
});
