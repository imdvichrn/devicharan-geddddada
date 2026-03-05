// DO NOT COMMIT .env
// Express server entry for chat API and static serving


import express from "express";
import dotenv from "dotenv";
import path from "path";
import chatRouter from "./api/chat";
import { getMetrics } from "./memory";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Resend } from "resend";
import { Subscriber } from "./models/Subscriber";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

// Environment validation
if (!process.env.MONGODB_URI) {
  console.error("[env] ERROR: MONGODB_URI is not set in .env file");
  console.error("[env] Please add your MongoDB connection string to .env");
  process.exit(1);
}

if (!process.env.RESEND_API_KEY) {
  console.error("[env] ERROR: RESEND_API_KEY is not set in .env file");
  console.error("[env] Please add your Resend API key to .env");
  process.exit(1);
}

if (!process.env.ADMIN_SECRET) {
  console.error("[env] ERROR: ADMIN_SECRET is not set in .env file");
  console.error("[env] Please add an admin secret to .env");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5174;
const resend = new Resend(process.env.RESEND_API_KEY);

// MongoDB Connection Configuration
const uri = process.env.MONGODB_URI;

// Connect to MongoDB with proper error handling
async function connectDB() {
  try {
    if (!uri) {
      throw new Error("MONGODB_URI is missing in .env - please add your MongoDB connection string");
    }

    console.log("[db] Attempting to connect to MongoDB...");
    await mongoose.connect(uri);
    console.log("[db] Successfully connected to MongoDB!");
  } catch (error) {
    console.error("[db] MongoDB connection error:", error);
    if (error instanceof Error) {
      console.error("[db] Error message:", error.message);
      console.error("[db] Error stack:", error.stack);
    }
    console.error("[db] Please check your MONGODB_URI in .env and ensure your IP is whitelisted in MongoDB Atlas");
    throw error; // Re-throw to be caught by the .catch() handler
  }
}

// Initialize database connection
connectDB().catch((error) => {
  console.error("[db] Failed to initialize database connection:", error);
  process.exit(1);
});

app.use(express.json({ limit: "2mb" }));

// API routes
app.use("/api/chat", chatRouter);

// Subscribe endpoint - handles email subscriptions
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // Save subscriber to database
    const subscriber = new Subscriber({ email: email.toLowerCase() });
    await subscriber.save();

    // Send confirmation email via Resend
    try {
      const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [email],
        subject: "Perfect Pack Launch - Confirmed! 🚀",
        html: `
          <div style="text-align: center; font-family: Arial, sans-serif;">
            <h1 style="color: #333;">Welcome to Perfect Pack!</h1>
            <p style="font-size: 16px; color: #666;">
              You've successfully joined our launch list. Thank you for your interest!
            </p>
            <p style="color: #999; font-size: 12px;">
              You'll receive updates about our launch soon.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("[email] Error sending confirmation:", error);
      } else {
        await Subscriber.updateOne({ email: email.toLowerCase() }, { confirmationSent: true });
      }
    } catch (emailError) {
      console.error("[email] Unexpected error:", emailError);
    }

    res.status(200).json({ 
      success: true, 
      message: "Successfully subscribed! Check your email for confirmation." 
    });
  } catch (error) {
    console.error("[subscribe] Error:", error);
    res.status(500).json({ error: "Failed to subscribe. Please try again." });
  }
});

// Admin endpoint - get all subscribers (requires authentication)
app.get("/api/admin/subscribers", async (req, res) => {
  try {
    const secret = req.headers["x-admin-secret"];

    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const subscribers = await Subscriber.find({}).sort({ subscribedAt: -1 });
    res.json({ 
      count: subscribers.length,
      subscribers 
    });
  } catch (error) {
    console.error("[admin] Error:", error);
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
});

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

// Cache control headers for static assets
app.use((req, res, next) => {
  if (req.path.match(/\.(js|css|jpg|jpeg|png|gif|svg|woff|woff2|ttf|eot)$/i)) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

// Serve static files (for Vite build, if needed)
app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});
