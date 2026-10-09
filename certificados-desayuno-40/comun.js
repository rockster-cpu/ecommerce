// Utilidades compartidas: grabados tipo guilloché, sello, insignia y armado de hojas.
const G = {
  // Banda trenzada horizontal de largo L y alto H (centrada en y = 0)
  banda(L, H, ondas, lineas) {
    const A = H / 2, pasos = Math.round(L * 1.5);
    let d = '';
    for (let k = 0; k < lineas; k++) {
      const fase = (k / lineas) * Math.PI * 0.9;
      for (const s of [1, -1]) {
        d += 'M';
        for (let i = 0; i <= pasos; i++) {
          const x = (i / pasos) * L;
          const y = s * A * Math.sin((2 * Math.PI * ondas * x) / L + fase);
          d += (i ? 'L' : '') + x.toFixed(2) + ' ' + y.toFixed(2);
        }
      }
    }
    return d;
  },
  // Roseta circular (anillo ondulado con varias líneas desfasadas)
  roseta(R, a, lobulos, lineas, cx = 0, cy = 0) {
    const pasos = 900;
    let d = '';
    for (let k = 0; k < lineas; k++) {
      const fase = (k / lineas) * ((2 * Math.PI) / lobulos) * 1.0;
      d += 'M';
      for (let i = 0; i <= pasos; i++) {
        const t = (i / pasos) * 2 * Math.PI;
        const r = R + a * Math.sin(lobulos * t + fase * lobulos);
        d += (i ? 'L' : '') + (cx + r * Math.cos(t)).toFixed(2) + ' ' + (cy + r * Math.sin(t)).toFixed(2);
      }
      d += 'Z';
    }
    return d;
  },
  // Espirógrafo (hipotrocoide) para el centro de rosetas
  espiro(R, r, dd, vueltas, cx = 0, cy = 0) {
    const pasos = 2400;
    let d = 'M';
    for (let i = 0; i <= pasos; i++) {
      const t = (i / pasos) * 2 * Math.PI * vueltas;
      const x = (R - r) * Math.cos(t) + dd * Math.cos(((R - r) / r) * t);
      const y = (R - r) * Math.sin(t) - dd * Math.sin(((R - r) / r) * t);
      d += (i ? 'L' : '') + (cx + x).toFixed(2) + ' ' + (cy + y).toFixed(2);
    }
    return d;
  }
};

const DEFS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f6e3a4"/><stop offset=".35" stop-color="#c8963b"/>
    <stop offset=".6" stop-color="#ecd081"/><stop offset="1" stop-color="#94661e"/>
  </linearGradient>
  <linearGradient id="gGoldH" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#a8792a"/><stop offset=".5" stop-color="#ecd081"/><stop offset="1" stop-color="#a8792a"/>
  </linearGradient>
  <linearGradient id="gNavy" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1b3f8a"/><stop offset="1" stop-color="#07142f"/>
  </linearGradient>
  <radialGradient id="gNavyR" cx=".35" cy=".3" r=".9">
    <stop offset="0" stop-color="#1d4594"/><stop offset="1" stop-color="#081638"/>
  </radialGradient>
</defs></svg>`;

// Sello dorado EC0217.01 (opcional: con listón)
function sello(id, conListon) {
  const liston = conListon ? `
    <path d="M52 112 L36 196 L55 182 L68 200 L80 124 Z" fill="url(#gNavy)" stroke="url(#gGold)" stroke-width="1.6"/>
    <path d="M108 112 L124 196 L105 182 L92 200 L80 124 Z" fill="url(#gNavy)" stroke="url(#gGold)" stroke-width="1.6"/>` : '';
  return `
  <svg viewBox="0 0 160 ${conListon ? 205 : 160}" aria-label="Sello EC0217.01">
    ${liston}
    <path d="${G.roseta(74, 4, 36, 1, 80, 80)}" fill="url(#gGold)"/>
    <circle cx="80" cy="80" r="66" fill="url(#gNavyR)"/>
    <path d="${G.roseta(46, 2.2, 24, 6, 80, 80)}" fill="none" stroke="#d9b25c" stroke-width=".45" opacity=".9"/>
    <circle cx="80" cy="80" r="38" fill="url(#gNavyR)" stroke="#d9b25c" stroke-width="1"/>
    <path id="${id}t" d="M28.4 98.8 A55 55 0 1 1 131.6 98.8" fill="none"/>
    <path id="${id}b" d="M20 80 A60 60 0 0 0 140 80" fill="none"/>
    <text font-family="Cinzel" font-weight="700" font-size="9.6" letter-spacing="1.4" fill="#f1dc9e">
      <textPath href="#${id}t" startOffset="50%" text-anchor="middle">ESTÁNDAR DE COMPETENCIA</textPath></text>
    <text font-family="Cinzel" font-weight="700" font-size="10" letter-spacing="2.2" fill="#f1dc9e">
      <textPath href="#${id}b" startOffset="50%" text-anchor="middle">SEP · CONOCER</textPath></text>
    <text x="80" y="74" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="11" letter-spacing="2.5" fill="#f1dc9e">EC</text>
    <text x="80" y="94" text-anchor="middle" font-family="Playfair Display" font-weight="800" font-size="17.5" fill="url(#gGold)">0217.01</text>
  </svg>`;
}

// Insignia "Edición #40"
function insignia(id) {
  return `
  <svg viewBox="0 0 120 120" aria-label="Edición #40">
    <path d="${G.roseta(57, 2.6, 30, 1, 60, 60)}" fill="url(#gGold)"/>
    <circle cx="60" cy="60" r="50" fill="url(#gNavyR)"/>
    <circle cx="60" cy="60" r="45" fill="none" stroke="#d9b25c" stroke-width=".8" stroke-dasharray="1.6 2.6"/>
    <path id="${id}" d="M27 60 A33 33 0 0 1 93 60" fill="none"/>
    <text font-family="Cinzel" font-weight="700" font-size="10.5" letter-spacing="2.2" fill="#ecd081">
      <textPath href="#${id}" startOffset="50%" text-anchor="middle">EDICIÓN</textPath></text>
    <text x="60" y="80" text-anchor="middle" font-family="Playfair Display" font-weight="800" font-size="33" fill="url(#gGold)">#40</text>
    <path d="M44 90 Q60 96 76 90" fill="none" stroke="#d9b25c" stroke-width="1.1"/>
  </svg>`;
}

// Arma una hoja por nombre a partir de una función plantilla(nombre, i)
function armar(plantilla, tamNombre) {
  document.body.insertAdjacentHTML('afterbegin', DEFS);
  const q = new URLSearchParams(location.search);
  const lista = q.has('nombre') ? [q.get('nombre')] : NOMBRES;
  const out = document.getElementById('out');
  lista.forEach((n, i) => out.insertAdjacentHTML('beforeend', plantilla(n || ' ', i)));
  Promise.all([document.fonts.ready, ...[...document.images].map(im => im.decode().catch(() => {}))]).then(() => {
    document.querySelectorAll('[data-name]').forEach(el => {
      let s = tamNombre;
      while (el.scrollWidth > el.clientWidth && s > 36) { s -= 2; el.style.fontSize = s + 'px'; }
    });
    document.body.dataset.ready = '1';
  });
}
