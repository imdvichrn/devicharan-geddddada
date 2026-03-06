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

    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const htmlContent = `
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
    .header-title { font-size: 22px !important; }
    .header-sub { font-size: 11px !important; letter-spacing: 2px !important; }
    .body-text { font-size: 14px !important; }
    .feature-item { font-size: 13px !important; padding: 5px 0 !important; }
    .price-text { font-size: 36px !important; }
    .cta-btn { padding: 12px 24px !important; font-size: 14px !important; }
    .social-link { font-size: 12px !important; }
    .footer-text { font-size: 11px !important; }
    .features-box { padding: 18px !important; }
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
  <h2 class="header-title" style="margin:0;font-weight:900;font-size:28px;color:#ffffff;letter-spacing:-1px;">PERFECT PACK</h2>
  <p class="header-sub" style="margin:8px 0 0 0;color:#c8ff00;font-size:13px;letter-spacing:3px;font-weight:600;">ALL-IN-ONE CREATIVE ASSETS</p>
</td></tr>

<!-- MESSAGE -->
<tr><td class="body-text" style="font-size:16px;line-height:1.6;padding-bottom:25px;color:#cccccc;">
  <p style="margin:0 0 12px;">Hi <strong style="color:#ffffff;">Creator</strong>,</p>
  <p style="margin:0 0 12px;">You're officially on the <strong style="color:#c8ff00;">early access list</strong> for Perfect Pack.</p>
  <p style="margin:0;">When Perfect Pack launches, you'll be among the first to know. Stay tuned!</p>
</td></tr>

<!-- WHAT'S INSIDE -->
<tr><td style="padding-bottom:25px;">
  <div class="features-box" style="background:#1a1a1a;border-radius:8px;padding:24px;border:1px solid #2a2a2a;">
    <p style="margin:0 0 14px;font-size:14px;color:#ffffff;font-weight:700;letter-spacing:1px;">WHAT'S INSIDE:</p>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr><td class="feature-item" style="padding:6px 0;font-size:14px;color:#cccccc;">🎬 Cinematic sound effects</td></tr>
      <tr><td class="feature-item" style="padding:6px 0;font-size:14px;color:#cccccc;">✨ DRFX effects &amp; presets</td></tr>
      <tr><td class="feature-item" style="padding:6px 0;font-size:14px;color:#cccccc;">🎞️ Motion animations</td></tr>
      <tr><td class="feature-item" style="padding:6px 0;font-size:14px;color:#cccccc;">🔤 Modern typography &amp; text assets</td></tr>
      <tr><td class="feature-item" style="padding:6px 0;font-size:14px;color:#cccccc;">⚡ Editing tools for faster workflows</td></tr>
    </table>
  </div>
</td></tr>

<!-- PRICE -->
<tr><td align="center" style="padding-bottom:25px;">
  <p style="margin:0;font-size:13px;color:#888;letter-spacing:1px;">LAUNCH PRICE STARTS AT</p>
  <p class="price-text" style="margin:4px 0 0;font-size:48px;font-weight:900;color:#ffffff;">$10</p>
</td></tr>

<!-- BUTTON -->
<tr><td align="center" style="padding:25px 0;">
  <a class="cta-btn" href="https://devicharangeddada.lovable.app/project/perfect-pack-plugin" style="background:#ffffff;color:#000000;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;font-size:15px;display:inline-block;">VISIT PERFECT PACK</a>
</td></tr>

<!-- SOCIAL -->
<tr><td style="border-top:1px solid #2a2a2a;padding-top:25px;text-align:center;">
  <p style="margin:0 0 12px;font-size:12px;color:#555;letter-spacing:2px;">FOLLOW FOR UPDATES</p>
  <a class="social-link" href="https://instagram.com/devi_charan_2004" style="color:#c8ff00;text-decoration:none;font-size:13px;margin:0 6px;">Instagram</a>
  <span style="color:#333;">|</span>
  <a class="social-link" href="https://linkedin.com/in/devicharan-geddada" style="color:#c8ff00;text-decoration:none;font-size:13px;margin:0 6px;">LinkedIn</a>
  <span style="color:#333;">|</span>
  <a class="social-link" href="https://github.com/DeviCharan-Geddada" style="color:#c8ff00;text-decoration:none;font-size:13px;margin:0 6px;">GitHub</a>
</td></tr>

<!-- FOOTER -->
<tr><td style="padding-top:20px;font-size:13px;color:#888;text-align:center;">
  <p class="footer-text" style="margin:0;">Devicharan Geddada</p>
  <p class="footer-text" style="margin:6px 0;">Professional Video Editing • Cinematic Content</p>
  <p style="margin-top:16px;font-size:12px;color:#ffffff;letter-spacing:2px;">ECHOLESS</p>
  <p style="margin-top:4px;font-size:12px;color:#ffffff;">This is an automated confirmation email.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    // Resend sandbox: route to owner email until domain is verified
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Perfect Pack <onboarding@resend.dev>',
        to: ['devicharangeddada@gmail.com'],
        subject: `New Perfect Pack registration: ${email}`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending Perfect Pack email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
