import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { LienRond } from '../composants/BoutonRond';
import { RechercheLigne } from '../composants/RechercheLigne';
import { BadgeLigne } from '../composants/BadgeLigne';
import { BoutonLien } from '../composants/Bouton';
import { Icone } from '../composants/Icone';
import { Kaay } from '../composants/Kaay';
import { GabaritAppli } from './commun/Gabarit';
import { t } from '../i18n';
import { comparerNumeros, lignesCommencantPar, lignesProches, rechercher } from '../logique/recherche';
import { normaliserNumero, reseauDe, toutesLesLignes, trouverLigne } from '../logique/catalogue';
import { useRecentes } from '../stockage/donneesUsager';
import type { Ligne } from '../donnees/types';
import './Recherche.css';

/**
 * 02. Recherche de ligne. Pendant la saisie : les lignes qui commencent par ce qui est tapé.
 * Après « Voir le bus » sur un numéro inconnu (?q=230) : l'écran « Aucune ligne » (02 bis).
 */
export default function Recherche() {
  const [params, setParams] = useSearchParams();
  const inconnu = params.get('q');
  const [saisie, setSaisie] = useState(inconnu ?? '');
  const [recentes] = useRecentes();
  const aller = useNavigate();

  function changer(v: string) {
    setSaisie(v);
    if (inconnu !== null) setParams({}, { replace: true }); // on retape : on quitte « Aucune ligne »
  }

  function envoyer(v: string) {
    const r = rechercher(v);
    if (r.type === 'trouvee') aller(`/ligne/${r.ligne.numero}`);
    else if (r.type === 'aucune') setParams({ q: r.numero }, { replace: true });
  }

  const aucune = inconnu !== null && !trouverLigne(inconnu);

  return (
    <GabaritAppli>
      <header className="colonne recherche-tete">
        <LienRond icone="retour" libelle={t('retourAccueil')} vers="/app" />
        <RechercheLigne
          valeur={saisie} onChange={changer} onSubmit={envoyer}
          placeholder={t('recherche.placeholderAppli')} autoFocus={!inconnu} className="recherche-tete-champ"
        />
      </header>
      {aucune ? <AucuneLigne numero={normaliserNumero(inconnu)} /> : <Suggestions saisie={saisie} recentes={recentes} />}
    </GabaritAppli>
  );
}

function Suggestions({ saisie, recentes }: { saisie: string; recentes: string[] }) {
  const tapee = normaliserNumero(saisie);
  const lignes = tapee ? lignesCommencantPar(tapee) : [...toutesLesLignes()].sort(comparerNumeros);
  const lignesRecentes = recentes.map((n) => trouverLigne(n)).filter((l): l is Ligne => !!l);

  return (
    <main className="colonne recherche-corps">
      {lignesRecentes.length > 0 && (
        <section className="recherche-bloc">
          <h2 className="recherche-sous-titre">{t('recherche.recentes')}</h2>
          <ul className="recherche-recentes">
            {lignesRecentes.map((l) => (
              <li key={l.numero}>
                <Link to={`/ligne/${l.numero}`} className="lien-badge"><BadgeLigne ligne={l.numero} /></Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="recherche-bloc recherche-bloc-serre">
        <h2 className="recherche-sous-titre">
          {tapee ? t('recherche.commencant', { saisie: tapee }) : t('recherche.toutes')}
        </h2>
        {lignes.length === 0 ? (
          <p className="texte-doux recherche-vide">{t('recherche.aucunDebut', { saisie: tapee })}</p>
        ) : (
          <ul className="recherche-liste">
            {lignes.map((l) => (
              <li key={l.numero}>
                <Link to={`/ligne/${l.numero}`} className="rangee">
                  <span className="rangee-badge"><BadgeLigne ligne={l.numero} /></span>
                  <span className="rangee-texte">
                    <span className="corps-fort">{t('vers', { destination: l.destination })}</span>
                    <span className="legende texte-doux">
                      {l.direct
                        ? t('busEnCirculation', { reseau: reseauDe(l).court, n: l.bus })
                        : t('horairesSeulement', { reseau: reseauDe(l).court })}
                    </span>
                  </span>
                  <Icone nom="suivant" className="rangee-chevron" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="aide">
        <span className="corps-fort">{t('recherche.aideTitre')}</span>
        <span className="texte-doux">{t('recherche.aideTexte')}</span>
        <BoutonLien to="/app" variante="secondaire" icone="arret">{t('recherche.arretsProches')}</BoutonLien>
      </section>
    </main>
  );
}

/** 02 bis. Aucun résultat : Kaay « oups » et les numéros qui ressemblent le plus. */
function AucuneLigne({ numero }: { numero: string }) {
  return (
    <main className="colonne aucune">
      <Kaay expression="oups" taille={200} />
      <h1 className="aucune-titre">{t('aucune.titre', { numero })}</h1>
      <p className="aucune-texte texte-doux">{t('aucune.texte')}</p>
      <ul className="aucune-proches">
        {lignesProches(numero).map((l) => (
          <li key={l.numero}>
            <Link to={`/ligne/${l.numero}`} className="lien-badge"><BadgeLigne ligne={l.numero} taille="lg" /></Link>
          </li>
        ))}
      </ul>
      <div className="aide aide-centree">
        <span>{t('aucune.aide')}</span>
        <BoutonLien to="/app" variante="secondaire" icone="arret">{t('recherche.arretsProches')}</BoutonLien>
      </div>
    </main>
  );
}
