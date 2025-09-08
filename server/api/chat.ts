// Copilot: Create an Express POST /api/chat endpoint.
// It should load DEEPSEEK_API_KEY from .env,
// send the user messages to DeepSeek's chat API (https://api.deepseek.com),
// and return the assistant's reply as JSON.

dotenv.config();

// DO NOT COMMIT .env
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { search } from "../vectorStore"; // <— adjust if needed

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Missing message" });
  }

  try {
    // 1. Embed the query
    const embedResp = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: userMessage,
    });
    const queryEmbedding = embedResp.data[0].embedding;

    // 2. Search vector store
    const topMatches = search(queryEmbedding, 5);

    // 3. If no strong matches, fallback directly to DeepSeek
    const threshold = 0.65;
    const goodMatches = topMatches.filter(m => m.score > threshold);

    let systemPrompt = "You are an AI assistant for my portfolio site. Prefer to answer using the provided context.";

    let context = "";
    if (goodMatches.length > 0) {
      context = goodMatches.map(m => m.text).join("\n\n");
      systemPrompt += "\n\nContext from site:\n" + context;
    }

    // 4. Call DeepSeek chat
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0].message?.content || "No reply";

    res.json({
      reply,
      sources: goodMatches.map(m => m.source),
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate reply" });
  }
});

export default router;
