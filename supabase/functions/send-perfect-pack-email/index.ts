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
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:16px;overflow:hidden;border:1px solid #222;">

<!-- Header -->
<tr><td style="padding:40px 40px 20px;text-align:center;">
  <h1 style="margin:0;font-size:32px;font-weight:900;color:#ffffff;letter-spacing:-1px;">PERFECT PACK</h1>
  <p style="margin:8px 0 0;font-size:13px;color:#c8ff00;letter-spacing:3px;font-weight:600;">ALL-IN-ONE CREATIVE ASSETS</p>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(to right,transparent,#333,transparent);"></div></td></tr>

<!-- Main Content -->
<tr><td style="padding:30px 40px;">
  <p style="margin:0 0 20px;font-size:18px;color:#ffffff;font-weight:600;">Hi Creator,</p>
  <p style="margin:0 0 16px;font-size:15px;color:#aaaaaa;line-height:1.7;">You're officially on the <strong style="color:#c8ff00;">early access list</strong>.</p>
  <p style="margin:0 0 24px;font-size:15px;color:#aaaaaa;line-height:1.7;">When Perfect Pack launches, you'll be among the first to know.</p>
</td></tr>

<!-- What's Inside -->
<tr><td style="padding:0 40px 30px;">
  <div style="background:#1a1a1a;border-radius:12px;padding:24px;border:1px solid #2a2a2a;">
    <p style="margin:0 0 16px;font-size:14px;color:#ffffff;font-weight:700;letter-spacing:1px;">WHAT'S INSIDE:</p>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="padding:6px 0;font-size:14px;color:#cccccc;">🎬 Cinematic sound effects</td></tr>
      <tr><td style="padding:6px 0;font-size:14px;color:#cccccc;">✨ DRFX effects &amp; presets</td></tr>
      <tr><td style="padding:6px 0;font-size:14px;color:#cccccc;">🎞️ Motion animations</td></tr>
      <tr><td style="padding:6px 0;font-size:14px;color:#cccccc;">🔤 Modern typography &amp; text assets</td></tr>
      <tr><td style="padding:6px 0;font-size:14px;color:#cccccc;">⚡ Editing tools for faster workflows</td></tr>
    </table>
  </div>
</td></tr>

<!-- Price -->
<tr><td style="padding:0 40px 30px;text-align:center;">
  <p style="margin:0;font-size:13px;color:#777777;letter-spacing:1px;">LAUNCH PRICE STARTS AT</p>
  <p style="margin:4px 0 0;font-size:48px;font-weight:900;color:#ffffff;">$10</p>
</td></tr>

<!-- CTA Button -->
<tr><td style="padding:0 40px 30px;text-align:center;">
  <a href="https://devicharangeddada.lovable.app/project/perfect-pack-plugin"
     style="display:inline-block;background:#c8ff00;color:#000000;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:800;font-size:15px;letter-spacing:1px;">
    VISIT PERFECT PACK
  </a>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(to right,transparent,#333,transparent);"></div></td></tr>

<!-- Social -->
<tr><td style="padding:24px 40px;text-align:center;">
  <p style="margin:0 0 12px;font-size:12px;color:#555555;letter-spacing:2px;">FOLLOW FOR UPDATES</p>
  <a href="https://instagram.com/devi_charan_2004" style="color:#c8ff00;text-decoration:none;font-size:13px;margin:0 8px;">Instagram</a>
  <span style="color:#333;">|</span>
  <a href="https://linkedin.com/in/devicharan-geddada" style="color:#c8ff00;text-decoration:none;font-size:13px;margin:0 8px;">LinkedIn</a>
  <span style="color:#333;">|</span>
  <a href="https://github.com/DeviCharan-Geddada" style="color:#c8ff00;text-decoration:none;font-size:13px;margin:0 8px;">GitHub</a>
</td></tr>

<!-- Footer -->
<tr><td style="padding:20px 40px 30px;text-align:center;">
  <p style="margin:0 0 4px;font-size:11px;color:#444444;">Created by <strong style="color:#666;">imdvichrn</strong></p>
  <p style="margin:0;font-size:11px;color:#333333;">You received this because you registered for Perfect Pack early access.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    // Resend sandbox: can only send to account owner email.
    // Once you verify a domain at resend.com/domains, change this to send directly to `email`.
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
