import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { BadgeLigne } from '../../composants/BadgeLigne';
import { Statut } from '../../composants/Statut';
import { ArretListe, type ArretAffiche } from '../../composants/ArretListe';
import { Bouton } from '../../composants/Bouton';
import { LienRond } from '../../composants/BoutonRond';
import { FeuilleBas } from '../../composants/FeuilleBas';
import { Logo } from '../../composants/Logo';
import { RechercheLigne } from '../../composants/RechercheLigne';
import { Bandeaux } from '../commun/Bandeaux';
import { FeuillePrevenir, FeuilleSignaler } from './Feuilles';
import { t } from '../../i18n';
import type { Ligne } from '../../donnees/types';
import { arretsDe, reseauDe, trouverLigne } from '../../logique/catalogue';
import { etatPassage, minutesJusquAuxArrets, prochainsPassages, type Passage } from '../../logique/arrivees';
import { indexArretProche, pointParDefaut } from '../../logique/presDeVous';
import { estMuNgiNew } from '../../logique/seuils';
import { usePositions } from '../../crochets/useTempsReel';
import { useGrandEcran } from '../../crochets/useConnexion';
import { useAllerALigne } from '../../crochets/useAllerALigne';
import { ajouterRecente, useAlertes, useFavoris, useRecentes } from '../../stockage/donneesUsager';
import './Suivi.css';

// La carte (MapLibre) est lourde : on la charge seulement quand on en a besoin.
const CarteLigne = lazy(() => import('../../carte/CarteLigne'));

/** 03. Suivi d'une ligne : la carte, le bus qui arrive et ses minutes. */
export default function Suivi() {
  const { numero = '' } = useParams();
  const { search } = useLocation();
  const ligne = trouverLigne(numero);
  if (!ligne) return <Navigate to={`/recherche?q=${encodeURIComponent(numero)}`} replace />;
  // « b1 » dans l'adresse devient « B1 », comme sur le bus.
  if (ligne.numero !== numero) return <Navigate to={`/ligne/${ligne.numero}${search}`} replace />;
  return <SuiviLigne key={ligne.numero} ligne={ligne} />;
}

