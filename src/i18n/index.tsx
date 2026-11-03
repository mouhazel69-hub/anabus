import { createContext, useContext, useState, type ReactNode } from 'react';
import { fr, type Cle } from './fr';
import { wo } from './wo';
import { lire, ecrire } from '../stockage/stockage';

export type Langue = 'fr' | 'wo';
const TEXTES: Record<Langue, Record<Cle, string>> = { fr, wo };

const NBSP = ' ';

/**
 * Typographie française : espace insécable avant ? ! : ; et à l'intérieur de « »,
 * pour qu'aucun signe ne se retrouve seul au début d'une ligne.
 */
export function typo(texte: string): string {
  return texte
    .replace(/ ([?!:;])/g, `${NBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`);
}

// La langue active, lue par t(). Le fournisseur ci-dessous la tient à jour.
let langueActive: Langue = lire<Langue>('langue', 'fr');

/** Le texte d'une clé dans la langue active, avec ses valeurs : t('vers', { destination: 'Petersen' }). */
export function t(cle: Cle, valeurs?: Record<string, string | number>): string {
  let texte: string = TEXTES[langueActive][cle] ?? fr[cle];
  if (valeurs) {
    for (const [nom, valeur] of Object.entries(valeurs)) texte = texte.split(`{${nom}}`).join(String(valeur));
  }
  return typo(texte);
}

const Contexte = createContext<{ langue: Langue; choisir: (l: Langue) => void }>({ langue: 'fr', choisir: () => {} });

/** Fournit la langue à toute l'appli et la garde sur l'appareil. */
export function FournisseurLangue({ children }: { children: ReactNode }) {
  const [langue, setLangue] = useState<Langue>(langueActive);
  function choisir(l: Langue) {
    langueActive = l;
    ecrire('langue', l);
    setLangue(l);
  }
  langueActive = langue;
  // La clé force tout l'arbre à se redessiner avec les nouveaux textes.
  // Tant que le wolof n'est pas traduit, la page reste en lang="fr" pour les lecteurs d'écran.
  return <Contexte.Provider value={{ langue, choisir }}><div key={langue} className="racine-langue">{children}</div></Contexte.Provider>;
}

export function useLangue() {
  return useContext(Contexte);
}
