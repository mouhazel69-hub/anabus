import { useEffect, useState } from 'react';
import tokens from '../styles/tokens.json';
import { Icone, NOMS_ICONES } from '../composants/Icone';
import { Logo } from '../composants/Logo';
import symbole from '../assets/logos/ana-bus-symbole.svg';
import iconeApp from '../assets/logos/ana-bus-icone-app.svg';
import signature from '../assets/logos/ana-bus-signature.svg';
import { DemoComposants } from './DemoComposants';
import './Design.css';

// Les images de Kaay, chargées toutes d'un coup par Vite.
const kaay = import.meta.glob('../assets/mascotte/*.svg', { eager: true, import: 'default' }) as Record<string, string>;

type Theme = 'auto' | 'clair' | 'sombre';

/** Choisir le thème de la page : « auto » suit le réglage du téléphone. */
function useThemeForce() {
  const [theme, setTheme] = useState<Theme>('auto');
  useEffect(() => {
    const racine = document.documentElement;
    if (theme === 'auto') {
      delete racine.dataset.themeForce;
      racine.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'sombre' : 'clair';
    } else {
      racine.dataset.themeForce = '1';
      racine.dataset.theme = theme;
    }
  }, [theme]);
  // En quittant la page, on rend la main au réglage du téléphone.
  useEffect(() => () => {
    delete document.documentElement.dataset.themeForce;
    document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'sombre' : 'clair';
  }, []);
  return [theme, setTheme] as const;
}

export default function Design() {
  const [theme, setTheme] = useThemeForce();
  const styles = tokens.type.groups.flatMap((g) => g.styles);

  return (
    <main className="design">
      <header className="design-tete">
        <Logo largeur={160} />
        <h1 className="titre-1">Charte vivante</h1>
        <p className="corps design-doux">
          Les variables, polices, logos et pictos d'Ana Bus, rendus par le code. Ce que vous voyez ici est ce que
          l'appli utilise.
        </p>
        <fieldset className="design-themes">
          <legend className="legende">Thème</legend>
          {(['auto', 'clair', 'sombre'] as Theme[]).map((t) => (
            <button key={t} type="button" aria-pressed={theme === t} onClick={() => setTheme(t)}>
              {t === 'auto' ? 'Comme le téléphone' : t === 'clair' ? 'Clair' : 'Sombre'}
            </button>
          ))}
        </fieldset>
      </header>

      <section className="design-section">
        <h2 className="titre-2">Couleurs</h2>
        <ul className="design-grille">
          {tokens.color.tokens.map((c) => (
            <li key={c.name} className="design-couleur">
              <span className="design-pastille" style={{ background: `var(--${c.name})` }} />
              <code>--{c.name}</code>
              <span className="legende design-doux">{c.usage}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="design-section">
        <h2 className="titre-2">Typographie</h2>
        <ul className="design-liste">
          {styles.map((s) => (
            <li key={s.name} className="design-type">
              <span className={`${s.name} chiffres`}>{s.sample}</span>
              <span className="legende design-doux">
                <code>.{s.name}</code> {s.fontSize} / {s.lineHeight}, graisse {s.fontWeight}. {s.usage}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="design-section">
        <h2 className="titre-2">Espaces</h2>
        <ul className="design-liste">
          {tokens.spacing.tokens.map((e) => (
            <li key={e.name} className="design-espace">
              <span className="design-barre" style={{ width: `var(--${e.name})` }} />
              <code>--{e.name}</code>
              <span className="legende design-doux">{e.value}. {e.usage}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="design-section">
        <h2 className="titre-2">Arrondis et ombre</h2>
        <ul className="design-grille">
          {tokens.radius.tokens.map((r) => (
            <li key={r.name} className="design-couleur">
              <span className="design-rayon" style={{ borderRadius: `var(--${r.name})` }} />
              <code>--{r.name}</code>
              <span className="legende design-doux">{r.usage}</span>
            </li>
          ))}
          <li className="design-couleur">
            <span className="design-rayon design-ombre" />
            <code>--ombre-feuille</code>
            <span className="legende design-doux">{tokens.shadow.tokens[0].usage}</span>
          </li>
        </ul>
      </section>

      <section className="design-section">
        <h2 className="titre-2">Logos</h2>
        <div className="design-logos">
          <div className="design-logo-case"><Logo largeur={212} /></div>
          <div className="design-logo-case design-logo-nuit"><Logo largeur={212} negatif /></div>
          <div className="design-logo-case"><img src={symbole} alt="Symbole Ana Bus" width={64} height={64} /></div>
          <div className="design-logo-case"><img src={iconeApp} alt="Icône de l'appli" width={64} height={64} /></div>
          <div className="design-logo-case design-logo-blanc"><img src={signature} alt="Ana Bus, bul xaar ba sonn" width={212} height={52} /></div>
        </div>
      </section>

      <section className="design-section">
        <h2 className="titre-2">Pictos</h2>
        <ul className="design-pictos">
          {NOMS_ICONES.map((nom) => (
            <li key={nom}>
              <Icone nom={nom} taille={24} />
              <span className="legende">{nom}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="design-section">
        <h2 className="titre-2">Kaay</h2>
        <ul className="design-kaay">
          {Object.entries(kaay).map(([chemin, src]) => {
            const nom = chemin.split('/').pop()!.replace('.svg', '');
            return (
              <li key={nom} className={nom.endsWith('-contour') ? 'design-logo-nuit' : undefined}>
                <img src={src} alt="" width={96} height={96} />
                <span className="legende">{nom}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="design-section">
        <h2 className="titre-2">Composants</h2>
        <DemoComposants />
      </section>
    </main>
  );
}
