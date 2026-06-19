/* Estilo "Neobrutalista" — bordes gruesos, sombras offset duras, chips de
   color planos. Sin gradientes, glow ni blur: solo color sólido + borde +
   sombra desplazada. Inspirado en el bloque E4/E4b de
   reference-templates/carousel_styles_1_5_futurista.html, adaptado a las
   4 slides del carrusel (cover, content, stats, cta) y a las CSS vars
   de paleta dinámica (--dark/--light/--muted/--coral). */
window.PTW_STYLES = window.PTW_STYLES || {};
window.PTW_STYLES.neubrutalism = {
  name: 'Neobrutalista',

  css: `
/* ============ base de la slide ============ */
.style-neubrutalism{font-family:'Rubik',sans-serif;}
.style-neubrutalism .nb-c{padding:84px;height:100%;display:flex;flex-direction:column;justify-content:space-between;position:relative;z-index:2;}

/* tarjeta con borde grueso + sombra offset, reutilizada por chips/stats/pill */
.style-neubrutalism .nb-card{border:4px solid var(--dark);box-shadow:9px 9px 0 var(--dark);background:var(--light);}
.style-neubrutalism.dark .nb-card,
.style-neubrutalism.coral .nb-card{border-color:var(--coral);box-shadow:9px 9px 0 var(--coral);}

/* etiqueta tipo "tag" — chip plano coral */
.style-neubrutalism .nb-tag{font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dark);background:var(--coral);display:inline-block;padding:8px 18px;border:3px solid var(--dark);}
.style-neubrutalism.dark .nb-tag,
.style-neubrutalism.coral .nb-tag{border-color:var(--light);}

/* índice tipo "ERROR #02" — outline, sin relleno */
.style-neubrutalism .nb-idx{font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--coral);background:rgba(255,99,143,.12);display:inline-block;padding:8px 18px;border:3px solid var(--coral);}

/* handle de marca */
.style-neubrutalism .nb-handle{font-size:16px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--dark);opacity:.55;}
.style-neubrutalism.dark .nb-handle,
.style-neubrutalism.coral .nb-handle{color:var(--light);opacity:.6;}

/* cuadrado decorativo, como .sq del E4b */
.style-neubrutalism .nb-sq{width:28px;height:28px;border:3px solid var(--dark);flex:0 0 auto;}
.style-neubrutalism.dark .nb-sq,
.style-neubrutalism.coral .nb-sq{border-color:var(--coral);}

.style-neubrutalism .nb-footer{display:flex;justify-content:space-between;align-items:center;margin-top:40px;}

/* ============ SLIDE — COVER ============ */
.style-neubrutalism.cover .nb-c{justify-content:space-between;}
.style-neubrutalism.cover .nb-eyebrow{font-size:16px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--dark);background:var(--coral);display:inline-block;padding:8px 18px;border:3px solid var(--dark);}
.style-neubrutalism.cover h1{font-size:96px;font-weight:900;color:var(--dark);line-height:.95;letter-spacing:-.03em;margin-top:38px;}
.style-neubrutalism.cover h1 .c{display:inline-block;background:var(--dark);color:var(--coral);padding:0 12px;}
.style-neubrutalism.cover .nb-sub{font-size:22px;color:var(--dark);opacity:.65;line-height:1.45;border-left:5px solid var(--coral);padding-left:22px;margin-top:32px;max-width:26ch;}
.style-neubrutalism.cover .nb-corner{position:absolute;top:64px;right:64px;width:54px;height:54px;border:4px solid var(--coral);background:var(--light);box-shadow:7px 7px 0 var(--coral);z-index:1;}

/* ============ SLIDE — CONTENT ============ */
.style-neubrutalism .nb-heading{font-size:60px;font-weight:900;color:var(--dark);line-height:1.06;letter-spacing:-.02em;margin-top:30px;}
.style-neubrutalism.stats .nb-heading{font-size:40px;max-width:24ch;}
.style-neubrutalism.dark .nb-heading{color:var(--light);}
.style-neubrutalism.content .nb-c,.style-neubrutalism.stats .nb-c{justify-content:center;}
.style-neubrutalism.content .nb-body{font-size:20px;line-height:1.6;color:var(--dark);opacity:.65;margin-top:22px;max-width:32ch;}
.style-neubrutalism.dark .nb-body{color:var(--light);opacity:.6;}
.style-neubrutalism .nb-tip{margin-top:34px;display:flex;gap:18px;align-items:flex-start;background:var(--light);border:4px solid var(--dark);box-shadow:8px 8px 0 var(--dark);padding:22px 26px;max-width:34rem;}
.style-neubrutalism.dark .nb-tip{background:var(--dark);border-color:var(--coral);box-shadow:8px 8px 0 var(--coral);}
.style-neubrutalism .nb-tip .nb-ico{width:14px;height:14px;background:var(--coral);border:2px solid var(--dark);flex:0 0 auto;margin-top:6px;}
.style-neubrutalism.dark .nb-tip .nb-ico{border-color:var(--coral);}
.style-neubrutalism .nb-tip .nb-tt{font-size:17px;line-height:1.55;font-weight:500;color:var(--dark);}
.style-neubrutalism.dark .nb-tip .nb-tt{color:var(--light);}
.style-neubrutalism .nb-tip .nb-tt b{color:var(--coral);font-weight:700;}

/* ============ SLIDE — STATS ============ */
.style-neubrutalism .nb-stats-head{margin-bottom:40px;}
.style-neubrutalism .nb-grid2{display:grid;grid-template-columns:1fr 1fr;gap:30px;}
.style-neubrutalism .nb-stat{background:var(--light);border:4px solid var(--dark);box-shadow:8px 8px 0 var(--dark);padding:38px 32px;}
.style-neubrutalism.dark .nb-stat{background:var(--dark);border-color:var(--coral);box-shadow:8px 8px 0 var(--coral);}
.style-neubrutalism .nb-stat .nb-num{font-size:68px;font-weight:900;color:var(--coral);letter-spacing:-.03em;line-height:1;}
.style-neubrutalism .nb-stat .nb-lab{font-size:16px;line-height:1.4;color:var(--dark);font-weight:500;margin-top:16px;max-width:22ch;}
.style-neubrutalism.dark .nb-stat .nb-lab{color:var(--light);opacity:.75;}

/* ============ SLIDE — CTA ============ */
.style-neubrutalism.cta .nb-c{align-items:flex-start;}
.style-neubrutalism.cta .nb-eyebrow{font-size:16px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--coral);background:var(--dark);display:inline-block;padding:8px 18px;border:3px solid var(--dark);}
.style-neubrutalism.cta h1{font-size:74px;font-weight:900;color:var(--dark);line-height:1;letter-spacing:-.03em;margin-top:32px;max-width:15ch;}
.style-neubrutalism.cta .nb-sub{font-size:21px;color:var(--dark);opacity:.7;line-height:1.5;margin-top:24px;max-width:30ch;}
.style-neubrutalism .nb-pill{display:inline-flex;align-items:center;gap:16px;background:var(--dark);color:var(--coral);font-size:20px;font-weight:700;letter-spacing:.01em;padding:22px 40px;border:4px solid var(--dark);box-shadow:8px 8px 0 var(--coral);margin-top:42px;}
.style-neubrutalism .nb-pill .nb-arw{color:var(--coral);font-size:22px;}
.style-neubrutalism.cta .nb-handle-row{margin-top:34px;display:flex;align-items:center;gap:14px;}
`,

  cover(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Portada · Cover</div>
  <div class="frame">
    <div class="slide style-neubrutalism light cover">
      <div class="nb-corner"></div>
      ${MARK}
      <div class="nb-c">
        <div><span class="nb-eyebrow edit">${esc(s.eyebrow)}</span></div>
        <div>
          <h1 class="edit">${hl(s.headline)}</h1>
          <div class="nb-sub edit">${esc(s.sub)}</div>
        </div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  content(s, n, theme) {
    const tipHTML = s.tip ? `<div class="nb-tip">
          <span class="nb-ico"></span>
          <span class="nb-tt edit">${rich(s.tip)}</span>
        </div>` : '';
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Slide ${String(n).padStart(2,'0')}</div>
  <div class="frame">
    <div class="slide style-neubrutalism ${theme} content">
      ${MARK}
      <div class="nb-c">
        <div><span class="nb-tag edit">${esc(s.tag)}</span></div>
        <div>
          <h2 class="nb-heading edit">${esc(s.heading)}</h2>
          <p class="nb-body edit">${esc(s.body)}</p>
          ${tipHTML}
        </div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  stats(s, n, theme) {
    const statsHTML = (s.stats||[]).slice(0,4).map(st =>
      `<div class="nb-stat">
          <div class="nb-num edit">${esc(st.num)}</div>
          <div class="nb-lab edit">${esc(st.label)}</div>
        </div>`
    ).join('');
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Estadísticas</div>
  <div class="frame">
    <div class="slide style-neubrutalism ${theme} stats">
      ${MARK}
      <div class="nb-c">
        <div class="nb-stats-head">
          <div><span class="nb-tag edit">${esc(s.tag)}</span></div>
          <h2 class="nb-heading edit">${esc(s.heading)}</h2>
        </div>
        <div class="nb-grid2">${statsHTML}</div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  cta(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Cierre · CTA</div>
  <div class="frame">
    <div class="slide style-neubrutalism light cta">
      ${MARK}
      <div class="nb-c">
        <div><span class="nb-eyebrow edit">${esc(s.eyebrow)}</span></div>
        <div>
          <h1 class="edit">${esc(s.headline)}</h1>
          <div class="nb-sub edit">${esc(s.sub)}</div>
          <div class="nb-pill"><span class="edit" style="display:inline">${esc(s.pill)}</span><span class="nb-arw">→</span></div>
          <div class="nb-handle-row">
            <span class="nb-sq"></span>
            <span class="nb-handle edit">${esc(s.handle||'@prendetuweb.cl')}</span>
          </div>
        </div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  }
};
