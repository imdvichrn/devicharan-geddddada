/**
 * Echoless Topic Management & Transitions
 */

import { ConversationState } from './state';
import { knowledgeGraph } from '../knowledge/graph';

export const MAJOR_DOMAINS = [
  'examflowos',
  'video',
  'web_ecosystems',
  'business_systems',
  'perfect_pack',
  'annapurna_foundation',
];

/**
 * Finds a suitable alternative entity when user says "no, the other one"
 */
export function findAlternativeEntity(state: ConversationState): string {
  const current = state.currentEntityId;

  // 1. If we have a previous entity different from current and is a valid major domain, use it
  if (
    state.previousEntityId &&
    state.previousEntityId !== current &&
    MAJOR_DOMAINS.includes(state.previousEntityId)
  ) {
    return state.previousEntityId;
  }

  // 2. Check recent entities stack in reverse for valid major domains
  for (const ent of state.recentEntities) {
    if (ent !== current && MAJOR_DOMAINS.includes(ent)) {
      return ent;
    }
  }

  // 3. Fall back to adjacent domain in portfolio
  if (current === 'examflowos') return 'video';
  if (current === 'video') return 'examflowos';
  if (current === 'web_ecosystems') return 'business_systems';
  if (current === 'business_systems') return 'web_ecosystems';
  if (current === 'perfect_pack') return 'video';
  if (current === 'annapurna_foundation') return 'examflowos';

  return 'examflowos';
}

/**
 * Determines if a new entity represents a significant topic switch
 */
export function isTopicSwitch(newEntityId: string | undefined, state: ConversationState): boolean {
  if (!newEntityId || !state.currentEntityId) return false;
  return newEntityId !== state.currentEntityId;
}
