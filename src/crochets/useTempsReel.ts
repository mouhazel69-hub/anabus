import { useEffect, useState } from 'react';
import { sourcePositions } from '../donnees/simulateur';
import type { Ligne, PositionBus } from '../donnees/types';
import { prochainsPassages, type Passage } from '../logique/arrivees';

/** L'heure actuelle, rafraîchie à chaque nouvelle donnée de la source (toutes les secondes). */
export function useMaintenant(): number {
  const [maintenant, setMaintenant] = useState(() => Date.now());
  useEffect(() => sourcePositions.abonner(() => setMaintenant(Date.now())), []);
  return maintenant;
}

/** Les positions des bus d'une ligne, mises à jour en continu. */
export function usePositions(ligne: Ligne | undefined): { positions: PositionBus[]; maintenant: number } {
  const maintenant = useMaintenant();
  const positions = ligne ? sourcePositions.positions(ligne.numero, maintenant) : [];
  return { positions, maintenant };
}

/** Les prochains passages d'une ligne à l'un de ses arrêts. */
export function usePassages(ligne: Ligne | undefined, indexArret: number): Passage[] {
  const { positions, maintenant } = usePositions(ligne);
  return ligne ? prochainsPassages(ligne, indexArret, positions, maintenant) : [];
}
