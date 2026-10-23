// Les seuils d'affichage du temps d'attente, partagés par tous les écrans
// (voir docs/ecrans.md, « Règles communes »).

/** À 3 min ou moins, le statut devient « Arrive ». */
export const SEUIL_ARRIVE = 3;
/** À 1 min ou moins, « Mu ngi ñëw » remplace le chiffre. */
export const SEUIL_MU_NGI_NEW = 1;

/** Le bus est-il assez proche pour qu'on écrive « Mu ngi ñëw » à la place des minutes ? */
export function estMuNgiNew(minutes: number): boolean {
  return minutes <= SEUIL_MU_NGI_NEW;
}

/** Le statut par défaut d'un bus suivi en direct, selon ses minutes. */
export function statutSelonMinutes(minutes: number): 'proche' | 'direct' {
  return minutes <= SEUIL_ARRIVE ? 'proche' : 'direct';
}