function SuiviLigne({ ligne }: { ligne: Ligne }) {
  const [params, setParams] = useSearchParams();
  const { state } = useLocation() as { state?: { depuis?: string } };
  const grandEcran = useGrandEcran();
  const [, setRecentes] = useRecentes();
  const [favoris, setFavoris] = useFavoris();
  const [alertes] = useAlertes();
  const [feuille, setFeuille] = useState<'prevenir' | 'signaler' | null>(null);

  const arrets = arretsDe(ligne);
  const demande = ligne.arrets.indexOf(params.get('arret') ?? '');
  const indexArret = demande >= 0 && demande < arrets.length - 1 ? demande : indexArretProche(ligne, pointParDefaut());
  const arret = arrets[indexArret];
  const choisirArret = (i: number) => { if (i < arrets.length - 1) setParams({ arret: ligne.arrets[i] }, { replace: true }); };

  useEffect(() => { setRecentes((r) => ajouterRecente(r, ligne.numero)); }, [ligne.numero]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { document.title = `${t('ligne', { ligne: ligne.numero })} ${t('vers', { destination: ligne.destination }).toLowerCase()}, Ana Bus`; return () => { document.title = 'Ana Bus'; }; }, [ligne]);

  const { positions, maintenant } = usePositions(ligne);
  const passages = prochainsPassages(ligne, indexArret, positions, maintenant);
  const favori = favoris.some((f) => f.ligne === ligne.numero && f.arret === arret.id);
  const alerte = alertes.find((a) => a.ligne === ligne.numero && a.arret === arret.id);

  const basculerFavori = () =>
    setFavoris((liste) => (favori ? liste.filter((f) => !(f.ligne === ligne.numero && f.arret === arret.id)) : [...liste, { ligne: ligne.numero, arret: arret.id }]));

  const infos: InfosProps = { ligne, indexArret, passages };
  const actions = (
    <>
      <Bouton icone="horloge" className="suivi-prevenir" onClick={() => setFeuille('prevenir')}>
        {t('suivi.mePrevenir', { minutes: alerte?.minutes ?? 2 })}
      </Bouton>
      <div className="suivi-discrets">
        <Bouton variante="discret" onClick={() => setFeuille('signaler')}>{t('suivi.signaler')}</Bouton>
        <Bouton variante="discret" aria-pressed={favori} onClick={basculerFavori}>
          {t(favori ? 'suivi.retirerFavori' : 'suivi.ajouterFavori')}
        </Bouton>
      </div>
    </>
  );
  const selecteur = <SelecteurArret ligne={ligne} index={indexArret} onChange={choisirArret} />;
  const feuilles = feuille === 'prevenir'
    ? <FeuillePrevenir ligne={ligne} arret={arret} onFermer={() => setFeuille(null)} />
    : feuille === 'signaler'
      ? <FeuilleSignaler ligne={ligne} arret={arret} onFermer={() => setFeuille(null)} />
      : null;

  // Ordinateur, ou téléphone venu du site : le panneau et la carte. Sinon : la vue de l'appli.
  if (grandEcran || state?.depuis === 'site') {
    return (
      <div className="suivi-site">
        <Bandeaux />
        <div className="suivi-site-corps">
          <aside className="suivi-panneau">
            <Link to="/" aria-label={t('site.accueil')} className="suivi-logo"><Logo largeur={141} /></Link>
            <RechercheChangerLigne numero={ligne.numero} />
            <EnteteLigne ligne={ligne} />
            {selecteur}
            <BlocMinutes {...infos} variante="panneau" />
            <BusSuivants passages={passages.slice(1, 3)} />
            <div className="suivi-panneau-actions">{actions}</div>
          </aside>
          <main className="suivi-site-carte">
            <Suspense fallback={<div className="carte-attente" />}>
              <CarteLigne
                ligne={ligne} indexArret={indexArret} positions={positions} etiquettes="toutes" controles legende
                marge={{ top: 80, bottom: 96, left: 64, right: 96 }} onChoisirArret={choisirArret} className="suivi-carte"
              />
            </Suspense>
          </main>
        </div>
        {feuilles}
      </div>
    );
  }

  return (
    <div className="suivi-appli">
      <Bandeaux />
      <div className="suivi-zone-carte">
        <Suspense fallback={<div className="carte-attente" />}>
          <CarteLigne
            ligne={ligne} indexArret={indexArret} positions={positions}
            marge={{ top: 88, bottom: 56, left: 40, right: 40 }} cadrage="arret" onChoisirArret={choisirArret} className="suivi-carte"
          />
        </Suspense>
        <div className="suivi-haut">
          <LienRond icone="retour" libelle={t('retourAccueil')} apparence="flottant" vers="/app" />
          <div className="suivi-pilule">
            <BadgeLigne ligne={ligne.numero} />
            <span className="suivi-pilule-dest">{t('vers', { destination: ligne.destination })}</span>
          </div>
        </div>
      </div>
      <FeuilleBas className="suivi-feuille">
        <BlocMinutes {...infos} variante="feuille" />
        <ListeArrets {...infos} />
        <ChangerArret>{selecteur}</ChangerArret>
        {actions}
      </FeuilleBas>
      {feuilles}
    </div>
  );
}

interface InfosProps { ligne: Ligne; indexArret: number; passages: Passage[] }

/** Le statut, la mise à jour et les minutes du prochain bus. */
function BlocMinutes({ ligne, indexArret, passages, variante }: InfosProps & { variante: 'feuille' | 'panneau' }) {
  const arret = arretsDe(ligne)[indexArret];
  const prochain = passages[0];
  if (!prochain) return <p className="texte-doux">{t('suivi.aucunBus')}</p>;
  const etat = etatPassage(ligne, prochain);
  const detail = etat.statut === 'prevu'
    ? t('positionInconnueSuivi', { ligne: ligne.numero, minutes: prochain.minutes })
    : etat.detail;

  return (
    <div className={`suivi-minutes suivi-minutes-${variante}`}>
      <div className="suivi-statut">
        <Statut type={etat.statut}>{etat.mot}</Statut>
        <span className="legende texte-doux">{detail}</span>
      </div>
      <div className="suivi-temps">
        {/* Le plus grand chiffre de l'écran ; sous 1 min, « Mu ngi ñëw » le remplace. */}
        {estMuNgiNew(prochain.minutes) ? (
          <span className="suivi-ngi">{t('muNgiNew')}</span>
        ) : (
          <p className="suivi-chiffre"><span className="suivi-nombre">{prochain.minutes}</span> <span className="suivi-unite">{t('min')}</span></p>
        )}
        <span className="suivi-avant texte-doux">
          {variante === 'feuille' ? t('suivi.avantVotreArret', { arret: arret.nom }) : t('suivi.avant', { arret: arret.nom })}
        </span>
      </div>
    </div>
  );
}

