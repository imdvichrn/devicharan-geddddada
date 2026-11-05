import express, { Request, Response } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Modality, LiveServerMessage } from '@google/genai';
import { defaultEngine } from './src/echoless/engine';
import {
  getSharedGeminiClient,
  formatGeminiHistory,
  ECHOLESS_SYSTEM_INSTRUCTION,
} from './src/server/gemini';

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

// Common chat handler for /api/chat with Server-Side Gemini streaming + deterministic fallback
async function handleChatRequest(req: Request, res: Response) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const { messages, taskType, modelPreference } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    const greeting =
      "Hey there. I'm Echoless — Devicharan's digital companion and creative co-pilot. I know his work, his design thinking, and his craft inside out (and I'm rather proud of it). What brings you by today?";
    res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: greeting } }] })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  const lastUser = messages.filter((m: any) => m.role === 'user').pop();
  const query = lastUser?.content || '';

  // 1. Try server-side Gemini Developer API streaming
  const ai = getSharedGeminiClient();
  if (ai && query.trim()) {
    try {
      const modelName =
        process.env.VITE_GEMINI_MODEL ||
        process.env.GEMINI_MODEL ||
        'gemini-3.5-flash-lite';
      const history = formatGeminiHistory(messages.slice(0, -1));

      const chat = ai.chats.create({
        model: modelName,
        history,
        config: {
          systemInstruction: ECHOLESS_SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      });

      const streamResult = await chat.sendMessageStream({ message: query });
      let streamedAny = false;

      for await (const chunk of streamResult) {
        const text = chunk.text;
        if (text) {
          streamedAny = true;
          res.write(
            `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`
          );
        }
      }

      if (streamedAny) {
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }
    } catch (geminiError: any) {
      console.warn(
        'Server-side Gemini streaming notice, falling back to local Echoless engine:',
        geminiError?.message || geminiError
      );
    }
  }

  // 2. Deterministic local Echoless engine fallback
  try {
    await defaultEngine.streamConversation(
      messages,
      {
        onChunk: async (chunk: string) => {
          res.write(
            `data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`
          );
        },
        onDone: async () => {
          res.write('data: [DONE]\n\n');
          res.end();
        },
        onError: async (err: any) => {
          console.warn('Local fallback error in chat handler:', err);
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
      res.write(
        `data: ${JSON.stringify({ choices: [{ delta: { content: fallback } }] })}\n\n`
      );
      res.write('data: [DONE]\n\n');
      res.end();
    }
  }
}

// Server-side non-streaming Gemini content generation endpoint
app.post('/api/gemini/generate', async (req: Request, res: Response) => {
  const { prompt, contents, model: requestedModel } = req.body;
  if (!prompt && !contents) {
    res.status(400).json({ error: 'Prompt or contents is required' });
    return;
  }

  const ai = getSharedGeminiClient();
  if (!ai) {
    res.status(503).json({ error: 'Server-side Gemini client not configured' });
    return;
  }

  try {
    const model =
      requestedModel ||
      process.env.VITE_GEMINI_MODEL ||
      process.env.GEMINI_MODEL ||
      'gemini-3.5-flash-lite';

    const response = await ai.models.generateContent({
      model,
      contents: contents || prompt,
      config: {
        systemInstruction: ECHOLESS_SYSTEM_INSTRUCTION,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Server generateContent error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate content' });
  }
});

// Routes
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const filePath = isProduction
    ? path.resolve(__dirname, 'dist', 'sitemap.xml')
    : path.resolve(__dirname, 'public', 'sitemap.xml');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.sendFile(filePath);
});

app.get('/sitemap-index.xml', (_req: Request, res: Response) => {
  res.redirect(301, '/sitemap.xml');
});

app.get('/robots.txt', (_req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const filePath = isProduction
    ? path.resolve(__dirname, 'dist', 'robots.txt')
    : path.resolve(__dirname, 'public', 'robots.txt');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.sendFile(filePath);
});

app.get('/favicon.ico', (_req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const filePath = isProduction
    ? path.resolve(__dirname, 'dist', 'favicon.ico')
    : path.resolve(__dirname, 'public', 'favicon.ico');
  res.sendFile(filePath);
});

app.get('/Geddada_Devicharan_CV.pdf', (_req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const filePath = isProduction
    ? path.resolve(__dirname, 'dist', 'Geddada_Devicharan_CV.pdf')
    : path.resolve(__dirname, 'public', 'Geddada_Devicharan_CV.pdf');
  res.sendFile(filePath);
});

app.post('/api/chat', handleChatRequest);

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
  console.log(
    `[Contact Submission] Received from ${newSubmission.name} <${newSubmission.email}> - "${newSubmission.subject}"`
  );

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

// Setup Vite or static serving & WebSocket Live API server
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

  const server = http.createServer(app);

  // Setup WebSocket Server for Gemini Live API audio streaming
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url || '', `http://${request.headers.host || 'localhost'}`);
    if (url.pathname === '/api/live' || url.pathname === '/live') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  wss.on('connection', async (clientWs: WebSocket) => {
    const ai = getSharedGeminiClient();
    if (!ai) {
      clientWs.send(JSON.stringify({ error: 'GEMINI_API_KEY not configured on server' }));
      clientWs.close();
      return;
    }

    try {
      const session = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: ECHOLESS_SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            for (const part of message.serverContent?.modelTurn?.parts ?? []) {
              if (part.inlineData?.data && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
              }
            }
            if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
          onclose: () => {
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.close();
            }
          },
        },
      });

      clientWs.on('message', (data: any) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
            });
          }
        } catch (e) {
          console.warn('Error handling client Live message:', e);
        }
      });

      clientWs.on('close', () => {
        try {
          session.close();
        } catch {}
      });
    } catch (err: any) {
      console.error('Error starting Gemini Live session on server:', err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ error: err.message || 'Failed to connect Live API' }));
        clientWs.close();
      }
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT} (Gemini Chat & Live API enabled)`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
