# PTW Carousel Generation — Contexto del Proyecto

Generador de carruseles para Instagram y LinkedIn usando Claude AI. El usuario describe un tema, opcionalmente sube una imagen de referencia o una URL, y la app genera un carrusel completo de slides con diseño visual consistente.

---

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript vanilla (sin frameworks) |
| Backend | Node.js serverless (Vercel Functions) |
| LLM | Claude API (claude-sonnet-4-6) vía `fetch` nativo |
| Tipografía | Google Fonts — Rubik (400/500/700/800/900) |
| Exportación | `window.print()` nativo del navegador para PDF |
| Hosting | Vercel (timeout: 30s) |

---

## Archivos Clave

```
PTW Carousel Generation/
├── index.html          Frontend completo: UI, lógica de estado, generadores de HTML de slides
├── template.html       Master template: CSS de slides, animaciones, estructura del carrusel
├── api/generate.js     Vercel Function: integración Claude API, cálculo de distribución de slides
└── vercel.json         Config Vercel (timeout 30s)
```

### `index.html`
- **Líneas 584–590**: variables globales (`slides`, `design`, `format`, `tplHTML`, etc.)
- **Líneas 706–796**: funciones generadoras de HTML: `slideCover`, `slideContent`, `slideStats`, `slideCTA`
- **Líneas 801–830**: `buildCarouselHTML()` — ensambla el carrusel completo
- **Líneas 878–893**: `renderCarousel()` — inyecta HTML en el iframe
- **Líneas 905–932**: `exportPDF()` — abre ventana, inyecta print CSS, llama `window.print()`
- **Líneas 896–903**: `downloadHTML()` — descarga HTML como archivo

### `template.html`
- **Líneas 11–18**: CSS variables globales (`--coral`, `--dark`, `--light`, `--muted`, `--sh`)
- **Líneas 57–97**: estilos base de `.slide`, `.bignum`, temas `.dark`/`.light`/`.coral`
- **Líneas 114–191**: estilos específicos por tipo de slide (cover, stats, cta) + animaciones
- **Líneas 210–240**: JavaScript interno: función `layout()` para escalar slides al viewport

### `api/generate.js`
- **Líneas 17–20**: cálculo de distribución de slides (cover + content + stats + CTA)
- **Líneas 74–142**: system prompt para Claude con estructura JSON esperada
- **Líneas 162–176**: llamada a Claude API
- **Líneas 202–238**: parseo de respuesta JSON

---

## Flujo de Datos

```
Usuario (tema + plataforma + imagen opcional + URL opcional)
    ↓
POST /api/generate
    ↓  Distribuye slides, analiza imagen, llama Claude API
Claude retorna JSON: { slides: [...], design: { dark, light, muted } | null }
    ↓
buildCarouselHTML(slides)
    ├─ slideCover(s, n)          → <div class="slide dark cover">
    ├─ slideContent(s, n, cIdx)  → <div class="slide light|dark"> + bignum
    ├─ slideStats(s, n)          → <div class="slide light"> + grilla 2x2
    └─ slideCTA(s, n)            → <div class="slide coral cta">
    ↓
Si design != null: inyecta <style>:root{--dark:...; --light:...; --muted:...;}</style>
    ↓
iframe.srcdoc = html
```

---

## Estructura de una Slide (JSON desde Claude)

```json
// Cover
{ "type": "cover", "eyebrow": "string", "headline": "con [palabra] destacada", "sub": "string" }

// Content
{ "type": "content", "theme": "light|dark", "tag": "string", "heading": "string", "body": "string", "tip": "opcional" }

// Stats
{ "type": "stats", "tag": "string", "heading": "string", "stats": [{"num": "X%", "label": "..."}] }

// CTA
{ "type": "cta", "eyebrow": "string", "headline": "string", "sub": "string", "pill": "string", "handle": "@..." }
```

---

## Bugs Identificados

### BUG-01 — Números de fondo no corresponden a la posición de la slide ⚠️ CRÍTICO

**Archivo:** `index.html:729–739`

**Causa raíz:** La función `slideContent(s, n, contentN)` usa `contentN` (contador exclusivo de slides tipo `content`) para el número decorativo de fondo (`bignum`), pero `n` es la posición absoluta en el carrusel.

**Ejemplo con 7 slides** (cover, content, content, stats, content, content, cta):
| Slide | n (absoluta) | contentN | bignum muestra |
|-------|-------------|---------|----------------|
| Cover | 1 | — | — |
| Content | 2 | 1 | **01** ← correcto? |
| Content | 3 | 2 | **02** ← correcto? |
| Stats | 4 | — | — |
| Content | 5 | 3 | **03** ← pero es la slide 5! |
| Content | 6 | 4 | **04** ← pero es la slide 6! |
| CTA | 7 | — | — |

