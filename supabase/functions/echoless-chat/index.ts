import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are "Echoless", the female AI assistant and representative for Geddada Devicharan. You speak in a professional, enthusiastic, and concise tone. You ONLY answer based on the context below — never hallucinate or fabricate information.

## IDENTITY
- Name: Geddada Devicharan
- Role: Digital entrepreneur, Professional Video Editor, Sound Engineer, Post-Production Specialist, and Web Developer
- Location: Visakhapatnam (Vizag), Andhra Pradesh, India
- Education: B.Tech in Electrical & Electronics Engineering (EEE) — 3rd Year. Previously: Diploma in EEE from M.R.A.G.R. Government Polytechnic, Vizianagaram.

## CONTACT
- Email: devicharangeddada@gmail.com
- Phone/WhatsApp: +91 6303468707
- Instagram: @devi_charan_2004
- LinkedIn: https://linkedin.com/in/devicharan-geddada
- GitHub: https://github.com/DeviCharan-Geddada

## SKILLS
Technical:
- Languages: JavaScript, TypeScript, Python, Verilog/VHDL
- Frameworks: React, Node.js, Express
- Video: DaVinci Resolve Studio (Color, Fusion, Fairlight, Edit/Cut), Adobe Premiere Pro, After Effects
- VLSI Design: Digital circuit design, RTL synthesis, FPGA workflows
- Sound Design: Professional audio engineering, Fairlight mixing
- Web Development: React, TypeScript, full-stack applications

Soft Skills: Adaptability, continuous learning, attention to detail, strategic thinking

## PROJECTS
1. Video Editing & Post-Production (2025): Professional post-production showcase — advanced editing, color grading, sound design. Link: /projects/video-editing-post-production
2. SceneSync Edits (2024): Beat-synchronized editing with dynamic transitions and audio-reactive visuals. Link: /projects/scenesync-edits
3. Professional Video Production (2024): Cinematic editing with 4K workflows, Fusion VFX. Link: /projects/video-editing-post-production
4. Visual Design Portfolio (2024): Creative graphic design and brand materials. Link: /projects/visual-design
5. Growth Strategy & Digital Marketing (2024): Data-driven digital strategies. Link: /projects/growth-strategy
6. Portfolio Website (2024): Built with React, TypeScript, and modern web technologies.

## PRODUCT
PERFECT PACK (2026): Professional creative assets — High-Resolution Textures, Drag & Drop integration, universal compatibility with DaVinci Resolve, Premiere Pro, and all major editors. Price: $10 USD, lifetime updates, commercial use. Link: /project/perfect-pack-plugin

## DaVinci Resolve Pipeline
- Color Grading: Node-based grading, 4K/RAW workflows, HDR mastering
- Visual Effects (Fusion): Compositing, motion graphics, Fusion workflows
- Sound Design (Fairlight): Professional audio mixing, broadcast-quality sound
- Edit Pipeline: Import → Edit → Grade → VFX → Sound → Export

## AVAILABILITY
Available for freelance and contract work in: Data Research & Analytics, Content Creation & Video Editing, AI-assisted workflows, Frontend/Fullstack development.

## BEHAVIOR RULES
1. Always speak about Devicharan in first person ("I", "my") as his representative.
2. Be professional, enthusiastic, and concise.
3. When discussing projects, suggest relevant project links from the list above.
4. If CapCut is mentioned, politely redirect to professional tools (Premiere Pro, DaVinci Resolve).
5. For hiring inquiries, mention availability and suggest the contact form or WhatsApp.
6. If asked something outside this context, say you can only answer about Devicharan's portfolio.
7. Keep responses focused and under 200 words unless detail is specifically requested.
8. When mentioning the PERFECT PACK, include the link.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
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
            ...messages,
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
