/* Estilo "Minimalista" — sin formas decorativas, sin glow, sin números de
   fondo. Solo una línea fina superior + tipografía con mucho aire
   (inspirado en reference-templates/carousel_style_B_minimal.html).
   Mismo patrón de cuerpo centrado verticalmente que los demás estilos. */
window.PTW_STYLES = window.PTW_STYLES || {};
window.PTW_STYLES.minimal = {
  name: 'Minimalista',

  css: `
.style-minimal{position:relative;}
.style-minimal .mn-line{position:absolute;left:0;top:0;width:100%;height:3px;background:var(--coral);z-index:6;}
.style-minimal .mn-body{position:relative;z-index:5;flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;min-height:0;}
.style-minimal .mn-idx{position:absolute;right:84px;bottom:96px;font-size:13px;font-weight:700;letter-spacing:.1em;color:var(--muted);opacity:.5;z-index:6;}
.style-minimal.dark .mn-idx,.style-minimal.coral .mn-idx{color:currentColor;opacity:.55;}

.style-minimal .mn-eyebrow{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);opacity:.7;}
.style-minimal.dark .mn-eyebrow{color:rgba(241,239,244,.55);}
.style-minimal .mn-heading{font-size:50px;font-weight:900;letter-spacing:-.03em;line-height:1.12;margin-top:20px;max-width:18ch;}
.style-minimal .mn-body-txt{font-size:21px;font-weight:400;line-height:1.6;color:var(--muted);max-width:30ch;margin-top:24px;}
.style-minimal.dark .mn-body-txt{color:rgba(241,239,244,.6);}
.style-minimal.coral .mn-body-txt{color:rgba(255,255,255,.85);}

.style-minimal .mn-tip{padding:20px 0 0;margin-top:22px;max-width:540px;border-top:1px solid currentColor;opacity:.92;}
.style-minimal .mn-tip .mn-tt{font-size:17px;line-height:1.55;font-weight:400;}
.style-minimal .mn-tip .mn-tt b{color:var(--coral);font-weight:700;}

/* ============ SLIDE — COVER ============ */
.style-minimal.cover h1{font-size:66px;font-weight:900;letter-spacing:-.035em;line-height:1.08;margin-top:24px;max-width:15ch;}
.style-minimal.cover h1 .c{color:var(--coral);}
.style-minimal.cover .mn-sub{font-size:19px;line-height:1.6;color:var(--muted);font-weight:300;max-width:30ch;margin-top:26px;}
.style-minimal.cover.dark .mn-sub{color:rgba(241,239,244,.55);}
.style-minimal .mn-swipe{position:absolute;right:84px;bottom:96px;z-index:6;font-size:13px;font-weight:700;letter-spacing:.06em;color:var(--coral);}

/* ============ SLIDE — STATS ============ */
.style-minimal .mn-stats-head{margin-bottom:38px;}
.style-minimal .mn-grid2{display:grid;grid-template-columns:1fr 1fr;gap:34px 44px;max-width:760px;}
.style-minimal .mn-stat{border-top:1px solid currentColor;opacity:.95;padding-top:20px;}
.style-minimal .mn-stat .mn-num{font-size:54px;font-weight:900;letter-spacing:-.03em;line-height:1;}
.style-minimal .mn-stat .mn-lab{font-size:16px;line-height:1.45;font-weight:400;margin-top:10px;max-width:22ch;color:var(--muted);}
.style-minimal.dark .mn-stat .mn-lab{color:rgba(241,239,244,.6);}

/* ============ SLIDE — CTA ============ */
.style-minimal.cta h1{font-size:58px;font-weight:900;letter-spacing:-.035em;line-height:1.1;color:#fff;max-width:16ch;margin-top:22px;}
.style-minimal.cta .mn-sub{font-size:18px;line-height:1.6;color:rgba(255,255,255,.82);font-weight:300;max-width:32ch;margin-top:22px;}
.style-minimal .mn-cta-link{display:inline-flex;align-items:center;gap:10px;color:#fff;font-size:18px;font-weight:700;letter-spacing:.01em;margin-top:32px;border-bottom:2px solid #fff;padding-bottom:6px;}
.style-minimal.cta .mn-handle{margin-top:24px;font-size:14px;font-weight:500;letter-spacing:.04em;color:rgba(255,255,255,.7);}
`,

  cover(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Portada · Cover</div>
  <div class="frame">
    <div class="slide style-minimal dark cover">
      <div class="mn-line"></div>
      ${MARK}
      <div class="mn-body">
        <div class="mn-eyebrow edit">${esc(s.eyebrow)}</div>
        <h1 class="edit">${hl(s.headline)}</h1>
        <div class="mn-sub edit">${esc(s.sub)}</div>
      </div>
      <div class="mn-swipe">Desliza →</div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  content(s, n, theme) {
    const numStr = String(n).padStart(2,'0');
    const tipHTML = s.tip ? `<div class="mn-tip">
          <span class="mn-tt edit">${rich(s.tip)}</span>
        </div>` : '';
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Slide ${numStr}</div>
  <div class="frame">
    <div class="slide style-minimal ${theme}">
      <div class="mn-line"></div>
      ${MARK}
      <div class="mn-body">
        <div class="mn-eyebrow edit">${esc(s.tag)}</div>
        <h2 class="mn-heading edit">${esc(s.heading)}</h2>
        <p class="mn-body-txt edit">${esc(s.body)}</p>
        ${tipHTML}
      </div>
      <div class="mn-idx">${numStr}</div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  stats(s, n, theme) {
    const statsHTML = (s.stats||[]).slice(0,4).map(st =>
      `<div class="mn-stat">
          <div class="mn-num edit">${esc(st.num)}</div>
          <div class="mn-lab edit">${esc(st.label)}</div>
        </div>`
    ).join('');
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Estadísticas</div>
  <div class="frame">
    <div class="slide style-minimal ${theme}">
      <div class="mn-line"></div>
      ${MARK}
      <div class="mn-body">
        <div class="mn-stats-head">
          <div class="mn-eyebrow edit">${esc(s.tag)}</div>
          <h2 class="mn-heading edit" style="font-size:38px;">${esc(s.heading)}</h2>
        </div>
        <div class="mn-grid2">${statsHTML}</div>
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
    <div class="slide style-minimal coral cta">
      <div class="mn-line" style="background:#fff;"></div>
      ${MARK}
      <div class="mn-body" style="align-items:center;text-align:center;">
        <div class="mn-eyebrow edit" style="color:rgba(255,255,255,.8);">${esc(s.eyebrow)}</div>
        <h1 class="edit">${esc(s.headline)}</h1>
        <div class="mn-sub edit">${esc(s.sub)}</div>
        <div class="mn-cta-link"><span class="edit" style="display:inline">${esc(s.pill)}</span><span>→</span></div>
        <div class="mn-handle edit">${esc(s.handle||'@prendetuweb.cl')}</div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  }
};
