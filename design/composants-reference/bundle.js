/* @ds-bundle: {"format":4,"namespace":"AnaBus","components":[{"name":"Bouton"},{"name":"BadgeLigne"},{"name":"Statut"},{"name":"CarteArrivee"},{"name":"RechercheLigne"},{"name":"RepereBus"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    return Array.prototype.filter.call(arguments, Boolean).join(' ');
  }

  function omit(obj, keys) {
    var out = {};
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) out[k] = obj[k];
    }
    return out;
  }

  /* Pictos maison : grille 24, trait 2, extrémités arrondies, couleur du texte voisin. */
  var ICONES = {
    recherche: [['circle', { cx: 10.5, cy: 10.5, r: 6.5 }], ['path', { d: 'm15.5 15.5 5 5' }]],
    arret: [['path', { d: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z' }], ['circle', { cx: 12, cy: 10, r: 2.25 }]],
    bus: [['rect', { x: 5, y: 3, width: 14, height: 15, rx: 3.5 }], ['path', { d: 'M5 10h14M8.5 14.5h.01M15.5 14.5h.01M7.5 18v2.5M16.5 18v2.5' }]],
    horloge: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.5V12l3 2' }]],
    alerte: [['path', { d: 'M12 3.5 21 19.5H3z' }], ['path', { d: 'M12 10v4M12 17h.01' }]],
    direct: [['circle', { cx: 12, cy: 12, r: 2.25 }], ['path', { d: 'M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14' }]]
  };

  function Icone(props) {
    var parts = ICONES[props.nom] || [];
    return h('svg', {
      viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2,
      strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false', className: props.className
    }, parts.map(function (p, i) { return h(p[0], Object.assign({ key: i }, p[1])); }));
  }

  /* L'avant du bus du logo, en une seule encre : pare-brise et phares évidés. */
  var BUS_PLEIN = 'M38 19h20a10 10 0 0 1 10 10v34H28V29a10 10 0 0 1 10-10z'
    + 'M32 63h9v3.5a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5z'
    + 'M55 63h9v3.5a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5z'
    + 'M37 25h22a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H37a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z'
    + 'M38.5 48a4 4 0 1 1 0 8a4 4 0 1 1 0-8zM57.5 48a4 4 0 1 1 0 8a4 4 0 1 1 0-8z';

  function BusPlein() {
    return h('svg', { viewBox: '26 17 44 54', 'aria-hidden': 'true', focusable: 'false' },
      h('path', { d: BUS_PLEIN, fill: 'currentColor', fillRule: 'evenodd' }));
  }

  function Bouton(props) {
    var variante = props.variante || 'principal';
    var rest = omit(props, ['variante', 'taille', 'icone', 'className', 'children']);
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('ab-btn', 'ab-btn-' + variante, props.taille === 'lg' && 'ab-btn-lg', props.className)
    }), props.icone ? h(Icone, { nom: props.icone }) : null, props.children);
  }

  function BadgeLigne(props) {
    return h('span', { className: cx('ab-ligne', props.taille === 'lg' && 'ab-ligne-lg', props.className) },
      h('span', { className: 'ab-ligne-num' }, h('span', { className: 'ab-vh' }, 'Ligne '), props.ligne),
      props.reseau ? h('span', { className: 'ab-ligne-reseau' }, props.reseau) : null);
  }

  var STATUTS = {
    direct: { mot: 'En direct', icone: null },
    proche: { mot: 'Arrive', icone: 'bus' },
    retard: { mot: 'Retard', icone: 'alerte' },
    prevu: { mot: 'Horaire prévu', icone: 'horloge' }
  };

  function Statut(props) {
    var type = STATUTS[props.type] ? props.type : 'direct';
    var s = STATUTS[type];
    var picto = s.icone
      ? h(Icone, { nom: s.icone })
      : h('svg', { viewBox: '0 0 16 16', 'aria-hidden': 'true', focusable: 'false', className: 'ab-pouls' },
        h('circle', { cx: 8, cy: 8, r: 4.5, fill: 'currentColor' }));
    return h('span', { className: cx('ab-statut', 'ab-statut-' + type, props.className) }, picto, props.children || s.mot);
  }

  function CarteArrivee(props) {
    var minutes = props.minutes;
    var arrive = typeof minutes === 'number' && minutes <= 1;
    var statut = props.statut || (arrive || minutes <= 3 ? 'proche' : 'direct');
    var temps = arrive
      ? h('span', { className: 'ab-carte-ngi' }, 'Mu ngi ñëw')
      : [h('span', { key: 'm', className: 'ab-carte-min' }, minutes), h('span', { key: 'u', className: 'ab-carte-unite' }, 'min')];
    return h('article', { className: cx('ab-carte', props.className) },
      h('div', { className: 'ab-carte-tete' },
        h(BadgeLigne, { ligne: props.ligne }),
        h('div', { className: 'ab-carte-dest' },
          props.destination,
          props.arret ? h('span', { className: 'ab-carte-arret' }, props.arret) : null)),
      h('div', { className: 'ab-carte-temps' }, temps),
      h('div', { className: 'ab-carte-pied' },
        h(Statut, { type: statut }, props.motStatut),
        props.miseAJour ? h('span', { className: 'ab-carte-maj' }, props.miseAJour) : null));
  }

  function RechercheLigne(props) {
    var etat = React.useState(props.defaut || '');
    var controle = props.valeur != null;
    var valeur = controle ? props.valeur : etat[0];
    function changer(e) {
      if (!controle) etat[1](e.target.value);
      if (props.onChange) props.onChange(e.target.value);
    }
    function envoyer(e) {
      e.preventDefault();
      if (props.onSubmit) props.onSubmit(valeur);
    }
    return h('form', { className: cx('ab-recherche', props.className), role: 'search', onSubmit: envoyer },
      h('label', { className: 'ab-champ' },
        h(Icone, { nom: 'recherche' }),
        h('span', { className: 'ab-vh' }, 'Numéro du bus'),
        h('input', {
          type: 'text', autoComplete: 'off', autoCapitalize: 'characters', spellCheck: false,
          value: valeur, onChange: changer, placeholder: props.placeholder || 'Numéro du bus, ex. 23'
        })),
      h(Bouton, { type: 'submit', variante: 'principal' }, props.action || 'Voir le bus'));
  }

  function RepereBus(props) {
    var direct = props.direct !== false;
    return h('span', {
      className: cx('ab-repere', props.className), role: 'img',
      'aria-label': 'Bus' + (props.ligne ? ' ligne ' + props.ligne : '') + (direct ? ', position en direct' : ''),
      style: props.style
    },
      direct ? h('span', { className: 'ab-repere-onde' }) : null,
      h('span', { className: 'ab-repere-disque' }, h(BusPlein)),
      props.ligne ? h('span', { className: 'ab-repere-etiquette', 'aria-hidden': 'true' }, props.ligne) : null);
  }

  var W = window;
  W.AnaBus = W.AnaBus || {};
  Object.assign(W.AnaBus, {
    Bouton: Bouton, BadgeLigne: BadgeLigne, Statut: Statut, CarteArrivee: CarteArrivee,
    RechercheLigne: RechercheLigne, RepereBus: RepereBus, Icone: Icone
  });
})();
