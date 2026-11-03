import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import maplibregl, { type GeoJSONSource, type LngLatBoundsLike } from 'maplibre-gl';
import type { FeatureCollection } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Coord, Ligne, PositionBus } from '../donnees/types';
import { arretsDe } from '../logique/catalogue';
import { RepereBus } from '../composants/RepereBus';
import { BoutonRond } from '../composants/BoutonRond';
import { t } from '../i18n';
import { chargerStyleFond, couleur, restylerFond, styleSecours } from './styleCarte';
import './CarteLigne.css';

interface CarteLigneProps {
  ligne: Ligne;
  /** L'arrêt de l'usager, surligné en jaune doux. */
  indexArret: number;
  positions: PositionBus[];
  /** apercu : carte figée de la page d'accueil du site ; suivi : carte qu'on peut déplacer. */
  mode?: 'suivi' | 'apercu';
  /** Afficher le nom de tous les arrêts (ordinateur) ou seulement celui de l'usager. */
  etiquettes?: 'usager' | 'toutes';
  /** Boutons Zoomer, Dézoomer, Me localiser. */
  controles?: boolean;
  legende?: boolean;
  /** Marge intérieure pour cadrer la ligne (par exemple la hauteur de la feuille du bas). */
  marge?: { top: number; bottom: number; left: number; right: number };
  /** ligne : toute la ligne à l'écran ; arret : les environs de votre arrêt (petit écran). */
  cadrage?: 'ligne' | 'arret';
  /** Toucher un arrêt sur la carte le choisit comme « votre arrêt ». */
  onChoisirArret?: (index: number) => void;
  className?: string;
}

const reduireMouvement = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * La carte d'une ligne : tracé bleu de 5 px, arrêts en disques cerclés d'encre,
 * arrêt de l'usager en jaune doux, et un RepereBus par bus.
 * Le tracé et les arrêts sont des couches MapLibre ; les repères et les étiquettes sont
 * de vrais composants React, posés sur la carte avec des « marqueurs ».
 */
