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
    console.log(`[chat] Processing user query: "${userQuery}"`);
    
    // 1. Embed the query
    console.log("[chat] Creating embedding for user query...");
    const embedResp = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: userQuery,
    });
    const queryEmbedding = embedResp.data[0].embedding;
    console.log(`[chat] Generated embedding with ${queryEmbedding.length} dimensions`);

    // 2. Search vector store
    console.log("[chat] Searching vector store for relevant content...");
    const topMatches = search(queryEmbedding, 5);
    const threshold = 0.65;
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

    let systemPrompt = "You are Devicharan's personal AI assistant. Prefer his portfolio data first when answering questions about him, his skills, projects, or experience.";
    let context = "";
    let sources: string[] = [];
    
    if (goodMatches.length > 0) {
      context = goodMatches.map(r => r.text).join("\n");
      sources = goodMatches.map(r => r.source);
      console.log(`[chat] Using portfolio data from sources:`, sources);
    } else {
      console.log("[chat] No strong portfolio matches found, using general knowledge");
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
