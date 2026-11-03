import { useEffect, useState } from 'react';
import type { Coord } from '../donnees/types';

export type EtatPosition =
  | { etat: 'attente' }
  | { etat: 'connue'; coord: Coord }
  | { etat: 'refusee' };

/**
 * La position de l'usager, s'il l'autorise. Le navigateur pose la question lui-même ;
 * sans réponse au bout de 8 s, ou en cas de refus, on passe à l'arrêt par défaut.
 */
export function usePositionUsager(): EtatPosition {
  const [position, setPosition] = useState<EtatPosition>(() => ('geolocation' in navigator ? { etat: 'attente' } : { etat: 'refusee' }));

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    let fini = false;
    const delai = setTimeout(() => { if (!fini) setPosition({ etat: 'refusee' }); }, 8000);
    navigator.geolocation.getCurrentPosition(
      (p) => { fini = true; clearTimeout(delai); setPosition({ etat: 'connue', coord: [p.coords.longitude, p.coords.latitude] }); },
      () => { fini = true; clearTimeout(delai); setPosition({ etat: 'refusee' }); },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 8000 },
    );
    return () => clearTimeout(delai);
  }, []);

  return position;
}
