// Pictos maison (design/icones) : grille de 24 px, trait de 2 px.
// Ils prennent la couleur du texte voisin grâce à currentColor.

const ICONES = {
  recherche: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></>,
  arret: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.25" /></>,
  bus: <><rect x="5" y="3" width="14" height="15" rx="3.5" /><path d="M5 10h14M8.5 14.5h.01M15.5 14.5h.01M7.5 18v2.5M16.5 18v2.5" /></>,
  horloge: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  alerte: <><path d="M12 3.5 21 19.5H3z" /><path d="M12 10v4M12 17h.01" /></>,
  direct: <><circle cx="12" cy="12" r="2.25" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" /></>,
  retour: <path d="M15 5l-7 7 7 7" />,
  suivant: <path d="M9 5l7 7-7 7" />,
  cloche: <><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" /><path d="M10 21h4" /></>,
  localiser: <><circle cx="12" cy="12" r="6.5" /><circle cx="12" cy="12" r="2" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" /></>,
  fermer: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  moins: <path d="M5 12h14" />,
};

export type NomIcone = keyof typeof ICONES;
export const NOMS_ICONES = Object.keys(ICONES) as NomIcone[];

interface IconeProps {
  nom: NomIcone;
  className?: string;
  taille?: number;
}

export function Icone({ nom, className, taille }: IconeProps) {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
      width={taille} height={taille} className={className}
    >
      {ICONES[nom]}
    </svg>
  );
}
