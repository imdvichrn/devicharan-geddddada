/**
 * Echoless Response Planner
 * 
 * Selects verified knowledge domain, conversational depth, and verified actions.
 */

import { IntentType } from '../core/intent';
import { SupportedLanguage } from '../core/parser';
import { ConversationState } from '../conversation/state';

export type ResponseDomain =
  | 'examflowos'
  | 'video'
  | 'perfect_pack'
  | 'annapurna'
  | 'web'
  | 'systems'
  | 'cv'
  | 'devicharan'
  | 'socials_list'
  | 'social_single'
  | 'contact'
  | 'builds_summary'
  | 'greeting'
  | 'clarification'
  | 'language_ack';

export type ResponseDepth = 'explain' | 'expand' | 'why' | 'list' | 'single';

export interface ResponsePlan {
  domain: ResponseDomain;
  depth: ResponseDepth;
  actionIds: string[];
  socialChannelKey?: string;
  language: SupportedLanguage;
  entityId?: string;
}

export function planResponse(
  intent: IntentType,
  resolvedEntityId: string | undefined,
  language: SupportedLanguage,
  state: ConversationState,
  isConfident: boolean,
  clarificationPrompt?: string
): ResponsePlan {
  // 1. Ambiguous / Low confidence
  if (!isConfident) {
    return {
      domain: 'clarification',
      depth: 'single',
      actionIds: [],
      language,
    };
  }

  // 2. Greetings
  if (intent === 'GREETING') {
    return {
      domain: 'greeting',
      depth: 'single',
      actionIds: [],
      language,
    };
  }

  // 3. Language change acknowledgement
  if (intent === 'CHANGE_LANGUAGE') {
    return {
      domain: 'language_ack',
      depth: 'single',
      actionIds: [],
      language,
    };
  }

  // 4. Social Lists & Individual Socials
  if (intent === 'LIST_SOCIALS') {
    return {
      domain: 'socials_list',
      depth: 'list',
      actionIds: ['instagram', 'github', 'linkedin', 'facebook', 'twitter'],
      language,
    };
  }

  if (intent === 'OPEN_SOCIAL') {
    let channel = 'instagram';
    let actionId = 'instagram';

    if (resolvedEntityId === 'social_github') {
      channel = 'github';
      actionId = 'github';
    } else if (resolvedEntityId === 'social_linkedin') {
      channel = 'linkedin';
      actionId = 'linkedin';
    } else if (resolvedEntityId === 'social_facebook') {
      channel = 'facebook';
      actionId = 'facebook';
    } else if (resolvedEntityId === 'social_twitter') {
      channel = 'twitter';
      actionId = 'twitter';
    }

    return {
      domain: 'social_single',
      depth: 'single',
      actionIds: [actionId],
      socialChannelKey: channel,
      language,
    };
  }

  // 5. Direct Contact
  if (intent === 'CONTACT') {
    return {
      domain: 'contact',
      depth: 'single',
      actionIds: ['whatsapp', 'email', 'contact'],
      language,
    };
  }

  // 6. List Builds / Projects Summary
  if (intent === 'LIST_BUILDS') {
    return {
      domain: 'builds_summary',
      depth: 'list',
      actionIds: ['examflowos', 'video', 'software', 'systems'],
      language,
    };
  }

  // 7. Entity Depth resolution
  const entity = resolvedEntityId || 'examflowos';
  let depth: ResponseDepth = 'explain';

  if (intent === 'EXPAND') {
    depth = 'expand';
  } else if (intent === 'WHY') {
    depth = 'why';
  }

  // Map entityId to Domain and Action IDs
  if (entity === 'examflowos') {
    return {
      domain: 'examflowos',
      depth,
      actionIds: ['examflowos', 'software'],
      language,
      entityId: entity,
    };
  }

  if (entity === 'video') {
    return {
      domain: 'video',
      depth,
      actionIds: ['video'],
      language,
      entityId: entity,
    };
  }

  if (entity === 'perfect_pack') {
    return {
      domain: 'perfect_pack',
      depth,
      actionIds: ['perfect_pack', 'video'],
      language,
      entityId: entity,
    };
  }

  if (entity === 'annapurna_foundation') {
    return {
      domain: 'annapurna',
      depth,
      actionIds: ['annapurna'],
      language,
      entityId: entity,
    };
  }

  if (entity === 'web_ecosystems') {
    return {
      domain: 'web',
      depth,
      actionIds: ['web'],
      language,
      entityId: entity,
    };
  }

  if (entity === 'business_systems') {
    return {
      domain: 'systems',
      depth,
      actionIds: ['systems'],
      language,
      entityId: entity,
    };
  }

  if (entity === 'doc_cv') {
    return {
      domain: 'cv',
      depth,
      actionIds: ['cv'],
      language,
      entityId: entity,
    };
  }

  // Default to devicharan profile
  return {
    domain: 'devicharan',
    depth,
    actionIds: ['contact', 'software'],
    language,
    entityId: 'devicharan',
  };
}
