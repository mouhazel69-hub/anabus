import { CarteArrivee } from '../composants/CarteArrivee';
import { Bouton } from '../composants/Bouton';
import { EnteteEcran, GabaritAppli } from './commun/Gabarit';
import { t } from '../i18n';
import { trouverArret, trouverLigne } from '../logique/catalogue';
import { useAlertes, type Alerte } from '../stockage/donneesUsager';
import { lienLigne, useProchainBus } from '../crochets/useArrivees';
import './MesLignes.css';

/** Alertes : la liste des alertes actives, sur le modèle de Mes lignes. */
export default function Alertes() {
  const [alertes, setAlertes] = useAlertes();
  return (
    <GabaritAppli navigation fond="carte">
      <EnteteEcran titre={t('alertes.titre')} texte={t('alertes.texte')} />
      <main className="colonne mes-lignes">
        {alertes.length === 0 ? (
          <p className="alertes-vide">{t('alertes.vide')}</p>
        ) : (
          <ul className="alertes-liste">
            {alertes.map((a) => (
              <li key={a.id}>
                <CarteAlerte alerte={a} onSupprimer={() => setAlertes((liste) => liste.filter((x) => x.id !== a.id))} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </GabaritAppli>
  );
}

function CarteAlerte({ alerte, onSupprimer }: { alerte: Alerte; onSupprimer: () => void }) {
  const ligne = trouverLigne(alerte.ligne);
  const index = ligne?.arrets.indexOf(alerte.arret) ?? -1;
  const carte = useProchainBus(ligne, index);
  const arret = trouverArret(alerte.arret);
  if (!ligne || !carte || !arret) return null;
  return (
    <div className="alerte">
      <p className="corps-fort">{t('alertes.detail', { minutes: alerte.minutes, arret: arret.nom })}</p>
      <CarteArrivee {...carte} lien={lienLigne(ligne, index)} />
      <Bouton variante="discret" onClick={onSupprimer} className="alerte-supprimer">{t('alertes.supprimer')}</Bouton>
    </div>
  );
}
