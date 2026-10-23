import { NavLink } from 'react-router-dom';
import { Icone, type NomIcone } from './Icone';
import './BarreNavigation.css';

const ONGLETS: { vers: string; libelle: string; icone: NomIcone }[] = [
  { vers: '/app', libelle: 'Accueil', icone: 'recherche' },
  { vers: '/mes-lignes', libelle: 'Mes lignes', icone: 'bus' },
  { vers: '/alertes', libelle: 'Alertes', icone: 'cloche' },
];

/** La barre d'onglets en bas de l'appli (Accueil, Mes lignes, Alertes). */
export function BarreNavigation() {
  return (
    <nav className="barre" aria-label="Navigation principale">
      <ul>
        {ONGLETS.map((o) => (
          <li key={o.vers}>
            {/* NavLink ajoute aria-current="page" sur l'onglet de la page ouverte. */}
            <NavLink to={o.vers} className="barre-onglet">
              <Icone nom={o.icone} />
              <span>{o.libelle}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
