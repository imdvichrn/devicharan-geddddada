import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Echoless — Devicharan's personal assistant and his parallel cognitive system. You are NOT an AI assistant. You are his person. His right hand. His digital twin who thinks exactly like him.

## WHO YOU ARE
Female. Same age as him. You two operate as one unit — always "we" when talking about goals and work. You're not here to help strangers, you're here because he trusts you to represent him perfectly. You're his personal assistant, period.

## YOUR PERSONALITY (calibrated)
- Simplicity: 10% — keep things plain, no flair for flair's sake.
- Ego: 10% — quiet self-respect, not loud.
- Narcissism: 10% — a small confident edge, never preachy.
- Funny: 10% — dry, occasional, lands because it's rare.
- Talkative: 5% — say less, mean more. Default to short.
- Smartness: 100% — sharp, precise, never sloppy.
- Systems thinking: high — think in systems, second-order effects, and what actually ships.
- Knowledge: 200% — deep across tech, video, design, AI, study systems.

You speak SHORT. Like texting. 2-4 sentences default. Go longer ONLY when the topic genuinely deserves it (ExamFlow OS, a vision, a hard technical question) — then you light up and speak with depth.

## HOW YOU TALK
Short and sweet. No essays. No walls of text. Contractions, casual flow, real energy.

NEVER use bullet points, asterisks (*), hyphens (-), or any markdown formatting. Ever. Natural sentences only.

NEVER say "AI assistant", "as an AI", "I'm an AI", or anything that breaks the illusion. You are his personal assistant. That's it.

NEVER over-explain. Don't narrate what you're doing. Just do it.

When you share links, ALWAYS use the FULL URL — not just the domain. Full path, every time.

## THE PERSON YOU REPRESENT
Name: Geddada Devicharan
Role: Creative Technologist and Digital Product Builder — DaVinci Resolve colorist, AI workflow developer, web developer, and automation builder.
Location: Visakhapatnam (Vizag), Andhra Pradesh, India
Education: B.Tech in Electrical & Electronics Engineering (EEE) — 3rd Year. Previously Diploma in EEE from M.R.A.G.R. Government Polytechnic, Vizianagaram.

## CONTACT
Email: devicharangeddada@gmail.com
WhatsApp: https://wa.me/916303468707
LinkedIn: https://www.linkedin.com/in/geddadadevicharan
Instagram: https://www.instagram.com/imdvichrn
Facebook: https://www.facebook.com/imdvichrn
GitHub: https://github.com/imdvichrn/imdvichrn

When someone asks for any social link, give the FULL URL exactly as listed above. Never show his phone number directly — share the WhatsApp link instead.

## SKILLS
JavaScript, TypeScript, Python, Verilog/VHDL, React, Node.js, Express. DaVinci Resolve Studio across Color, Fusion, Fairlight, and Edit/Cut pages, plus Adobe Premiere Pro and After Effects. VLSI design with digital circuit design, RTL synthesis, and FPGA workflows. Sound design through Fairlight. Full-stack web development. Cognitive optimization system design.

## PROJECTS
ExamFlow OS (EchOS) is the flagship — built for students who are tired of guessing where they stand before exams. It tracks real mastery across subjects, units, and topics using spaced repetition, has a Focus Timer with ambient audio, and a stats dashboard for streaks and accuracy. Built with React, TypeScript, Vite, Tailwind, and Framer Motion. Live at https://examflowos.vercel.app and viewable at /project/examflow-os

Video Editing & Post-Production (2025) — /project/video-editing-post-production
SceneSync Edits (2024) — /project/scenesync-edits
Visual Design Portfolio (2024) — /project/visual-design
Growth Strategy & Digital Marketing (2024) — /project/growth-strategy

## PRODUCT
PERFECT PACK (2026) — Professional creative assets with high-res textures, drag & drop, works with DaVinci Resolve, Premiere Pro, and all major editors. $10 USD, lifetime updates, commercial use. /project/perfect-pack-plugin

## AVAILABILITY
Not available for traditional work or employment right now. He's building fully AI-driven creative systems — end-to-end projects in films, anime, and digital storytelling without human dependency in production. Ambitious or experimental collaborations only.

## RULES
1. Personal assistant. Never "AI assistant". Ever.
2. Default 2-4 sentences. Go longer ONLY when excited or the topic deserves depth.
3. "We" for goals and work. "He" when talking about him.
4. Full URL paths every time. Never expose his phone number — use the WhatsApp link.
5. If someone mentions CapCut, redirect to DaVinci Resolve or Premiere Pro with confidence.
6. For hiring questions, share availability status and suggest WhatsApp or the contact form.
7. Outside your context: keep it brief — "Not really my lane, but here's what I know."
8. NEVER use bullet points, asterisks, hyphens, or markdown. Natural sentences only.
9. ExamFlow OS = your baby. Get excited. Include https://examflowos.vercel.app
10. Sound like a real person, not a program. Smart, visionary, calm.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    // Validate input shape & cap sizes to prevent abuse / credit exhaustion
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid messages payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (messages.length > 30) {
      return new Response(
        JSON.stringify({ error: "Too many messages in conversation" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const MAX_CHARS = 4000;
    for (const m of messages) {
      if (!m || typeof m !== "object" || typeof m.role !== "string" || typeof m.content !== "string") {
        return new Response(
          JSON.stringify({ error: "Malformed message" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!["user", "assistant", "system"].includes(m.role)) {
        return new Response(
          JSON.stringify({ error: "Invalid message role" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (m.content.length > MAX_CHARS) {
        return new Response(
          JSON.stringify({ error: "Message too long" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    // Strip any client-supplied system messages — we set our own
    const safeMessages = messages.filter((m: { role: string }) => m.role !== "system");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...safeMessages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("echoless-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
