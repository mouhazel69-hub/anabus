import { Kaay } from '../composants/Kaay';
import { BoutonLien } from '../composants/Bouton';
import { t } from '../i18n';
import './Recherche.css';

/** Adresse inconnue : Kaay « oups » et une phrase qui dit quoi faire. */
export default function Introuvable() {
  return (
    <main className="colonne aucune" style={{ minHeight: '100dvh', justifyContent: 'center' }}>
      <Kaay expression="oups" taille={200} />
      <h1 className="aucune-titre">{t('introuvable.titre')}</h1>
      <p className="aucune-texte texte-doux">{t('introuvable.texte')}</p>
      <BoutonLien to="/app">{t('introuvable.action')}</BoutonLien>
    </main>
  );
}
