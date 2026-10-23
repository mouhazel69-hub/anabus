import { useId } from 'react';
import './ChoixOptions.css';

export interface Option<T extends string> {
  valeur: T;
  libelle: string;
}

interface ChoixOptionsProps<T extends string> {
  /** Ce que l'on choisit, lu par les lecteurs d'écran (« Délai de l'alerte »). */
  legende: string;
  options: Option<T>[];
  valeur: T;
  onChange: (valeur: T) => void;
}

/** Une liste de choix radio de 56 px : le choix actif a un fond jaune doux et un bord bleu. */
export function ChoixOptions<T extends string>({ legende, options, valeur, onChange }: ChoixOptionsProps<T>) {
  const nom = useId();
  return (
    <fieldset className="choix">
      <legend className="vh">{legende}</legend>
      {options.map((o) => (
        <label key={o.valeur} className="choix-option">
          <input type="radio" name={nom} value={o.valeur} checked={o.valeur === valeur} onChange={() => onChange(o.valeur)} />
          <span className="choix-mot">{o.libelle}</span>
        </label>
      ))}
    </fieldset>
  );
}
