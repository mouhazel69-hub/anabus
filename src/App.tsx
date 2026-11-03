import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Accueil from './ecrans/Accueil';
import Bienvenue from './ecrans/Bienvenue';
import Recherche from './ecrans/Recherche';
import MesLignes from './ecrans/MesLignes';
import Alertes from './ecrans/Alertes';
import Introuvable from './ecrans/Introuvable';
import { FournisseurLangue } from './i18n';
import { FournisseurAnnonces } from './ecrans/commun/Annonces';
import { VeilleurAlertes } from './ecrans/commun/VeilleurAlertes';

// Les écrans qui portent une carte (MapLibre) ou servent rarement sont chargés à la demande,
// pour que l'appli s'ouvre vite même en 3G.
const AccueilSite = lazy(() => import('./site/AccueilSite'));
const Suivi = lazy(() => import('./ecrans/suivi/Suivi'));
const Design = lazy(() => import('./ecrans/Design'));

/** En changeant d'écran, on revient en haut de la page (sauf vers une ancre #). */
function RemonterEnHaut() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <FournisseurLangue>
      <FournisseurAnnonces>
        <RemonterEnHaut />
        <VeilleurAlertes />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<AccueilSite />} />
            <Route path="/app" element={<Accueil />} />
            <Route path="/bienvenue" element={<Bienvenue />} />
            <Route path="/recherche" element={<Recherche />} />
            <Route path="/ligne/:numero" element={<Suivi />} />
            <Route path="/mes-lignes" element={<MesLignes />} />
            <Route path="/alertes" element={<Alertes />} />
            <Route path="/design" element={<Design />} />
            <Route path="*" element={<Introuvable />} />
          </Routes>
        </Suspense>
      </FournisseurAnnonces>
    </FournisseurLangue>
  );
}
