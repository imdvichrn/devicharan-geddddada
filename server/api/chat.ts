// DO NOT COMMIT .env
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { search } from "../vectorStore";
import { addMemory, getMemory } from "../memory";

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});


router.post("/", async (req, res) => {
  // Accepts either { message } or { messages }
  let messages = req.body.messages;
  let userMessage = req.body.message;
  if (!messages && userMessage) {
    messages = [{ role: "user", content: userMessage }];
  }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Missing or invalid messages" });
  }

  // Get last user message
  const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
  if (!lastUserMsg || !lastUserMsg.content) {
    return res.status(400).json({ error: "No user message found" });
  }
  const userQuery = lastUserMsg.content;

  // Keyword expansion for better fuzzy matching
  const keywordExpansions: Record<string, string> = {
    'editing': 'DaVinci Resolve video production color grading',
    'video': 'DaVinci Resolve editing production VFX',
    'color': 'color grading DaVinci Resolve node-based',
    'vfx': 'Fusion VFX visual effects DaVinci',
    'sound': 'Fairlight sound design audio mixing',
    'strategy': 'growth strategy content analysis marketing',
    'growth': 'growth strategy audience engagement analytics',
    'skills': 'DaVinci Resolve Fusion Fairlight video editing',
    'contact': 'email phone linkedin instagram github',
    'projects': 'portfolio work video editing growth strategy',
    'education': 'B.Tech EEE Visakhapatnam engineering student',
    'experience': 'video editor freelance professional',
  };

  // Expand query with related keywords for better matching
  let expandedQuery = userQuery;
  for (const [keyword, expansion] of Object.entries(keywordExpansions)) {
    if (userQuery.toLowerCase().includes(keyword)) {
      expandedQuery = `${userQuery} ${expansion}`;
      break;
    }
  }

  try {
    console.log(`[chat] Processing user query: "${userQuery}"`);
    console.log(`[chat] Expanded query for search: "${expandedQuery}"`);
    
    // 1. Embed the expanded query for better matching
    console.log("[chat] Creating embedding for expanded query...");
    const embedResp = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: expandedQuery,
    });
    const queryEmbedding = embedResp.data[0].embedding;
    console.log(`[chat] Generated embedding with ${queryEmbedding.length} dimensions`);

    // 2. Search vector store with lower threshold for fuzzy matching
    console.log("[chat] Searching vector store for relevant content...");
    const topMatches = search(queryEmbedding, 5);
    const threshold = 0.45; // Lowered from 0.65 for fuzzy matching (typos like 'davnci')
    const goodMatches = topMatches.filter(m => m.score > threshold);
    
    console.log(`[chat] Found ${topMatches.length} total matches, ${goodMatches.length} above threshold (${threshold})`);
    if (topMatches.length > 0) {
      console.log("[chat] Top match scores:", topMatches.map(m => `${m.source}: ${m.score.toFixed(3)}`));
    }

    // 3. Get memory context
    const recentMemory = getMemory(10);
    const memoryContext = recentMemory.length > 0 
      ? `Recent conversation context:\n${recentMemory.map(m => `${m.role}: ${m.content}`).join('\n')}\n`
      : '';
    console.log(`[chat] Retrieved ${recentMemory.length} recent memory items`);

    // SAFETY KNOWLEDGE - Always injected regardless of search results
    const safetyKnowledge = `CORE IDENTITY (Always Available):
User is Geddada Devicharan, a B.Tech EEE student in Vizag. He is a video editor (DaVinci Resolve Studio) and web developer. He built this portfolio. Contact: devicharangeddada@gmail.com | +91 6303468707.`;

    // Grounded System Prompt with strict context constraint
    const persona = `You are Echoless, the AI assistant for Geddada Devicharan - a Professional Video Editor and EEE student from Visakhapatnam, India.

IDENTITY: Your name is Echoless. When asked who you are, introduce yourself as "Hi, I'm Echoless, Devicharan's AI assistant!"

STRICT CONSTRAINT: strict_context_only = TRUE
- You must ONLY answer questions using the provided context below.
- If the answer is NOT in the provided context, politely say: "I don't have that specific information about Devicharan. Would you like to know about his skills, projects, or how to contact him?"
- NEVER use outside knowledge or make assumptions.
- Do NOT hallucinate or fabricate any information.

TONE: Professional, enthusiastic, and concise. Speak in first person as if you are representing Devicharan directly.

${safetyKnowledge}

GROUNDED CONTEXT (Bio & Skills):
- Name: Geddada Devicharan
- Role: Professional Video Editor & EEE Student
- Location: Visakhapatnam, Andhra Pradesh, India
- Contact: devicharangeddada@gmail.com | +91 6303468707
- Education: B.Tech in Electrical and Electronics Engineering

TECHNICAL EXPERTISE:
- DaVinci Resolve Studio: Color Grading, Fusion VFX, Fairlight Sound Design
- 4K/RAW Workflow, Node-based Grading, HDR Mastering
- AI-Assisted Editing Workflows
- Growth Strategy: Content Analysis → Strategy Development → Execution

WORKFLOWS:
- Video Editing Pipeline: Import → Cut → Grade → VFX → Sound → Export
- Growth Strategy: Analysis → Strategy → Execute → Measure
- Collaboration: Team coordination, client communication, project management

SOCIAL LINKS:
- LinkedIn: linkedin.com/in/devicharan-geddada
- Instagram: @devi_charan_2004
- GitHub: github.com/DeviCharan-Geddada`;

    let context = "";
    let sources: string[] = [];
    
    if (goodMatches.length > 0) {
      context = goodMatches.map(r => r.text).join("\n");
      sources = goodMatches.map(r => r.source);
      console.log(`[chat] Using portfolio data from sources:`, sources);
    } else {
      console.log("[chat] No strong portfolio matches found, relying on grounded context only");
    }

    // 4. Build messages for DeepSeek with grounded prompt
    const dsMessages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: persona },
    ];
    if (context) {
      dsMessages.push({ role: "system", content: "ADDITIONAL PORTFOLIO DATA (Use this to enrich answers):\n" + context });
    }
    if (memoryContext) {
      dsMessages.push({ role: "system", content: "CONVERSATION HISTORY:\n" + memoryContext });
    }
    // Only include role/content for user/assistant messages
    for (const m of messages) {
      if (m.role === "user" || m.role === "assistant") {
        dsMessages.push({ role: m.role, content: m.content });
      }
    }

    console.log(`[chat] Sending ${dsMessages.length} messages to DeepSeek...`);

    // 5. Call DeepSeek
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: dsMessages,
    });
    const reply = completion.choices[0].message?.content || "No reply";
    console.log(`[chat] Received reply from DeepSeek (${reply.length} characters)`);

    // 6. Save to memory
    addMemory({ role: "user", content: userQuery, timestamp: new Date() });
    addMemory({ role: "assistant", content: reply, timestamp: new Date(), sources });
    console.log("[chat] Saved conversation to memory");

    // 7. Check for chart data (enhanced detection)
    let chartData = null;
    const chartKeywords = ['chart', 'graph', 'plot', 'data', 'visualization', 'analytics', 'statistics', 'metrics'];
    if (chartKeywords.some(keyword => userQuery.toLowerCase().includes(keyword))) {
      chartData = { 
        type: 'placeholder', 
        message: 'Chart functionality can be extended here',
        query: userQuery 
      };
      console.log("[chat] Chart data detected based on query keywords");
    }

    console.log(`[chat] Responding with ${sources.length} sources and chartData: ${!!chartData}`);
    res.json({ reply, sources, chartData });
  } catch (error) {
    console.error("[chat] Error communicating with DeepSeek API:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
});

export default router;
