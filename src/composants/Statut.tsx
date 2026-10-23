import type { ReactNode } from 'react';
import { Icone } from './Icone';
import './Statut.css';

export type TypeStatut = 'direct' | 'proche' | 'retard' | 'prevu';

const STATUTS = {
  direct: { mot: 'En direct', icone: null },
  proche: { mot: 'Arrive', icone: 'bus' },
  retard: { mot: 'Retard', icone: 'alerte' },
  prevu: { mot: 'Horaire prévu', icone: 'horloge' },
} as const;

interface StatutProps {
  type?: TypeStatut;
  /** Remplace le mot par défaut, par exemple « Retard de 8 min ». */
  children?: ReactNode;
  className?: string;
}

/** Pastille d'état du bus : une couleur, un picto et un mot, toujours ensemble. */
export function Statut({ type = 'direct', children, className }: StatutProps) {
  const s = STATUTS[type];
  return (
    <span className={['statut', `statut-${type}`, className].filter(Boolean).join(' ')}>
      {s.icone ? (
        <Icone nom={s.icone} />
      ) : (
        // « En direct » : un point qui pulse (arrêté si l'usager réduit les animations).
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="statut-pouls">
          <circle cx="8" cy="8" r="4.5" fill="currentColor" />
        </svg>
      )}
      {children ?? s.mot}
    </span>
  );
}
