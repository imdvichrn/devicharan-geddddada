import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { defaultEngine } from './src/echoless/engine';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory launch registrations and contact submissions storage
const launchRegistrations: { email: string; timestamp: string }[] = [];
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
const contactSubmissions: ContactMessage[] = [];

// Common chat handler for /api/chat and legacy alias
async function handleChatRequest(req: Request, res: Response) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const { messages, taskType, modelPreference } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    const greeting = "Hey. I'm Echoless, Devicharan's personal AI assistant. What would you like to explore across his software products, video post-production, or digital systems?";
    res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: greeting } }] })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  try {
    await defaultEngine.streamConversation(
      messages,
      {
        onChunk: async (chunk: string) => {
          res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`);
        },
        onDone: async () => {
          res.write('data: [DONE]\n\n');
          res.end();
        },
        onError: async (err: any) => {
          console.warn('Stream error in chat handler:', err);
        },
      },
      {
        taskType,
        modelPreference,
      }
    );
  } catch (error) {
    console.error('Echoless engine chat exception:', error);
    if (!res.writableEnded) {
      const fallback = defaultEngine.getHonestUnavailableResponse();
      res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: fallback } }] })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  }
}

// Routes
app.get('/Geddada_Devicharan_CV.pdf', (_req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const filePath = isProduction
    ? path.resolve(__dirname, 'dist', 'Geddada_Devicharan_CV.pdf')
    : path.resolve(__dirname, 'public', 'Geddada_Devicharan_CV.pdf');
  res.sendFile(filePath);
});

app.post('/api/chat', handleChatRequest);
app.post('/functions/v1/echoless-chat', handleChatRequest);

// Registration endpoint for launch lists (ExamFlow OS, Perfect Pack)
app.post('/api/register-launch', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'Valid email is required' });
    return;
  }
  const cleanEmail = email.trim().toLowerCase();
  const exists = launchRegistrations.some((r) => r.email === cleanEmail);
  if (exists) {
    res.json({ message: 'Already registered', status: 'duplicate' });
    return;
  }
  launchRegistrations.push({ email: cleanEmail, timestamp: new Date().toISOString() });
  res.json({ message: 'Registered successfully', status: 'success' });
});

// Contact message endpoint
app.post(['/api/contact', '/api/send-message'], (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }

  const newSubmission: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject || 'Portfolio Inquiry').trim(),
    message: String(message).trim(),
    timestamp: new Date().toISOString(),
  };

  contactSubmissions.push(newSubmission);
  console.log(`[Contact Submission] Received from ${newSubmission.name} <${newSubmission.email}> - "${newSubmission.subject}"`);

  res.json({
    success: true,
    message: 'Message received and stored successfully',
    id: newSubmission.id,
    timestamp: newSubmission.timestamp,
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Setup Vite or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
