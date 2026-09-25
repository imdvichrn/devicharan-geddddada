/**
 * Echoless Anti-Repetition Filter
 * 
 * Inspects candidate responses against recent turns and adjusts phrasing
 * if recent openings or whole responses are too similar.
 */

import { ConversationState } from '../conversation/state';

export function isRepetitive(candidate: string, state: ConversationState): boolean {
  if (!candidate || state.turns.length === 0) return false;

  const candidateNorm = candidate.trim().toLowerCase();
  const lastTurn = state.turns[state.turns.length - 1];

  // 1. Exact or near-exact match with last response
  if (lastTurn && lastTurn.responseText.trim().toLowerCase() === candidateNorm) {
    return true;
  }

  // 2. Exact match on opening 4 words
  const candidateOpening = candidateNorm.split(' ').slice(0, 4).join(' ');
  for (const prevOpening of state.recentResponseOpenings) {
    if (prevOpening === candidateOpening && candidateOpening.length > 8) {
      return true;
    }
  }

  return false;
}
