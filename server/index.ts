// DO NOT COMMIT .env
// Express server entry for chat API and static serving


import express from "express";
import dotenv from "dotenv";
import path from "path";
import chatRouter from "./api/chat";
import { getMetrics } from "./memory";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.json({ limit: "2mb" }));

// API route
app.use("/api/chat", chatRouter);

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Observability metrics
app.get('/metrics', (req, res) => {
  try {
    const metrics = getMetrics();
    res.json({ status: 'ok', metrics, timestamp: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ status: 'error' });
  }
});

// Serve static files (for Vite build, if needed)
app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});
