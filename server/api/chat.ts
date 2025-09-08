// Copilot: Create an Express POST /api/chat endpoint.
// It should load DEEPSEEK_API_KEY from .env,
// send the user messages to DeepSeek's chat API (https://api.deepseek.com),
// and return the assistant's reply as JSON.

dotenv.config();

// DO NOT COMMIT .env
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { search } from "../vectorStore.ts";

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
    const topMatches = search(queryEmbedding, 3);
    const threshold = 0.65;
    const goodMatches = topMatches.filter(m => m.score > threshold);

    let systemPrompt = "You are Devicharan's AI assistant. Use his portfolio data when possible.";
    let context = "";
    let sources: string[] = [];
    if (goodMatches.length > 0) {
      context = goodMatches.map(r => r.text).join("\n");
      sources = goodMatches.map(r => r.source);
      console.log(`[chat] Found ${goodMatches.length} relevant chunks:`, sources);
    } else {
      console.log("[chat] No strong local match, falling back to DeepSeek only.");
    }

    // 3. Build messages for DeepSeek
    const dsMessages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
    ];
    if (context) {
      dsMessages.push({ role: "system", content: "Relevant info:\n" + context });
    }
    // Only include role/content for user/assistant messages
    for (const m of messages) {
      if (m.role === "user" || m.role === "assistant") {
        dsMessages.push({ role: m.role, content: m.content });
      }
    }

    // 4. Call DeepSeek
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: dsMessages,
    });
    const reply = completion.choices[0].message?.content || "No reply";
    res.json({ reply, sources });
  } catch (error) {
    console.error("[chat] Error communicating with DeepSeek API:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
});

export default router;