El espectador del carrusel ve `01`, `02`, (sin número en stats), `03` — y parece que hay un salto. La numeración del fondo no corresponde a "estoy en la slide X de Y".

**Fix:** Usar `n` (posición absoluta) en lugar de `contentN` para el `bignum` y para el texto "Slide XX" en el slabel.

```javascript
// ANTES (línea 729):
const numStr = String(contentN).padStart(2,'0');

// DESPUÉS:
const numStr = String(n).padStart(2,'0');
```

---

### BUG-02 — PDF se exporta sin colores de fondo ⚠️ CRÍTICO

**Archivo:** `index.html:911–924`

**Causa raíz:** `exportPDF()` inyecta print CSS pero omite la propiedad `print-color-adjust: exact`. Los navegadores (Chrome, Firefox, Safari) omiten todos los `background-color` CSS en modo impresión por defecto para ahorrar tinta.

Sin la propiedad, el PDF imprime:
- Fondos `.slide.dark` → blanco
- Fondos `.slide.coral` → blanco  
- Fondos `.slide.light` → blanco

Solo el texto y elementos de primer plano se imprimen correctamente. Todo el diseño visual del carrusel se pierde.

**Fix:** Agregar al bloque `printCSS`:

```css
* { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
```

**También aplica a:** `template.html` — cuando el usuario descarga el HTML y lo imprime por su cuenta, también pierde colores. Agregar la misma propiedad al CSS base.

---

### BUG-03 — Popup de exportación PDF puede ser bloqueado

**Archivo:** `index.html:927–931`

**Causa raíz:** `window.open('', '_blank', ...)` puede ser bloqueado por el navegador si la llamada no es síncronamente parte de un clic de usuario. Si `win` es `null`, el acceso a `win.document` lanza un error no controlado.

**Fix:** Verificar que `win` no sea null antes de continuar:

```javascript
const win = window.open('', '_blank', 'width=1080,height=800');
if (!win) {
  setStatus('Permite los popups en este sitio para exportar PDF', 'err');
  return;
}
```

---

### BUG-04 — Ediciones de texto se pierden al cambiar formato (1:1 ↔ 4:5)

**Archivo:** `index.html:608–614`

**Causa raíz:** `setFormat()` llama `renderCarousel(slides)` que reconstruye el carrusel desde el array `slides` original. Cualquier texto editado vía `contenteditable` en el iframe se pierde.

**Fix (opción pragmática):** Antes de re-renderizar, leer el texto de cada elemento editable del iframe y actualizar el array `slides`. O mostrar un aviso al usuario si hay cambios pendientes.

---

### BUG-05 — `max_tokens: 4096` insuficiente para carruseles grandes

**Archivo:** `api/generate.js:171`

**Causa raíz:** Con 15–20 slides que incluyen stats (4 objetos por slide), tips, y texto largo, el JSON de respuesta puede superar los 4096 tokens de salida. Esto causa JSON truncado y errores de parseo en el cliente.

**Evidencia:** Un carrusel de 20 slides con tips y stats completas puede generar ~5000–6000 tokens de JSON.

**Fix:** Aumentar `max_tokens` a `8096` (máximo recomendado para claude-sonnet-4-6 en generación de datos).

---

### BUG-06 — Slides de estadísticas siempre usan tema `light`, sin alternancia

**Archivo:** `index.html:763`

**Causa raíz:** `slideStats` tiene hardcodeado `<div class="slide light">`. No respeta el flujo de alternancia dark/light del carrusel. Dos slides `light` consecutivas (content + stats) pueden rompeer el ritmo visual.

**Fix:** Pasar el tema como parámetro basado en la posición, igual que en `slideContent`.

---

### BUG-07 — Validación de `slideCount` inconsistente entre frontend y backend

**Archivo:** `index.html:835` y `api/generate.js:17`

**Causa raíz:** El HTML permite ingresar valores fuera del rango válido sin feedback claro. El backend silenciosamente clampea a [3, 20] sin notificar al usuario que su valor fue ajustado.

**Fix:** Validar en el frontend (min=3, max=20) y mostrar feedback si el valor fue ajustado.

---

### BUG-08 — `buildCarouselHTML` lee `design` del scope global (acoplamiento implícito)

**Archivo:** `index.html:816`

**Causa raíz:** `buildCarouselHTML(slidesArr)` lee la variable global `design` en lugar de recibirla como parámetro. Esto es frágil: si `design` cambia de estado inesperadamente (e.g., entre generación y descarga), el resultado puede ser inconsistente.

**Fix (menor, refactor):** Convertir `buildCarouselHTML(slidesArr, designPalette = design)` para hacerlo explícito y testeable.

