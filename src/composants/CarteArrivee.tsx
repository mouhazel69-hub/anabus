import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BadgeLigne } from './BadgeLigne';
import { Statut, type TypeStatut } from './Statut';
import { estMuNgiNew, statutSelonMinutes } from '../logique/seuils';
import './CarteArrivee.css';

interface CarteArriveeProps {
  ligne: string;
  /** « Vers Petersen ». */
  destination: ReactNode;
  /** L'arrêt de l'usager : « Arrêt Liberté 6 ». */
  arret?: ReactNode;
  /** Minutes avant l'arrivée ; à 1 ou moins, la carte affiche « Mu ngi ñëw ». */
  minutes: number;
  /** Par défaut : proche à 3 min ou moins, direct au-delà. */
  statut?: TypeStatut;
  /** Mot de la pastille, par exemple « Retard de 8 min ». */
  motStatut?: ReactNode;
  /** « Mis à jour il y a 20 s », ou la raison d'un retard. */
  miseAJour?: ReactNode;
  /** Si présent, toute la carte ouvre cette page (par exemple /ligne/23). */
  lien?: string;
  className?: string;
}

/** La carte d'un bus attendu : ligne, destination, minutes et état, lisibles d'un coup d'œil. */
export function CarteArrivee({ ligne, destination, arret, minutes, statut, motStatut, miseAJour, lien, className }: CarteArriveeProps) {
  const arrive = estMuNgiNew(minutes);
  const type = statut ?? statutSelonMinutes(minutes);

  return (
    <article className={['carte', lien && 'carte-lien', className].filter(Boolean).join(' ')}>
      <div className="carte-tete">
        <BadgeLigne ligne={ligne} />
        <div className="carte-dest">
          {/* Le lien porte sur la destination ; en CSS, sa zone couvre toute la carte. */}
          {lien ? <Link to={lien} className="carte-cible">{destination}</Link> : destination}
          {arret && <span className="carte-arret">{arret}</span>}
        </div>
      </div>
      <div className="carte-temps">
        {arrive ? (
          <span className="carte-ngi">Mu ngi ñëw</span>
        ) : (
          <>
            <span className="carte-min">{minutes}</span>
            <span className="carte-unite">min</span>
          </>
        )}
      </div>
      <div className="carte-pied">
        <Statut type={type}>{motStatut}</Statut>
        {miseAJour && <span className="carte-maj">{miseAJour}</span>}
      </div>
    </article>
  );
}
