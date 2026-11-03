import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../composants/Logo';
import { BoutonLien } from '../composants/Bouton';
import { RechercheLigne } from '../composants/RechercheLigne';
import { CarteArrivee } from '../composants/CarteArrivee';
import { Statut } from '../composants/Statut';
import { Kaay } from '../composants/Kaay';
import { BandeauDemo } from '../ecrans/commun/Bandeaux';
import { t } from '../i18n';
import { trouverLigne } from '../logique/catalogue';
import { prochainsPassages } from '../logique/arrivees';
import { indexArretProche, pointParDefaut } from '../logique/presDeVous';
import { usePositions } from '../crochets/useTempsReel';
import { proprietesCarte, useArriveesPresDe } from '../crochets/useArrivees';
import { useAllerALigne } from '../crochets/useAllerALigne';
import './AccueilSite.css';

const CarteLigne = lazy(() => import('../carte/CarteLigne'));

/** La ligne pilote montrée sur la page d'accueil du site. */
const LIGNE_PILOTE = '23';

/** Le site : page d'accueil. Toutes les grilles passent sur une colonne au téléphone. */
export default function AccueilSite() {
  const chercher = useAllerALigne('site');
  return (
    <div className="site">
      <BandeauDemo />
      <header className="site-entete site-largeur">
        <a href="#haut" aria-label={t('site.accueil')} className="site-logo"><Logo largeur={159} /></a>
        <nav aria-label={t('nav.libelle')} className="site-nav">
          <a href="#comment">{t('site.nav.comment')}</a>
          <a href="#reseaux">{t('site.nav.reseaux')}</a>
          <a href="#appli">{t('site.nav.appli')}</a>
          <BoutonLien to="/app">{t('site.voirMonBus')}</BoutonLien>
        </nav>
      </header>

      <main id="haut">
        <section className="site-ouverture site-largeur">
          <div className="site-ouverture-texte">
            <h1 className="site-grand-titre">{t('site.hero.titre')}</h1>
            <p className="site-chapo">{t('site.hero.texte')}</p>
            <RechercheLigne onSubmit={chercher} />
            <p className="site-petit">{t('site.hero.bientot')}</p>
          </div>
          <ApercuCarte />
        </section>

        <section id="comment" className="site-section site-largeur">
          <div className="site-intro">
            <h2 className="site-titre">{t('site.comment.titre')}</h2>
            <p className="site-chapo">{t('site.comment.texte')}</p>
          </div>
          <ol className="site-etapes">
            {([1, 2, 3] as const).map((n) => (
              <li key={n}>
                <span className="site-numero" aria-hidden="true">{n}</span>
                <h3 className="titre-2">{t(`site.etape${n}.titre`)}</h3>
                <p className="texte-doux">{t(`site.etape${n}.texte`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="site-nuit">
          <div className="site-largeur site-nuit-contenu">
            <div className="site-nuit-titre">
              <p className="site-ngi" lang="wo">{t('muNgiNew')}</p>
              <Kaay expression="mu-ngi-new" contour="toujours" taille={180} />
            </div>
            <div className="site-nuit-bas">
              <div className="site-nuit-texte">
                <p className="site-chapo-nuit">{t('site.muNgi.texte')}</p>
                <p className="site-nuit-doux">{t('site.muNgi.langues')}</p>
              </div>
              <div className="site-nuit-carte">
                {/* Illustration : un bus à moins d'une minute. */}
                <CarteArrivee ligne="23" destination={t('vers', { destination: 'Petersen' })} arret={t('arret', { nom: 'Liberté 6' })} minutes={1} miseAJour={t('maj', { secondes: 10 })} />
              </div>
            </div>
          </div>
        </section>

        <section id="reseaux" className="site-section site-section-haute site-largeur">
          <div className="site-intro">
            <h2 className="site-titre">{t('site.reseaux.titre')}</h2>
            <p className="site-chapo">{t('site.reseaux.texte')}</p>
          </div>
          <div className="site-reseaux">
            {([['Dakar Dem Dikk', 'site.reseaux.ddd'], ['Tata', 'site.reseaux.tata'], ['BRT', 'site.reseaux.brt']] as const).map(([nom, cle]) => (
              <article key={nom}>
                <h3 className="site-reseau-nom">{nom}</h3>
                <p className="texte-doux">{t(cle)}</p>
                <Statut type="prevu">{t('site.bientot')}</Statut>
              </article>
            ))}
          </div>
        </section>

        <section id="appli" className="site-jaune">
          <div className="site-largeur site-jaune-contenu">
            <div className="site-jaune-texte">
              <h2 className="site-titre">{t('site.appli.titre')}</h2>
              <p className="site-chapo-jaune">{t('site.appli.texte')}</p>
              <div className="site-magasins">
                <span>{t('site.appli.android')}</span>
                <span>{t('site.appli.iphone')}</span>
              </div>
            </div>
            <Telephone />
          </div>
        </section>
      </main>

      <footer className="site-pied">
        <div className="site-largeur site-pied-contenu">
          <div className="site-pied-haut">
            <div className="site-pied-marque">
              <Logo largeur={159} version="negatif" />
              <span className="site-signature" lang="wo">{t('site.pied.signature')}</span>
              <p className="site-nuit-doux">{t('site.pied.texte')}</p>
            </div>
            <nav aria-label={t('site.pied.liens')} className="site-pied-liens">
              <a href="#comment">{t('site.nav.comment')}</a>
              <a href="#reseaux">{t('site.nav.reseaux')}</a>
              <a href="#appli">{t('site.nav.appli')}</a>
              <Link to="/app" className="site-pied-fort">{t('site.voirMonBus')}</Link>
            </nav>
          </div>
          <p className="site-copyright">{t('site.pied.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

/** La carte de l'ouverture : la ligne pilote en direct, et la carte d'arrivée de votre arrêt. */
function ApercuCarte() {
  const ligne = trouverLigne(LIGNE_PILOTE)!;
  const index = indexArretProche(ligne, pointParDefaut());
  const { positions, maintenant } = usePositions(ligne);
  const [prochain] = prochainsPassages(ligne, index, positions, maintenant);
  return (
    <div className="site-apercu">
      <Suspense fallback={null}>
        <CarteLigne ligne={ligne} indexArret={index} positions={positions} mode="apercu" cadrage="arret" marge={{ top: 40, bottom: 170, left: 40, right: 40 }} className="site-apercu-carte" />
      </Suspense>
      {prochain && (
        <div className="site-apercu-arrivee">
          <CarteArrivee {...proprietesCarte(ligne, index, prochain)} lien={`/ligne/${ligne.numero}?arret=${ligne.arrets[index]}`} />
        </div>
      )}
    </div>
  );
}

/** Le téléphone du bandeau jaune : l'accueil de l'appli, avec les vraies données de démo. */
function Telephone() {
  const { arrivees } = useArriveesPresDe({ etat: 'refusee' });
  return (
    <div className="site-telephone" role="img" aria-label={t('site.appli.apercu')}>
      <div className="site-telephone-tete">
        <Logo largeur={110} />
        <span className="site-telephone-titre">{t('accueil.titre')}</span>
      </div>
      <div className="site-telephone-corps" aria-hidden="true">
        <div className="site-telephone-cartes">
          {arrivees.slice(0, 3).map((a) => <CarteArrivee key={a.ligne.numero} {...a.carte} />)}
        </div>
      </div>
    </div>
  );
}
