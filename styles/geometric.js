/* Estilo "Geométrico" — formas SVG decorativas de fondo (círculos concéntricos,
   líneas finas, arcos) inspirado en reference-templates/carousel_style_D_geometric.html
   y variaciones D2-D6. El contenido vive sobre las formas (z-index), las formas
   nunca bloquean los campos editables (pointer-events:none). */
window.PTW_STYLES = window.PTW_STYLES || {};
window.PTW_STYLES.geometric = {
  name: 'Geométrico',

  css: `
/* ---------- contenedor de formas decorativas ---------- */
.style-geometric .sg-bg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;}
.style-geometric .sg-body{position:relative;z-index:5;flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;min-height:0;}

/* ---------- tipografía compartida ---------- */
.style-geometric .sg-tag{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--coral);display:inline-flex;align-items:center;gap:10px;}
.style-geometric .sg-tag::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--coral);display:inline-block;}
.style-geometric .sg-heading{font-size:50px;font-weight:900;letter-spacing:-.035em;line-height:1.08;margin-top:20px;}
.style-geometric .sg-body-txt{font-size:21px;font-weight:400;line-height:1.6;color:var(--muted);max-width:30ch;margin-top:22px;}
.style-geometric.dark .sg-body-txt{color:rgba(241,239,244,.62);}
.style-geometric.coral .sg-body-txt{color:rgba(255,255,255,.85);}

/* tip card */
.style-geometric .sg-tip{display:flex;align-items:center;gap:16px;border-radius:4px;padding:22px 26px;margin-top:28px;max-width:560px;border:1px solid var(--coral);position:relative;}
.style-geometric .sg-tip::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--coral);}
.style-geometric .sg-tip .sg-ico{font-size:26px;line-height:1;flex:0 0 auto;}
.style-geometric .sg-tip .sg-tt{font-size:17px;line-height:1.5;font-weight:500;}
.style-geometric .sg-tip .sg-tt b{color:var(--coral);font-weight:700;}

/* ============ SLIDE — COVER ============ */
.style-geometric.cover{padding-top:64px;}
.style-geometric.cover .sg-eyebrow{font-size:13px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--coral);}
.style-geometric.cover h1{font-size:68px;font-weight:900;letter-spacing:-.04em;line-height:1.04;margin-top:24px;max-width:14ch;}
.style-geometric.cover h1 .c{color:var(--coral);}
.style-geometric.cover .sg-sub{font-size:20px;line-height:1.55;color:var(--muted);max-width:30ch;margin-top:26px;font-weight:400;}
.style-geometric.cover.dark .sg-sub{color:rgba(241,239,244,.6);}
.style-geometric .sg-dot{width:11px;height:11px;border-radius:50%;background:var(--coral);}
.style-geometric .sg-swipe{position:absolute;right:84px;bottom:120px;z-index:6;display:flex;align-items:center;gap:10px;color:var(--coral);font-size:15px;font-weight:700;letter-spacing:.04em;}
.style-geometric .sg-swipe .sg-arw{display:inline-block;animation:sg-arrow 1.3s ease-in-out infinite;font-size:18px;}

/* ============ SLIDE — CONTENT ============ */
.style-geometric .sg-idx{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);opacity:.6;}
.style-geometric.dark .sg-idx{color:rgba(241,239,244,.4);}
.style-geometric .sg-content-h{font-size:46px;font-weight:900;letter-spacing:-.025em;line-height:1.12;margin-top:14px;max-width:18ch;}
.style-geometric .sg-pill{display:inline-block;background:var(--coral);color:#fff;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:8px 18px;border-radius:3px;margin-top:24px;}

/* ============ SLIDE — STATS ============ */
.style-geometric .sg-stats-head{margin-bottom:36px;}
.style-geometric .sg-grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.style-geometric .sg-stat{position:relative;padding:30px 28px;border-left:3px solid var(--coral);}
.style-geometric .sg-stat .sg-num{font-size:60px;font-weight:900;color:var(--coral);letter-spacing:-.04em;line-height:1;}
.style-geometric .sg-stat .sg-lab{font-size:16px;line-height:1.45;font-weight:500;margin-top:12px;max-width:22ch;color:var(--muted);}
.style-geometric.dark .sg-stat .sg-lab{color:rgba(241,239,244,.65);}

/* ============ SLIDE — CTA ============ */
.style-geometric.cta .sg-eyebrow{font-size:13px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.85);}
.style-geometric.cta h1{font-size:62px;font-weight:900;letter-spacing:-.04em;line-height:1.06;color:#fff;max-width:15ch;margin-top:22px;}
.style-geometric.cta .sg-sub{font-size:19px;line-height:1.55;color:rgba(255,255,255,.88);max-width:32ch;margin-top:24px;font-weight:400;}
.style-geometric .sg-cta-pill{display:inline-flex;align-items:center;gap:12px;background:#fff;color:var(--dark);font-size:18px;font-weight:700;letter-spacing:.01em;padding:18px 36px;border-radius:3px;margin-top:36px;}
.style-geometric .sg-cta-pill .sg-arw{color:var(--coral);font-size:20px;}
.style-geometric.cta .sg-handle{margin-top:24px;font-size:15px;font-weight:700;letter-spacing:.06em;color:#fff;opacity:.95;}

@media (prefers-reduced-motion: reduce){
  .style-geometric .sg-swipe .sg-arw{animation:none !important;}
}
@keyframes sg-arrow{0%,100%{transform:translateX(0);}50%{transform:translateX(9px);}}
`,

  cover(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Portada · Cover</div>
  <div class="frame">
    <div class="slide style-geometric dark cover">
      <svg class="sg-bg" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <circle cx="940" cy="220" r="320" fill="none" stroke="var(--coral)" stroke-width="1.5" opacity=".28"/>
        <circle cx="940" cy="220" r="200" fill="none" stroke="var(--coral)" stroke-width="1" opacity=".22"/>
        <circle cx="940" cy="220" r="90" fill="var(--coral)" opacity=".14"/>
        <line x1="0" y1="980" x2="1080" y2="980" stroke="var(--light)" stroke-width=".5" opacity=".08"/>
        <circle cx="120" cy="1180" r="3" fill="var(--coral)" opacity=".5"/>
        <circle cx="200" cy="1230" r="2" fill="var(--coral)" opacity=".4"/>
        <circle cx="80" cy="1260" r="2.5" fill="var(--coral)" opacity=".35"/>
      </svg>
      ${MARK}
      <div class="sg-body">
        <div>
          <div class="sg-eyebrow edit">${esc(s.eyebrow)}</div>
          <h1 class="edit">${hl(s.headline)}</h1>
          <div class="sg-sub edit">${esc(s.sub)}</div>
        </div>
      </div>
      <div class="sg-swipe"><span>Desliza</span><span class="sg-arw">→</span></div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  content(s, n, theme) {
    const numStr = String(n).padStart(2,'0');
    const cx = n % 2 === 0 ? 90 : 990;
    const cy = n % 2 === 0 ? 1280 : 80;
    const tipHTML = s.tip ? `<div class="sg-tip">
          <span class="sg-ico">💡</span>
          <span class="sg-tt edit">${rich(s.tip)}</span>
        </div>` : '';
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Slide ${numStr}</div>
  <div class="frame">
    <div class="slide style-geometric ${theme}">
      <svg class="sg-bg" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <circle cx="${cx}" cy="${cy}" r="260" fill="none" stroke="var(--coral)" stroke-width="1" opacity=".18"/>
        <circle cx="${cx}" cy="${cy}" r="160" fill="none" stroke="var(--coral)" stroke-width=".75" opacity=".14"/>
        <circle cx="${cx}" cy="${cy}" r="60" fill="var(--coral)" opacity=".07"/>
        <line x1="0" y1="640" x2="1080" y2="640" stroke="var(--dark)" stroke-width=".5" opacity=".06"/>
      </svg>
      ${MARK}
      <div class="sg-body">
        <div>
          <div class="sg-idx">${numStr}</div>
          <div class="sg-tag edit">${esc(s.tag)}</div>
          <h2 class="sg-content-h edit">${esc(s.heading)}</h2>
          <p class="sg-body-txt edit">${esc(s.body)}</p>
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
      `<div class="sg-stat">
          <div class="sg-num edit">${esc(st.num)}</div>
          <div class="sg-lab edit">${esc(st.label)}</div>
        </div>`
    ).join('');
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Estadísticas</div>
  <div class="frame">
    <div class="slide style-geometric ${theme}">
      <svg class="sg-bg" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <circle cx="540" cy="-40" r="380" fill="none" stroke="var(--coral)" stroke-width="1" opacity=".12"/>
        <circle cx="1080" cy="1350" r="260" fill="var(--coral)" opacity=".05"/>
      </svg>
      ${MARK}
      <div class="sg-body">
        <div class="sg-stats-head">
          <div class="sg-tag edit">${esc(s.tag)}</div>
          <h2 class="sg-content-h edit">${esc(s.heading)}</h2>
        </div>
        <div class="sg-grid2">${statsHTML}</div>
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
    <div class="slide style-geometric coral cta">
      <svg class="sg-bg" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <circle cx="540" cy="1350" r="420" fill="none" stroke="#fff" stroke-width="1.5" opacity=".22"/>
        <circle cx="540" cy="1350" r="280" fill="none" stroke="#fff" stroke-width="1" opacity=".16"/>
        <circle cx="540" cy="1350" r="140" fill="#fff" opacity=".08"/>
        <line x1="0" y1="260" x2="1080" y2="260" stroke="#fff" stroke-width=".5" opacity=".1"/>
      </svg>
      ${MARK}
      <div class="sg-body" style="align-items:center;text-align:center;">
        <div></div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div class="sg-eyebrow edit">${esc(s.eyebrow)}</div>
          <h1 class="edit">${esc(s.headline)}</h1>
          <div class="sg-sub edit">${esc(s.sub)}</div>
          <div class="sg-cta-pill"><span class="edit" style="display:inline">${esc(s.pill)}</span><span class="sg-arw">→</span></div>
          <div class="sg-handle edit">${esc(s.handle||'@prendetuweb.cl')}</div>
        </div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  }
};
