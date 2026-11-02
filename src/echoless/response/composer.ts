/**
 * Echoless Deterministic Sentence Composer
 * 
 * Assembles verified natural language sentences from language dictionaries
 * with variation, rhythm adjustments, and anti-repetition guards.
 */

import { ResponsePlan } from './planner';
import { ConversationState } from '../conversation/state';
import { selectVariation, selectNextVariation } from './variation';
import { isRepetitive } from './repetition';
import { validateAndCleanResponse } from './validator';

import { ENGLISH_COMPOSER } from '../language/english';
import { TELUGU_COMPOSER } from '../language/telugu';
import { TELGLISH_COMPOSER } from '../language/telglish';
import { HINDI_COMPOSER } from '../language/hindi';
import { URDU_COMPOSER } from '../language/urdu';

export function getLanguageComposer(lang: string) {
  switch (lang) {
    case 'te':
      return TELUGU_COMPOSER;
    case 'telglish':
      return TELGLISH_COMPOSER;
    case 'hi':
      return HINDI_COMPOSER;
    case 'ur':
      return URDU_COMPOSER;
    default:
      return ENGLISH_COMPOSER;
  }
}

export function composeResponse(
  plan: ResponsePlan,
  turnCount: number,
  state: ConversationState,
  customClarification?: string
): { text: string; actionIds: string[] } {
  const composer = getLanguageComposer(plan.language);

  // 1. Clarification / Low Confidence
  if (plan.domain === 'clarification') {
    const raw = customClarification || selectVariation(composer.clarifications, turnCount);
    return {
      text: validateAndCleanResponse(raw),
      actionIds: [],
    };
  }

  // 2. Greeting
  if (plan.domain === 'greeting') {
    const raw = selectVariation(composer.greetings, turnCount);
    return {
      text: validateAndCleanResponse(raw),
      actionIds: [],
    };
  }

  // 3. Language Ack
  if (plan.domain === 'language_ack') {
    return {
      text: validateAndCleanResponse(composer.languageAck),
      actionIds: [],
    };
  }

  // 4. Social List
  if (plan.domain === 'socials_list') {
    return {
      text: validateAndCleanResponse(composer.socials.list),
      actionIds: plan.actionIds,
    };
  }

  // 5. Individual Social
  if (plan.domain === 'social_single') {
    const channel = plan.socialChannelKey || 'instagram';
    const raw = (composer.socials as any)[channel] || composer.socials.instagram;
    return {
      text: validateAndCleanResponse(raw),
      actionIds: plan.actionIds,
    };
  }

  // 6. Direct Contact
  if (plan.domain === 'contact') {
    return {
      text: validateAndCleanResponse(composer.contact),
      actionIds: plan.actionIds,
    };
  }

  // 7. Builds summary
  if (plan.domain === 'builds_summary') {
    let raw = selectVariation(composer.buildsSummary, turnCount);
    if (isRepetitive(raw, state)) {
      raw = selectNextVariation(composer.buildsSummary, turnCount);
    }
    return {
      text: validateAndCleanResponse(raw),
      actionIds: plan.actionIds,
    };
  }

  // 8. Domain Entities (examflowos, video, software, perfect_pack, annapurna, web, systems, cv, devicharan)
  const domainObj = (composer as any)[plan.domain] || (composer as any).examflowos;

  let candidateText = '';

  if (plan.domain === 'video' && plan.subTopic === 'editing' && domainObj.editing) {
    candidateText = selectVariation(domainObj.editing, turnCount);
  } else if (plan.domain === 'video' && plan.subTopic === 'color_grading' && domainObj.colorGrading) {
    candidateText = selectVariation(domainObj.colorGrading, turnCount);
  } else if (plan.depth === 'why' && domainObj.why) {
    candidateText = domainObj.why;
  } else if (plan.depth === 'expand' && domainObj.expand) {
    candidateText = selectVariation(domainObj.expand, turnCount);
    if (isRepetitive(candidateText, state)) {
      candidateText = selectNextVariation(domainObj.expand, turnCount);
    }
  } else {
    // Default explain
    const explainOptions = domainObj.explain || domainObj;
    candidateText = selectVariation(explainOptions, turnCount);
    if (isRepetitive(candidateText, state)) {
      candidateText = selectNextVariation(explainOptions, turnCount);
    }
  }

  return {
    text: validateAndCleanResponse(candidateText),
    actionIds: plan.actionIds,
  };
}
