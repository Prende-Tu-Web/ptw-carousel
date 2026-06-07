# PTW Carousel — Generador de Carruseles

Generador interno de carruseles para Instagram y LinkedIn de Prende Tu Web.

## Archivos

```
ptw-carousel/
  ├── index.html       → App principal (frontend)
  ├── template.html    → Master template del carrusel (generado en Claude Design)
  ├── vercel.json      → Configuración de Vercel
  └── api/
      └── generate.js  → Endpoint seguro que llama a Claude API
```

## Setup en Vercel

1. Conecta este repo en vercel.com
2. En Settings → Environment Variables agrega:
   - `ANTHROPIC_API_KEY` = tu API key de Anthropic
3. Deploy

## Uso

1. Escribe el tema del carrusel
2. Elige plataforma (Instagram o LinkedIn)
3. Click en "Generar carrusel"
4. Revisa el preview y descarga el HTML
