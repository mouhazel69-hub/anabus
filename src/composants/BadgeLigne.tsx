import './BadgeLigne.css';

interface BadgeLigneProps {
  /** Le numéro tel qu'il est écrit sur le bus : "23", "B1", "16A". */
  ligne: string;
  /** Réseau affiché à côté : "Dem Dikk", "Tata", "BRT". */
  reseau?: string;
  taille?: 'md' | 'lg';
  className?: string;
}

/** Le numéro d'une ligne dans sa pilule jaune ; lu « Ligne 23 » par les lecteurs d'écran. */
export function BadgeLigne({ ligne, reseau, taille = 'md', className }: BadgeLigneProps) {
  return (
    <span className={['badge', taille === 'lg' && 'badge-lg', className].filter(Boolean).join(' ')}>
      <span className="badge-num">
        <span className="vh">Ligne </span>
        {ligne}
      </span>
      {reseau && <span className="badge-reseau">{reseau}</span>}
    </span>
  );
}
