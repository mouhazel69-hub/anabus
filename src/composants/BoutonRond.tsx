import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Icone, type NomIcone } from './Icone';
import './BoutonRond.css';

interface Commun {
  icone: NomIcone;
  /** Ce que le bouton fait, lu par les lecteurs d'écran : « Retour », « Zoomer »… */
  libelle: string;
  /** flottant : fond élevé et ombre, posé sur la carte ; doux : fond en retrait. */
  apparence?: 'flottant' | 'doux' | 'nu';
  className?: string;
}

function classes({ apparence = 'nu' }: Commun, className?: string) {
  return ['rond', `rond-${apparence}`, className].filter(Boolean).join(' ');
}

/** Bouton rond de 44 px avec un picto (retour, zoom, me localiser). Zone tactile de 48 px. */
export function BoutonRond({ icone, libelle, apparence, className, ...reste }: Commun & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" aria-label={libelle} title={libelle} {...reste} className={classes({ icone, libelle, apparence }, className)}>
      <Icone nom={icone} />
    </button>
  );
}

/** Même rendu, en lien vers une autre page. */
export function LienRond({ icone, libelle, apparence, className, vers }: Commun & { vers: string }) {
  return (
    <Link to={vers} aria-label={libelle} className={classes({ icone, libelle, apparence }, className)}>
      <Icone nom={icone} />
    </Link>
  );
}
