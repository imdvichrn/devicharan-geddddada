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

    // 1. Send notification to site owner
    const ownerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid #222;">
<tr><td style="padding:32px 40px 16px;">
  <h1 style="margin:0;font-size:24px;color:#ffffff;">New Contact Message</h1>
  <p style="margin:8px 0 0;font-size:13px;color:#c8ff00;letter-spacing:2px;">FROM YOUR PORTFOLIO</p>
</td></tr>
<tr><td style="padding:0 40px;"><div style="height:1px;background:#222;"></div></td></tr>
<tr><td style="padding:24px 40px;">
  <table cellpadding="0" cellspacing="0" width="100%">
    <tr><td style="padding:8px 0;font-size:13px;color:#777;">Name</td></tr>
    <tr><td style="padding:0 0 16px;font-size:15px;color:#fff;font-weight:600;">${name}</td></tr>
    <tr><td style="padding:8px 0;font-size:13px;color:#777;">Email</td></tr>
    <tr><td style="padding:0 0 16px;font-size:15px;color:#c8ff00;">${email}</td></tr>
    <tr><td style="padding:8px 0;font-size:13px;color:#777;">Subject</td></tr>
    <tr><td style="padding:0 0 16px;font-size:15px;color:#fff;">${subject}</td></tr>
    <tr><td style="padding:8px 0;font-size:13px;color:#777;">Message</td></tr>
    <tr><td style="padding:0;font-size:15px;color:#ccc;line-height:1.7;">${message.replace(/\n/g, '<br>')}</td></tr>
  </table>
</td></tr>
<tr><td style="padding:16px 40px 24px;text-align:center;">
  <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:#c8ff00;color:#000;padding:12px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">Reply to ${name}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

    // 2. Send confirmation to the sender
    const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid #222;">
<tr><td style="padding:32px 40px 16px;text-align:center;">
  <h1 style="margin:0;font-size:24px;color:#ffffff;">Message Received ✓</h1>
  <p style="margin:12px 0 0;font-size:14px;color:#aaa;">Thanks for reaching out, ${name}!</p>
</td></tr>
<tr><td style="padding:16px 40px;"><div style="height:1px;background:#222;"></div></td></tr>
<tr><td style="padding:24px 40px;">
  <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">I've received your message about <strong style="color:#fff;">"${subject}"</strong> and will get back to you as soon as possible.</p>
  <p style="margin:0;font-size:15px;color:#ccc;line-height:1.7;">In the meantime, feel free to check out my portfolio and recent work.</p>
</td></tr>
<tr><td style="padding:0 40px 30px;text-align:center;">
  <a href="https://devicharangeddada.lovable.app" style="display:inline-block;background:#c8ff00;color:#000;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">Visit Portfolio</a>
</td></tr>
<tr><td style="padding:0 40px;"><div style="height:1px;background:#222;"></div></td></tr>
<tr><td style="padding:20px 40px 28px;text-align:center;">
  <p style="margin:0;font-size:12px;color:#555;">— Geddada Devicharan (<strong style="color:#777;">imdvichrn</strong>)</p>
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
          to: [email],
          subject: `Message received — I'll get back to you soon!`,
          html: confirmHtml,
        }),
      }),
    ]);

    const ownerData = await ownerRes.json();
    const confirmData = await confirmRes.json();

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
