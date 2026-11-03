import { useEffect, useState } from 'react';

/** null si l'appareil est en ligne ; sinon l'heure à laquelle la connexion a été perdue. */
export function useHorsConnexionDepuis(): number | null {
  const [depuis, setDepuis] = useState<number | null>(() => (navigator.onLine ? null : Date.now()));
  useEffect(() => {
    const perdu = () => setDepuis(Date.now());
    const retrouve = () => setDepuis(null);
    window.addEventListener('offline', perdu);
    window.addEventListener('online', retrouve);
    return () => { window.removeEventListener('offline', perdu); window.removeEventListener('online', retrouve); };
  }, []);
  return depuis;
}

/** Vrai à partir de 1024 px de large : la mise en page « ordinateur ». */
export function useGrandEcran(): boolean {
  const requete = '(min-width: 1024px)';
  const [grand, setGrand] = useState(() => matchMedia(requete).matches);
  useEffect(() => {
    const m = matchMedia(requete);
    const changer = () => setGrand(m.matches);
    m.addEventListener('change', changer);
    return () => m.removeEventListener('change', changer);
  }, []);
  return grand;
}