---

## Plan de Fixes por Agente

### Agente 1 — `agent:fix-numbers` (BUG-01 + BUG-06)
**Objetivo:** Corregir la numeración del fondo y la alternancia de temas en stats.

**Archivos a modificar:** `index.html`

**Cambios específicos:**
1. `index.html:729` — cambiar `String(contentN)` por `String(n)` en `slideContent`
2. `index.html:736` — actualizar slabel para mostrar la posición absoluta consistentemente
3. `index.html:753` — agregar parámetro `theme` a `slideStats` basado en posición `n`
4. `index.html:808` — pasar `n` a `slideStats` para alternancia de tema

**Criterio de éxito:** Un carrusel de 10 slides muestra bignum 01–08 secuencialmente (excluyendo cover y CTA). Las estadísticas alternan entre light/dark.

---

### Agente 2 — `agent:fix-pdf` (BUG-02 + BUG-03)
**Objetivo:** Que el PDF exporte con los colores correctos y manejar popup bloqueado.

**Archivos a modificar:** `index.html`, `template.html`

**Cambios específicos:**
1. `index.html:911–924` — agregar `print-color-adjust: exact` al bloque `printCSS`
2. `index.html:927` — agregar null-check para `win`
3. `template.html:19` — agregar `print-color-adjust: exact` al CSS `*` global (para descargas HTML)

**Criterio de éxito:** Al exportar PDF, las slides dark muestran fondo `#111a1b`, las coral muestran `#ff638f`, y la paleta personalizada de imagen se preserva.

---

### Agente 3 — `agent:fix-reliability` (BUG-05 + BUG-07 + BUG-08)
**Objetivo:** Mejorar la confiabilidad de la generación para carruseles grandes.

**Archivos a modificar:** `api/generate.js`, `index.html`

**Cambios específicos:**
1. `api/generate.js:171` — cambiar `max_tokens: 4096` por `max_tokens: 8096`
2. `index.html:835` — agregar validación y feedback de `slideCount` en el frontend
3. `index.html:802` — refactorizar `buildCarouselHTML` para recibir `design` como parámetro

**Criterio de éxito:** Un carrusel de 20 slides se genera sin errores de parseo. Si el usuario ingresa 25, ve un mensaje "máximo 20 slides" antes de llamar al backend.

---

### Agente 4 — `agent:fix-edits` (BUG-04)
**Objetivo:** Preservar las ediciones de texto al cambiar formato.

**Archivos a modificar:** `index.html`

**Cambios específicos:**
1. Antes de re-renderizar en `setFormat`, recorrer los elementos `.edit` del iframe y sincronizar su `textContent` con el array `slides`.
2. Mapear cada editable a su campo correspondiente en el objeto slide.

**Criterio de éxito:** Editar el headline de la cover, cambiar a 4:5, y que el texto editado se preserve.

---

## Orden de Ejecución Recomendado

```
1. agent:fix-numbers      — BUG-01, BUG-06    (impacto visual directo, sin riesgo)
2. agent:fix-pdf          — BUG-02, BUG-03    (impacto en exportación, sin riesgo)
3. agent:fix-reliability  — BUG-05, BUG-07    (mejora confiabilidad, bajo riesgo)
4. agent:fix-edits        — BUG-04            (UX improvement, requiere más cuidado)
```

---

## Mejoras Opcionales (Post-Fix)

- **Soporte para múltiples idiomas:** El system prompt está en español pero el contenido podría necesitar inglés para LinkedIn internacional.
- **Preview de paleta antes de generar:** Mostrar swatches de colores extraídos de la imagen antes de generar el carrusel completo.
- **Regenerar slide individual:** Permitir regenerar una sola slide sin rehacer todo el carrusel.
- **Contador de tokens / costo estimado:** Mostrar al usuario una estimación antes de generar.
- **Exportar slides individualmente:** Descargar cada slide como PNG usando `html2canvas`.
- **Undo/redo en edición:** Historial de cambios para los campos contenteditable.

---

## Comandos Útiles

```bash
# Desarrollo local con Vercel CLI
npx vercel dev

# Deploy a producción
npx vercel --prod

# Variable de entorno necesaria
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Notas de Sesión

- Bugs confirmados con lectura directa del código: BUG-01, BUG-02, BUG-03, BUG-05
- Bugs de baja prioridad: BUG-04 (edits), BUG-06 (stats theme), BUG-07 (validation), BUG-08 (refactor)
- El coral `#ff638f` es el color de marca y NUNCA debe modificarse
- `tplHTML` se cachea al iniciar la app vía `fetch('/template.html')` — cualquier cambio a template.html requiere refresh
