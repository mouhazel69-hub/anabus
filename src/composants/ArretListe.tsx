import { t } from '../i18n';
import './ArretListe.css';

export interface ArretAffiche {
  nom: string;
  /** Minutes avant que le bus atteigne cet arrêt. */
  minutes: number;
  /** usager : l'arrêt choisi, surligné ; terminus : le dernier arrêt. */
  role?: 'usager' | 'terminus';
}

interface ArretListeProps {
  arrets: ArretAffiche[];
  className?: string;
}

/** La liste des prochains arrêts du suivi, le long du trait bleu de la ligne. */
export function ArretListe({ arrets, className }: ArretListeProps) {
  return (
    <div className={['arrets', className].filter(Boolean).join(' ')}>
      <span className="arrets-trait" aria-hidden="true" />
      <ol className="arrets-liste">
        {arrets.map((a) => (
          <li key={a.nom} className={a.role ? `arret arret-${a.role}` : 'arret'}>
            <span className="arret-point" aria-hidden="true" />
            <span className="arret-nom">
              {a.nom}
              {a.role === 'usager' && <span className="arret-mention"> {t('arrets.votreArret')}</span>}
              {a.role === 'terminus' && <span className="arret-mention"> {t('arrets.terminus')}</span>}
            </span>
            <span className="arret-min">{t('minutes', { minutes: a.minutes })}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
