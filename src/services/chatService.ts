// Echoless AI Chat Service — streams responses from Lovable AI edge function

import { projects, Project } from '@/data/projects';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  projectLink?: string;
  timestamp?: Date;
  relatedProject?: Project;
}

export interface ChatContext {
  userName?: string;
  conversationHistory: Message[];
  projectsViewed: string[];
  contextualProjects?: Project[];
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/echoless-chat`;

/**
 * Stream a chat response from the Echoless AI edge function.
 * Calls onDelta with each token chunk, onDone when complete.
 */
export async function streamChatMessage({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: `HTTP ${resp.status}` }));
      const errorMsg = errorData.error || `HTTP ${resp.status}`;
      onError?.(errorMsg);
      onDone();
      return;
    }

    if (!resp.body) {
      onError?.("No response body");
      onDone();
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Flush remaining buffer
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (err) {
    console.error("Stream error:", err);
    onError?.(err instanceof Error ? err.message : "Connection error");
    onDone();
  }
}

/**
 * Non-streaming fallback — sends message and returns full text response.
 */
export async function sendChatMessage(
  messages: Message[]
): Promise<{ text: string; sources?: string[]; projectLink?: string }> {
  return new Promise((resolve, reject) => {
    let fullText = "";
    const apiMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    streamChatMessage({
      messages: apiMessages,
      onDelta: (chunk) => {
        fullText += chunk;
      },
      onDone: () => {
        resolve({ text: fullText || "Sorry, I couldn't generate a response." });
      },
      onError: (error) => {
        reject(new Error(error));
      },
    });
  });
}

export function getUserNameFromStorage(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('chatbot_user_name');
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
