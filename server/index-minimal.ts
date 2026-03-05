// DO NOT COMMIT .env
// Minimal Express server for debugging

// Add global error handlers FIRST
process.on('unhandledRejection', (reason, promise) => {
  console.error('[FATAL] Unhandled Rejection:', reason);
  process.exit(1);
});

// MUST be first - before any other imports
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5174;

console.log("[server] Starting minimal server...");
console.log("[env] MONGODB_URI:", process.env.MONGODB_URI ? "SET" : "NOT SET");
console.log("[env] RESEND_API_KEY:", process.env.RESEND_API_KEY ? "SET" : "NOT SET");
console.log("[env] ADMIN_SECRET:", process.env.ADMIN_SECRET ? "SET" : "NOT SET");

app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});
