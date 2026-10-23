import { useState } from 'react';
import { Bouton } from '../composants/Bouton';
import { BadgeLigne } from '../composants/BadgeLigne';
import { Statut } from '../composants/Statut';
import { CarteArrivee } from '../composants/CarteArrivee';
import { RechercheLigne } from '../composants/RechercheLigne';
import { RepereBus } from '../composants/RepereBus';
import { ArretListe } from '../composants/ArretListe';
import { Kaay } from '../composants/Kaay';
import { BoutonRond } from '../composants/BoutonRond';
import { FeuilleBas } from '../composants/FeuilleBas';
import { ChoixOptions } from '../composants/ChoixOptions';
import { BarreNavigation } from '../composants/BarreNavigation';

/** Bloc de démonstration : un titre, une explication, le composant. */
function Demo({ nom, note, children, fond }: { nom: string; note: string; children: React.ReactNode; fond?: 'carte' }) {
  return (
    <div className="demo">
      <h3 className="corps-fort">{nom}</h3>
      <p className="legende design-doux">{note}</p>
      <div className={fond === 'carte' ? 'demo-scene demo-scene-carte' : 'demo-scene'}>{children}</div>
    </div>
  );
}

export function DemoComposants() {
  const [delai, setDelai] = useState<'2' | '5' | '10'>('2');
  const [feuille, setFeuille] = useState(false);
  const [saisie, setSaisie] = useState('');

  return (
    <div className="demos">
      <Demo nom="Bouton" note="principal une seule fois par écran ; secondaire ; discret. Tailles md (48 px) et lg (56 px).">
        <Bouton>Voir le bus</Bouton>
        <Bouton variante="secondaire" icone="arret">Arrêts proches</Bouton>
        <Bouton variante="discret">Annuler</Bouton>
        <Bouton taille="lg" pleineLargeur>C'est parti</Bouton>
      </Demo>

      <Demo nom="BadgeLigne" note="Lu « Ligne 23 » par les lecteurs d'écran. Tailles md et lg.">
        <BadgeLigne ligne="23" />
        <BadgeLigne ligne="B1" reseau="BRT" />
        <BadgeLigne ligne="16A" />
        <BadgeLigne ligne="20" taille="lg" />
      </Demo>

      <Demo nom="Statut" note="Une couleur, un picto et un mot, toujours ensemble.">
        <Statut type="direct" />
        <Statut type="proche" />
        <Statut type="retard">Retard de 8 min</Statut>
        <Statut type="prevu" />
      </Demo>

      <Demo nom="CarteArrivee" note="À 3 min ou moins : « Arrive ». À 1 min ou moins : « Mu ngi ñëw » remplace le chiffre." fond="carte">
        <CarteArrivee ligne="23" destination="Vers Petersen" arret="Arrêt Liberté 6" minutes={1} miseAJour="Mis à jour il y a 10 s" />
        <CarteArrivee ligne="B1" destination="Vers Guédiawaye" arret="Station Grand Médine" minutes={4} miseAJour="Mis à jour il y a 20 s" />
        <CarteArrivee ligne="20" destination="Vers Place Leclerc" arret="Arrêt Liberté 6" minutes={3} miseAJour="Mis à jour il y a 5 s" />
        <CarteArrivee ligne="16A" destination="Vers Keur Massar" arret="Arrêt Liberté 6" minutes={17} statut="retard" motStatut="Retard de 8 min" miseAJour="Embouteillage à Colobane" />
        <CarteArrivee ligne="16A" destination="Vers Keur Massar" arret="Arrêt Colobane" minutes={22} statut="prevu" miseAJour="Position inconnue pour la ligne 16A" />
      </Demo>

      <Demo nom="RechercheLigne" note="Champ de 48 px, bord trait-fort, bouton principal « Voir le bus ».">
        <RechercheLigne valeur={saisie} onChange={setSaisie} placeholder="Ex. 23 ou B1" onSubmit={(v) => setSaisie(v.toUpperCase())} />
      </Demo>

      <Demo nom="RepereBus" note="Onde seulement en direct ; elle disparaît si l'usager réduit les animations." fond="carte">
        <span className="demo-repere"><RepereBus ligne="23" /></span>
        <span className="demo-repere"><RepereBus ligne="23" direct={false} /></span>
      </Demo>

      <Demo nom="ArretListe" note="Les prochains arrêts du suivi, le long du trait bleu.">
        <div className="demo-large">
          <ArretListe arrets={[
            { nom: 'Liberté 6', minutes: 4, role: 'usager' },
            { nom: 'Sacré-Cœur', minutes: 9 },
            { nom: 'Colobane', minutes: 17 },
            { nom: 'Petersen', minutes: 26, role: 'terminus' },
          ]} />
        </div>
      </Demo>

      <Demo nom="Kaay" note="Version simple en thème clair, contour en thème sombre. Jamais sur la carte ni à côté des minutes.">
        <Kaay expression="salut" taille={96} />
        <Kaay expression="oups" taille={96} />
        <Kaay expression="dodo" taille={96} />
        <span className="demo-nuit"><Kaay expression="mu-ngi-new" taille={96} contour="toujours" /></span>
      </Demo>

      <Demo nom="BoutonRond" note="44 px de diamètre, zone tactile de 48 px.">
        <BoutonRond icone="retour" libelle="Retour" apparence="doux" />
        <BoutonRond icone="retour" libelle="Retour" apparence="flottant" />
        <BoutonRond icone="plus" libelle="Zoomer" apparence="flottant" />
        <BoutonRond icone="moins" libelle="Dézoomer" apparence="flottant" />
        <BoutonRond icone="localiser" libelle="Me localiser" apparence="flottant" />
      </Demo>

      <Demo nom="ChoixOptions" note="Choix radio de 56 px ; le choix actif a un fond jaune doux et un bord bleu.">
        <div className="demo-large">
          <ChoixOptions legende="Délai de l'alerte" valeur={delai} onChange={setDelai} options={[
            { valeur: '2', libelle: 'Quand il est à 2 min' },
            { valeur: '5', libelle: 'Quand il est à 5 min' },
            { valeur: '10', libelle: 'Quand il est à 10 min' },
          ]} />
        </div>
      </Demo>

      <Demo nom="FeuilleBas" note="Posée en bas de l'écran ; en modale, le fond s'assombrit et Échap la ferme." fond="carte">
        <div className="demo-large">
          <FeuilleBas>
            <div className="demo-ligne">
              <Statut type="direct" />
              <span className="legende design-doux">Mis à jour il y a 20 s</span>
            </div>
            <Bouton variante="secondaire" onClick={() => setFeuille(true)}>Ouvrir la feuille modale</Bouton>
          </FeuilleBas>
        </div>
        {feuille && (
          <FeuilleBas modale titre="Vous prévenir avant l'arrivée" texte="Ligne 23 vers Petersen, à l'arrêt Liberté 6." onFermer={() => setFeuille(false)}>
            <ChoixOptions legende="Délai de l'alerte" valeur={delai} onChange={setDelai} options={[
              { valeur: '2', libelle: 'Quand il est à 2 min' },
              { valeur: '5', libelle: 'Quand il est à 5 min' },
              { valeur: '10', libelle: 'Quand il est à 10 min' },
            ]} />
            <Bouton pleineLargeur icone="cloche" onClick={() => setFeuille(false)}>Activer l'alerte</Bouton>
            <Bouton variante="discret" onClick={() => setFeuille(false)}>Annuler</Bouton>
          </FeuilleBas>
        )}
      </Demo>

      <Demo nom="BarreNavigation" note="En bas de Accueil, Mes lignes et Alertes. Ici en aperçu, hors de sa position fixe.">
        <div className="demo-large demo-barre"><BarreNavigation /></div>
      </Demo>
    </div>
  );
}
