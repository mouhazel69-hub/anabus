import { useEffect, useState } from 'react';

// Tout ce que l'appli garde sur l'appareil passe par ici (localStorage).
// Si le navigateur refuse le stockage (navigation privée, réglage), l'appli continue
// sans mémoire plutôt que de planter.

const PREFIXE = 'ana-bus:';
const EVENEMENT = 'ana-bus-stockage';

export function lire<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(PREFIXE + cle);
    return brut === null ? defaut : (JSON.parse(brut) as T);
  } catch {
    return defaut;
  }
}

export function ecrire<T>(cle: string, valeur: T): void {
  try {
    localStorage.setItem(PREFIXE + cle, JSON.stringify(valeur));
  } catch {
    // stockage indisponible : on ignore
  }
  // Prévient les autres composants qui lisent la même clé.
  window.dispatchEvent(new CustomEvent(EVENEMENT, { detail: cle }));
}

/** Comme useState, mais la valeur est gardée sur l'appareil et partagée entre les écrans. */
export function useStockage<T>(cle: string, defaut: T): [T, (v: T | ((ancien: T) => T)) => void] {
  const [valeur, setValeur] = useState<T>(() => lire(cle, defaut));

  useEffect(() => {
    const relire = (e: Event) => {
      if (e instanceof CustomEvent && e.detail !== cle) return;
      setValeur(lire(cle, defaut));
    };
    window.addEventListener(EVENEMENT, relire);
    window.addEventListener('storage', relire); // changement depuis un autre onglet
    return () => {
      window.removeEventListener(EVENEMENT, relire);
      window.removeEventListener('storage', relire);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cle]);

  function changer(v: T | ((ancien: T) => T)) {
    const nouvelle = typeof v === 'function' ? (v as (a: T) => T)(lire(cle, defaut)) : v;
    ecrire(cle, nouvelle);
    setValeur(nouvelle);
  }
  return [valeur, changer];
}
