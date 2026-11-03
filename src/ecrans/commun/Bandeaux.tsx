import { useEffect, useState } from 'react';
import { t } from '../../i18n';
import { useHorsConnexionDepuis } from '../../crochets/useConnexion';
import './Bandeaux.css';

/** Le bandeau discret qui rappelle que les données sont inventées. */
export function BandeauDemo() {
  return <p className="bandeau-demo">{t('demo.bandeau')}</p>;
}

/** « Hors connexion : données d'il y a 3 min. », visible seulement sans réseau. */
export function BandeauHorsConnexion() {
  const depuis = useHorsConnexionDepuis();
  const [, rafraichir] = useState(0);
  useEffect(() => {
    if (depuis === null) return;
    const m = setInterval(() => rafraichir((n) => n + 1), 30_000);
    return () => clearInterval(m);
  }, [depuis]);
  if (depuis === null) return null;
  const minutes = Math.max(1, Math.round((Date.now() - depuis) / 60_000));
  return <p className="bandeau-hors" role="status">{t('horsConnexion', { minutes })}</p>;
}

export function Bandeaux() {
  return (
    <>
      <BandeauHorsConnexion />
      <BandeauDemo />
    </>
  );
}
