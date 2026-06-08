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
  const contentSlides = n - 2; // excluding cover (slide1) and CTA (last)

  // Build the dynamic middle slides schema description
  const middleSchema = [];
  for (let i = 2; i <= n - 1; i++) {
    const idx = i - 1; // content index (1-based)
    if (idx % 4 === 0) {
      // Stats slide every 4th content slide
      middleSchema.push(`  "slide${i}": {
    "tag": "En números / Datos clave / etc",
    "heading": "Título de la sección de estadísticas",
    "stats": [
      { "num": "75%", "label": "descripción del dato" },
      { "num": "3×",  "label": "descripción del dato" },
      { "num": "53%", "label": "descripción del dato" },
      { "num": "0.8%","label": "descripción del dato" }
    ]
  }`);
    } else {
      const hasTip = (idx % 3 === 1 || idx % 3 === 0);
      middleSchema.push(`  "slide${i}": {
    "tag": "Error ${String(idx).padStart(2,'0')} / Tip ${String(idx).padStart(2,'0')} / etc",
    "heading": "Título del slide",
    "body": "Cuerpo del slide (máximo 40 palabras)"${hasTip ? `,
    "tip": "Tip accionable con <b>palabra clave</b> destacada (solo en algunos slides, omite si no aplica)"` : ''}
  }`);
    }
  }

  const systemPrompt = `Eres un experto en marketing digital y copywriting para redes sociales, especializado en crear carruseles para ${platform === 'linkedin' ? 'LinkedIn' : 'Instagram'} para la agencia chilena Prende Tu Web (PTW).

Tu tarea es generar el contenido para un carrusel de exactamente ${n} slides.

ESTRUCTURA DEL CARRUSEL (${n} slides):
- slide1: Portada (cover oscura) — eyebrow + titular impactante con una palabra clave destacada entre [corchetes] + subtítulo
- slide2 a slide${n-1}: Slides de contenido — tag + heading + body + opcionalmente tip o stats
- slide${n}: CTA coral — eyebrow + headline + sub + pill + handle

REGLAS DE ESCRITURA:
- Tono: directo, cercano, sin tecnicismos innecesarios. Habla de tú.
- Titulares: máximo 8 palabras, impactantes
- Cuerpo: máximo 40 palabras por slide, concreto y accionable
- Tips: una acción específica y fácil de implementar
- Estadísticas: datos reales y verificables del sector digital/marketing
- Chile-friendly: puedes mencionar contexto chileno cuando sea relevante
- La palabra destacada en el titular de portada (slide1) debe ir entre [corchetes]
- Aproximadamente cada 3-4 slides de contenido incluye un slide de estadísticas con 4 datos numéricos
- El campo "tip" es opcional — inclúyelo solo cuando aporte valor real, no en todos los slides

RESPONDE ÚNICAMENTE con un JSON válido sin explicaciones ni texto adicional:

{
  "slide1": {
    "eyebrow": "texto del eyebrow",
    "headline": "titular con [palabra] destacada",
    "sub": "subtítulo descriptivo"
  },
${middleSchema.join(',\n')},
  "slide${n}": {
    "eyebrow": "llamada a la acción eyebrow",
    "headline": "Titular del CTA",
    "sub": "Descripción de la oferta o acción",
    "pill": "texto del botón",
    "handle": "@prendetuweb.cl"
  }
}`;

  // Build messages array — include reference image if provided
  const userContent = [];

  if (refImage && refMime) {
    userContent.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: refMime,
        data: refImage
      }
    });
    userContent.push({
      type: 'text',
      text: `Esta es una imagen de referencia. Analiza su estilo, tono y enfoque para informar el contenido del carrusel — adapta el nivel de formalidad, el ángulo narrativo y el vocabulario según lo que transmite la imagen.\n\nGenera el carrusel sobre: ${prompt}${topic ? `. Tema específico: ${topic}` : ''}`
    });
  } else {
    userContent.push({
      type: 'text',
      text: `Genera el contenido del carrusel sobre: ${prompt}${topic ? `. Tema específico: ${topic}` : ''}`
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
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userContent }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Error de API', detail: err });
    }

    const data = await response.json();
    const text = data.content[0].text.trim();

    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const slides = JSON.parse(clean);

    return res.status(200).json({ slides });

  } catch (err) {
    return res.status(500).json({ error: 'Error interno', detail: err.message });
  }
}