/** Les prochains arrêts : le vôtre, les deux suivants, et le terminus. */
function ListeArrets({ ligne, indexArret, passages }: InfosProps) {
  const prochain = passages[0];
  if (!prochain) return null;
  const arrets = arretsDe(ligne);
  const minutes = minutesJusquAuxArrets(ligne, prochain);
  const indices = Array.from({ length: arrets.length - indexArret }, (_, i) => indexArret + i);
  const choisis = indices.length > 4 ? [...indices.slice(0, 3), indices[indices.length - 1]] : indices;
  const liste: ArretAffiche[] = choisis.map((i) => ({
    nom: arrets[i].nom,
    minutes: minutes[i],
    role: i === indexArret ? 'usager' : i === arrets.length - 1 ? 'terminus' : undefined,
  }));
  return <ArretListe arrets={liste} />;
}

function BusSuivants({ passages }: { passages: Passage[] }) {
  if (passages.length === 0) return null;
  return (
    <section className="suivi-suivants">
      <h2 className="suivi-suivants-titre">{t('suivi.busSuivants')}</h2>
      <ul>
        {passages.map((p) => (
          <li key={p.bus} className={p.source === 'direct' ? '' : 'suivi-suivant-prevu'}>
            <span>{t(p.source === 'direct' ? 'suivi.positionDirect' : 'suivi.horairePrevu')}</span>
            <span className="suivi-suivant-min">{t('minutes', { minutes: p.minutes })}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EnteteLigne({ ligne }: { ligne: Ligne }) {
  const reseau = reseauDe(ligne);
  return (
    <div className="suivi-entete">
      <BadgeLigne ligne={ligne.numero} taille="lg" />
      <div className="suivi-entete-texte">
        <h1 className="suivi-destination">{t('vers', { destination: ligne.destination })}</h1>
        <span className="legende texte-doux">
          {ligne.direct ? t('busEnCirculation', { reseau: reseau.nom, n: ligne.bus }) : t('horairesSeulement', { reseau: reseau.nom })}
        </span>
      </div>
    </div>
  );
}

function SelecteurArret({ ligne, index, onChange }: { ligne: Ligne; index: number; onChange: (i: number) => void }) {
  const arrets = arretsDe(ligne).slice(0, -1); // pas le terminus : on n'y attend pas le bus
  return (
    <label className="suivi-selecteur">
      <span className="legende texte-doux">{t('suivi.votreArret')}</span>
      <select value={index} onChange={(e) => onChange(Number(e.target.value))}>
        {arrets.map((a, i) => <option key={a.id} value={i}>{a.nom}</option>)}
      </select>
    </label>
  );
}

/** Sur téléphone, le choix de l'arrêt reste replié derrière « Changer d'arrêt ». */
function ChangerArret({ children }: { children: React.ReactNode }) {
  const [ouvert, setOuvert] = useState(false);
  if (ouvert) return <>{children}</>;
  return <Bouton variante="discret" className="suivi-changer" onClick={() => setOuvert(true)}>{t('suivi.changerArret')}</Bouton>;
}

function RechercheChangerLigne({ numero }: { numero: string }) {
  const [valeur, setValeur] = useState(numero);
  const chercher = useAllerALigne('site');
  useEffect(() => setValeur(numero), [numero]);
  return <RechercheLigne valeur={valeur} onChange={setValeur} onSubmit={chercher} className="suivi-recherche" />;
}
