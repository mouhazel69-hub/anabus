import { describe, expect, it } from 'vitest';
import { fr } from './fr';
import { wo } from './wo';
import { t, typo } from './index';

describe('textes', () => {
  it('pose une espace insécable avant ? : et dans « »', () => {
    expect(typo('Ana bus bi ?')).toBe('Ana bus bi ?');
    expect(typo('Démo : données fictives')).toBe('Démo : données fictives');
    expect(typo('« Me prévenir »')).toBe('« Me prévenir »');
  });
  it('remplace les valeurs', () => {
    expect(t('vers', { destination: 'Petersen' })).toBe('Vers Petersen');
  });
  it('a les mêmes clés en français et en wolof, sans traduction inventée', () => {
    expect(Object.keys(wo).sort()).toEqual(Object.keys(fr).sort());
    const valides = ['muNgiNew', 'accueil.titre', 'site.hero.titre', 'site.pied.signature', 'notif.titre', 'langue.fr', 'langue.wo'];
    for (const cle of Object.keys(fr) as (keyof typeof fr)[]) {
      if (!valides.includes(cle)) expect(wo[cle]).toBe(fr[cle]);
    }
  });
});
