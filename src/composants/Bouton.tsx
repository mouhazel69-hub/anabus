import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { Icone, type NomIcone } from './Icone';
import './Bouton.css';

type Variante = 'principal' | 'secondaire' | 'discret';
type Taille = 'md' | 'lg';

interface Commun {
  /** principal (jaune) une seule fois par écran ; secondaire encadré ; discret en lien. */
  variante?: Variante;
  /** md : 48 px, lg : 56 px (écrans d'accueil). */
  taille?: Taille;
  /** Picto placé avant le libellé. */
  icone?: NomIcone;
  /** Prend toute la largeur disponible. */
  pleineLargeur?: boolean;
  children?: ReactNode;
}

/** Les classes CSS d'un bouton, partagées par Bouton et BoutonLien. */
function classes({ variante = 'principal', taille = 'md', pleineLargeur }: Commun, className?: string) {
  return ['bouton', `bouton-${variante}`, taille === 'lg' && 'bouton-lg', pleineLargeur && 'bouton-plein', className]
    .filter(Boolean)
    .join(' ');
}

export type BoutonProps = Commun & ButtonHTMLAttributes<HTMLButtonElement>;

/** Bouton d'action : un verbe qui dit exactement ce qui va se passer. */
export function Bouton({ variante, taille, icone, pleineLargeur, className, children, type = 'button', ...reste }: BoutonProps) {
  return (
    <button type={type} {...reste} className={classes({ variante, taille, pleineLargeur }, className)}>
      {icone && <Icone nom={icone} />}
      {children}
    </button>
  );
}

export type BoutonLienProps = Commun & LinkProps;

/** Même rendu que Bouton, mais c'est un lien qui change de page. */
export function BoutonLien({ variante, taille, icone, pleineLargeur, className, children, ...reste }: BoutonLienProps) {
  return (
    <Link {...reste} className={classes({ variante, taille, pleineLargeur }, className)}>
      {icone && <Icone nom={icone} />}
      {children}
    </Link>
  );
}
