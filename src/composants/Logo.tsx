import logoClair from '../assets/logos/ana-bus-logo.svg';
import logoSombre from '../assets/logos/ana-bus-logo-negatif.svg';

// Le logo officiel, jamais redessiné. En mode « auto », on charge les deux versions et
// le CSS (base.css) n'affiche que celle qui va avec le thème.
interface LogoProps {
  /** Largeur en pixels ; la hauteur suit les proportions du fichier (424 × 96). */
  largeur?: number;
  /** auto : selon le thème ; clair : sur fond clair ou jaune ; negatif : sur fond nuit. */
  version?: 'auto' | 'clair' | 'negatif';
  /** @deprecated garder pour la page /design : équivaut à version="negatif". */
  negatif?: boolean;
  className?: string;
}

export function Logo({ largeur = 132, version = 'auto', negatif = false, className }: LogoProps) {
  const hauteur = Math.round((largeur * 96) / 424);
  const v = negatif ? 'negatif' : version;
  if (v !== 'auto') {
    return <img src={v === 'clair' ? logoClair : logoSombre} alt="Ana Bus" width={largeur} height={hauteur} className={className} />;
  }
  return (
    <span className={className}>
      <img src={logoClair} alt="Ana Bus" width={largeur} height={hauteur} className="logo-clair" />
      <img src={logoSombre} alt="" width={largeur} height={hauteur} className="logo-sombre" />
    </span>
  );
}
