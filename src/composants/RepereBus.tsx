import type { CSSProperties } from 'react';
import './RepereBus.css';

/** L'avant du bus du logo, en une seule encre : pare-brise et phares évidés. */
const BUS_PLEIN =
  'M38 19h20a10 10 0 0 1 10 10v34H28V29a10 10 0 0 1 10-10z' +
  'M32 63h9v3.5a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5z' +
  'M55 63h9v3.5a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5z' +
  'M37 25h22a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H37a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z' +
  'M38.5 48a4 4 0 1 1 0 8a4 4 0 1 1 0-8zM57.5 48a4 4 0 1 1 0 8a4 4 0 1 1 0-8z';

interface RepereBusProps {
  ligne?: string;
  /** false : position estimée, donc pas d'onde. */
  direct?: boolean;
  /** Placement absolu sur une carte dessinée. */
  style?: CSSProperties;
  className?: string;
}

/** Le bus sur la carte : disque jaune cerclé de nuit, avec une onde quand la position est en direct. */
export function RepereBus({ ligne, direct = true, style, className }: RepereBusProps) {
  const libelle = 'Bus' + (ligne ? ` ligne ${ligne}` : '') + (direct ? ', position en direct' : ', position estimée');
  return (
    <span className={['repere', className].filter(Boolean).join(' ')} role="img" aria-label={libelle} style={style}>
      {direct && <span className="repere-onde" />}
      <span className="repere-disque">
        <svg viewBox="26 17 44 54" aria-hidden="true" focusable="false">
          <path d={BUS_PLEIN} fill="currentColor" fillRule="evenodd" />
        </svg>
      </span>
      {ligne && <span className="repere-etiquette" aria-hidden="true">{ligne}</span>}
    </span>
  );
}
