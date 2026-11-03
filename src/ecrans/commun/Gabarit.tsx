import type { ReactNode } from 'react';
import { BarreNavigation } from '../../composants/BarreNavigation';
import { LienRond } from '../../composants/BoutonRond';
import { Bandeaux } from './Bandeaux';
import { t } from '../../i18n';
import './Gabarit.css';

/** La mise en page des écrans de l'appli : bandeaux en haut, contenu, barre d'onglets en option. */
export function GabaritAppli({ children, navigation = false, fond = 'fond' }: { children: ReactNode; navigation?: boolean; fond?: 'fond' | 'carte' }) {
  return (
    <div className={`gabarit gabarit-${fond}${navigation ? ' gabarit-avec-barre' : ''}`}>
      <Bandeaux />
      {children}
      {navigation && <BarreNavigation />}
    </div>
  );
}

/** L'en-tête blanc d'un écran (Mes lignes, Alertes) : retour, titre et texte. */
export function EnteteEcran({ titre, texte, retour = '/app' }: { titre: string; texte: string; retour?: string }) {
  return (
    <header className="entete">
      <div className="entete-ligne">
        <LienRond icone="retour" libelle={t('retourAccueil')} apparence="doux" vers={retour} />
        <h1 className="titre-1">{titre}</h1>
      </div>
      <p className="entete-texte">{texte}</p>
    </header>
  );
}
