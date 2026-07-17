import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Set CORS headers for local development testing
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { brandId, updateText, contentType, language } = req.body || {};

  if (!brandId) {
    return res.status(400).json({ error: 'brandId is required' });
  }

  // Load API keys
  const geminiKey = process.env.GEMINI_API_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  let brandData = null;

  // 1. Fetch Brand Profile from Supabase (or mock if database is offline/testing)
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from('tv3_branding_intake')
        .select('*')
        .eq('id', brandId)
        .single();
      
      if (data) {
        brandData = data;
      } else if (error) {
        console.warn("Supabase fetch returned error, using fallback mockup:", error);
      }
    } catch (dbErr) {
      console.error("Database connection failed, using fallback:", dbErr);
    }
  }

  // Mock brand data fallback if not found in database (for fast developer test runs)
  if (!brandData) {
    brandData = {
      business_name: "TV³ Studios Pilot Node",
      plan: "Agency Plan",
      contact_email: "pilot@tvstudios.site",
      logo_details: "Minimalist black and gold visual lines",
      brand_colors: "#050505, #D4AF37, #FFFFFF",
      product_details: "AI-driven content scheduling, graphic design automation, and content workflow engines.",
      audience_details: "Creative agencies, content creators, and brand founders in India looking for daily growth.",
      payment_ref: "MOCK-PILOT-99",
      timestamp: new Date().toISOString()
    };
  }

  // 2. Prepare Gemini Prompt for NotebookLM-style dialogue
  const targetLanguage = language || "Hinglish"; // Hinglish (mix of Hindi & English) is default
  const selectedType = contentType || "Technical Share"; // Q&A, Technical Share, News, Achievement

  const promptText = `
You are PBI (Poster Boy AI), an autonomous content creation agentic brain.
Your goal is to design a high-converting, NotebookLM-style conversational Short/Reel script for the brand below, based on their latest update or milestone.

[BRAND PROFILE]
- Business Name: ${brandData.business_name}
- Product/Service: ${brandData.product_details}
- Target Audience: ${brandData.audience_details}
- Brand Colors: ${brandData.brand_colors}

[LATEST UPDATE / TOPIC]
- Update Text: ${updateText || "Introducing PBI (Poster Boy AI) autonomous content posting engine."}
- Content Category: ${selectedType}
- Target Script Language: ${targetLanguage}

[REEL STRUCTURING RULES]
1. Write a conversation between two hosts: Host A (analytical, friendly, starts the conversation with a hook) and Host B (creative, enthusiastic, explains the benefits).
2. The tone must be highly engaging, motivating, and fast-paced (aim for a total of 6-8 dialogue turns, under 45 seconds total reading time).
3. The script must be in ${targetLanguage}. If Hinglish, write Hindi words in English script (e.g. "Dost, kya tumne suna...", "bilkul sahi bola yaar").
4. For EACH line of dialogue, you must recommend a highly detailed visual image generation prompt that will be fed to Stable Diffusion to render the background. The visual prompt should look like high-quality photographic assets (e.g. "Cinematic shot of a designer studio, gold lighting, 8k resolution").
5. Write the reasoning behind your decisions (why you chose this hook, why this language tone works).

You must return your output ONLY as a JSON object matching this structure:
{
  "decisionLogic": "Brief explanation of the strategy behind this script.",
  "conversation": [
    {
      "host": "A",
      "dialogue": "Host A's dialogue line here...",
      "imagePrompt": "Detailed Stable Diffusion image generator prompt here..."
    },
    {
      "host": "B",
      "dialogue": "Host B's dialogue line here...",
      "imagePrompt": "Detailed Stable Diffusion image generator prompt here..."
    }
  ],
  "caption": "Social media description caption text with #hashtags matching the brand.",
  "languageUsed": "${targetLanguage}"
}
`;

  // 3. Trigger Gemini 1.5 Flash API with JSON Response Mode
  if (!geminiKey) {
    // Return mock successful script if key is not configured yet, so the user can test the pipeline UI without crashing
    const mockJson = {
      decisionLogic: "Choosing Hinglish for high relatability among young startup founders in India. Hooking with the stress of daily posting.",
      conversation: [
        {
          host: "A",
          dialogue: "Yaar, daily social media par post karna kitna bada headache hai na?",
          imagePrompt: "Close-up cinematic shot of a frustrated young entrepreneur looking at his phone, dark office background, warm gold lighting, photorealistic."
        },
        {
          host: "B",
          dialogue: "Bilkul sahi bola! Par ab TV³ Studios ne launch kiya hai PBI - Poster Boy AI. Jo automatically scripts likhta hai, graphics banata hai, aur schedule kar deta hai!",
          imagePrompt: "A sleek futuristic retro-CRT TV monitor glowing with gold graphics on screen, clean dark studio setting, neon yellow accents, 8k render."
        },
        {
          host: "A",
          dialogue: "Wait, so iska matlab content generation completely autopilot par?",
          imagePrompt: "Macro shot of mechanical gear wheels turning smoothly, golden gears, sparks flying, abstract business concept, dramatic lighting."
        },
        {
          host: "B",
          dialogue: "Yes! Hum just apni brand guidelines de dete hain aur PBI daily reels aur posts compile karke, diskord aprroval gate par bhej deta hai. Ek click me live!",
          imagePrompt: "Sleek hand holding a phone showing a green 'Approve Post' button, glowing neon borders, cinematic depth of field."
        }
      ],
      caption: "Daily posting ka headache ab khatam! Meet PBI — your brand's autonomous content autopublisher. 🎙️🔥 #PosterBoyAI #ContentAutomation #TV3Studios #AutopilotMarketing #StartupIndia",
      languageUsed: "Hinglish"
    };

    return res.status(200).json({
      success: true,
      data: mockJson,
      warning: "GEMINI_API_KEY environment variable is not configured. Returning simulated agent response."
    });
  }

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      return res.status(geminiResponse.status).json({
        error: `Gemini API call failed: ${errText}`
      });
    }

    const geminiData = await geminiResponse.json();
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return res.status(500).json({ error: "Gemini API returned an empty response." });
    }

    // Parse the JSON output returned by Gemini
    const parsedData = JSON.parse(responseText);

    return res.status(200).json({
      success: true,
      data: parsedData
    });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to compile script: ${err.message || err}`
    });
  }
}
