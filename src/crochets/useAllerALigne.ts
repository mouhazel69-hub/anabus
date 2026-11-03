import { useNavigate } from 'react-router-dom';
import { rechercher } from '../logique/recherche';

/**
 * Ce que fait « Voir le bus » : la ligne existe → son suivi ; sinon → l'écran « Aucune ligne ».
 * `depuis` indique d'où vient l'usager (le site garde sa mise en page sur téléphone).
 */
export function useAllerALigne(depuis?: 'site') {
  const aller = useNavigate();
  return (saisie: string) => {
    const r = rechercher(saisie);
    if (r.type === 'trouvee') aller(`/ligne/${r.ligne.numero}`, { state: depuis ? { depuis } : undefined });
    else if (r.type === 'aucune') aller(`/recherche?q=${encodeURIComponent(r.numero)}`);
    else aller('/recherche');
  };
}