export default function CarteLigne({
  ligne, indexArret, positions, mode = 'suivi', etiquettes = 'usager', controles = false, legende = false,
  marge = { top: 72, bottom: 48, left: 48, right: 48 }, cadrage = 'ligne', onChoisirArret, className,
}: CarteLigneProps) {
  const conteneur = useRef<HTMLDivElement>(null);
  const carte = useRef<maplibregl.Map | null>(null);
  const marqueursBus = useRef(new Map<string, maplibregl.Marker>());
  const [elementsBus, setElementsBus] = useState<Record<string, HTMLElement>>({});
  const [elementsArrets, setElementsArrets] = useState<HTMLElement[]>([]);
  const [prete, setPrete] = useState(false);
  const [moi, setMoi] = useState<Coord | null>(null);
  const elementMoi = useRef<HTMLElement | null>(null);
  const choisir = useRef(onChoisirArret);
  choisir.current = onChoisirArret;
  const arrets = arretsDe(ligne);
  const indexArretCourant = useRef(indexArret);
  indexArretCourant.current = indexArret;

  // 1. Création de la carte, une seule fois par ligne.
  useEffect(() => {
    if (!conteneur.current) return;
    const limites = limitesCadrage(ligne, indexArret, cadrage);
    const c = new maplibregl.Map({
      container: conteneur.current,
      style: styleSecours(),
      bounds: limites as LngLatBoundsLike,
      fitBoundsOptions: { padding: marge },
      interactive: mode === 'suivi',
      attributionControl: { compact: true },
      cooperativeGestures: false,
      fadeDuration: 0,
    });
    c.touchZoomRotate.disableRotation();
    c.dragRotate.disable();
    carte.current = c;

    // À chaque chargement de style (secours, puis vrai fond), on remet nos couches par-dessus.
    c.on('style.load', () => { restylerFond(c); ajouterCouches(c, ligne, indexArretCourant.current); setPrete(true); });
    chargerStyleFond().then((style) => { if (style && carte.current === c) c.setStyle(style); });

    c.on('click', 'ana-arrets', (e) => {
      const i = e.features?.[0]?.properties?.index;
      if (typeof i === 'number') choisir.current?.(i);
    });
    c.on('mouseenter', 'ana-arrets', () => { if (choisir.current) c.getCanvas().style.cursor = 'pointer'; });
    c.on('mouseleave', 'ana-arrets', () => { c.getCanvas().style.cursor = ''; });

    // Étiquettes des arrêts : des éléments HTML, remplis plus bas par React.
    const elements = arrets.map((a) => {
      const el = document.createElement('div');
      new maplibregl.Marker({ element: el, anchor: 'top', offset: [0, 14] }).setLngLat(a.coord).addTo(c);
      return el;
    });
    setElementsArrets(elements);

    // Quand le thème change (clair ↔ sombre), on repeint le fond et nos couches.
    const observateur = new MutationObserver(() => {
      if (!c.isStyleLoaded()) return;
      restylerFond(c);
      peindreCouches(c);
    });
    observateur.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const bus = marqueursBus.current;
    return () => {
      observateur.disconnect();
      bus.clear();
      c.remove();
      carte.current = null;
      setPrete(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ligne.numero, mode]);

  // 2. L'arrêt de l'usager change : on met à jour les disques.
  useEffect(() => {
    const c = carte.current;
    if (!c || !prete) return;
    (c.getSource('ana-arrets') as GeoJSONSource | undefined)?.setData(donneesArrets(ligne, indexArret));
    if (cadrage === 'arret') c.fitBounds(limitesCadrage(ligne, indexArret, cadrage), { padding: marge, animate: !reduireMouvement() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexArret, prete, ligne]);

  // 3. Les bus bougent : on crée, déplace ou retire leurs marqueurs.
  useEffect(() => {
    const c = carte.current;
    if (!c) return;
    const vus = new Set<string>();
    let nouveaux = false;
    for (const p of positions) {
      vus.add(p.id);
      let m = marqueursBus.current.get(p.id);
      if (!m) {
        const el = document.createElement('div');
        m = new maplibregl.Marker({ element: el }).setLngLat(p.coord).addTo(c);
        marqueursBus.current.set(p.id, m);
        nouveaux = true;
      } else {
        m.setLngLat(p.coord);
      }
    }
    for (const [id, m] of marqueursBus.current) {
      if (!vus.has(id)) { m.remove(); marqueursBus.current.delete(id); nouveaux = true; }
    }
    if (nouveaux) {
      const els: Record<string, HTMLElement> = {};
      marqueursBus.current.forEach((m, id) => { els[id] = m.getElement(); });
      setElementsBus(els);
    }
  }, [positions]);

  // Le point « vous êtes ici », après « Me localiser ».
  useEffect(() => {
    const c = carte.current;
    if (!c || !moi) return;
    if (!elementMoi.current) {
      const el = document.createElement('div');
      el.className = 'carte-moi';
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', t('carte.votrePosition'));
      elementMoi.current = el;
      new maplibregl.Marker({ element: el }).setLngLat(moi).addTo(c);
    }
    c.flyTo({ center: moi, zoom: Math.max(c.getZoom(), 14), animate: !reduireMouvement() });
  }, [moi]);

  const [erreurPosition, setErreurPosition] = useState(false);
  function localiser() {
    if (!('geolocation' in navigator)) { setErreurPosition(true); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => { setErreurPosition(false); setMoi([p.coords.longitude, p.coords.latitude]); },
      () => setErreurPosition(true),
      { timeout: 8000 },
    );
  }

  const parId = new Map(positions.map((p) => [p.id, p]));

  return (
    <div className={['carte-ligne', `carte-ligne-${mode}`, className].filter(Boolean).join(' ')}>
      <div ref={conteneur} className="carte-ligne-fond" role="region" aria-label={t('suivi.carte', { ligne: ligne.numero })} />

      {Object.entries(elementsBus).map(([id, el]) => {
        const p = parId.get(id);
        return p ? createPortal(<RepereBus ligne={ligne.numero} direct={p.source === 'direct'} />, el, id) : null;
      })}

      {elementsArrets.map((el, i) => {
        const usager = i === indexArret;
        const terminus = i === arrets.length - 1;
        if (etiquettes === 'usager' && !usager) return null;
        return createPortal(
          <span className={['carte-etiquette', usager && 'carte-etiquette-usager', terminus && 'carte-etiquette-forte'].filter(Boolean).join(' ')}>
            {usager && etiquettes === 'toutes' ? t('suivi.arretUsagerCarte', { arret: arrets[i].nom }) : arrets[i].nom}
          </span>,
          el,
          `etiquette-${i}`,
        );
      })}

      {controles && (
        <div className="carte-controles">
          <BoutonRond icone="plus" libelle={t('carte.zoomer')} apparence="flottant" className="carte-bouton" onClick={() => carte.current?.zoomIn({ animate: !reduireMouvement() })} />
          <BoutonRond icone="moins" libelle={t('carte.dezoomer')} apparence="flottant" className="carte-bouton" onClick={() => carte.current?.zoomOut({ animate: !reduireMouvement() })} />
          <BoutonRond icone="localiser" libelle={t('carte.meLocaliser')} apparence="flottant" className="carte-bouton" onClick={localiser} />
        </div>
      )}
      {erreurPosition && <p className="carte-message" role="status">{t('carte.positionRefusee')}</p>}

      {legende && (
        <ul className="carte-legende">
          <li><span className="legende-bus" aria-hidden="true" />{t('carte.legendeBus', { ligne: ligne.numero })}</li>
          <li><span className="legende-trajet" aria-hidden="true" />{t('carte.legendeTrajet')}</li>
          <li><span className="legende-arret" aria-hidden="true" />{t('carte.legendeArret')}</li>
        </ul>
      )}
    </div>
  );
}

/** La zone à montrer : toute la ligne, ou l'arrêt précédent et les deux suivants. */
function limitesCadrage(ligne: Ligne, indexArret: number, cadrage: 'ligne' | 'arret'): maplibregl.LngLatBounds {
  const points = cadrage === 'ligne'
    ? ligne.trace
    : arretsDe(ligne).slice(Math.max(0, indexArret - 1), indexArret + 2).map((a) => a.coord);
  return points.reduce((b, c) => b.extend(c), new maplibregl.LngLatBounds(points[0], points[0]));
}

function donneesArrets(ligne: Ligne, indexArret: number): FeatureCollection {
  const arrets = arretsDe(ligne);
  return {
    type: 'FeatureCollection',
    features: arrets.map((a, i) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: a.coord },
      properties: { index: i, usager: i === indexArret, terminus: i === arrets.length - 1 },
    })),
  };
}

/** Ajoute le tracé et les arrêts de la ligne au-dessus du fond de carte. */
function ajouterCouches(c: maplibregl.Map, ligne: Ligne, indexArret: number) {
  if (!c.getSource('ana-trace')) {
    c.addSource('ana-trace', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: ligne.trace } } });
  }
  if (!c.getSource('ana-arrets')) c.addSource('ana-arrets', { type: 'geojson', data: donneesArrets(ligne, indexArret) });
  if (!c.getLayer('ana-trace')) {
    c.addLayer({ id: 'ana-trace', type: 'line', source: 'ana-trace', layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-width': 5 } });
  }
  if (!c.getLayer('ana-arrets')) {
    c.addLayer({
      id: 'ana-arrets', type: 'circle', source: 'ana-arrets',
      paint: { 'circle-radius': ['case', ['get', 'usager'], 10, 7], 'circle-stroke-width': 2.5 },
    });
  }
  peindreCouches(c);
}

/** Les couleurs de nos couches, lues dans les variables de design du thème en cours. */
function peindreCouches(c: maplibregl.Map) {
  if (!c.getLayer('ana-trace')) return;
  c.setPaintProperty('ana-trace', 'line-color', couleur('bleu'));
  c.setPaintProperty('ana-arrets', 'circle-color', ['case', ['get', 'usager'], couleur('jaune-doux'), ['get', 'terminus'], couleur('encre'), couleur('fond')]);
  c.setPaintProperty('ana-arrets', 'circle-stroke-color', couleur('encre'));
}
