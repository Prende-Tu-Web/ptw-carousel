/* Estilo "Split" — bloques de color / banda lateral. Inspirado en
   reference-templates/carousel_style_E_split.html: la slide se divide en
   bandas o bloques estructurales en vez de texto flotando sobre un fondo
   continuo. Cover/CTA usan banda superior + banda inferior; content usa
   sidebar lateral rotada + área de contenido; stats usa tarjetas en grilla
   separadas por divisores finos. */
window.PTW_STYLES = window.PTW_STYLES || {};
window.PTW_STYLES.split = {
  name: 'Split',

  css: `
/* ============ BASE / WRAPPER ============ */
.style-split{display:flex;flex-direction:column;background:var(--light);overflow:hidden;}
.style-split .ss-mark-wrap,.style-split .mark{z-index:8;}
.style-split .bar{z-index:8;}

/* highlight span usado por hl() en headline de cover */
.style-split .ss-h1 .c{color:var(--coral);}

/* ============ SLIDE — COVER ============ */
.style-split.cover.ss-cover{padding:0;}
.style-split.ss-cover .ss-top{
  flex:1 1 auto;background:var(--coral);padding:80px 84px 40px;
  display:flex;flex-direction:column;justify-content:flex-end;position:relative;z-index:2;
}
.style-split.ss-cover .ss-top .mark{position:absolute;top:44px;left:84px;}
.style-split.ss-cover .ss-eyebrow{
  font-size:14px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;
  color:rgba(255,255,255,.72);
}
.style-split.ss-cover .ss-h1{
  font-size:64px;font-weight:900;letter-spacing:-.035em;line-height:1.06;
  color:#fff;margin-top:18px;max-width:15ch;
}
.style-split.ss-cover .ss-bot{
  flex:0 0 auto;background:var(--dark);padding:36px 84px;
  display:flex;align-items:center;justify-content:space-between;gap:24px;position:relative;z-index:2;
}
.style-split.ss-cover .ss-sub{
  font-size:18px;line-height:1.55;color:rgba(241,239,244,.62);max-width:30ch;font-weight:400;
}
.style-split.ss-cover .ss-arr{
  font-size:30px;font-weight:900;color:var(--coral);flex:0 0 auto;
  animation:split-arrow 1.3s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce){.style-split.ss-cover .ss-arr{animation:none;}}
@keyframes split-arrow{0%,100%{transform:translateX(0);}50%{transform:translateX(10px);}}

/* ============ SLIDE — CONTENT ============ */
.style-split.ss-content{flex-direction:row;}
.style-split.ss-content .ss-side{
  width:120px;flex:0 0 auto;background:var(--coral);
  display:flex;align-items:flex-end;padding:40px 0;position:relative;z-index:2;
}
.style-split.ss-content.dark .ss-side{background:var(--coral);}
.style-split.ss-content .ss-side span{
  writing-mode:vertical-rl;transform:rotate(180deg);
  font-size:14px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(255,255,255,.85);padding:0 0 0 0;white-space:nowrap;
}
.style-split.ss-content .ss-main{
  flex:1 1 auto;padding:64px 72px;display:flex;flex-direction:column;
  justify-content:space-between;min-width:0;position:relative;z-index:2;
}
.style-split.ss-content.light .ss-main{background:var(--light);color:var(--dark);}
.style-split.ss-content.dark .ss-main{background:var(--dark);color:var(--light);}
.style-split.ss-content .ss-idx{
  font-size:14px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:var(--coral);
}
.style-split.ss-content .ss-h2{
  font-size:48px;font-weight:900;letter-spacing:-.03em;line-height:1.1;margin-top:16px;max-width:18ch;
}
.style-split.ss-content .ss-body{
  font-size:18px;line-height:1.65;margin-top:24px;max-width:32ch;font-weight:400;
}
.style-split.ss-content.light .ss-body{color:var(--muted);}
.style-split.ss-content.dark .ss-body{color:#9aa0a6;}
.style-split.ss-content .ss-tip{
  display:flex;align-items:center;gap:16px;border-radius:16px;padding:22px 26px;
  margin-top:28px;max-width:520px;border:2px solid var(--coral);
}
.style-split.ss-content.light .ss-tip{background:#fff;}
.style-split.ss-content.dark .ss-tip{background:#1b262a;}
.style-split.ss-content .ss-tip .ico{font-size:26px;line-height:1;flex:0 0 auto;}
.style-split.ss-content .ss-tip .tt{font-size:15px;line-height:1.5;font-weight:500;}
.style-split.ss-content .ss-tip .tt b{color:var(--coral);font-weight:700;}
.style-split.ss-content .mark{position:absolute;top:32px;right:36px;z-index:3;}

/* ============ SLIDE — STATS ============ */
.style-split.ss-stats{flex-direction:column;}
.style-split.ss-stats .ss-head{
  flex:0 0 auto;background:var(--coral);padding:48px 64px 36px;position:relative;z-index:2;
}
.style-split.ss-stats .ss-head .mark{position:absolute;top:32px;right:36px;}
.style-split.ss-stats .ss-tag{
  font-size:14px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);
}
.style-split.ss-stats .ss-h2-head{
  font-size:38px;font-weight:900;letter-spacing:-.025em;line-height:1.1;color:#fff;margin-top:12px;max-width:24ch;
}
.style-split.ss-stats .ss-gridwrap{flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;}
.style-split.ss-stats.light .ss-gridwrap{background:var(--light);}
.style-split.ss-stats.dark .ss-gridwrap{background:var(--dark);}
.style-split.ss-stats .ss-card{
  padding:38px 36px;display:flex;flex-direction:column;justify-content:center;position:relative;
  border-right:2px solid rgba(17,26,27,.08);border-bottom:2px solid rgba(17,26,27,.08);
}
.style-split.ss-stats.dark .ss-card{border-color:rgba(255,255,255,.08);}
.style-split.ss-stats .ss-card:nth-child(2n){border-right:none;}
.style-split.ss-stats .ss-card:nth-child(n+3){border-bottom:none;}
.style-split.ss-stats .ss-num{font-size:58px;font-weight:900;color:var(--coral);letter-spacing:-.04em;line-height:1;}
.style-split.ss-stats .ss-lab{font-size:15px;line-height:1.45;font-weight:500;margin-top:14px;max-width:22ch;}
.style-split.ss-stats.light .ss-lab{color:var(--muted);}
.style-split.ss-stats.dark .ss-lab{color:#9aa0a6;}

/* ============ SLIDE — CTA ============ */
.style-split.cta.ss-cta{padding:0;}
.style-split.ss-cta .ss-top{
  flex:1 1 auto;background:var(--dark);padding:80px 84px 40px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  position:relative;z-index:2;
}
.style-split.ss-cta .ss-top .mark{position:absolute;top:44px;left:50%;transform:translateX(-50%);}
.style-split.ss-cta .ss-eyebrow{
  font-size:14px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--coral);margin-top:48px;
}
.style-split.ss-cta .ss-h1{
  font-size:58px;font-weight:900;letter-spacing:-.03em;line-height:1.08;color:var(--light);
  margin-top:18px;max-width:16ch;
}
.style-split.ss-cta .ss-sub{
  font-size:18px;line-height:1.55;color:#9aa0a6;max-width:30ch;margin-top:20px;font-weight:400;
}
.style-split.ss-cta .ss-bot{
  flex:0 0 auto;background:var(--coral);padding:36px 84px;
  display:flex;align-items:center;justify-content:center;gap:28px;flex-direction:column;position:relative;z-index:2;
}
.style-split.ss-cta .ss-pill{
  display:inline-flex;align-items:center;gap:12px;background:#fff;color:var(--dark);
  font-size:18px;font-weight:700;letter-spacing:.01em;padding:18px 36px;border-radius:999px;
  box-shadow:0 14px 32px -12px rgba(17,26,27,.4);
}
.style-split.ss-cta .ss-pill .arw{color:var(--coral);font-size:20px;}
.style-split.ss-cta .ss-handle{font-size:15px;font-weight:700;letter-spacing:.06em;color:rgba(255,255,255,.92);}
`,

  cover(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Portada · Cover</div>
  <div class="frame">
    <div class="slide style-split dark cover ss-cover">
      <div class="ss-top">
        ${MARK}
        <div class="ss-eyebrow edit">${esc(s.eyebrow)}</div>
        <h1 class="ss-h1 edit">${hl(s.headline)}</h1>
      </div>
      <div class="ss-bot">
        <div class="ss-sub edit">${esc(s.sub)}</div>
        <div class="ss-arr">→</div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  content(s, n, theme) {
    const numStr = String(n).padStart(2, '0');
    const tipHTML = s.tip ? `<div class="ss-tip">
            <span class="ico">💡</span>
            <span class="tt edit">${rich(s.tip)}</span>
          </div>` : '';
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Slide ${numStr}</div>
  <div class="frame">
    <div class="slide style-split ${theme} ss-content">
      <div class="ss-side"><span class="edit">${esc(s.tag)}</span></div>
      <div class="ss-main">
        ${MARK}
        <div>
          <div class="ss-idx">${numStr}</div>
          <h2 class="ss-h2 edit">${esc(s.heading)}</h2>
          <p class="ss-body edit">${esc(s.body)}</p>
          ${tipHTML}
        </div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  stats(s, n, theme) {
    const statsHTML = (s.stats || []).slice(0, 4).map(st =>
      `<div class="ss-card">
            <div class="ss-num edit">${esc(st.num)}</div>
            <div class="ss-lab edit">${esc(st.label)}</div>
          </div>`
    ).join('');
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Estadísticas</div>
  <div class="frame">
    <div class="slide style-split ${theme} ss-stats">
      <div class="ss-head">
        ${MARK}
        <div class="ss-tag edit">${esc(s.tag)}</div>
        <h2 class="ss-h2-head edit">${esc(s.heading)}</h2>
      </div>
      <div class="ss-gridwrap">${statsHTML}</div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  cta(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Cierre · CTA</div>
  <div class="frame">
    <div class="slide style-split coral cta ss-cta">
      <div class="ss-top">
        ${MARK}
        <div class="ss-eyebrow edit">${esc(s.eyebrow)}</div>
        <h1 class="ss-h1 edit">${esc(s.headline)}</h1>
        <div class="ss-sub edit">${esc(s.sub)}</div>
      </div>
      <div class="ss-bot">
        <div class="ss-pill"><span class="edit" style="display:inline">${esc(s.pill)}</span><span class="arw">→</span></div>
        <div class="ss-handle edit">${esc(s.handle || '@prendetuweb.cl')}</div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  }
};
