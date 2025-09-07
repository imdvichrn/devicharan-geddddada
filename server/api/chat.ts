// Copilot: Create an Express POST /api/chat endpoint.
// It should load DEEPSEEK_API_KEY from .env,
// send the user messages to DeepSeek's chat API (https://api.deepseek.com),
// and return the assistant's reply as JSON.

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

interface Message {
  role: "user" | "assistant";
  content: string;
}

router.post("/", async (req, res) => {
  const messages: Message[] = req.body.messages;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat", // ✅ correct DeepSeek model
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );

    interface DeepSeekResponse {
      choices: { message: { content: string } }[];
    }
    const data = response.data as DeepSeekResponse;
    const assistantMessage = data.choices[0].message.content;
    res.json({ reply: assistantMessage });
  } catch (error: any) {
    console.error("Error communicating with DeepSeek API:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from chat API" });
  }
});

export default router;
