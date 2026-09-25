/**
 * Echoless Conversational Memory Manager
 */

import { ConversationState, ConversationTurn } from './state';

const MAX_HISTORY_TURNS = 12;

export class ConversationMemory {
  private state: ConversationState;

  constructor(initialState?: ConversationState) {
    this.state = initialState || {
      recentEntities: [],
      recentTopics: [],
      recentIntents: [],
      languagePreference: 'en',
      turnCount: 0,
      turns: [],
      recentResponseOpenings: [],
      factsMentioned: new Set<string>(),
    };
  }

  public getState(): ConversationState {
    return this.state;
  }

  public recordTurn(turn: ConversationTurn) {
    this.state.turns.push(turn);
    if (this.state.turns.length > MAX_HISTORY_TURNS) {
      this.state.turns.shift();
    }

    this.state.turnCount++;
    this.state.recentIntents.unshift(turn.intent);
    if (this.state.recentIntents.length > 5) this.state.recentIntents.pop();

    if (turn.resolvedEntityId) {
      if (this.state.currentEntityId && this.state.currentEntityId !== turn.resolvedEntityId) {
        this.state.previousEntityId = this.state.currentEntityId;
      }
      this.state.currentEntityId = turn.resolvedEntityId;

      if (!this.state.recentEntities.includes(turn.resolvedEntityId)) {
        this.state.recentEntities.unshift(turn.resolvedEntityId);
        if (this.state.recentEntities.length > 6) this.state.recentEntities.pop();
      }
    }

    for (const factId of turn.factsUsed) {
      this.state.factsMentioned.add(factId);
    }

    // Extract opening 4 words for anti-repetition tracking
    const openingWords = turn.responseText.split(' ').slice(0, 4).join(' ').toLowerCase();
    if (openingWords) {
      this.state.recentResponseOpenings.unshift(openingWords);
      if (this.state.recentResponseOpenings.length > 5) {
        this.state.recentResponseOpenings.pop();
      }
    }

    if (turn.language) {
      this.state.languagePreference = turn.language;
    }
  }

  public isFactMentioned(factId: string): boolean {
    return this.state.factsMentioned.has(factId);
  }

  public reset() {
    this.state = {
      recentEntities: [],
      recentTopics: [],
      recentIntents: [],
      languagePreference: 'en',
      turnCount: 0,
      turns: [],
      recentResponseOpenings: [],
      factsMentioned: new Set<string>(),
    };
  }
}
