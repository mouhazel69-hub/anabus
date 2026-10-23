import type * as React from 'react';

/** Bouton d'action. `principal` (jaune) une seule fois par écran ; `secondaire` encadré ; `discret` en lien. */
export interface BoutonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'principal' | 'secondaire' | 'discret';
  taille?: 'md' | 'lg';
  /** Picto maison placé avant le libellé. */
  icone?: 'recherche' | 'arret' | 'bus' | 'horloge' | 'alerte' | 'direct';
  children?: React.ReactNode;
}
export declare function Bouton(props: BoutonProps): React.ReactElement;

/** Numéro de ligne dans sa pilule jaune ; lu « Ligne 23 » par les lecteurs d'écran. */
export interface BadgeLigneProps {
  /** Le numéro tel qu'il est écrit sur le bus : "23", "B1", "16A". */
  ligne: string;
  /** Réseau affiché à côté : "Dem Dikk", "Tata", "BRT". */
  reseau?: string;
  taille?: 'md' | 'lg';
  className?: string;
}
export declare function BadgeLigne(props: BadgeLigneProps): React.ReactElement;

/** Pastille d'état du bus : couleur, picto et mot, toujours ensemble. */
export interface StatutProps {
  type?: 'direct' | 'proche' | 'retard' | 'prevu';
  /** Remplace le mot par défaut (En direct, Arrive, Retard, Horaire prévu), ex. "Retard de 8 min". */
  children?: React.ReactNode;
  className?: string;
}
export declare function Statut(props: StatutProps): React.ReactElement;

/** Carte d'un bus attendu à un arrêt : ligne, destination, minutes, état. */
export interface CarteArriveeProps {
  ligne: string;
  /** "Vers Petersen". */
  destination: React.ReactNode;
  /** L'arrêt de l'usager : "Arrêt Liberté 6". */
  arret?: React.ReactNode;
  /** Minutes avant l'arrivée ; à 1 ou moins, la carte affiche « Mu ngi ñëw ». */
  minutes: number;
  /** Par défaut : proche sous 3 min, direct au-delà. */
  statut?: 'direct' | 'proche' | 'retard' | 'prevu';
  /** Mot de la pastille, ex. "Retard de 8 min". */
  motStatut?: React.ReactNode;
  /** "Mis à jour il y a 20 s". */
  miseAJour?: React.ReactNode;
  className?: string;
}
export declare function CarteArrivee(props: CarteArriveeProps): React.ReactElement;

/** Champ « numéro du bus » et son bouton : le geste principal de l'appli. */
export interface RechercheLigneProps {
  valeur?: string;
  defaut?: string;
  onChange?: (valeur: string) => void;
  onSubmit?: (valeur: string) => void;
  placeholder?: string;
  /** Libellé du bouton, "Voir le bus" par défaut. */
  action?: string;
  className?: string;
}
export declare function RechercheLigne(props: RechercheLigneProps): React.ReactElement;

/** Le bus sur la carte : disque jaune cerclé de nuit, onde quand la position est en direct. */
export interface RepereBusProps {
  ligne?: string;
  /** false : pas d'onde (position estimée). */
  direct?: boolean;
  /** Placement absolu sur la carte. */
  style?: React.CSSProperties;
  className?: string;
}
export declare function RepereBus(props: RepereBusProps): React.ReactElement;

declare global {
  interface Window {
    AnaBus: {
      Bouton: typeof Bouton;
      BadgeLigne: typeof BadgeLigne;
      Statut: typeof Statut;
      CarteArrivee: typeof CarteArrivee;
      RechercheLigne: typeof RechercheLigne;
      RepereBus: typeof RepereBus;
    };
  }
}
