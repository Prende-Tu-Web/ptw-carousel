/*
 * ════════════════════════════════════════════════════════════════════
 * PTW Carousel — registro de estilos visuales
 * ════════════════════════════════════════════════════════════════════
 *
 * Cada archivo styles/<id>.js se auto-registra así:
 *
 *   window.PTW_STYLES['<id>'] = {
 *     name: 'Nombre visible en el selector',
 *     css: `...CSS propio, con nombres de clase prefijados por el estilo...`,
 *     cover(s, n)           { ...return HTML... },
 *     content(s, n, theme)  { ...return HTML... },  // theme: 'light' | 'dark'
 *     stats(s, n, theme)    { ...return HTML... },
 *     cta(s, n)              { ...return HTML... }
 *   };
 *
 * CONTRATO OBLIGATORIO para cualquier estilo nuevo:
 *
 * 1. Wrapper externo intacto. Cada función retorna exactamente:
 *      <div class="unit">
 *        <div class="slabel"><span class="n">${n}</span> {Label}</div>
 *        <div class="frame">
 *          <div class="slide {theme-si-aplica} {clases propias}">
 *            ...
 *          </div>
 *        </div>
 *      </div>
 *    .unit / .frame / .slide son leídos por el script de escalado de
 *    template.html, por el cálculo de altura del iframe en
 *    renderCarousel() y por las reglas de impresión — no se pueden
 *    renombrar ni omitir.
 *
 * 2. Orden posicional de los campos editables (class="edit"). syncEdits()
 *    en index.html los lee por POSICIÓN, no por selector, así que el
 *    orden debe respetarse exactamente:
 *      - cover:   eyebrow, headline, sub
 *      - content: tag, heading, body, [tip] (tip es opcional, va al final)
 *      - stats:   tag, heading, luego pares (num, label) por cada stat
 *      - cta:     eyebrow, headline, sub, pill, handle
 *
 * 3. Helpers globales ya disponibles (definidos en index.html, visibles
 *    por scope global en tiempo de llamada): esc(s), rich(s), hl(s),
 *    MARK, BRAND. Úsalos en vez de reimplementar escape de HTML o el
 *    logo de marca.
 *      - hl(s.headline) en cover mantiene la convención "[palabra]" ->
 *        <span class="c">palabra</span>; tu CSS debe darle estilo a esa
 *        clase (normalmente con var(--coral)).
 *
 * 4. Colores: usar var(--dark), var(--light), var(--muted), var(--coral)
 *    en vez de hex hardcodeados, para que la paleta extraída de una
 *    imagen de referencia (feature existente) siga funcionando.
 *
 * 5. Nombres de clase propios y prefijados (ej. .sD1, .sE1 como en los
 *    swatches de reference-templates/) para no chocar con el shell de
 *    template.html ni con otros estilos.
 *
 * 6. No tocar template.html ni index.html — solo el archivo styles/<id>.js
 *    asignado.
 */
window.PTW_STYLES = window.PTW_STYLES || {};

// Metadata para el selector de estilos en el panel izquierdo de index.html.
// El id debe coincidir con la clave usada en window.PTW_STYLES.
window.PTW_STYLE_LIST = [
  { id: 'original',     name: 'Original',     desc: 'Glow + número de fondo' },
  { id: 'geometric',     name: 'Geométrico',   desc: 'Formas SVG decorativas' },
  { id: 'split',         name: 'Split',        desc: 'Bloques de color' },
  { id: 'neubrutalism',  name: 'Neobrutalista',desc: 'Bordes gruesos + sombra' }
];
