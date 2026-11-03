import { Navigate, useNavigate } from 'react-router-dom';
import { Logo } from '../composants/Logo';
import { RechercheLigne } from '../composants/RechercheLigne';
import { CarteArrivee } from '../composants/CarteArrivee';
import { GabaritAppli } from './commun/Gabarit';
import { t } from '../i18n';
import { useBienvenueVue } from '../stockage/donneesUsager';
import { usePositionUsager } from '../crochets/usePosition';
import { useArriveesPresDe } from '../crochets/useArrivees';
import { useAllerALigne } from '../crochets/useAllerALigne';
import './Accueil.css';

/** 01. Accueil de l'appli : la recherche, puis les bus qui arrivent près de vous. */
export default function Accueil() {
  const [bienvenueVue] = useBienvenueVue();
  const chercher = useAllerALigne();
  if (!bienvenueVue) return <Navigate to="/bienvenue" replace />;

  return (
    <GabaritAppli navigation fond="carte">
      <header className="accueil-tete">
        <div className="colonne accueil-tete-contenu">
          <Logo largeur={132} />
          <div className="accueil-titres">
            <h1 className="accueil-titre">{t('accueil.titre')}</h1>
            <p className="texte-doux">{t('accueil.texte')}</p>
          </div>
          <RechercheLigne placeholder={t('recherche.placeholderAppli')} onSubmit={chercher} />
        </div>
      </header>
      <PresDeVous />
    </GabaritAppli>
  );
}

function PresDeVous() {
  const position = usePositionUsager();
  const { arrivees, legende, message } = useArriveesPresDe(position);
  const aller = useNavigate();

  return (
    <main className="colonne accueil-pres" id="pres-de-vous">
      <div className="section-titre">
        <h2 className="titre-2">{t('accueil.presDeVous')}</h2>
        <span className="legende texte-doux">{legende}</span>
      </div>
      {message && <p className="accueil-message">{message}</p>}
      {position.etat === 'attente' ? (
        <div className="pile-cartes" aria-hidden="true">
          {/* Chargement : des silhouettes grises, jamais un écran blanc. */}
          <div className="silhouette" /><div className="silhouette" /><div className="silhouette" />
        </div>
      ) : arrivees.length === 0 ? (
        <p className="texte-doux">{t('accueil.aucunBus')}</p>
      ) : (
        <div className="pile-cartes">
          {arrivees.map((a) => (
            <CarteArrivee key={a.ligne.numero} {...a.carte} lien={a.lien} />
          ))}
        </div>
      )}
      {/* Pour l'usager pressé : la liste complète des lignes est à un geste. */}
      <button type="button" className="bouton bouton-discret accueil-toutes" onClick={() => aller('/recherche')}>
        {t('recherche.toutes')}
      </button>
    </main>
  );
}
