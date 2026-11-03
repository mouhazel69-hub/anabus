import { Component, type ReactNode } from 'react';
import { Kaay } from '../../composants/Kaay';
import { Bouton } from '../../composants/Bouton';
import { t } from '../../i18n';
import '../Recherche.css';

const CLE_RECHARGE = 'ana-bus:recharge-auto';

/**
 * Le filet de sécurité de l'appli : si un écran plante, on montre Kaay « oups » et un bouton
 * pour recharger, au lieu d'une page blanche.
 * Cas fréquent après une mise en ligne : le navigateur a gardé l'ancienne page, qui demande
 * des fichiers supprimés. Dans ce cas, on recharge une fois tout seul.
 */
export class FiletErreur extends Component<{ children: ReactNode }, { erreur: boolean }> {
  state = { erreur: false };

  static getDerivedStateFromError() {
    return { erreur: true };
  }

  componentDidCatch(erreur: unknown) {
    const fichierManquant = /dynamically imported module|Importing a module script failed|Failed to fetch|ChunkLoadError/i.test(String(erreur));
    let dejaRecharge = false;
    try { dejaRecharge = sessionStorage.getItem(CLE_RECHARGE) === '1'; } catch { /* stockage indisponible */ }
    if (fichierManquant && !dejaRecharge) {
      try { sessionStorage.setItem(CLE_RECHARGE, '1'); } catch { /* idem */ }
      window.location.reload();
    }
  }

  componentDidMount() {
    // La page s'est ouverte : on autorise de nouveau un rechargement automatique plus tard.
    setTimeout(() => { try { sessionStorage.removeItem(CLE_RECHARGE); } catch { /* idem */ } }, 10_000);
  }

  render() {
    if (!this.state.erreur) return this.props.children;
    return (
      <main className="colonne aucune page-erreur">
        <Kaay expression="oups" taille={200} />
        <h1 className="aucune-titre">{t('erreur.titre')}</h1>
        <p className="aucune-texte texte-doux">{t('erreur.texte')}</p>
        <Bouton onClick={() => window.location.reload()}>{t('erreur.action')}</Bouton>
      </main>
    );
  }
}
