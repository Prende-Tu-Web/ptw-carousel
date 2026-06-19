/* Estilo "Original" — glow + número de fondo. Comportamiento idéntico al
   template histórico de PTW Carousel, solo reubicado como módulo de estilo. */
window.PTW_STYLES = window.PTW_STYLES || {};
window.PTW_STYLES.original = {
  name: 'Original',

  css: `
/* content region fills middle */
.style-original .body{flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:5;min-height:0;}

/* shared type */
.style-original .tag{font-size:13px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--coral);display:inline-flex;align-items:center;gap:12px;}
.style-original .tag::before{content:"";width:26px;height:2px;background:var(--coral);display:inline-block;}
.style-original .h-content{font-size:58px;font-weight:800;letter-spacing:-.035em;line-height:1.08;margin:22px 0 0;}
.style-original .p-body{font-size:22px;font-weight:400;line-height:1.6;color:var(--muted);max-width:30ch;margin-top:22px;}
.style-original.dark .p-body{color:#9aa0a6;}

/* decorative big number */
.style-original .bignum{position:absolute;font-weight:900;line-height:.8;letter-spacing:-.04em;z-index:0;pointer-events:none;}
.style-original.light .bignum{color:rgba(17,26,27,.05);}
.style-original.dark .bignum{color:rgba(241,239,244,.05);}

/* tip card */
.style-original .tip{
  display:flex;align-items:center;gap:18px;background:var(--dark);color:var(--light);
  border-radius:18px;padding:24px 28px;margin-top:30px;max-width:560px;
}
.style-original.dark .tip{background:#1b262a;border:1px solid rgba(255,255,255,.07);}
.style-original .tip .ico{font-size:30px;line-height:1;flex:0 0 auto;}
.style-original .tip .tt{font-size:17px;line-height:1.5;font-weight:500;}
.style-original .tip .tt b{color:var(--coral);font-weight:700;}

/* ============ SLIDE — COVER ============ */
.style-original.cover{padding-top:64px;}
.style-original.cover .dots{
  position:absolute;inset:0;z-index:0;opacity:.9;
  background-image:radial-gradient(rgba(255,99,143,.22) 2px,transparent 2px);
  background-size:46px 46px;animation:original-drift 9s linear infinite;
}
.style-original.cover .glow{
  position:absolute;left:50%;top:46%;width:760px;height:760px;transform:translate(-50%,-50%);
  background:radial-gradient(circle,rgba(255,99,143,.42) 0%,rgba(255,99,143,.10) 38%,transparent 64%);
  z-index:1;animation:original-glow 6s ease-in-out infinite;filter:blur(2px);
}
.style-original.cover .body{align-items:flex-start;text-align:left;}
.style-original.cover .eyebrow{font-size:13px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:var(--coral);}
.style-original.cover h1{
  font-size:72px;font-weight:900;letter-spacing:-.04em;line-height:1.02;margin-top:26px;max-width:14ch;
}
.style-original.cover h1 .c{color:var(--coral);}
.style-original.cover .sub{font-size:20px;line-height:1.55;color:#9aa0a6;max-width:30ch;margin-top:28px;font-weight:400;}
.style-original .particle{position:absolute;width:9px;height:9px;border-radius:50%;background:var(--coral);z-index:2;opacity:0;box-shadow:0 0 14px rgba(255,99,143,.7);}
.style-original .p1{left:14%;bottom:24%;animation:original-rise 7s ease-in 0s infinite;}
.style-original .p2{left:30%;bottom:16%;animation:original-rise 9s ease-in 1.4s infinite;width:6px;height:6px;}
.style-original .p3{left:62%;bottom:30%;animation:original-rise 8s ease-in .7s infinite;}
.style-original .p4{left:80%;bottom:20%;animation:original-rise 10s ease-in 2.2s infinite;width:7px;height:7px;}
.style-original .p5{left:46%;bottom:12%;animation:original-rise 8.5s ease-in 3.1s infinite;width:5px;height:5px;}
.style-original .swipe{
  position:absolute;right:84px;bottom:120px;z-index:6;display:flex;align-items:center;gap:10px;
  color:var(--coral);font-size:15px;font-weight:700;letter-spacing:.04em;
}
.style-original .swipe .arw{display:inline-block;animation:original-arrow 1.3s ease-in-out infinite;font-size:18px;}

/* ============ SLIDE — STATS ============ */
.style-original .stats-head{margin-bottom:34px;}
.style-original .grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
.style-original .stat{
  background:#fff;border-radius:20px;padding:34px 32px;position:relative;overflow:hidden;
  box-shadow:0 10px 30px -16px rgba(17,26,27,.2);
}
.style-original .stat::before{content:"";position:absolute;top:0;left:0;right:0;height:5px;background:var(--coral);transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.2,.7,.3,1);}
.style-original .stat:hover::before,.frame.live .style-original .stat::before{transform:scaleX(1);}
.style-original .stat .num{font-size:64px;font-weight:900;color:var(--coral);letter-spacing:-.04em;line-height:1;}
.style-original .stat .lab{font-size:16px;line-height:1.45;color:#3d4145;font-weight:500;margin-top:14px;max-width:22ch;}

/* ============ SLIDE — CTA ============ */
.style-original.cta .dots{
  position:absolute;inset:0;z-index:0;
  background-image:radial-gradient(rgba(255,255,255,.26) 2px,transparent 2px);
  background-size:46px 46px;animation:original-drift 9s linear infinite;
}
.style-original.cta .body{align-items:center;text-align:center;z-index:5;}
.style-original.cta .eyebrow{font-size:13px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:rgba(255,255,255,.85);}
.style-original.cta h1{font-size:66px;font-weight:900;letter-spacing:-.04em;line-height:1.04;color:#fff;max-width:15ch;margin-top:24px;}
.style-original.cta .sub{font-size:19px;line-height:1.55;color:rgba(255,255,255,.9);max-width:32ch;margin-top:24px;font-weight:400;}
.style-original .pill{
  display:inline-flex;align-items:center;gap:12px;background:#fff;color:var(--dark);
  font-size:18px;font-weight:700;letter-spacing:.01em;padding:20px 38px;border-radius:999px;margin-top:38px;
  box-shadow:0 18px 40px -14px rgba(17,26,27,.45);
}
.style-original .pill .arw{color:var(--coral);font-size:20px;}
.style-original.cta .handle{margin-top:26px;font-size:15px;font-weight:700;letter-spacing:.06em;color:#fff;opacity:.95;}

@media (prefers-reduced-motion: reduce){
  .style-original.cover .dots,.style-original.cta .dots,.style-original.cover .glow,.style-original .particle,.style-original .swipe .arw{animation:none !important;}
  .style-original .particle{opacity:.6;}
}
@keyframes original-drift{from{background-position:0 0;}to{background-position:46px 46px;}}
@keyframes original-glow{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(1);}50%{opacity:.85;transform:translate(-50%,-50%) scale(1.07);}}
@keyframes original-rise{0%{transform:translateY(0);opacity:0;}12%{opacity:.8;}88%{opacity:.8;}100%{transform:translateY(-230px);opacity:0;}}
@keyframes original-arrow{0%,100%{transform:translateX(0);}50%{transform:translateX(9px);}}
`,

  cover(s, n) {
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Portada · Cover</div>
  <div class="frame">
    <div class="slide style-original dark cover">
      <div class="dots"></div><div class="glow"></div>
      <span class="particle p1"></span><span class="particle p2"></span>
      <span class="particle p3"></span><span class="particle p4"></span><span class="particle p5"></span>
      ${MARK}
      <div class="body">
        <div class="eyebrow edit">${esc(s.eyebrow)}</div>
        <h1 class="edit">${hl(s.headline)}</h1>
        <div class="sub edit">${esc(s.sub)}</div>
      </div>
      <div class="swipe"><span>Desliza</span><span class="arw">→</span></div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  content(s, n, theme) {
    const numStr = String(n).padStart(2,'0');
    const side   = n % 2 === 0 ? 'left:-20px;top:120px;' : 'right:-30px;bottom:60px;';
    const tipHTML = s.tip ? `<div class="tip">
          <span class="ico">💡</span>
          <span class="tt edit">${rich(s.tip)}</span>
        </div>` : '';
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Slide ${numStr}</div>
  <div class="frame">
    <div class="slide style-original ${theme}">
      <div class="bignum" style="font-size:480px;${side}">${numStr}</div>
      ${MARK}
      <div class="body">
        <div class="tag edit">${esc(s.tag)}</div>
        <h2 class="h-content edit">${esc(s.heading)}</h2>
        <p class="p-body edit">${esc(s.body)}</p>
        ${tipHTML}
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  },

  stats(s, n, theme) {
    const statsHTML = (s.stats||[]).slice(0,4).map(st =>
      `<div class="stat">
          <div class="num edit">${esc(st.num)}</div>
          <div class="lab edit">${esc(st.label)}</div>
        </div>`
    ).join('');
    return `<div class="unit">
  <div class="slabel"><span class="n">${n}</span> Estadísticas</div>
  <div class="frame">
    <div class="slide style-original ${theme}">
      ${MARK}
      <div class="body">
        <div class="stats-head">
          <div class="tag edit">${esc(s.tag)}</div>
          <h2 class="h-content edit">${esc(s.heading)}</h2>
        </div>
        <div class="grid2">${statsHTML}</div>
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
    <div class="slide style-original coral cta">
      <div class="dots"></div>
      ${MARK}
      <div class="body">
        <div class="eyebrow edit">${esc(s.eyebrow)}</div>
        <h1 class="edit">${esc(s.headline)}</h1>
        <div class="sub edit">${esc(s.sub)}</div>
        <div class="pill"><span class="edit" style="display:inline">${esc(s.pill)}</span><span class="arw">→</span></div>
        <div class="handle edit">${esc(s.handle||'@prendetuweb.cl')}</div>
      </div>
      ${BRAND}
    </div>
  </div>
</div>`;
  }
};
