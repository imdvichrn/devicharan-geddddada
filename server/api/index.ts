// Copilot: Create an Express server that runs on port 5000.
// Add JSON body parsing and mount the route from ./api/chat.

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import chatRouter from "./chat";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount the chat router at /api/chat
app.use("/api/chat", chatRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Now you can run the server with `ts-node server/index.ts` and it will handle chat requests at /api/chat. Make sure to set DEEPSEEK_API_KEY and DEEPSEEK_BASE_URL in your .env file.      