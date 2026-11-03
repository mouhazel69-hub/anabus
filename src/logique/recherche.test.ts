import { describe, expect, it } from 'vitest';
import { normaliserNumero, trouverLigne } from './catalogue';
import { ecart, lignesCommencantPar, lignesProches, rechercher } from './recherche';

const numeros = (l: { numero: string }[]) => l.map((x) => x.numero);

describe('recherche de ligne', () => {
  it('ne tient pas compte des majuscules ni des espaces', () => {
    expect(normaliserNumero(' b1 ')).toBe('B1');
    expect(normaliserNumero('ligne 16a')).toBe('16A');
    expect(trouverLigne('b1')?.numero).toBe('B1');
    expect(trouverLigne('16a')?.numero).toBe('16A');
  });
  it('propose les lignes qui commencent par la saisie, dans l\'ordre du bus', () => {
    expect(numeros(lignesCommencantPar('2'))).toEqual(['2', '20', '23', '25']);
    expect(numeros(lignesCommencantPar('b'))).toEqual(['B1']);
    expect(lignesCommencantPar('')).toEqual([]);
  });
  it('trouve les numéros les plus proches d\'une saisie inconnue (maquette 02 bis)', () => {
    expect(numeros(lignesProches('230'))).toEqual(['23', '20', '2']);
  });
  it('compte les fautes entre deux numéros', () => {
    expect(ecart('230', '23')).toBe(1);
    expect(ecart('B1', 'B1')).toBe(0);
    expect(ecart('16', '16A')).toBe(1);
  });
  it('dit si la ligne existe', () => {
    expect(rechercher('23')).toMatchObject({ type: 'trouvee' });
    expect(rechercher('230')).toMatchObject({ type: 'aucune', numero: '230' });
    expect(rechercher('  ')).toEqual({ type: 'vide' });
  });
});
