/**
 * Echoless Conversational Engine
 * Bridges conversation orchestration to the structured JSON-backed chatbot brain.
 */

import { defaultChatbot, ChatMessage } from '../chatbot/chatbot';
import { SupportedLanguage } from './core/parser';

export interface EcholessResponse {
  text: string;
  actionIds: string[];
  confidence: number;
  intent: string;
  entityId?: string;
  language: SupportedLanguage;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => Promise<void> | void;
  onDone?: () => Promise<void> | void;
  onError?: (err: any) => Promise<void> | void;
}

export class EcholessEngine {
  public resetMemory() {
    defaultChatbot.resetMemory();
  }

  public getHonestUnavailableResponse(): string {
    return "What would you like to explore across Devicharan's software products, DaVinci Resolve post-production, or digital systems?";
  }

  /**
   * Primary single-turn / multi-turn conversational response generator
   */
  public async respond(
    userInput: string,
    historyMessages?: { role: string; content: string }[]
  ): Promise<EcholessResponse> {
    const history: ChatMessage[] = (historyMessages || []).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    const response = await defaultChatbot.respond(userInput, history);

    return {
      text: response.text,
      actionIds: response.sources || [],
      confidence: 0.96,
      intent: response.intent,
      entityId: response.entityId,
      language: 'en',
    };
  }

  /**
   * Streaming conversational response generator
   */
  public async streamConversation(
    messages: { role: string; content: string }[],
    callbacks: StreamCallbacks
  ): Promise<void> {
    await defaultChatbot.streamConversation(messages, {
      onChunk: async (chunk) => {
        if (callbacks.onChunk) await callbacks.onChunk(chunk);
      },
      onDone: async () => {
        if (callbacks.onDone) await callbacks.onDone();
      },
      onError: async (err) => {
        if (callbacks.onError) await callbacks.onError(err);
        else if (callbacks.onDone) await callbacks.onDone();
      },
    });
  }
}

export const defaultEngine = new EcholessEngine();
