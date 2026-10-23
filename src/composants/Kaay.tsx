import content from '../assets/mascotte/kaay-content.svg';
import contentContour from '../assets/mascotte/kaay-content-contour.svg';
import salut from '../assets/mascotte/kaay-salut.svg';
import salutContour from '../assets/mascotte/kaay-salut-contour.svg';
import muNgiNew from '../assets/mascotte/kaay-mu-ngi-new.svg';
import muNgiNewContour from '../assets/mascotte/kaay-mu-ngi-new-contour.svg';
import oups from '../assets/mascotte/kaay-oups.svg';
import oupsContour from '../assets/mascotte/kaay-oups-contour.svg';
import dodo from '../assets/mascotte/kaay-dodo.svg';
import dodoContour from '../assets/mascotte/kaay-dodo-contour.svg';
import './Kaay.css';

/** Les fichiers officiels de Kaay : la version simple et la version à contour blanc. */
export const IMAGES_KAAY = {
  content: { simple: content, contour: contentContour },
  salut: { simple: salut, contour: salutContour },
  'mu-ngi-new': { simple: muNgiNew, contour: muNgiNewContour },
  oups: { simple: oups, contour: oupsContour },
  dodo: { simple: dodo, contour: dodoContour },
};

export type ExpressionKaay = keyof typeof IMAGES_KAAY;

interface KaayProps {
  expression: ExpressionKaay;
  /** Taille en pixels, 48 au minimum (charte). */
  taille?: number;
  /**
   * auto : version simple en thème clair, contour en thème sombre.
   * toujours : version contour (sur nuit, jaune ou photo).
   */
  contour?: 'auto' | 'toujours';
  className?: string;
}

/**
 * Kaay, la mascotte. Seulement sur la bienvenue, les écrans sans résultat ou en erreur,
 * la notification « Mu ngi ñëw » et l'état sans données. Jamais sur la carte ni à côté des minutes.
 * L'image est décorative : le texte voisin porte le message.
 */
export function Kaay({ expression, taille = 120, contour = 'auto', className }: KaayProps) {
  const t = Math.max(48, taille);
  const img = IMAGES_KAAY[expression];
  const cls = ['kaay', className].filter(Boolean).join(' ');
  if (contour === 'toujours') {
    return <img src={img.contour} alt="" width={t} height={t} className={cls} />;
  }
  return (
    <span className={cls}>
      <img src={img.simple} alt="" width={t} height={t} className="kaay-clair" />
      <img src={img.contour} alt="" width={t} height={t} className="kaay-sombre" />
    </span>
  );
}
