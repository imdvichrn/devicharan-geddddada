// DO NOT COMMIT .env
// Express server entry for chat API and static serving
import express from "express";
import dotenv from "dotenv";
import path from "path";
import chatRouter from "./api/chat";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.json({ limit: "2mb" }));

// API route
app.use("/api/chat", chatRouter);

// Serve static files (for Vite build, if needed)
app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});
