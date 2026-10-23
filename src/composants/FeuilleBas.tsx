import { useEffect, useId, useRef, type ReactNode } from 'react';
import './FeuilleBas.css';

interface FeuilleBasProps {
  children: ReactNode;
  /** Titre de la feuille (feuille modale) : il nomme la fenêtre pour les lecteurs d'écran. */
  titre?: ReactNode;
  /** Texte sous le titre. */
  texte?: ReactNode;
  /**
   * Feuille modale (« Me prévenir », « Signaler ») : l'écran derrière est assombri,
   * Échap ou un toucher sur le fond la ferme, le focus reste dans la feuille.
   */
  modale?: boolean;
  onFermer?: () => void;
  className?: string;
}

/** La feuille posée en bas de l'écran, coins hauts arrondis, avec sa poignée. */
export function FeuilleBas({ children, titre, texte, modale = false, onFermer, className }: FeuilleBasProps) {
  const idTitre = useId();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!modale) return;
    const feuille = ref.current;
    const avant = document.activeElement as HTMLElement | null;
    // À l'ouverture, on place le focus sur le premier élément actif de la feuille.
    premierActif(feuille)?.focus();

    function touche(e: KeyboardEvent) {
      if (e.key === 'Escape') onFermer?.();
      if (e.key === 'Tab' && feuille) garderLeFocus(e, feuille);
    }
    document.addEventListener('keydown', touche);
    return () => {
      document.removeEventListener('keydown', touche);
      avant?.focus(); // en fermant, on rend le focus au bouton qui a ouvert la feuille
    };
  }, [modale, onFermer]);

  const contenu = (
    <section
      ref={ref}
      className={['feuille', modale && 'feuille-modale', className].filter(Boolean).join(' ')}
      role={modale ? 'dialog' : undefined}
      aria-modal={modale || undefined}
      aria-labelledby={titre ? idTitre : undefined}
    >
      <span className="feuille-poignee" aria-hidden="true" />
      {(titre || texte) && (
        <div className="feuille-tete">
          {titre && <h2 id={idTitre} className="titre-2">{titre}</h2>}
          {texte && <p className="feuille-texte">{texte}</p>}
        </div>
      )}
      {children}
    </section>
  );

  if (!modale) return contenu;
  return (
    <div className="feuille-voile" onClick={(e) => { if (e.target === e.currentTarget) onFermer?.(); }}>
      {contenu}
    </div>
  );
}

const ACTIFS = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

function premierActif(racine: HTMLElement | null) {
  // Pour un groupe de boutons radio, on vise celui qui est coché.
  return (racine?.querySelector<HTMLElement>('input:checked') ?? racine?.querySelector<HTMLElement>(ACTIFS)) || null;
}

/** Tab et Maj+Tab tournent dans la feuille au lieu d'en sortir. */
function garderLeFocus(e: KeyboardEvent, feuille: HTMLElement) {
  const actifs = Array.from(feuille.querySelectorAll<HTMLElement>(ACTIFS)).filter((el) => el.offsetParent !== null);
  if (actifs.length === 0) return;
  const premier = actifs[0];
  const dernier = actifs[actifs.length - 1];
  if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
  else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
}
