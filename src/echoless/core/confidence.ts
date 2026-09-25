/**
 * Echoless Confidence Evaluator
 * 
 * Determines whether the engine has sufficient certainty to respond with facts,
 * or should gracefully ask a brief, natural clarification question.
 */

import { ParsedInput } from './parser';
import { IntentType } from './intent';
import { ResolvedContext } from './resolver';

export const CONFIDENCE_THRESHOLD = 0.6;

export interface ConfidenceEvaluation {
  score: number;
  isConfident: boolean;
  actionRequired: 'RESPOND' | 'ASK_CLARIFICATION' | 'GREETING';
  clarificationPrompt?: string;
}

export function evaluateConfidence(
  parsed: ParsedInput,
  intent: IntentType,
  context: ResolvedContext
): ConfidenceEvaluation {
  // 1. Single-word ambiguous questions with no active entity: "what", "huh", "why"
  if (parsed.isAmbiguous && !context.entityId) {
    let prompt = 'What part?';
    if (parsed.language === 'te') {
      prompt = 'ఏ విషయం గురించి తెలుసుకోవాలనుకుంటున్నారు?';
    } else if (parsed.language === 'telglish') {
      prompt = 'Em vishayam gurinchi thelusukovalani anukuntunnaru?';
    } else if (parsed.language === 'hi') {
      prompt = 'Kis cheez ke baare mein janna chahte hain?';
    } else if (parsed.language === 'ur') {
      prompt = 'Aap kis cheez ke baare mein janana chahte hain?';
    }

    return {
      score: 0.2,
      isConfident: false,
      actionRequired: 'ASK_CLARIFICATION',
      clarificationPrompt: prompt,
    };
  }

  // 2. Greetings
  if (intent === 'GREETING') {
    return {
      score: 0.95,
      isConfident: true,
      actionRequired: 'GREETING',
    };
  }

  // 3. Clear intent with resolved entity or multi-item intent
  if (
    context.entityId ||
    intent === 'LIST_SOCIALS' ||
    intent === 'LIST_BUILDS' ||
    intent === 'CONTACT' ||
    intent === 'CHANGE_LANGUAGE'
  ) {
    return {
      score: Math.max(context.confidence, 0.8),
      isConfident: true,
      actionRequired: 'RESPOND',
    };
  }

  // 4. Low confidence fallback
  if (context.confidence < CONFIDENCE_THRESHOLD) {
    let prompt = 'What part do you mean?';
    if (parsed.language === 'te') {
      prompt = 'ఏ విషయం గురించి వివరాలు కావాలి?';
    } else if (parsed.language === 'telglish') {
      prompt = 'Ekkadi vishayam gurinchi thelusukovali?';
    } else if (parsed.language === 'hi') {
      prompt = 'Aap kis bare mein puch rahe hain?';
    } else if (parsed.language === 'ur') {
      prompt = 'Aap kis bare mein puch rahe hain?';
    }

    return {
      score: context.confidence,
      isConfident: false,
      actionRequired: 'ASK_CLARIFICATION',
      clarificationPrompt: prompt,
    };
  }

  return {
    score: context.confidence,
    isConfident: true,
    actionRequired: 'RESPOND',
  };
}
