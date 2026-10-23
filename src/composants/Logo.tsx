import logoClair from '../assets/logos/ana-bus-logo.svg';
import logoSombre from '../assets/logos/ana-bus-logo-negatif.svg';

// Le logo officiel, jamais redessiné. On charge les deux versions et
// le CSS (base.css) n'affiche que celle qui va avec le thème.
interface LogoProps {
  /** Largeur en pixels ; la hauteur suit les proportions du fichier (424 × 96). */
  largeur?: number;
  /** Toujours la version négative, par exemple sur un fond nuit. */
  negatif?: boolean;
  className?: string;
}

export function Logo({ largeur = 132, negatif = false, className }: LogoProps) {
  const hauteur = Math.round((largeur * 96) / 424);
  if (negatif) {
    return <img src={logoSombre} alt="Ana Bus" width={largeur} height={hauteur} className={className} />;
  }
  return (
    <span className={className}>
      <img src={logoClair} alt="Ana Bus" width={largeur} height={hauteur} className="logo-clair" />
      <img src={logoSombre} alt="Ana Bus" width={largeur} height={hauteur} className="logo-sombre" />
    </span>
  );
}
