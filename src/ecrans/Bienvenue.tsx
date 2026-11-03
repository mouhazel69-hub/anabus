import { useNavigate } from 'react-router-dom';
import { Logo } from '../composants/Logo';
import { Kaay } from '../composants/Kaay';
import { Bouton } from '../composants/Bouton';
import { t, useLangue, type Langue } from '../i18n';
import { useBienvenueVue } from '../stockage/donneesUsager';
import './Bienvenue.css';

/** 00. Bienvenue : au premier lancement, Kaay se présente et l'usager choisit sa langue. */
export default function Bienvenue() {
  const { langue, choisir } = useLangue();
  const [, setVue] = useBienvenueVue();
  const aller = useNavigate();

  function commencer() {
    setVue(true);
    aller('/app', { replace: true });
  }

  return (
    <main className="bienvenue">
      <div className="bienvenue-haut">
        {/* Sur le jaune, le logo garde sa version claire dans les deux thèmes. */}
        <Logo largeur={132} version="clair" className="bienvenue-logo" />
        <Kaay expression="salut" contour="toujours" taille={290} className="bienvenue-kaay" />
      </div>
      <div className="bienvenue-bas">
        <h1 className="titre-1">{t('bienvenue.titre')}</h1>
        <p className="bienvenue-texte">{t('bienvenue.texte')}</p>
        <div role="group" aria-label={t('bienvenue.langue')} className="bienvenue-langues">
          {(['fr', 'wo'] as Langue[]).map((l) => (
            <button key={l} type="button" aria-pressed={langue === l} className="pilule" onClick={() => choisir(l)}>
              {t(l === 'fr' ? 'langue.fr' : 'langue.wo')}
            </button>
          ))}
        </div>
        <Bouton taille="lg" pleineLargeur className="bienvenue-action" onClick={commencer}>{t('bienvenue.action')}</Bouton>
      </div>
    </main>
  );
}
