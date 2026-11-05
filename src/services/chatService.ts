// Portfolio Intelligence Assistant Service — Server-Side Gemini API Proxy with Local Fallback
// Configured for Geddada Devicharan's portfolio

import { Project } from '@/data/projects';
import { defaultChatbot } from '@/chatbot/chatbot';
import { ActionChip, GeneratedResponse } from '@/chatbot/responseEngine';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  projectLink?: string;
  timestamp?: Date;
  relatedProject?: Project;
  suggestedActions?: ActionChip[];
  suggestedFollowups?: string[];
}

export interface ChatContext {
  userName?: string;
  conversationHistory: Message[];
  projectsViewed: string[];
  contextualProjects?: Project[];
}

/**
 * Executes local-first deterministic response (< 2ms) using the structured JSON knowledge base.
 */
export async function getLocalAssistantResponse(
  messages: { role: string; content: string }[]
): Promise<GeneratedResponse> {
  const lastUser = messages.filter((m) => m.role === 'user').pop();
  const query = lastUser?.content || '';
  const history = messages.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  return await defaultChatbot.respond(query, history);
}

/**
 * Streaming interface for real-time chatbot responses.
 * Streams token chunks from the server-side /api/chat endpoint (SSE).
 * Automatically falls back to the local engine if network fails or quota is exhausted.
 */
export async function streamChatMessage({
  messages,
  taskType,
  modelPreference,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  taskType?: 'general' | 'fast' | 'complex';
  modelPreference?: 'general' | 'fast' | 'complex';
  onDelta: (text: string, responseMeta?: GeneratedResponse) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  const lastUser = messages.filter((m) => m.role === 'user').pop();
  const query = lastUser?.content || '';

  if (!query.trim()) {
    try {
      const resp = await getLocalAssistantResponse(messages);
      onDelta(resp.text, resp);
      onDone();
    } catch {
      onDone();
    }
    return;
  }

  // 1. Primary: Stream from server-side proxy route (/api/chat)
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        messages,
        taskType,
        modelPreference,
      }),
    });

    if (response.ok && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamedAny = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();

          if (dataStr === '[DONE]') {
            onDone();
            return;
          }

          try {
            const parsed = JSON.parse(dataStr);
            const chunkText = parsed.choices?.[0]?.delta?.content;
            if (chunkText) {
              streamedAny = true;
              onDelta(chunkText);
            }
          } catch {
            // Ignore non-JSON lines
          }
        }
      }

      if (streamedAny) {
        onDone();
        return;
      }
    }
  } catch (netErr) {
    console.warn(
      'Server chat stream unavailable (falling back to local engine):',
      netErr
    );
  }

  // 2. Fallback: Deterministic local response
  try {
    const resp = await getLocalAssistantResponse(messages);
    onDelta(resp.text, resp);
    onDone();
  } catch (err: any) {
    console.warn('Local engine fallback error:', err);
    if (onError) onError(err.message || 'Error resolving response');
    else {
      onDelta(
        "What would you like to explore across Devicharan's software products, video post-production, or digital systems?"
      );
      onDone();
    }
  }
}

/**
 * Non-streaming direct response resolution.
 */
export async function getAssistantResponse(
  messages: { role: string; content: string }[]
): Promise<GeneratedResponse> {
  const lastUser = messages.filter((m) => m.role === 'user').pop();
  const query = lastUser?.content || '';

  if (!query.trim()) {
    return await getLocalAssistantResponse(messages);
  }

  try {
    let fullText = '';
    await new Promise<void>((resolve, reject) => {
      streamChatMessage({
        messages,
        onDelta: (chunk) => {
          fullText += chunk;
        },
        onDone: () => resolve(),
        onError: (err) => reject(new Error(err)),
      });
    });

    if (fullText.trim().length > 0) {
      return {
        text: fullText.trim(),
        confidence: 0.98,
        intent: 'server_gemini_ai',
      };
    }
  } catch (err) {
    console.warn('Server direct response fallback notice:', err);
  }

  return await getLocalAssistantResponse(messages);
}

/**
 * Non-streaming direct resolution interface.
 */
export async function sendChatMessage(
  messages: Message[]
): Promise<GeneratedResponse> {
  const apiMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
  return await getAssistantResponse(apiMessages);
}

export function getUserNameFromStorage(): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem('chatbot_user_name');
    }
  } catch (error) {
    console.warn('Unable to read chatbot user name from storage:', error);
  }
  return null;
}

export function saveUserNameToStorage(name: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatbot_user_name', name);
  }
}

export function parseUserNameFromMessage(message: string): string | null {
  const patterns = [
    /(?:i'm|i am|my name is|call me|you can call me)\s+([A-Z][a-z]+)/i,
    /^([A-Z][a-z]+)(?:\s+[A-Z][a-z]+)?(?:\s|$)/,
  ];
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) return match[1];
  }
  return null;
}
