export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, platform, topic } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt requerido' });
  }

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) {
    return res.status(500).json({ error: 'API key no configurada' });
  }

  const systemPrompt = `Eres un experto en marketing digital y copywriting para redes sociales, especializado en crear carruseles para ${platform === 'linkedin' ? 'LinkedIn' : 'Instagram'} para la agencia chilena Prende Tu Web (PTW).

Tu tarea es generar el contenido para un carrusel de 7 slides basado en el tema o prompt del usuario.

ESTRUCTURA FIJA DEL CARRUSEL:
- Slide 1: Portada (cover oscura) — eyebrow + titular impactante con una palabra clave destacada + subtítulo
- Slide 2: Contenido 1 (fondo claro) — tag + título + cuerpo + tip accionable
- Slide 3: Contenido 2 (fondo oscuro, tiene mockup de teléfono) — tag + título + cuerpo
- Slide 4: Estadísticas (fondo claro) — tag + título + 4 datos con número y descripción
- Slide 5: Contenido 4 (fondo claro, tiene mockup de dashboard) — tag + título + cuerpo
- Slide 6: Contenido 5 (fondo oscuro) — tag + título + cuerpo + tip accionable
- Slide 7: CTA coral — eyebrow + titular + subtítulo + texto del botón + handle

REGLAS DE ESCRITURA:
- Tono: directo, cercano, sin tecnicismos innecesarios. Habla de tú.
- Titulares: máximo 8 palabras, impactantes, con una palabra clave importante
- Cuerpo: máximo 40 palabras por slide, concreto y accionable
- Tips: una acción específica y fácil de implementar
- Estadísticas: datos reales y verificables del sector digital/marketing
- Chile-friendly: puedes mencionar contexto chileno cuando sea relevante
- La palabra destacada en el titular de portada (slide 1) debe ir entre corchetes: [palabra]

RESPONDE ÚNICAMENTE con un JSON válido con esta estructura exacta, sin explicaciones ni texto adicional:

{
  "slide1": {
    "eyebrow": "texto del eyebrow",
    "headline": "titular con [palabra] destacada",
    "sub": "subtítulo descriptivo"
  },
  "slide2": {
    "tag": "Error 01 / Tip 01 / etc",
    "heading": "Título del slide",
    "body": "Cuerpo del slide",
    "tip": "Tip accionable con <b>palabra clave</b> destacada"
  },
  "slide3": {
    "tag": "Error 02 / Tip 02 / etc",
    "heading": "Título del slide",
    "body": "Cuerpo del slide"
  },
  "slide4": {
    "tag": "En números / Datos clave / etc",
    "heading": "Título de la sección de stats",
    "stats": [
      { "num": "75%", "label": "descripción del dato" },
      { "num": "3×",  "label": "descripción del dato" },
      { "num": "53%", "label": "descripción del dato" },
      { "num": "0.8%","label": "descripción del dato" }
    ]
  },
  "slide5": {
    "tag": "Error 04 / Tip 04 / etc",
    "heading": "Título del slide",
    "body": "Cuerpo del slide"
  },
  "slide6": {
    "tag": "Error 05 / Tip 05 / etc",
    "heading": "Título del slide",
    "body": "Cuerpo del slide",
    "tip": "Tip accionable con <b>palabra clave</b> destacada"
  },
  "slide7": {
    "eyebrow": "llamada a la acción eyebrow",
    "headline": "Titular del CTA",
    "sub": "Descripción de la oferta o acción",
    "pill": "texto del botón",
    "handle": "@prendetuweb.cl"
  }
}`;

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
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Genera el contenido del carrusel sobre: ${prompt}${topic ? `. Tema específico: ${topic}` : ''}`
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Error de API', detail: err });
    }

    const data = await response.json();
    const text = data.content[0].text.trim();

    // Parse JSON — strip markdown fences if present
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const slides = JSON.parse(clean);

    return res.status(200).json({ slides });

  } catch (err) {
    return res.status(500).json({ error: 'Error interno', detail: err.message });
  }
}
