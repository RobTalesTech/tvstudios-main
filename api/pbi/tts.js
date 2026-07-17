export default async function handler(req, res) {
  // Set CORS headers for local development testing
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { text, host, lang } = req.query || {};

  if (!text) {
    return res.status(400).json({ error: 'Text parameter is required' });
  }

  // Choose accent based on language and host
  // Host A gets en-IN (Indian English) or hi-IN
  // Host B gets en-US (US English) or hi-IN with alternate speech agent parameters if possible
  let ttsLang = 'hi-in'; // default to Indian Hindi for Hinglish
  if (lang === 'English') {
    ttsLang = host === 'A' ? 'en-in' : 'en-us';
  } else if (lang === 'Hindi') {
    ttsLang = 'hi-in';
  } else {
    // Hinglish: Host A speaks with en-in accent, Host B speaks with hi-in accent for variation
    ttsLang = host === 'A' ? 'en-in' : 'hi-in';
  }

  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${ttsLang}&client=tw-ob&q=${encodeURIComponent(text)}`;

  try {
    const ttsResponse = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
      }
    });

    if (!ttsResponse.ok) {
      throw new Error(`Google TTS request failed with status: ${ttsResponse.status}`);
    }

    const arrayBuffer = await ttsResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache audio for 24h
    return res.send(buffer);
  } catch (err) {
    console.error("TTS stream error:", err);
    return res.status(500).json({ error: err.message || 'Failed to synthesize speech' });
  }
}
