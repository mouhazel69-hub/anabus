import type { Ligne } from '../donnees/types';
import { normaliserNumero, toutesLesLignes, trouverLigne } from './catalogue';

/** Les lignes dont le numéro commence par la saisie (« 2 » → 2, 20, 23, 25). */
export function lignesCommencantPar(saisie: string, lignes: Ligne[] = toutesLesLignes()): Ligne[] {
  const n = normaliserNumero(saisie);
  if (!n) return [];
  return lignes.filter((l) => l.numero.toUpperCase().startsWith(n)).sort(comparerNumeros);
}

/** Trie les numéros comme on les lit : 2, 16A, 20, 23, 25, B1. */
export function comparerNumeros(a: Ligne, b: Ligne): number {
  return a.numero.localeCompare(b.numero, 'fr', { numeric: true });
}

/** Le nombre de lettres à ajouter, enlever ou changer pour passer d'un mot à l'autre (distance de Levenshtein). */
export function ecart(a: string, b: string): number {
  const ligne = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diag = ligne[0];
    ligne[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const garde = ligne[j];
      ligne[j] = Math.min(ligne[j] + 1, ligne[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = garde;
    }
  }
  return ligne[b.length];
}

function debutCommun(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

/**
 * Les lignes dont le numéro ressemble le plus à une saisie inconnue.
 * « 230 » → 23, 20, 2 : on classe par nombre de fautes, puis par début commun, puis par longueur.
 */
export function lignesProches(saisie: string, combien = 3, lignes: Ligne[] = toutesLesLignes()): Ligne[] {
  const n = normaliserNumero(saisie);
  return [...lignes]
    .map((l) => {
      const num = l.numero.toUpperCase();
      return { l, fautes: ecart(n, num), debut: debutCommun(n, num), taille: num.length };
    })
    .sort((a, b) => a.fautes - b.fautes || b.debut - a.debut || a.taille - b.taille || comparerNumeros(a.l, b.l))
    .slice(0, combien)
    .map((x) => x.l);
}

export type ResultatRecherche =
  | { type: 'vide' }
  | { type: 'trouvee'; ligne: Ligne }
  | { type: 'aucune'; numero: string; proches: Ligne[] };

/** Ce que donne une recherche validée (bouton « Voir le bus » ou touche Entrée). */
export function rechercher(saisie: string): ResultatRecherche {
  const numero = normaliserNumero(saisie);
  if (!numero) return { type: 'vide' };
  const ligne = trouverLigne(numero);
  if (ligne) return { type: 'trouvee', ligne };
  return { type: 'aucune', numero, proches: lignesProches(numero) };
}
