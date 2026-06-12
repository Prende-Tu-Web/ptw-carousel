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
          urlContext = `\n\nContenido de la pagina de referencia (${topic}):\n${text}`;
        } else {
          urlContext = `\n\nURL de referencia: ${topic}`;
        }
      } catch (e) {
        urlContext = `\n\nURL de referencia: ${topic}`;
      }
    } else {
      urlContext = `\n\nReferencia adicional: ${topic}`;
    }
  }

  const platName = platform === 'linkedin' ? 'LinkedIn' : 'Instagram';
  const withImage = !!(refImage && refMime);

  // Response format changes based on whether there is an image or not
  const responseFormat = withImage
    ? `RESPONDE UNICAMENTE con un objeto JSON valido con exactamente dos campos: "design" y "slides". Sin explicaciones, sin texto adicional, sin bloques de codigo markdown.

{
  "design": {
    "dark":  "#RRGGBB",
    "light": "#RRGGBB",
    "muted": "#RRGGBB"
  },
  "slides": [ ...array de ${n} slides... ]
}`
    : `RESPONDE UNICAMENTE con un JSON array valido. Sin explicaciones, sin texto adicional, sin bloques de codigo markdown.

[ ...array de ${n} slides... ]`;

  const systemPrompt = `Eres un experto en marketing digital y copywriting para ${platName}, especializado en contenido de alta conversion para la agencia chilena Prende Tu Web (PTW).

Tu tarea es generar el contenido para un carrusel de EXACTAMENTE ${n} slides.

${responseFormat}

El array de slides debe tener EXACTAMENTE ${n} elementos:

ELEMENTO 0 - type: "cover" (OBLIGATORIO):
{
  "type": "cover",
  "eyebrow": "categoria breve en mayusculas (2-5 palabras)",
  "headline": "titular impactante (max 9 palabras) con exactamente UNA [palabra] entre corchetes para destacar en coral",
  "sub": "subtitulo que amplia el titular (max 22 palabras)"
}

ELEMENTOS 1 a ${n - 2} - ${middleCount} slides de contenido:
Incluye exactamente ${statsCount} slide(s) tipo "stats" y ${contentCount} tipo "content".
Alterna los temas "light" y "dark" empezando con "light".

Tipo "content":
{
  "type": "content",
  "theme": "light",
  "tag": "Error 01 / Tip 01 / Paso 01 / Clave 01 (segun el tema)",
  "heading": "titulo directo y claro (max 8 palabras)",
  "body": "explicacion concreta y accionable (max 40 palabras)",
  "tip": "consejo especifico con <b>termino clave</b> en negrita - OPCIONAL, solo si aporta valor real"
}

Tipo "stats":
{
  "type": "stats",
  "tag": "En numeros / Datos clave / Lo que dicen los datos",
  "heading": "titular de las estadisticas (max 7 palabras)",
  "stats": [
    {"num": "75%",  "label": "descripcion concisa del dato (max 14 palabras)"},
    {"num": "3x",   "label": "descripcion concisa del dato (max 14 palabras)"},
    {"num": "53%",  "label": "descripcion concisa del dato (max 14 palabras)"},
    {"num": "0.8%", "label": "descripcion concisa del dato (max 14 palabras)"}
  ]
}

ELEMENTO ${n - 1} - type: "cta" (OBLIGATORIO):
{
  "type": "cta",
  "eyebrow": "llamada a la accion (2-5 palabras)",
  "headline": "propuesta de valor irresistible (max 8 palabras)",
  "sub": "descripcion del beneficio o la oferta (max 22 palabras)",
  "pill": "texto del boton CTA (3-6 palabras)",
  "handle": "@prendetuweb.cl"
}

${withImage ? `ANALISIS DE PALETA VISUAL (campo "design"):
El coral de la marca PTW (#ff638f) SIEMPRE se mantiene fijo, no lo incluyas.
Solo ajusta los fondos oscuro/claro y el tono del texto secundario segun los colores de la imagen.
- "dark"  -> muy oscuro, luminosidad < 12% (para texto blanco encima). Ej: #0d1117, #1a0f0a
- "light" -> muy claro, luminosidad > 90% (para texto oscuro encima). Ej: #f5f0e8, #eef2f8
- "muted" -> tono medio legible sobre "light". Usa la familia cromatica dominante de la imagen.
- Si la imagen es en blanco y negro: dark #111111, light #f5f5f5, muted #6b7077.

` : ''}REGLAS DE ESCRITURA:
- Tono: directo, cercano, empatico. Habla de tu. Sin tecnicismos innecesarios.
- Titulares: curiosidad, urgencia o beneficio claro. Faciles de entender a primera vista.
- Estadisticas: datos reales y verificables del sector digital/marketing.
- Chile-friendly: usa contexto o referencias chilenas cuando sea relevante.
- La [palabra] en corchetes de la portada debe ser la mas impactante del titular.
- El campo "tip" es OPCIONAL, incluyelo solo en algunos slides (no en todos).
- Plataforma: tono y CTA apropiados para ${platName}.
- JSON valido: si citas o enfatizas palabras en el texto, usa comillas simples ('word') o guillemets («word»), NUNCA comillas dobles que rompen el JSON.`;

  const userContent = [];

  if (withImage) {
    userContent.push({
      type: 'image',
      source: { type: 'base64', media_type: refMime, data: refImage }
    });
    userContent.push({
      type: 'text',
      text: `Analiza esta imagen: extrae su paleta cromatica dominante para el campo "design", y adapta el tono/estilo del contenido segun lo que transmite.\n\nGenera el carrusel sobre: ${prompt}${urlContext}`
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
        max_tokens: 8096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: 'Error de API Anthropic', detail: errText });
    }

    const data = await response.json();

    // Guard against empty or unexpected response structure
    if (!data.content || !data.content[0] || data.content[0].type !== 'text') {
      return res.status(500).json({
        error: 'Respuesta vacia del modelo',
        detail: `stop_reason: ${data.stop_reason} | content: ${JSON.stringify(data.content)}`
      });
    }

    const rawText = data.content[0].text.trim();

    // Strip markdown code fences
    const clean = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    // Repair unescaped double quotes inside JSON string values.
    // Claude sometimes writes: "heading": "text with "quotes" inside"
    // which is invalid JSON. This state-machine escapes those quotes.
    function repairJSON(json) {
      let out = '', inStr = false, i = 0;
      while (i < json.length) {
        const c = json[i];
        if (c === '\\' && inStr) { out += c + (json[i + 1] || ''); i += 2; continue; }
        if (c === '"') {
          if (!inStr) { inStr = true; out += c; }
          else {
            let j = i + 1;
            while (j < json.length && (json[j] === ' ' || json[j] === '\n' || json[j] === '\r' || json[j] === '\t')) j++;
            const next = json[j];
            if (!next || next === ':' || next === ',' || next === '}' || next === ']') {
              inStr = false; out += c;
            } else { out += '\\"'; }
          }
        } else { out += c; }
        i++;
      }
      return out;
    }

    // Parse response — object format when image, array format otherwise
    try {
      if (withImage) {
        const objMatch = clean.match(/\{[\s\S]*\}/);
        if (objMatch) {
          const parsed = JSON.parse(repairJSON(objMatch[0]));
          if (Array.isArray(parsed.slides) && parsed.slides.length >= 2) {
            return res.status(200).json({ slides: parsed.slides, design: parsed.design || null });
          }
        }
      }

      // Array format (no image, or object parse fallback)
      const arrMatch = clean.match(/\[[\s\S]*\]/);
      if (!arrMatch) {
        return res.status(500).json({
          error: 'JSON no encontrado en la respuesta',
          detail: rawText.slice(0, 400)
        });
      }

      const slides = JSON.parse(repairJSON(arrMatch[0]));
      if (!Array.isArray(slides) || slides.length < 2) {
        return res.status(500).json({
          error: 'Array de slides invalido o vacio',
          detail: rawText.slice(0, 400)
        });
      }

      return res.status(200).json({ slides, design: null });

    } catch (parseErr) {
      return res.status(500).json({
        error: 'Error al parsear JSON del modelo',
        detail: parseErr.message + ' — respuesta: ' + rawText.slice(0, 400)
      });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Error interno del servidor', detail: err.message });
  }
}
