/* Estilo "Editorial" — barra de acento lateral + número de marca traslúcido
   en la esquina, regla horizontal fina bajo el tag (inspirado en
   reference-templates/carousel_style_A_editorial.html). Sigue el mismo
   patrón de cuerpo centrado verticalmente que original/geometric/split. */
window.PTW_STYLES = window.PTW_STYLES || {};
window.PTW_STYLES.editorial = {
  name: 'Editorial',

  css: `
.style-editorial{position:relative;}
.style-editorial .sa-bar{position:absolute;left:0;top:0;width:6px;height:100%;background:var(--coral);z-index:6;}
.style-editorial .sa-corner{position:absolute;right:0;bottom:0;font-weight:900;line-height:.8;letter-spacing:-.05em;z-index:0;pointer-events:none;font-size:340px;}
.style-editorial.light .sa-corner{color:rgba(17,26,27,.05);}
.style-editorial.dark .sa-corner{color:rgba(241,239,244,.05);}
.style-editorial.coral .sa-corner{color:rgba(255,255,255,.12);}
.style-editorial .sa-body{position:relative;z-index:5;flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;min-height:0;padding-left:34px;}

.style-editorial .sa-tag{font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);}
.style-editorial .sa-rule{width:100%;max-width:420px;height:1px;background:currentColor;opacity:.15;margin-top:18px;}
.style-editorial .sa-heading{font-size:54px;font-weight:900;letter-spacing:-.03em;line-height:1.08;margin-top:18px;max-width:17ch;}
.style-editorial .sa-body-txt{font-size:21px;font-weight:400;line-height:1.6;color:var(--muted);max-width:30ch;margin-top:24px;}
.style-editorial.dark .sa-body-txt{color:rgba(241,239,244,.62);}
.style-editorial.coral .sa-body-txt{color:rgba(255,255,255,.85);}

.style-editorial .sa-tip{display:flex;align-items:center;gap:16px;padding:22px 26px;margin-top:26px;max-width:560px;border-left:3px solid var(--coral);background:rgba(255,99,143,.06);}
.style-editorial .sa-tip .sa-ico{font-size:24px;line-height:1;flex:0 0 auto;}
.style-editorial .sa-tip .sa-tt{font-size:17px;line-height:1.5;font-weight:500;}
.style-editorial .sa-tip .sa-tt b{color:var(--coral);font-weight:700;}

/* ============ SLIDE — COVER ============ */
.style-editorial.cover .sa-eyebrow{font-size:13px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--coral);}
.style-editorial.cover h1{font-size:70px;font-weight:900;letter-spacing:-.04em;line-height:1.04;margin-top:22px;max-width:14ch;}
.style-editorial.cover h1 .c{color:var(--coral);}
.style-editorial.cover .sa-sub{font-size:20px;line-height:1.55;color:var(--muted);max-width:30ch;margin-top:26px;font-weight:400;}
.style-editorial.cover.dark .sa-sub{color:rgba(241,239,244,.6);}
.style-editorial .sa-swipe{position:absolute;right:84px;bottom:120px;z-index:6;display:flex;align-items:center;gap:10px;color:var(--coral);font-size:15px;font-weight:700;letter-spacing:.04em;}
.style-editorial .sa-swipe .sa-arw{display:inline-block;animation:sa-arrow 1.3s ease-in-out infinite;font-size:18px;}

/* ============ SLIDE — STATS ============ */
.style-editorial .sa-stats-head{margin-bottom:34px;}
.style-editorial .sa-grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px;max-width:780px;}
.style-editorial .sa-stat{padding-left:20px;border-left:3px solid var(--coral);}
.style-editorial .sa-stat .sa-num{font-size:62px;font-weight:900;color:var(--coral);letter-spacing:-.04em;line-height:1;}
.style-editorial .sa-stat .sa-lab{font-size:16px;line-height:1.45;font-weight:500;margin-top:12px;max-width:22ch;color:var(--muted);}
.style-editorial.dark .sa-stat .sa-lab{color:rgba(241,239,244,.65);}

/* ============ SLIDE — CTA ============ */
.style-editorial.cta .sa-eyebrow{font-size:13px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.85);}
.style-editorial.cta h1{font-size:62px;font-weight:900;letter-spacing:-.04em;line-height:1.06;color:#fff;max-width:15ch;margin-top:22px;}
.style-editorial.cta .sa-sub{font-size:19px;line-height:1.55;color:rgba(255,255,255,.88);max-width:32ch;margin-top:24px;font-weight:400;}
.style-editorial .sa-cta-pill{display:inline-flex;align-items:center;gap:12px;background:#fff;color:var(--dark);font-size:18px;font-weight:700;letter-spacing:.01em;padding:18px 36px;border-radius:3px;margin-top:34px;}
.style-editorial .sa-cta-pill .sa-arw{color:var(--coral);font-size:20px;}
.style-editorial.cta .sa-handle{margin-top:22px;font-size:15px;font-weight:700;letter-spacing:.06em;color:#fff;opacity:.95;}

@media (prefers-reduced-motion: reduce){
  .style-editorial .sa-swipe .sa-arw{animation:none !important;}
}
@keyframes sa-arrow{0%,100%{transform:translateX(0);}50%{transform:translateX(9px);}}
`,

  cover(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Portada · Cover</div>
  <div class="frame">
    <div class="slide style-editorial dark cover">
      <div class="sa-bar"></div>
      <div class="sa-corner">01</div>
      ${MARK}
      <div class="sa-body">
        <div class="sa-eyebrow edit">${esc(s.eyebrow)}</div>
        <h1 class="edit">${hl(s.headline)}</h1>
        <div class="sa-sub edit">${esc(s.sub)}</div>
      </div>
      <div class="sa-swipe"><span>Desliza</span><span class="sa-arw">→</span></div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  content(s, n, theme) {
    const numStr = String(n).padStart(2,'0');
    const tipHTML = s.tip ? `<div class="sa-tip">
          <span class="sa-ico">💡</span>
          <span class="sa-tt edit">${rich(s.tip)}</span>
        </div>` : '';
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Slide ${numStr}</div>
  <div class="frame">
    <div class="slide style-editorial ${theme}">
      <div class="sa-bar"></div>
      <div class="sa-corner">${numStr}</div>
      ${MARK}
      <div class="sa-body">
        <div class="sa-tag edit">${esc(s.tag)}</div>
        <div class="sa-rule"></div>
        <h2 class="sa-heading edit">${esc(s.heading)}</h2>
        <p class="sa-body-txt edit">${esc(s.body)}</p>
        ${tipHTML}
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  stats(s, n, theme) {
    const statsHTML = (s.stats||[]).slice(0,4).map(st =>
      `<div class="sa-stat">
          <div class="sa-num edit">${esc(st.num)}</div>
          <div class="sa-lab edit">${esc(st.label)}</div>
        </div>`
    ).join('');
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Estadísticas</div>
  <div class="frame">
    <div class="slide style-editorial ${theme}">
      <div class="sa-bar"></div>
      ${MARK}
      <div class="sa-body">
        <div class="sa-stats-head">
          <div class="sa-tag edit">${esc(s.tag)}</div>
          <h2 class="sa-heading edit" style="font-size:42px;margin-top:14px;">${esc(s.heading)}</h2>
        </div>
        <div class="sa-grid2">${statsHTML}</div>
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
    <div class="slide style-editorial coral cta">
      <div class="sa-corner">→</div>
      ${MARK}
      <div class="sa-body" style="align-items:center;text-align:center;padding-left:0;">
        <div class="sa-eyebrow edit">${esc(s.eyebrow)}</div>
        <h1 class="edit">${esc(s.headline)}</h1>
        <div class="sa-sub edit">${esc(s.sub)}</div>
        <div class="sa-cta-pill"><span class="edit" style="display:inline">${esc(s.pill)}</span><span class="sa-arw">→</span></div>
        <div class="sa-handle edit">${esc(s.handle||'@prendetuweb.cl')}</div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  }
};
