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

  const { 
    to, 
    replyTo, 
    subject, 
    body, 
    clientEmail, 
    clientSubject, 
    clientBody 
  } = req.body || {};

  if (!subject || !body) {
    return res.status(400).json({ error: 'Subject and body are required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'RESEND_API_KEY environment variable is not configured on Vercel.' 
    });
  }

  // Detect sandbox sender vs custom domain sender
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'TV3 Studios <onboarding@resend.dev>';
  const isSandbox = fromEmail.includes('onboarding@resend.dev');

  // Configure custom recipient email to hide tv3studios@gmail.com if desired
  const defaultToEmail = process.env.RESEND_TO_EMAIL || 'tv3studios@gmail.com';

  try {
    // 1. Send the primary notification email to admin
    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: to || defaultToEmail,
        reply_to: replyTo || undefined,
        subject: subject,
        text: body
      })
    });

    if (!adminResponse.ok) {
      const errorText = await adminResponse.text();
      return res.status(adminResponse.status).json({ 
        error: `Failed to send admin notification email: ${errorText}` 
      });
    }

    const adminData = await adminResponse.json();
    let clientData = null;
    let clientMailWarning = null;

    // 2. If clientEmail is provided, attempt to send a friendly welcome receipt to the client
    if (clientEmail && clientSubject && clientBody) {
      if (isSandbox) {
        // Skip sending in Sandbox mode to prevent Resend API 403 blocks, but log a helpful warning
        clientMailWarning = "Skipped client confirmation email because Resend is in Sandbox mode. Set up a custom domain in Vercel to unlock client receipt delivery.";
        console.warn(clientMailWarning);
      } else {
        // Send email confirmation directly to client using verified custom domain
        try {
          const clientResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              from: fromEmail,
              to: clientEmail,
              reply_to: defaultToEmail,
              subject: clientSubject,
              text: clientBody
            })
          });

          if (clientResponse.ok) {
            clientData = await clientResponse.json();
          } else {
            const clientErrText = await clientResponse.text();
            console.error("Failed to deliver client confirmation email:", clientErrText);
          }
        } catch (clientErr) {
          console.error("Client email connection failure:", clientErr);
        }
      }
    }

    // 3. Forward notification to Discord Webhook if configured
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

    return res.status(200).json({ 
      success: true, 
      adminMail: adminData,
      clientMail: clientData,
      warning: clientMailWarning 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
