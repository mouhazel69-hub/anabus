import type { StyleSpecification, Map as CarteMapLibre } from 'maplibre-gl';

// Le fond de carte : OpenStreetMap vectoriel servi par OpenFreeMap (gratuit, sans clé,
// attribution obligatoire, affichée en bas de la carte). On le restyle avec les couleurs
// de la charte pour qu'il reste sobre et désaturé : seuls le bus et sa ligne ressortent.

export const URL_STYLE_FOND = 'https://tiles.openfreemap.org/styles/positron';

/** Lit une variable de design (tokens.css) dans le thème en cours. */
export function couleur(nom: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${nom}`).trim();
}

/** Un fond uni, utilisé tant que le vrai fond n'est pas chargé, ou sans connexion. */
export function styleSecours(): StyleSpecification {
  return {
    version: 8,
    sources: {},
    layers: [{ id: 'fond', type: 'background', paint: { 'background-color': couleur('fond-carte') } }],
  };
}

/** Charge le style OpenFreeMap ; renvoie null s'il est injoignable (hors connexion, réseau bloqué). */
export async function chargerStyleFond(): Promise<StyleSpecification | null> {
  try {
    const controle = new AbortController();
    const delai = setTimeout(() => controle.abort(), 6000);
    const reponse = await fetch(URL_STYLE_FOND, { signal: controle.signal });
    clearTimeout(delai);
    if (!reponse.ok) return null;
    return (await reponse.json()) as StyleSpecification;
  } catch {
    return null;
  }
}

/**
 * Repeint les couches du fond avec les couleurs de la charte :
 * sol en fond-carte, rues en trait, eau un peu plus marquée, textes en encre-douce,
 * et on cache ce qui distrait (pictos, points d'intérêt, frontières).
 */
export function restylerFond(carte: CarteMapLibre) {
  const sol = couleur('fond-carte');
  const rue = couleur('trait');
  const texte = couleur('encre-douce');
  const eauCalculee = melanger(couleur('bleu'), sol, 0.14) ?? rue;

  for (const couche of carte.getStyle().layers ?? []) {
    const id = couche.id;
    if (estCoucheAnaBus(id)) continue;
    const ou = `${id} ${'source-layer' in couche ? couche['source-layer'] ?? '' : ''}`;
    try {
      if (couche.type === 'background') carte.setPaintProperty(id, 'background-color', sol);
      else if (couche.type === 'fill') {
        if (/water/.test(ou)) carte.setPaintProperty(id, 'fill-color', eauCalculee);
        else if (/building/.test(ou)) { carte.setPaintProperty(id, 'fill-color', rue); carte.setPaintProperty(id, 'fill-opacity', 0.5); }
        else carte.setPaintProperty(id, 'fill-opacity', 0);
      } else if (couche.type === 'line') {
        if (/water/.test(ou)) carte.setPaintProperty(id, 'line-color', eauCalculee);
        else if (/road|highway|transportation|bridge|tunnel|rail/.test(ou)) carte.setPaintProperty(id, 'line-color', rue);
        else carte.setPaintProperty(id, 'line-opacity', 0);
      } else if (couche.type === 'symbol') {
        if (/poi|shield|housenumber/.test(ou)) carte.setLayoutProperty(id, 'visibility', 'none');
        else {
          carte.setPaintProperty(id, 'text-color', texte);
          carte.setPaintProperty(id, 'text-halo-color', sol);
          carte.setPaintProperty(id, 'icon-opacity', 0);
        }
      }
    } catch {
      // une propriété absente sur une couche : on passe à la suivante
    }
  }
}

export const estCoucheAnaBus = (id: string) => id.startsWith('ana-');

/** Mélange deux couleurs #rrggbb (part de a entre 0 et 1). */
function melanger(a: string, b: string, part: number): string | null {
  const ca = hex(a), cb = hex(b);
  if (!ca || !cb) return null;
  const c = ca.map((v, i) => Math.round(v * part + cb[i] * (1 - part)));
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
function hex(c: string): number[] | null {
  const m = /^#([0-9a-f]{6})/i.exec(c);
  return m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : null;
}
