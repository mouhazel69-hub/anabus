import { NavLink } from 'react-router-dom';
import { Icone, type NomIcone } from './Icone';
import { t } from '../i18n';
import type { Cle } from '../i18n/fr';
import './BarreNavigation.css';

const ONGLETS: { vers: string; libelle: Cle; icone: NomIcone }[] = [
  { vers: '/app', libelle: 'nav.accueil', icone: 'recherche' },
  { vers: '/mes-lignes', libelle: 'nav.mesLignes', icone: 'bus' },
  { vers: '/alertes', libelle: 'nav.alertes', icone: 'cloche' },
];

/** La barre d'onglets en bas de l'appli (Accueil, Mes lignes, Alertes). */
export function BarreNavigation() {
  return (
    <nav className="barre" aria-label={t('nav.libelle')}>
      <ul>
        {ONGLETS.map((o) => (
          <li key={o.vers}>
            {/* NavLink ajoute aria-current="page" sur l'onglet de la page ouverte. */}
            <NavLink to={o.vers} className="barre-onglet">
              <Icone nom={o.icone} />
              <span>{t(o.libelle)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
