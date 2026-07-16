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

  const { to, subject, body } = req.body || {};

  if (!subject || !body) {
    return res.status(400).json({ error: 'Subject and body are required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'RESEND_API_KEY environment variable is not configured on Vercel.' 
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'TV3 Studios <onboarding@resend.dev>',
        to: to || 'tv3studios@gmail.com',
        subject: subject,
        text: body
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: `Failed to send email via Resend: ${errorText}` 
      });
    }

    const data = await response.json();

    // Forward notification to Discord Webhook if configured
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl) {
      try {
        await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📡 **TV³ Ingestion Node Alert** 📡\n\n**Subject:** ${subject}\n\n**Details:**\n\`\`\`\n${body}\n\`\`\``
          })
        });
      } catch (discordErr) {
        console.error("Failed to forward alert to Discord webhook:", discordErr);
      }
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
