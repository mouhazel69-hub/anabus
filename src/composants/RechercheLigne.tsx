import { useState, type FormEvent } from 'react';
import { Bouton } from './Bouton';
import { Icone } from './Icone';
import './RechercheLigne.css';

interface RechercheLigneProps {
  /** Mode contrôlé : la valeur vient du parent, qui la change avec onChange. */
  valeur?: string;
  /** Mode libre : valeur de départ. */
  defaut?: string;
  onChange?: (valeur: string) => void;
  onSubmit?: (valeur: string) => void;
  placeholder?: string;
  /** Libellé du bouton, « Voir le bus » par défaut. */
  action?: string;
  autoFocus?: boolean;
  className?: string;
}

/** Le champ « numéro du bus » et son bouton : le premier geste de l'appli. */
export function RechercheLigne({
  valeur, defaut = '', onChange, onSubmit, placeholder = 'Numéro du bus, ex. 23', action = 'Voir le bus', autoFocus, className,
}: RechercheLigneProps) {
  const [interne, setInterne] = useState(defaut);
  const controle = valeur !== undefined;
  const texte = controle ? valeur : interne;

  function changer(nouveau: string) {
    if (!controle) setInterne(nouveau);
    onChange?.(nouveau);
  }

  function envoyer(e: FormEvent) {
    e.preventDefault(); // le formulaire ne recharge pas la page
    onSubmit?.(texte.trim());
  }

  return (
    <form className={['recherche', className].filter(Boolean).join(' ')} role="search" onSubmit={envoyer}>
      <label className="recherche-champ">
        <Icone nom="recherche" />
        <span className="vh">Numéro du bus</span>
        <input
          type="text" autoComplete="off" autoCapitalize="characters" spellCheck={false} enterKeyHint="search"
          value={texte} onChange={(e) => changer(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
        />
      </label>
      <Bouton type="submit" variante="principal">{action}</Bouton>
    </form>
  );
}
