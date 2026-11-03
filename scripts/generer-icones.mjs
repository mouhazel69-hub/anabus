// Génère les icônes PNG de la PWA à partir des SVG officiels (design/logos, design/mascotte).
// À relancer seulement si le logo change : node scripts/generer-icones.mjs
// Demande Playwright et Chromium (npx playwright install chromium).
import { readFileSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const lire = (f) => readFileSync(new URL(`../design/${f}`, import.meta.url), 'utf8');
const icone = lire('logos/ana-bus-icone-app.svg');
const symbole = lire('logos/ana-bus-symbole.svg');
const kaay = lire('mascotte/kaay-mu-ngi-new.svg');
const NUIT = '#0b1a3f'; // --nuit, thème clair (tuile de l'icône)

// [fichier, taille, html] : l'icône, et une version « masquable » pleine page pour Android.
const sorties = [
  ['icone-192.png', 192, icone],
  ['icone-512.png', 512, icone],
  ['icone-apple-180.png', 180, `<div style="background:${NUIT};width:100%;height:100%;display:flex;align-items:center;justify-content:center"><div style="width:72%;height:72%">${symbole}</div></div>`],
  ['icone-masquable-512.png', 512, `<div style="background:${NUIT};width:100%;height:100%;display:flex;align-items:center;justify-content:center"><div style="width:58%;height:58%">${symbole}</div></div>`],
  ['kaay-mu-ngi-new-192.png', 192, kaay],
];

mkdirSync(new URL('../public/icones/', import.meta.url), { recursive: true });
const nav = await chromium.launch();
for (const [nom, taille, html] of sorties) {
  const page = await nav.newPage({ viewport: { width: taille, height: taille } });
  await page.setContent(`<style>html,body{margin:0;width:100%;height:100%;background:transparent}svg{width:100%;height:100%;display:block}</style>${html}`);
  await page.screenshot({ path: new URL(`../public/icones/${nom}`, import.meta.url).pathname, omitBackground: true });
  await page.close();
}
await nav.close();
console.log('Icônes générées dans public/icones/');
