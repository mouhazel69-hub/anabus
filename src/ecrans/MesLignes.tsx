import { CarteArrivee } from '../composants/CarteArrivee';
import { BoutonLien } from '../composants/Bouton';
import { EnteteEcran, GabaritAppli } from './commun/Gabarit';
import { t } from '../i18n';
import { trouverLigne } from '../logique/catalogue';
import { useFavoris, type Favori } from '../stockage/donneesUsager';
import { lienLigne, useProchainBus } from '../crochets/useArrivees';
import './MesLignes.css';

/** 06. Mes lignes : les favoris, enregistrés sur l'appareil. Une seule liste en phase 1. */
export default function MesLignes() {
  const [favoris] = useFavoris();
  return (
    <GabaritAppli navigation fond="carte">
      <EnteteEcran titre={t('mesLignes.titre')} texte={t('mesLignes.texte')} />
      <main className="colonne mes-lignes">
        {favoris.length === 0 ? (
          <p className="mes-lignes-vide">{t('mesLignes.vide')}</p>
        ) : (
          <div className="pile-cartes">
            {favoris.map((f) => <CarteFavori key={`${f.ligne}-${f.arret}`} favori={f} />)}
          </div>
        )}
        <BoutonLien to="/recherche" variante="secondaire" icone="plus" pleineLargeur className="mes-lignes-ajouter">
          {t('mesLignes.ajouter')}
        </BoutonLien>
      </main>
    </GabaritAppli>
  );
}

function CarteFavori({ favori }: { favori: Favori }) {
  const ligne = trouverLigne(favori.ligne);
  const index = ligne?.arrets.indexOf(favori.arret) ?? -1;
  const carte = useProchainBus(ligne, index);
  if (!ligne || !carte) return null;
  return <CarteArrivee {...carte} lien={lienLigne(ligne, index)} />;
}
