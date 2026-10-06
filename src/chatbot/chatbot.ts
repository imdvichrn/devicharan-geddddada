/**
 * Portfolio Intelligence Assistant (Chatbot Brain)
 * Local-first, zero-network, zero-LLM architecture powered by structured JSON knowledge.
 */

import { normalizeQuery, NormalizedQuery } from './queryNormalizer';
import { detectIntent, IntentResult } from './intentEngine';
import { searchKnowledge, SearchResult } from './searchEngine';
import { generateResponse, GeneratedResponse, ActionChip } from './responseEngine';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  suggestedActions?: ActionChip[];
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}

export class ChatbotBrain {
  private activeEntityId: string | null = null;

  public resetMemory() {
    this.activeEntityId = null;
  }

  public getActiveEntityId(): string | null {
    return this.activeEntityId;
  }

  /**
   * Deterministic local query resolution (< 2ms execution)
   */
  public async respond(
    queryText: string,
    history: ChatMessage[] = []
  ): Promise<GeneratedResponse> {
    // 1. Recover active context entity from history if not currently set
    if (!this.activeEntityId && history.length > 0) {
      for (let i = history.length - 1; i >= 0; i--) {
        const text = history[i].content.toLowerCase();
        if (text.includes('video') || text.includes('davinci') || text.includes('editing') || text.includes('color')) {
          this.activeEntityId = 'video';
          break;
        }
        if (text.includes('examflow') || text.includes('cbt')) {
          this.activeEntityId = 'examflow-os';
          break;
        }
        if (text.includes('perfect pack')) {
          this.activeEntityId = 'perfect-pack';
          break;
        }
      }
    }

    // 2. Normalize and correct typos
    const normalized: NormalizedQuery = normalizeQuery(queryText);

    // 3. Classify intent and identify entity/referent
    const intentResult: IntentResult = detectIntent(normalized, this.activeEntityId || undefined);

    if (intentResult.targetEntityId) {
      this.activeEntityId = intentResult.targetEntityId;
    }

    // 4. Fuzzy weighted search across JSON databases
    const searchResults: SearchResult[] = searchKnowledge(normalized);

    // 5. Generate grounded response with real actions
    const response: GeneratedResponse = generateResponse(
      normalized,
      intentResult,
      searchResults,
      this.activeEntityId || undefined
    );

    if (response.entityId) {
      this.activeEntityId = response.entityId;
    }

    return response;
  }

  /**
   * Fast local streaming (instant emission without artificial delay)
   */
  public async streamConversation(
    messages: { role: string; content: string }[],
    callbacks: StreamCallbacks
  ): Promise<void> {
    try {
      const lastUser = messages.filter((m) => m.role === 'user').pop();
      const queryText = lastUser?.content || '';

      const history: ChatMessage[] = messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

      const response = await this.respond(queryText, history);
      
      // Emit the response immediately
      callbacks.onChunk(response.text);
      callbacks.onDone();
    } catch (err: any) {
      if (callbacks.onError) callbacks.onError(err.message || 'Assistant error');
      else callbacks.onDone();
    }
  }
}

export const defaultChatbot = new ChatbotBrain();
