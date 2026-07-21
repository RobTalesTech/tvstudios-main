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

  const enrichConversation = (conv, lang) => {
    if (!Array.isArray(conv)) return conv;
    return conv.map((line) => {
      const seed = Math.floor(Math.random() * 1000000);
      return {
        ...line,
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(line.imagePrompt)}?width=1080&height=1920&nologo=true&private=true&seed=${seed}&model=flux`,
        audioUrl: `/api/pbi/tts?host=${line.host}&lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(line.dialogue)}`
      };
    });
  };

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

  // 2. Prepare Gemini Prompt based on contentType
  const targetLanguage = language || "Hinglish"; 
  const selectedType = contentType || "Podcast Reel (Video)"; 

  const isPhotoPost = selectedType === "Branded Photo Post";
  let promptText = "";

  const SCENE_TYPES = [
    { 
      type: "Product Showcase & Hardware Focus", 
      promptGuidance: "High-end cinematic product showcase on a sleek pedestal, luxury studio lighting, shallow depth of field, photorealistic 8k render. Focus on hardware texture, metallic finish, and brand color accents." 
    },
    { 
      type: "Lifestyle & Human Context", 
      promptGuidance: "Authentic realistic lifestyle photography of a creative founder or customer in a modern studio space, warm atmospheric lighting, candid shot, professional depth of field, 8k camera detail." 
    },
    { 
      type: "Quote Card & Abstract Geometry", 
      promptGuidance: "Sleek 3D geometric abstract architectural textures, dark metallic surface, minimal high-contrast composition, subtle brand color lighting line accents, vector geometry render." 
    },
    { 
      type: "Behind-the-Scenes & Studio Mood", 
      promptGuidance: "Cinematic behind-the-scenes shot of a designer studio desk, workstation, creative tools, monitors with glowing code/design UI, warm moody ambient studio lighting, 8k photo." 
    }
  ];

  const randomSceneIndex = Math.floor(Math.random() * SCENE_TYPES.length);
  const selectedScene = SCENE_TYPES[randomSceneIndex];

  if (isPhotoPost) {
    promptText = `
You are PBI (Poster Boy AI), an autonomous content creation agentic brain.
Your goal is to design a high-converting, highly professional Branded Photo Post (Graphic Image design + Description Caption) for the brand below, based on their latest update or milestone.

[BRAND PROFILE]
- Business Name: ${brandData.business_name}
- Product/Service: ${brandData.product_details}
- Target Audience: ${brandData.audience_details}
- Brand Colors: ${brandData.brand_colors}

[LATEST UPDATE / TOPIC]
- Update Text: ${updateText || "Introducing PBI (Poster Boy AI) autonomous content posting engine."}
- Target Language: ${targetLanguage}

[MANDATORY TOPIC & SCENE VISUAL INTEGRATION]
- Scene Style Type: ${selectedScene.type}
- Visual Guidance: ${selectedScene.promptGuidance}
- CRITICAL VISUAL RULE: You MUST design the imagePrompt specifically to visually illustrate the topic/update (${updateText}) for ${brandData.business_name}.
- Examples: If the topic is about beverages/food, depict fresh ingredients and luxury packaging. If about software/AI, depict glowing modern UI screens. If about growth/awards, depict high-end trophies or studio milestones.
- DO NOT generate generic abstract marble backgrounds unless the topic is specifically about marble! Add photorealistic details: "photorealistic 8k, sharp focus, studio lighting". No text on the image itself.

[PHOTO POST STRUCTURING RULES]
1. Recommend a highly detailed visual image generation prompt (imagePrompt) matching the topic (${updateText}) and required Scene Style (${selectedScene.type}).
2. Write a short, highly-aesthetic Title (title) of 3-5 words max (e.g., "WE ARE GROWING", "I AM HERE TO POST FOR YOU.", "NEW LAUNCH").
3. Write a sub-headline Tagline (tagline) of 5-8 words max (e.g., "Coming soon to post for you.", "Zero-stress daily marketing channels").
4. Write a structured social media description caption (caption) with matching #hashtags matching the brand.

You must return your output ONLY as a JSON object matching this structure:
{
  "contentType": "Branded Photo Post",
  "decisionLogic": "Brief explanation of why this ${selectedScene.type} design choice was selected for ${updateText}.",
  "sceneType": "${selectedScene.type}",
  "imagePrompt": "Detailed Flux image generator prompt here...",
  "title": "Aesthetic Overlay Title",
  "tagline": "Aesthetic Overlay Subheadline Tagline",
  "caption": "Social media description caption text with #hashtags matching the brand.",
  "languageUsed": "${targetLanguage}"
}
`;
  } else {
    promptText = `
You are PBI (Poster Boy AI), an autonomous content creation agentic brain.
Your goal is to design a high-converting, NotebookLM-style conversational Short/Reel script for the brand below, based on their latest update or milestone.

[BRAND PROFILE]
- Business Name: ${brandData.business_name}
- Product/Service: ${brandData.product_details}
- Target Audience: ${brandData.audience_details}
- Brand Colors: ${brandData.brand_colors}

[LATEST UPDATE / TOPIC]
- Update Text: ${updateText || "Introducing PBI (Poster Boy AI) autonomous content posting engine."}
- Target Script Language: ${targetLanguage}

[REEL STRUCTURING RULES]
1. Write a conversation between two hosts: Host A (analytical, friendly, starts the conversation with a hook) and Host B (creative, enthusiastic, explains the benefits).
2. The tone must be highly engaging, motivating, and fast-paced (aim for a total of 4-6 dialogue turns, under 30 seconds total reading time).
3. The script must be in ${targetLanguage}. If Hinglish, write Hindi words in English script (e.g. "Dost, kya tumne suna...", "bilkul sahi bola yaar").
4. For EACH line of dialogue, you must recommend a highly detailed visual image generation prompt that will be fed to Stable Diffusion to render the background. The visual prompt should look like high-quality photographic assets (e.g. "Cinematic shot of a designer studio, gold lighting, 8k resolution").
5. Write the reasoning behind your decisions (why you chose this hook, why this language tone works).

You must return your output ONLY as a JSON object matching this structure:
{
  "contentType": "Podcast Reel (Video)",
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
  }

  // 3. Trigger Gemini 1.5 Flash API with JSON Response Mode
  if (!geminiKey) {
    let mockJson = {};
    if (isPhotoPost) {
      const seed = Math.floor(Math.random() * 1000000);
      const topicSubject = updateText && updateText.trim().length > 3 
        ? updateText 
        : `innovative update for ${brandData.business_name}`;

      const mockPrompts = [
        `High-end cinematic photography illustrating ${topicSubject} for ${brandData.business_name}, luxury studio ambient lighting, sharp focus, 8k photorealistic render`,
        `Authentic realistic lifestyle photography depicting ${topicSubject} at ${brandData.business_name}, warm atmospheric lighting, shallow depth of field, 8k camera detail`,
        `Modern sleek promotional graphic banner for ${topicSubject}, crisp geometry, rich textures, high-contrast composition, 8k render`,
        `Cinematic behind-the-scenes photography depicting ${topicSubject} work at ${brandData.business_name}, moody ambient lighting, 8k camera detail`
      ];
      const selectedPrompt = mockPrompts[randomSceneIndex];
      const fullPrompt = `${selectedPrompt}, ultra-detailed, photorealistic 8k, sharp focus, professional studio photography, award-winning lighting`;

      mockJson = {
        contentType: "Branded Photo Post",
        decisionLogic: `Designing a ${selectedScene.type} post for ${brandData.business_name} focused on ${topicSubject}.`,
        sceneType: selectedScene.type,
        imagePrompt: selectedPrompt,
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1280&height=1280&nologo=true&private=true&enhance=true&seed=${seed}&model=flux`,
        title: "I AM HERE TO POST FOR YOU.",
        tagline: "Coming soon to post for you.",
        caption: `Daily social posting ka stress ab humesha ke liye khatam! 🚀 Custom graphics and content captions tailored for ${brandData.business_name}, generated and published automatically. Connect today! #BrandedContent #${brandData.business_name.replace(/\s+/g, "")} #TV3Studios #PosterBoyAI`,
        languageUsed: targetLanguage
      };
    } else {
      mockJson = {
        contentType: "Podcast Reel (Video)",
        decisionLogic: "Choosing Hinglish for high relatability. Hooking with daily posting struggles.",
        conversation: [
          {
            host: "A",
            dialogue: "Yaar, daily social media par post karna kitna bada headache hai na?",
            imagePrompt: "Close-up cinematic shot of a frustrated young entrepreneur looking at his phone, dark office background, warm gold lighting, photorealistic."
          },
          {
            host: "B",
            dialogue: "Bilkul sahi bola! Par ab TV³ Studios ne launch kiya hai PBI - Poster Boy AI. Jo automatically scripts aur graphics banata hai!",
            imagePrompt: "A sleek futuristic retro-CRT TV monitor glowing with gold graphics on screen, clean dark studio setting, neon yellow accents, 8k render."
          },
          {
            host: "A",
            dialogue: "Wait, so iska matlab content generation completely autopilot par?",
            imagePrompt: "Macro shot of mechanical gear wheels turning smoothly, golden gears, sparks flying, abstract business concept, dramatic lighting."
          },
          {
            host: "B",
            dialogue: "Yes! Hum just apni brand guidelines de dete hain aur PBI daily posts compile karke, diskord aprroval gate par bhej deta hai. Ek click me live!",
            imagePrompt: "Sleek hand holding a phone showing a green 'Approve Post' button, glowing neon borders, cinematic depth of field."
          }
        ],
        caption: "Daily posting ka headache ab khatam! Meet PBI — your brand's autonomous content autopublisher. 🎙️🔥 #PosterBoyAI #ContentAutomation #TV3Studios #AutopilotMarketing #StartupIndia",
        languageUsed: "Hinglish"
      };
      mockJson.conversation = enrichConversation(mockJson.conversation, mockJson.languageUsed);
    }

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

    const parsedData = JSON.parse(responseText);
    
    if (isPhotoPost) {
      const seed = Math.floor(Math.random() * 1000000);
      const fullPrompt = `${parsedData.imagePrompt}, ultra-detailed, photorealistic 8k, sharp focus, professional studio photography, award-winning lighting`;
      parsedData.imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1280&height=1280&nologo=true&private=true&enhance=true&seed=${seed}&model=flux`;
    } else {
      parsedData.conversation = enrichConversation(parsedData.conversation, parsedData.languageUsed || targetLanguage);
    }

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
