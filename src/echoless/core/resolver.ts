/**
 * Echoless Context & Referent Resolver
 * 
 * Resolves referents ("it", "that", "tell me more", "the other one", "why?")
 * against current conversational state and knowledge graph.
 */

import { ParsedInput } from './parser';
import { IntentType } from './intent';
import { ExtractedEntity } from './entities';
import { ConversationState } from '../conversation/state';
import { findAlternativeEntity } from '../conversation/topic';
import { knowledgeGraph } from '../knowledge/graph';

export interface ResolvedContext {
  entityId?: string;
  topic?: string;
  isContinuation: boolean;
  isCorrection: boolean;
  intent: IntentType;
  confidence: number;
}

export function resolveContext(
  parsed: ParsedInput,
  intent: IntentType,
  extractedEntities: ExtractedEntity[],
  state: ConversationState
): ResolvedContext {
  // 1. Explicit user correction / alternative ("no, the other one")
  if (intent === 'SWITCH_OTHER') {
    const alternativeId = findAlternativeEntity(state);
    return {
      entityId: alternativeId,
      topic: alternativeId,
      isContinuation: false,
      isCorrection: true,
      intent: 'EXPLAIN',
      confidence: 0.95,
    };
  }

  // 2. Follow-up / Expansion ("tell me more", "why?")
  if (intent === 'EXPAND' || intent === 'WHY') {
    const activeEntity = state.currentEntityId || (extractedEntities[0]?.node.id) || 'examflowos';
    return {
      entityId: activeEntity,
      topic: activeEntity,
      isContinuation: true,
      isCorrection: false,
      intent,
      confidence: 0.92,
    };
  }

  // 3. Social Media Lists / Channel Requests
  if (intent === 'LIST_SOCIALS') {
    return {
      entityId: 'social_channels',
      topic: 'socials',
      isContinuation: false,
      isCorrection: false,
      intent: 'LIST_SOCIALS',
      confidence: 0.98,
    };
  }

  if (intent === 'OPEN_SOCIAL') {
    // Check if an explicit social entity was extracted
    const socialEntity = extractedEntities.find(
      (e) => e.node.type === 'social_channel' || e.node.type === 'contact_channel'
    );
    if (socialEntity) {
      return {
        entityId: socialEntity.node.id,
        topic: 'social',
        isContinuation: false,
        isCorrection: false,
        intent: 'OPEN_SOCIAL',
        confidence: 0.96,
      };
    }
  }

  // 4. List Builds / Projects
  if (intent === 'LIST_BUILDS') {
    return {
      entityId: 'devicharan_builds',
      topic: 'projects',
      isContinuation: false,
      isCorrection: false,
      intent: 'LIST_BUILDS',
      confidence: 0.95,
    };
  }

  // 5. Contact
  if (intent === 'CONTACT') {
    return {
      entityId: 'contact_channels',
      topic: 'contact',
      isContinuation: false,
      isCorrection: false,
      intent: 'CONTACT',
      confidence: 0.95,
    };
  }

  // 6. Direct Entity match
  if (extractedEntities.length > 0) {
    const primary = extractedEntities[0];
    return {
      entityId: primary.node.id,
      topic: primary.node.id,
      isContinuation: state.currentEntityId === primary.node.id,
      isCorrection: false,
      intent,
      confidence: primary.confidence,
    };
  }

  // 7. Check pronoun referents ("it", "that", "this")
  const norm = parsed.normalized;
  if (
    norm.includes(' it ') ||
    norm.endsWith(' it') ||
    norm.includes(' this ') ||
    norm.endsWith(' this') ||
    norm.includes(' that ') ||
    norm.endsWith(' that')
  ) {
    if (state.currentEntityId) {
      return {
        entityId: state.currentEntityId,
        topic: state.currentEntityId,
        isContinuation: true,
        isCorrection: false,
        intent,
        confidence: 0.88,
      };
    }
  }

  // 8. If intent is EXPLAIN and no entity detected:
  // If state has an active entity, we might be continuing it
  if (state.currentEntityId && (parsed.cleanTokens.length <= 3)) {
    return {
      entityId: state.currentEntityId,
      topic: state.currentEntityId,
      isContinuation: true,
      isCorrection: false,
      intent,
      confidence: 0.7,
    };
  }

  return {
    entityId: undefined,
    topic: undefined,
    isContinuation: false,
    isCorrection: false,
    intent,
    confidence: 0.3,
  };
}
