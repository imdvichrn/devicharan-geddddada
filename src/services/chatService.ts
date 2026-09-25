// Echoless AI Chat Service — streams responses from Lovable AI edge function

import { Project } from '@/data/projects';
import { defaultEngine } from '@/echoless/engine';

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

const CHAT_URL = "/api/chat";

function getClientFallbackAnswer(): string {
  return defaultEngine.getHonestUnavailableResponse();
}

/**
 * Stream a chat response from the Echoless AI endpoint.
 * Calls onDelta with each token chunk, onDone when complete.
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
  onDelta: (text: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, taskType, modelPreference }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: `HTTP ${resp.status}` }));
      const errorMsg = errorData.error || `HTTP ${resp.status}`;
      console.warn("Chat server returned non-OK status:", errorMsg);
      const fallback = getClientFallbackAnswer();
      onDelta(fallback);
      onDone();
      return;
    }

    if (!resp.body) {
      onDelta(getClientFallbackAnswer());
      onDone();
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;
    let receivedAnyText = false;

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
          if (content) {
            receivedAnyText = true;
            onDelta(content);
          }
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
          if (content) {
            receivedAnyText = true;
            onDelta(content);
          }
        } catch { /* ignore */ }
      }
    }

    if (!receivedAnyText) {
      onDelta(getClientFallbackAnswer());
    }

    onDone();
  } catch (err) {
    console.warn("Notice during streamChatMessage, activating fallback:", err);
    onDelta(getClientFallbackAnswer());
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
