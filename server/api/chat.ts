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

  try {
    // 1. Embed the query
    const embedResp = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: userQuery,
    });
    const queryEmbedding = embedResp.data[0].embedding;

    // 2. Search vector store
    const topMatches = search(queryEmbedding, 5);
    const threshold = 0.65;
    const goodMatches = topMatches.filter(m => m.score > threshold);

    // 3. Get memory context
    const recentMemory = getMemory(10);
    const memoryContext = recentMemory.length > 0 
      ? `Recent conversation context:\n${recentMemory.map(m => `${m.role}: ${m.content}`).join('\n')}\n`
      : '';

    let systemPrompt = "You are Devicharan's personal AI assistant. Prefer his portfolio data first when answering questions about him, his skills, projects, or experience.";
    let context = "";
    let sources: string[] = [];
    if (goodMatches.length > 0) {
      context = goodMatches.map(r => r.text).join("\n");
      sources = goodMatches.map(r => r.source);
      console.log(`[chat] Found ${goodMatches.length} relevant chunks:`, sources);
    } else {
      console.log("[chat] No strong local match, falling back to DeepSeek only.");
    }

    // 4. Build messages for DeepSeek
    const dsMessages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
    ];
    if (context) {
      dsMessages.push({ role: "system", content: "Relevant portfolio info:\n" + context });
    }
    if (memoryContext) {
      dsMessages.push({ role: "system", content: memoryContext });
    }
    // Only include role/content for user/assistant messages
    for (const m of messages) {
      if (m.role === "user" || m.role === "assistant") {
        dsMessages.push({ role: m.role, content: m.content });
      }
    }

    // 5. Call DeepSeek
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: dsMessages,
    });
    const reply = completion.choices[0].message?.content || "No reply";

    // 6. Save to memory
    addMemory({ role: "user", content: userQuery, timestamp: new Date() });
    addMemory({ role: "assistant", content: reply, timestamp: new Date(), sources });

    // 7. Check for chart data (simple CSV detection)
    let chartData = null;
    if (userQuery.toLowerCase().includes('chart') || userQuery.toLowerCase().includes('graph') || userQuery.toLowerCase().includes('data')) {
      chartData = { type: 'placeholder', message: 'Chart functionality can be extended here' };
    }

    res.json({ reply, sources, chartData });
  } catch (error) {
    console.error("[chat] Error communicating with DeepSeek API:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
});

export default router;
