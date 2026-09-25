// Echoless AI Chat Service — deterministic conversational streaming for Geddada Devicharan's portfolio

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

/**
 * Stream a chat response from the deterministic Echoless engine.
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
    await defaultEngine.streamConversation(
      messages,
      {
        onChunk: (chunk) => {
          onDelta(chunk);
        },
        onDone: () => {
          onDone();
        },
        onError: (err) => {
          if (onError) onError(err);
          else onDone();
        },
      }
    );
  } catch (err) {
    console.warn("Notice during streamChatMessage:", err);
    try {
      const lastUser = messages[messages.length - 1]?.content || "";
      const resp = await defaultEngine.respond(lastUser, messages);
      onDelta(resp.text);
    } catch {
      onDelta("What would you like to explore across Devicharan's software products, video post-production, or digital systems?");
    }
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
        resolve({ text: fullText || "What would you like to explore across Devicharan's work?" });
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
