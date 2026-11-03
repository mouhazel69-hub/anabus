// Le modèle de données d'Ana Bus, inspiré du format GTFS
// (le standard des horaires de transport public).

/** Une coordonnée [longitude, latitude], dans l'ordre utilisé par MapLibre et GeoJSON. */
export type Coord = [number, number];

export interface Reseau {
  id: 'ddd' | 'tata' | 'brt';
  /** Nom complet : « Dakar Dem Dikk ». */
  nom: string;
  /** Nom court, tel que les usagers le disent : « Dem Dikk ». */
  court: string;
}

export interface Arret {
  id: string;
  nom: string;
  coord: Coord;
  /** « Station » pour le BRT, « Arrêt » ailleurs. */
  genre?: 'arret' | 'station';
}

export interface Ligne {
  /** Le numéro tel qu'il est écrit sur le bus : "23", "B1", "16A". */
  numero: string;
  reseau: Reseau['id'];
  /** Le terminus vers lequel roule la ligne : « Petersen ». */
  destination: string;
  /** Les arrêts, dans l'ordre de passage. Le dernier est le terminus. */
  arrets: string[];
  /** Le tracé de la ligne, du premier au dernier arrêt. */
  trace: Coord[];
  /** Nombre de bus en service. */
  bus: number;
  /** Vitesse moyenne en km/h, arrêts compris. */
  vitesse: number;
  /** false : aucune position en direct, seulement les horaires prévus. */
  direct: boolean;
  /** Retard connu sur la ligne, avec sa raison. */
  incident?: { minutes: number; raison: string };
}

/** D'où vient une position de bus. */
export type SourceDonnee = 'direct' | 'prevu' | 'participatif';

export interface PositionBus {
  /** Identifiant du bus, unique sur la ligne. */
  id: string;
  ligne: string;
  coord: Coord;
  /** Heure de la position, en millisecondes depuis 1970 (Date.now()). */
  instant: number;
  source: SourceDonnee;
}

/**
 * Une source de positions de bus. Aujourd'hui le simulateur ; demain une source en direct
 * (Supabase, puis les GPS des opérateurs). Les écrans ne connaissent que cette interface.
 */
export interface SourcePositions {
  /** Les positions connues des bus d'une ligne, à l'instant donné. */
  positions(numero: string, maintenant: number): PositionBus[];
  /** Prévient quand de nouvelles positions arrivent. Renvoie la fonction pour se désabonner. */
  abonner(rappel: () => void): () => void;
}
