import { useStockage } from './stockage';

// Les données de l'usager, gardées sur son appareil (pas de compte en phase 1).

export interface Favori { ligne: string; arret: string }
export interface Alerte { id: string; ligne: string; arret: string; minutes: number; creee: number }
export interface Signalement { ligne: string; arret: string; type: TypeSignalement; instant: number }
export type TypeSignalement = 'plein' | 'panne' | 'deviation' | 'passe';

export const useFavoris = () => useStockage<Favori[]>('favoris', []);
export const useAlertes = () => useStockage<Alerte[]>('alertes', []);
export const useRecentes = () => useStockage<string[]>('recentes', []);
export const useSignalements = () => useStockage<Signalement[]>('signalements', []);
export const useBienvenueVue = () => useStockage<boolean>('bienvenue-vue', false);

/** Ajoute une ligne en tête des récentes, sans doublon, 5 au plus. */
export function ajouterRecente(liste: string[], numero: string): string[] {
  return [numero, ...liste.filter((n) => n !== numero)].slice(0, 5);
}
