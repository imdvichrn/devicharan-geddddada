/**
 * Echoless Deterministic Conversational Engine
 * 
 * Flow:
 * User Input
 *   ↓
 * Understanding / Parser (Language, Tokens, Cues)
 *   ↓
 * Intent Classifier
 *   ↓
 * Entity Recognition (Deterministic + Fuzzy Aliases)
 *   ↓
 * Context & Referent Resolver (Conversation State & History)
 *   ↓
 * Knowledge Graph & Verified Facts
 *   ↓
 * Response Planner
 *   ↓
 * Sentence Composer (Multi-Language)
 *   ↓
 * Anti-Repetition & Rhythm Variation
 *   ↓
 * Output Validator (Fact bounds & Zero URL Leakage)
 *   ↓
 * Verified Action IDs & Stream
 */

import { parseInput, SupportedLanguage } from './core/parser';
import { classifyIntent } from './core/intent';
import { extractEntities } from './core/entities';
import { resolveContext } from './core/resolver';
import { evaluateConfidence } from './core/confidence';
import { planResponse } from './response/planner';
import { composeResponse } from './response/composer';
import { ConversationMemory } from './conversation/memory';
import { ConversationTurn } from './conversation/state';
import { getVerifiedActions } from './knowledge/actions';

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
  private memory: ConversationMemory;

  constructor() {
    this.memory = new ConversationMemory();
  }

  /**
   * Primary single-turn / multi-turn conversational response generator
   */
  public async respond(
    userInput: string,
    historyMessages?: { role: string; content: string }[]
  ): Promise<EcholessResponse> {
    // Reconstruct conversation state if multi-turn history is provided
    if (historyMessages && historyMessages.length > 1) {
      this.reconstructStateFromHistory(historyMessages.slice(0, -1));
    }

    const state = this.memory.getState();

    // 1. Parse input
    const parsed = parseInput(userInput, state.languagePreference);

    // 2. Classify intent
    const hasActiveContext = Boolean(state.currentEntityId);
    const intentMatch = classifyIntent(parsed, hasActiveContext);

    // 3. Extract entities (deterministic + fuzzy)
    const extractedEntities = extractEntities(parsed);

    // 4. Resolve Context & Referents ("it", "tell me more", "the other one", "why?")
    const resolvedContext = resolveContext(
      parsed,
      intentMatch.type,
      extractedEntities,
      state
    );

    // 5. Evaluate Confidence
    const confidenceEval = evaluateConfidence(
      parsed,
      intentMatch.type,
      resolvedContext
    );

    // 6. Plan Response
    const plan = planResponse(
      intentMatch.type,
      resolvedContext.entityId,
      parsed.language,
      state,
      confidenceEval.isConfident,
      confidenceEval.clarificationPrompt
    );

    // 7. Compose Natural Sentences from Verified Knowledge
    const { text, actionIds } = composeResponse(
      plan,
      state.turnCount,
      state,
      confidenceEval.clarificationPrompt
    );

    // 8. Record Turn in Conversation Memory
    const turn: ConversationTurn = {
      id: `turn_${Date.now()}`,
      timestamp: Date.now(),
      userText: userInput,
      intent: intentMatch.type,
      resolvedEntityId: resolvedContext.entityId,
      responseText: text,
      actionIds,
      language: parsed.language,
      factsUsed: [],
    };
    this.memory.recordTurn(turn);

    return {
      text,
      actionIds,
      confidence: confidenceEval.score,
      intent: intentMatch.type,
      entityId: resolvedContext.entityId,
      language: parsed.language,
    };
  }

  /**
   * Stream a conversation turn with realistic character/word delta pacing
   */
  public async streamConversation(
    messages: { role: string; content: string }[],
    callbacks: StreamCallbacks,
    _options?: any
  ): Promise<void> {
    try {
      const lastMessage = messages[messages.length - 1];
      const userText = lastMessage?.role === 'user' ? lastMessage.content : '';

      const response = await this.respond(userText, messages);
      const fullText = response.text;

      // Stream words smoothly
      const words = fullText.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        await callbacks.onChunk(chunk);
        // Realistic micro-delay for conversational feel
        await new Promise((resolve) => setTimeout(resolve, 18));
      }

      if (callbacks.onDone) {
        await callbacks.onDone();
      }
    } catch (err) {
      if (callbacks.onError) {
        await callbacks.onError(err);
      } else {
        await callbacks.onChunk("What part would you like to know about?");
        if (callbacks.onDone) await callbacks.onDone();
      }
    }
  }

  public getHonestUnavailableResponse(): string {
    return "What part of Devicharan's work would you like to explore?";
  }

  public getMemory(): ConversationMemory {
    return this.memory;
  }

  public resetMemory(): void {
    this.memory.reset();
  }

  /**
   * Fast state reconstruction from preceding message turns
   */
  private reconstructStateFromHistory(messages: { role: string; content: string }[]) {
    this.memory.reset();
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (msg.role === 'user') {
        const parsed = parseInput(msg.content);
        const entities = extractEntities(parsed);
        const intent = classifyIntent(parsed);
        const context = resolveContext(parsed, intent.type, entities, this.memory.getState());

        const assistantMsg = messages[i + 1]?.role === 'assistant' ? messages[i + 1].content : '';
        this.memory.recordTurn({
          id: `hist_${i}`,
          timestamp: Date.now() - (messages.length - i) * 1000,
          userText: msg.content,
          intent: intent.type,
          resolvedEntityId: context.entityId,
          responseText: assistantMsg,
          actionIds: [],
          language: parsed.language,
          factsUsed: [],
        });
      }
    }
  }
}

export const defaultEngine = new EcholessEngine();
