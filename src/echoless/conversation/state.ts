/**
 * Echoless Conversation State & Memory Types
 * 
 * Tracks conversation context across multi-turn interactions.
 */

import { SupportedLanguage } from '../core/parser';
import { IntentType } from '../core/intent';

export interface ConversationTurn {
  id: string;
  timestamp: number;
  userText: string;
  intent: IntentType;
  resolvedEntityId?: string;
  responseText: string;
  actionIds: string[];
  language: SupportedLanguage;
  factsUsed: string[];
}

export interface ConversationState {
  currentEntityId?: string;
  currentTopic?: string;
  previousEntityId?: string;
  recentEntities: string[]; // Stack of recently discussed entity IDs
  recentTopics: string[];
  recentIntents: IntentType[];
  languagePreference: SupportedLanguage;
  turnCount: number;
  turns: ConversationTurn[];
  recentResponseOpenings: string[]; // For anti-repetition check
  factsMentioned: Set<string>; // Fact IDs already communicated to avoid stale repeats
}

export function createInitialState(language: SupportedLanguage = 'en'): ConversationState {
  return {
    currentEntityId: undefined,
    currentTopic: undefined,
    previousEntityId: undefined,
    recentEntities: [],
    recentTopics: [],
    recentIntents: [],
    languagePreference: language,
    turnCount: 0,
    turns: [],
    recentResponseOpenings: [],
    factsMentioned: new Set<string>(),
  };
}
