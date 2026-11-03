import { useEffect, useRef } from 'react';
import { sourcePositions } from '../../donnees/simulateur';
import { prochainsPassages } from '../../logique/arrivees';
import { trouverArret, trouverLigne } from '../../logique/catalogue';
import { estMuNgiNew } from '../../logique/seuils';
import { useAlertes, type Alerte } from '../../stockage/donneesUsager';
import { lire, ecrire } from '../../stockage/stockage';
import { t } from '../../i18n';
import { useAnnoncer } from './Annonces';

const BASE = import.meta.env.BASE_URL;

/**
 * Surveille les alertes actives toutes les secondes. Quand le bus attendu est à moins
 * du délai choisi, on prévient l'usager : notification du navigateur si elle est permise,
 * et toujours un message dans l'appli. L'alerte est ensuite retirée.
 * Phase 1 : cela ne marche que tant qu'Ana Bus est ouvert.
 */
export function VeilleurAlertes() {
  const [alertes] = useAlertes();
  const annoncer = useAnnoncer();
  const annoncerRef = useRef(annoncer);
  annoncerRef.current = annoncer;

  useEffect(() => {
    if (alertes.length === 0) return;
    return sourcePositions.abonner(() => {
      const maintenant = Date.now();
      const declenchees: string[] = [];
      for (const alerte of lire<Alerte[]>('alertes', [])) {
        const ligne = trouverLigne(alerte.ligne);
        const index = ligne?.arrets.indexOf(alerte.arret) ?? -1;
        if (!ligne || index < 0) { declenchees.push(alerte.id); continue; }
        const [prochain] = prochainsPassages(ligne, index, sourcePositions.positions(ligne.numero, maintenant), maintenant);
        if (prochain && prochain.minutes <= alerte.minutes) {
          declenchees.push(alerte.id);
          prevenir(ligne.numero, ligne.destination, trouverArret(alerte.arret)!.nom, prochain.minutes, annoncerRef.current);
        }
      }
      if (declenchees.length) ecrire('alertes', lire<Alerte[]>('alertes', []).filter((a) => !declenchees.includes(a.id)));
    });
  }, [alertes.length]);

  return null;
}

function prevenir(ligne: string, destination: string, arret: string, minutes: number, annoncer: ReturnType<typeof useAnnoncer>) {
  const proche = estMuNgiNew(minutes);
  const titre = proche ? t('muNgiNew') : t('notif.titre');
  const texte = proche
    ? t('notif.texteProche', { ligne, destination, arret })
    : t('notif.texte', { ligne, destination, arret, minutes });
  annoncer({ titre, texte, muNgiNew: proche });

  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const options: NotificationOptions = {
    body: texte,
    icon: proche ? `${BASE}icones/kaay-mu-ngi-new-192.png` : `${BASE}icones/icone-192.png`,
    badge: `${BASE}icones/icone-192.png`,
    tag: `ana-bus-${ligne}`,
  };
  // Sur Android, seules les notifications passées par le service worker sont permises.
  navigator.serviceWorker?.getRegistration()
    .then((reg) => { if (reg) return reg.showNotification(titre, options); new Notification(titre, options); })
    .catch(() => { try { new Notification(titre, options); } catch { /* le message dans l'appli suffit */ } });
}
