export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, platform, topic, slideCount, refImage, refMime } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt requerido' });
  }

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) {
    return res.status(500).json({ error: 'API key no configurada' });
  }

  const n = Math.max(3, Math.min(20, parseInt(slideCount) || 7));
  const middleCount = n - 2;
  const statsCount = Math.max(1, Math.floor(middleCount / 3));
  const contentCount = middleCount - statsCount;

  // Fetch URL content server-side if provided
  let urlContext = '';
  if (topic) {
    if (topic.startsWith('http://') || topic.startsWith('https://')) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const urlRes = await fetch(topic, {
          signal: controller.signal,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PTWBot/1.0)' }
        });
        clearTimeout(timeoutId);
        if (urlRes.ok) {
          const htmlText = await urlRes.text();
          const text = htmlText
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 2500);
          urlContext = `\n\nContenido de la página de referencia (${topic}):\n${text}`;
        } else {
          urlContext = `\n\nURL de referencia: ${topic}`;
        }
      } catch {
        urlContext = `\n\nURL de referencia: ${topic}`;
      }
    } else {
      urlContext = `\n\nReferencia adicional: ${topic}`;
    }
  }

  const platName = platform === 'linkedin' ? 'LinkedIn' : 'Instagram';

  const systemPrompt = `Eres un experto en marketing digital y copywriting para ${platName}, especializado en contenido de alta conversión para la agencia chilena Prende Tu Web (PTW).

Tu tarea es generar el contenido para un carrusel de EXACTAMENTE ${n} slides.

RESPONDE ÚNICAMENTE con un JSON array válido. Sin explicaciones, sin texto adicional, sin bloques de código markdown.

El array debe tener EXACTAMENTE ${n} elementos:

━━━ ELEMENTO 0 — type: "cover" (OBLIGATORIO) ━━━
{
  "type": "cover",
  "eyebrow": "categoría breve en mayúsculas (2-5 palabras)",
  "headline": "titular impactante (máx 9 palabras) con exactamente UNA [palabra] entre corchetes para destacar en coral",
  "sub": "subtítulo que amplía el titular (máx 22 palabras)"
}

━━━ ELEMENTOS 1 a ${n - 2} — ${middleCount} slides de contenido ━━━
Incluye exactamente ${statsCount} slide(s) tipo "stats" y ${contentCount} tipo "content".
Alterna los temas "light" y "dark" empezando con "light".

Tipo "content":
{
  "type": "content",
  "theme": "light",
  "tag": "Error 01 / Tip 01 / Paso 01 / Clave 01 (según el tema)",
  "heading": "título directo y claro (máx 8 palabras)",
  "body": "explicación concreta y accionable (máx 40 palabras)",
  "tip": "consejo específico con <b>término clave</b> en negrita — OPCIONAL, solo si aporta valor real"
}

Tipo "stats":
{
  "type": "stats",
  "tag": "En números / Datos clave / Lo que dicen los datos",
  "heading": "titular de las estadísticas (máx 7 palabras)",
  "stats": [
    {"num": "75%",  "label": "descripción concisa del dato (máx 14 palabras)"},
    {"num": "3×",   "label": "descripción concisa del dato (máx 14 palabras)"},
    {"num": "53%",  "label": "descripción concisa del dato (máx 14 palabras)"},
    {"num": "0.8%", "label": "descripción concisa del dato (máx 14 palabras)"}
  ]
}

━━━ ELEMENTO ${n - 1} — type: "cta" (OBLIGATORIO) ━━━
{
  "type": "cta",
  "eyebrow": "llamada a la acción (2-5 palabras)",
  "headline": "propuesta de valor irresistible (máx 8 palabras)",
  "sub": "descripción del beneficio o la oferta (máx 22 palabras)",
  "pill": "texto del botón CTA (3-6 palabras)",
  "handle": "@prendetuweb.cl"
}

REGLAS DE ESCRITURA:
• Tono: directo, cercano, empático. Habla de tú. Sin tecnicismos innecesarios.
• Titulares: curiosidad, urgencia o beneficio claro. Fáciles de entender a primera vista.
• Estadísticas: datos reales y verificables del sector digital/marketing.
• Chile-friendly: usa contexto o referencias chilenas cuando sea relevante.
• La [palabra] en corchetes de la portada debe ser la más impactante del titular.
• El campo "tip" es OPCIONAL — inclúyelo solo en algunos slides (no en todos).
• Plataforma: tono y CTA apropiados para ${platName}.`;

  // When image is provided, add design palette analysis to the prompt
  const designPrompt = refImage ? `

━━━ ANÁLISIS DE PALETA VISUAL (solo cuando hay imagen) ━━━
Además del array de slides, devuelve un campo "design" con una paleta inspirada en los colores de la imagen.
El coral de la marca PTW (#ff638f) SIEMPRE se mantiene fijo — NO lo incluyas en design.
Solo ajusta los fondos oscuro/claro y el tono del texto secundario.

FORMATO DE RESPUESTA (objeto JSON con dos campos):
{
  "design": {
    "dark":  "#RRGGBB",
    "light": "#RRGGBB",
    "muted": "#RRGGBB"
  },
  "slides": [ ...array de ${n} slides... ]
}

REGLAS DE CONTRASTE (obligatorio):
• "dark"  → muy oscuro, luminosidad < 12% (para texto blanco encima). Ej: #0d1117, #1a0f0a, #0a1218
• "light" → muy claro, luminosidad > 90% (para texto oscuro encima). Ej: #f5f0e8, #eef2f8, #f2f5ef
• "muted" → legible sobre "light", contraste ≥ 3:1. Tonos medios con el color dominante de la imagen.
• Extrae la familia cromática dominante y aplícala en versiones extremas (muy oscuro + muy claro).
• Si la imagen es en blanco y negro, usa grises neutros: dark #111111, light #f5f5f5, muted #6b7077.` : '';

  const fullSystemPrompt = systemPrompt + designPrompt;

  const userContent = [];

  if (refImage && refMime) {
    userContent.push({
      type: 'image',
      source: { type: 'base64', media_type: refMime, data: refImage }
    });
    userContent.push({
      type: 'text',
      text: `Analiza esta imagen: extrae su paleta cromática dominante para el campo "design", y adapta el tono/estilo/enfoque del contenido de los slides según lo que transmite.\n\nGenera el carrusel sobre: ${prompt}${urlContext}`
    });
  } else {
    userContent.push({
      type: 'text',
      text: `Genera el carrusel sobre: ${prompt}${urlContext}`
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: fullSystemPrompt,
        messages: [{ role: 'user', content: userContent }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: 'Error de API Anthropic', detail: errText });
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();

    // Strip markdown code fences
    let clean = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    let slides, design;

    // When image was provided, expect { design: {...}, slides: [...] }
    // Otherwise expect [...] array directly
    if (refImage) {
      const objMatch = clean.match(/\{[\s\S]*\}/);
      if (objMatch) {
        const parsed = JSON.parse(objMatch[0]);
        slides = parsed.slides;
        design = parsed.design || null;
      }
    }

    // Fallback: extract array directly (no image case, or object parse failed)
    if (!Array.isArray(slides)) {
      const arrMatch = clean.match(/\[[\s\S]*\]/);
      if (!arrMatch) {
        return res.status(500).json({
          error: 'El modelo no devolvió JSON válido',
          detail: rawText.slice(0, 300)
        });
      }
      slides = JSON.parse(arrMatch[0]);
      design = null;
    }

    if (!Array.isArray(slides) || slides.length < 2) {
      return res.status(500).json({ error: 'Array de slides inválido o vacío' });
    }

    return res.status(200).json({ slides, design: design || null });

  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor', detail: err.message });
  }
}
