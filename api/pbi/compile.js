export default async function handler(req, res) {
  // Set CORS headers for local development testing
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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

  const { businessName, conversation, caption } = req.body || {};

  if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {
    return res.status(400).json({ error: 'conversation array is required and cannot be empty' });
  }

  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    console.warn("GITHUB_TOKEN environment variable is missing. Running in simulation mode.");
    return res.status(200).json({
      success: true,
      simulation: true,
      message: "GITHUB_TOKEN is not configured. Running compiler in sandbox mode. Output video simulated successfully."
    });
  }

  try {
    const dispatchUrl = 'https://api.github.com/repos/RobTalesTech/tvstudios-main/dispatches';
    
    const githubResponse = await fetch(dispatchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${githubToken}`,
        'User-Agent': 'Vercel-Serverless-Agent'
      },
      body: JSON.stringify({
        event_type: 'compile_pbi_reel',
        client_payload: {
          businessName: businessName || 'PBI Brand Node',
          conversation: conversation,
          caption: caption || ''
        }
      })
    });

    if (!githubResponse.ok) {
      const errText = await githubResponse.text();
      throw new Error(`GitHub Repository Dispatch failed with status ${githubResponse.status}: ${errText}`);
    }

    return res.status(200).json({
      success: true,
      simulation: false,
      message: "PBI Video Compiler Node successfully triggered. Your vertical reel is compiling in the background and will appear in Discord shortly!"
    });
  } catch (err) {
    console.error("Video compiler dispatch error:", err);
    return res.status(500).json({ error: err.message || 'Failed to dispatch compilation job' });
  }
}
