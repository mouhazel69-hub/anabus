import { useState } from 'react';
import { FeuilleBas } from '../../composants/FeuilleBas';
import { ChoixOptions } from '../../composants/ChoixOptions';
import { Bouton } from '../../composants/Bouton';
import { t } from '../../i18n';
import type { Arret, Ligne } from '../../donnees/types';
import { useAlertes, useSignalements, type TypeSignalement } from '../../stockage/donneesUsager';
import { useAnnoncer } from '../commun/Annonces';

interface FeuilleProps { ligne: Ligne; arret: Arret; onFermer: () => void }

type Delai = '2' | '5' | '10';

/** 04. Me prévenir : choisir le délai, puis activer l'alerte. */
export function FeuillePrevenir({ ligne, arret, onFermer }: FeuilleProps) {
  const [alertes, setAlertes] = useAlertes();
  const existante = alertes.find((a) => a.ligne === ligne.numero && a.arret === arret.id);
  const [delai, setDelai] = useState<Delai>((String(existante?.minutes ?? 2) as Delai));
  const annoncer = useAnnoncer();

  async function activer() {
    // On demande la permission au moment où l'usager active l'alerte, pas avant.
    let permission: NotificationPermission | 'absente' = 'absente';
    if ('Notification' in window) {
      permission = Notification.permission;
      if (permission === 'default') {
        try { permission = await Notification.requestPermission(); } catch { permission = 'denied'; }
      }
    }
    const minutes = Number(delai);
    setAlertes((liste) => [
      ...liste.filter((a) => !(a.ligne === ligne.numero && a.arret === arret.id)),
      { id: `${ligne.numero}-${arret.id}-${Date.now()}`, ligne: ligne.numero, arret: arret.id, minutes, creee: Date.now() },
    ]);
    const confirmation = t('prevenir.confirmation', { ligne: ligne.numero, minutes, arret: arret.nom });
    // Si les notifications sont refusées, l'alerte s'affichera dans l'appli.
    annoncer({ texte: permission === 'granted' ? confirmation : `${confirmation} ${t('prevenir.refusee')}` });
    onFermer();
  }

  return (
    <FeuilleBas
      modale onFermer={onFermer} titre={t('prevenir.titre')}
      texte={t('prevenir.texte', { ligne: ligne.numero, destination: ligne.destination, arret: arret.nom })}
    >
      <ChoixOptions<Delai>
        legende={t('prevenir.legende')} valeur={delai} onChange={setDelai}
        options={(['2', '5', '10'] as Delai[]).map((d) => ({ valeur: d, libelle: t('prevenir.option', { minutes: d }) }))}
      />
      <Bouton pleineLargeur icone="cloche" onClick={activer}>{t('prevenir.activer')}</Bouton>
      <Bouton variante="discret" className="feuille-annuler" onClick={onFermer}>{t('prevenir.annuler')}</Bouton>
    </FeuilleBas>
  );
}

/** 05. Signaler un problème : 4 choix, enregistrés sur l'appareil en phase 1. */
export function FeuilleSignaler({ ligne, arret, onFermer }: FeuilleProps) {
  const [type, setType] = useState<TypeSignalement>('plein');
  const [, setSignalements] = useSignalements();
  const annoncer = useAnnoncer();

  function envoyer() {
    setSignalements((liste) => [...liste, { ligne: ligne.numero, arret: arret.id, type, instant: Date.now() }]);
    annoncer({ texte: t('signaler.confirmation') });
    onFermer();
  }

  return (
    <FeuilleBas
      modale onFermer={onFermer} titre={t('signaler.titre')}
      texte={t('signaler.texte', { ligne: ligne.numero, destination: ligne.destination, arret: arret.nom })}
    >
      <ChoixOptions<TypeSignalement>
        legende={t('signaler.legende')} valeur={type} onChange={setType}
        options={[
          { valeur: 'plein', libelle: t('signaler.plein') },
          { valeur: 'panne', libelle: t('signaler.panne') },
          { valeur: 'deviation', libelle: t('signaler.deviation') },
          { valeur: 'passe', libelle: t('signaler.passe') },
        ]}
      />
      <Bouton pleineLargeur icone="alerte" onClick={envoyer}>{t('signaler.envoyer')}</Bouton>
      <Bouton variante="discret" className="feuille-annuler" onClick={onFermer}>{t('prevenir.annuler')}</Bouton>
    </FeuilleBas>
  );
}
