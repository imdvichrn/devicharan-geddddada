// Portfolio Intelligence Assistant Service — Fast local-first architecture for Geddada Devicharan's portfolio

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
 * Fast local-first response resolution (< 2ms) without artificial token lag.
 */
export async function getAssistantResponse(
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
 * Streaming interface for backward compatibility. Emits response immediately.
 */
export async function streamChatMessage({
  messages,
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
  try {
    const resp = await getAssistantResponse(messages);
    onDelta(resp.text, resp);
    onDone();
  } catch (err: any) {
    console.warn("Notice during streamChatMessage:", err);
    if (onError) onError(err.message || 'Error resolving query');
    else {
      onDelta("What would you like to explore across Devicharan's software products, video post-production, or digital systems?");
      onDone();
    }
  }
}

/**
 * Non-streaming direct resolution.
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
