import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Kaay } from '../../composants/Kaay';
import { BoutonRond } from '../../composants/BoutonRond';
import { t } from '../../i18n';
import './Annonces.css';

export interface Annonce {
  texte: string;
  /** Un titre au-dessus du texte (alerte de bus). */
  titre?: string;
  /** Le bus est à moins d'une minute : on montre Kaay « Mu ngi ñëw ». */
  muNgiNew?: boolean;
}

const Contexte = createContext<(a: Annonce) => void>(() => {});

/** Les messages courts en bas de l'écran : confirmations et alertes dans l'appli. */
export function FournisseurAnnonces({ children }: { children: ReactNode }) {
  const [annonce, setAnnonce] = useState<(Annonce & { n: number }) | null>(null);
  const annoncer = useCallback((a: Annonce) => setAnnonce((ancienne) => ({ ...a, n: (ancienne?.n ?? 0) + 1 })), []);

  // Le message disparaît seul après 6 s (10 s pour une alerte de bus).
  useEffect(() => {
    if (!annonce) return;
    const m = setTimeout(() => setAnnonce(null), annonce.titre ? 10_000 : 6000);
    return () => clearTimeout(m);
  }, [annonce]);

  return (
    <Contexte.Provider value={annoncer}>
      {children}
      {/* La zone existe toujours : les lecteurs d'écran annoncent ce qui y apparaît. */}
      <div className="annonces" role="status" aria-live="polite">
        {annonce && (
          <div className="annonce" key={annonce.n}>
            {annonce.muNgiNew && <Kaay expression="mu-ngi-new" taille={56} contour="toujours" />}
            <div className="annonce-texte">
              {annonce.titre && <strong className={annonce.muNgiNew ? 'annonce-titre annonce-titre-marque' : 'annonce-titre'}>{annonce.titre}</strong>}
              <span>{annonce.texte}</span>
            </div>
            <BoutonRond icone="fermer" libelle={t('fermer')} className="annonce-fermer" onClick={() => setAnnonce(null)} />
          </div>
        )}
      </div>
    </Contexte.Provider>
  );
}

export function useAnnoncer() {
  return useContext(Contexte);
}
