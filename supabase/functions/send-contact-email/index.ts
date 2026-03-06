import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. Notification email to site owner
    const ownerHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  @media only screen and (max-width: 620px) {
    .outer-table { width: 100% !important; padding: 16px !important; }
    .inner-table { width: 100% !important; padding: 24px 20px !important; border-radius: 8px !important; }
    .header-img { width: 80px !important; }
    .header-title { font-size: 18px !important; }
    .header-sub { font-size: 12px !important; }
    .field-label { font-size: 12px !important; }
    .field-value { font-size: 14px !important; }
    .msg-value { font-size: 14px !important; }
    .reply-btn { padding: 12px 24px !important; font-size: 14px !important; }
    .footer-text { font-size: 11px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Arial,Helvetica,sans-serif;">
<table class="outer-table" width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
<tr><td align="center">
<table class="inner-table" width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:10px;padding:40px;color:#ffffff;">

<!-- HEADER -->
<tr><td align="center" style="padding-bottom:30px;">
  <img class="header-img" src="https://geddadadevicharan.netlify.app/assets/profile-avatar-p_BCAhrx.png" alt="Devicharan Logo" style="width:120px;margin-bottom:10px;">
  <h2 class="header-title" style="margin:0;font-weight:600;color:#ffffff;">New Contact Message</h2>
  <p class="header-sub" style="margin:5px 0 0 0;color:#aaa;font-size:14px;">FROM YOUR PORTFOLIO</p>
</td></tr>

<!-- DETAILS -->
<tr><td style="padding-bottom:25px;">
  <table cellpadding="0" cellspacing="0" width="100%">
    <tr><td class="field-label" style="padding:6px 0 2px;font-size:13px;color:#888;">Name</td></tr>
    <tr><td class="field-value" style="padding:0 0 14px;font-size:15px;color:#fff;font-weight:600;">${name}</td></tr>
    <tr><td class="field-label" style="padding:6px 0 2px;font-size:13px;color:#888;">Email</td></tr>
    <tr><td class="field-value" style="padding:0 0 14px;font-size:15px;color:#c8ff00;">${email}</td></tr>
    <tr><td class="field-label" style="padding:6px 0 2px;font-size:13px;color:#888;">Subject</td></tr>
    <tr><td class="field-value" style="padding:0 0 14px;font-size:15px;color:#fff;">${subject}</td></tr>
    <tr><td class="field-label" style="padding:6px 0 2px;font-size:13px;color:#888;">Message</td></tr>
    <tr><td class="msg-value" style="padding:0;font-size:15px;color:#ccc;line-height:1.7;">${message.replace(/\n/g, '<br>')}</td></tr>
  </table>
</td></tr>

<!-- BUTTON -->
<tr><td align="center" style="padding:25px 0;">
  <a class="reply-btn" href="mailto:${email}?subject=Re: ${subject}" style="background:#ffffff;color:#000000;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;font-size:15px;display:inline-block;">Reply to ${name}</a>
</td></tr>

<!-- FOOTER -->
<tr><td style="border-top:1px solid #2a2a2a;padding-top:25px;font-size:13px;color:#888;text-align:center;">
  <p class="footer-text" style="margin:0;">Devicharan Geddada</p>
  <p class="footer-text" style="margin:6px 0;">Professional Video Editing • Cinematic Content</p>
  <p style="margin-top:16px;font-size:12px;color:#ffffff;letter-spacing:2px;">ECHOLESS</p>
  <p style="margin-top:4px;font-size:12px;color:#ffffff;">Portfolio notification email.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    // 2. Confirmation email to the sender
    const confirmHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  @media only screen and (max-width: 620px) {
    .outer-table { width: 100% !important; padding: 16px !important; }
    .inner-table { width: 100% !important; padding: 24px 20px !important; border-radius: 8px !important; }
    .header-img { width: 80px !important; }
    .header-title { font-size: 18px !important; }
    .header-sub { font-size: 12px !important; }
    .body-text { font-size: 14px !important; }
    .cta-btn { padding: 12px 24px !important; font-size: 14px !important; }
    .footer-text { font-size: 11px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Arial,Helvetica,sans-serif;">
<table class="outer-table" width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
<tr><td align="center">
<table class="inner-table" width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:10px;padding:40px;color:#ffffff;">

<!-- HEADER -->
<tr><td align="center" style="padding-bottom:30px;">
  <img class="header-img" src="https://geddadadevicharan.netlify.app/assets/profile-avatar-p_BCAhrx.png" alt="Devicharan Logo" style="width:120px;margin-bottom:10px;">
  <h2 class="header-title" style="margin:0;font-weight:600;color:#ffffff;">Devicharan Geddada</h2>
  <p class="header-sub" style="margin:5px 0 0 0;color:#aaa;font-size:14px;">Video Editor • DaVinci Resolve</p>
</td></tr>

<!-- MESSAGE -->
<tr><td class="body-text" style="font-size:16px;line-height:1.6;padding-bottom:25px;color:#cccccc;">
  <p style="margin:0 0 12px;">Hi <strong style="color:#ffffff;">${name}</strong>,</p>
  <p style="margin:0 0 12px;">Thank you for reaching out through my portfolio website. Your message has been successfully received.</p>
  <p style="margin:0 0 12px;">I carefully review every inquiry and usually respond within <strong style="color:#ffffff;">24 hours</strong>.</p>
  <p style="margin:0;">If your message is related to a project, collaboration, or editing work, I will get back to you shortly with more details.</p>
</td></tr>

<!-- BUTTON -->
<tr><td align="center" style="padding:25px 0;">
  <a class="cta-btn" href="https://devicharangeddada.lovable.app" style="background:#ffffff;color:#000000;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;font-size:15px;display:inline-block;">View My Portfolio</a>
</td></tr>

<!-- FOOTER -->
<tr><td style="border-top:1px solid #2a2a2a;padding-top:25px;font-size:13px;color:#888;text-align:center;">
  <p class="footer-text" style="margin:0;">Devicharan Geddada</p>
  <p class="footer-text" style="margin:6px 0;">Professional Video Editing • Cinematic Content</p>
  <p class="footer-text" style="margin:6px 0;"><a href="https://devicharangeddada.lovable.app" style="color:#aaa;text-decoration:none;">devicharangeddada.lovable.app</a></p>
  <p style="margin-top:16px;font-size:12px;color:#ffffff;letter-spacing:2px;">ECHOLESS</p>
  <p style="margin-top:4px;font-size:12px;color:#ffffff;">This is an automated confirmation email.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    // Send both emails in parallel
    const [ownerRes, confirmRes] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['devicharangeddada@gmail.com'],
          subject: `New message from ${name}: ${subject}`,
          html: ownerHtml,
          reply_to: email,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Devicharan Geddada <onboarding@resend.dev>',
          to: ['devicharangeddada@gmail.com'],
          subject: `Message received from ${name} (${email}) — ${subject}`,
          html: confirmHtml,
        }),
      }),
    ]);

    const ownerData = await ownerRes.json();
    if (!ownerRes.ok) {
      throw new Error(`Owner email failed: ${JSON.stringify(ownerData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
