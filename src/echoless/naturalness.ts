/**
 * Echoless Response Naturalness & Quality Layer
 * Dedicated pipeline between AI generation and the chat renderer.
 * Enforces:
 * 1. Repetition prevention across multi-turn memory
 * 2. Natural human writing rhythm (conversational prose vs. documentation)
 * 3. Markdown restraint (no gratuitous ### headers, bullet lists, or stars)
 * 4. Restrained emphasis (highlights meaningful concepts, not whole sentences)
 * 5. Elimination of AI signatures ("Sure!", "Great question!", "In conclusion:")
 * 6. Verified action IDs with Apple/macOS-inspired visual styling
 * 7. Multilingual purity (English, Telugu, Telglish, Hindi)
 */

import { ChatMessage, StructuredAction } from './types';
import { PUBLIC_LINKS, CV_METADATA } from './knowledge';
import {
  VerifiedActionId,
  ActionMetadata,
  VERIFIED_ACTIONS,
  defaultNaturalConversationEngine,
  NaturalConversationEngine,
  ResponseFingerprint,
  RefinedNaturalResponse,
} from './naturalConversationEngine';

export {
  type VerifiedActionId,
  type ActionMetadata,
  VERIFIED_ACTIONS,
  defaultNaturalConversationEngine,
  NaturalConversationEngine,
  type ResponseFingerprint,
  type RefinedNaturalResponse,
};

export interface NaturalnessCheckContext {
  userPrompt?: string;
  recentHistory?: ChatMessage[];
  taskType?: string;
}

export interface RefinedResponse {
  refinedText: string;
  actions: ActionMetadata[];
}

/**
 * 1. AI Signature & Bot Cliches Remover
 */
export function removeAISignatures(text: string): string {
  let cleaned = text;

  // Leading conversational fluff
  const leadingFluffRegex = /^(Sure(!|(\.|\,))|Certainly(!|(\.|\,))|Absolutely(!|(\.|\,))|Great question(!|(\.|\,))|Good question(!|(\.|\,))|Here's the thing:|Here is the thing:|To answer your question,|Allow me to explain:|As an AI assistant,|I'd be happy to help(!|(\.|\,))|I am here to help(!|(\.|\,))|Hey there!|Hello!)\s*/i;
  cleaned = cleaned.replace(leadingFluffRegex, '');

  // Trailing assistant filler / sign-offs
  const trailingFillerRegex = /(\n\n)?(Let me know if you (have any( other)? questions|need anything else|want to know more|have questions)[!.]?|Hope this helps[!.]?|Feel free to ask( if you need anything)?[!.]?|I'm here if you need anything[!.]?|Is there anything else I can help you with\??|Let me know if you'd like to explore anything else[!.]?)\s*$/i;
  cleaned = cleaned.replace(trailingFillerRegex, '');

  // Artificial summary/conclusion headers
  cleaned = cleaned.replace(/(\n+)?(\*\*|\#\#\#|\#\#)?(In conclusion|Conclusion|Summary|Key takeaway|Final thoughts):?(\*\*)?\s*/gi, '\n\n');

  return cleaned.trim();
}

/**
 * 2. Markdown Restraint & Natural Prose Formatter
 * Strips documentation-style markdown formatting (### headings, horizontal rules, decorative stars).
 */
export function applyMarkdownRestraint(text: string): string {
  let cleaned = text;

  // Remove decorative horizontal rules
  cleaned = cleaned.replace(/^---+$|^\*\*\*+$|^___+$/gm, '');

  // Remove markdown headings (e.g. ### Heading -> plain natural sentence)
  cleaned = cleaned.replace(/^#{1,4}\s+(.+)$/gm, (_match, title) => {
    // Keep title as a clean paragraph lead without hash symbols
    const cleanTitle = title.replace(/\*+/g, '').trim();
    return cleanTitle;
  });

  // Remove decorative standalone stars (e.g. *** or * * *)
  cleaned = cleaned.replace(/\s*\*{3,}\s*/g, ' ');

  // Convert mechanical single-word bullet lists into natural prose if short
  const lines = cleaned.split('\n');
  const bulletLines = lines.filter((l) => /^\s*[-*•]\s+/.test(l));
  
  // If the entire response is essentially a short 2-3 item bullet list, convert to readable prose
  if (bulletLines.length > 0 && bulletLines.length <= 3 && lines.length <= 6) {
    const listItems = bulletLines.map((l) => l.replace(/^\s*[-*•]\s+/, '').trim());
    if (listItems.every((item) => item.length < 60)) {
      const prose = listItems.join(', ');
      cleaned = lines
        .filter((l) => !/^\s*[-*•]\s+/.test(l))
        .concat(prose)
        .join('\n')
        .trim();
    }
  }

  // Normalize excessive blank lines (more than 2 consecutive newlines)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

/**
 * 3. Emphasis Engine
 * Strips accidental bolding of ordinary words or full sentences.
 * Retains bolding only for meaningful concepts, numbers, and proper titles.
 */
export function restrainEmphasis(text: string): string {
  let cleaned = text;

  // Un-bold entire sentences (e.g. **This is a completely bolded long sentence.**)
  cleaned = cleaned.replace(/\*\*([A-Z][^\*\n]{35,}\.?)\*\*/g, '$1');

  // Un-bold common ordinary grammatical words (e.g. **I**, **is**, **the**, **and**, **also**, **very**)
  const commonWords = ['I', 'is', 'are', 'was', 'the', 'a', 'an', 'and', 'also', 'very', 'really', 'just', 'that', 'this', 'to', 'for', 'in', 'on', 'with'];
  for (const word of commonWords) {
    const regex = new RegExp(`\\*\\*(${word})\\*\\*`, 'gi');
    cleaned = cleaned.replace(regex, '$1');
  }

  return cleaned;
}

/**
 * 4. Repetition & Contextual Continuity Engine
 * Inspects conversation history to prevent repeating the same opening sentence,
 * introductory clauses, or established facts.
 */
export function preventRepetitions(text: string, history: ChatMessage[] = []): string {
  if (!history || history.length === 0) {
    return text;
  }

  const assistantHistory = history
    .filter((m) => m.role === 'assistant')
    .map((m) => m.content.trim());

  if (assistantHistory.length === 0) {
    return text;
  }

  const lastAssistantMsg = assistantHistory[assistantHistory.length - 1] || '';
  let cleaned = text;

  // 1. Check if opening sentence is identical or near-identical to an earlier assistant message
  const currentFirstSentence = cleaned.split(/(?<=[.?!])\s+/)[0]?.trim();
  if (currentFirstSentence && currentFirstSentence.length > 15) {
    const alreadySaid = assistantHistory.some((hist) => hist.includes(currentFirstSentence));
    if (alreadySaid) {
      // Strip the duplicated introductory sentence
      cleaned = cleaned.slice(currentFirstSentence.length).trim();
      // Clean leading punctuation if leftover
      cleaned = cleaned.replace(/^[,\-–—.:\s]+/, '');
    }
  }

  // 2. Prevent repeating redundant introductions like "Geddada Devicharan is a..." or "ExamFlowOS is..."
  // if already established in earlier turns
  const introPatterns = [
    /^Geddada Devicharan is a digital product builder[^.\n]*\.\s*/i,
    /^Devicharan is a digital product builder[^.\n]*\.\s*/i,
    /^I am Echoless, Devicharan's personal assistant[^.\n]*\.\s*/i,
    /^I'm Echoless, Devicharan's personal assistant[^.\n]*\.\s*/i,
  ];

  const hasPriorContext = assistantHistory.length >= 1;
  if (hasPriorContext) {
    for (const pattern of introPatterns) {
      if (pattern.test(cleaned)) {
        cleaned = cleaned.replace(pattern, '').trim();
      }
    }
  }

  return cleaned.length > 0 ? cleaned : text;
}

/**
 * 5. Action / Link Psychology & Semantic Extraction
 * Extracts verified Action IDs based on semantic context and user intent.
 * Enforces Single-Intent Restraint: If the user asked for one specific thing (e.g., "what's his LinkedIn?"),
 * only return that one action rather than a wall of links.
 */
export function extractVerifiedActions(
  text: string,
  userPrompt: string = ''
): { cleanedText: string; actions: ActionMetadata[] } {
  const p = userPrompt.toLowerCase();
  const t = text.toLowerCase();
  const matchedActions: ActionMetadata[] = [];
  const seenIds = new Set<VerifiedActionId>();

  const addAction = (id: VerifiedActionId) => {
    if (!seenIds.has(id)) {
      seenIds.add(id);
      matchedActions.push(VERIFIED_ACTIONS[id]);
    }
  };

  // Check single intent first
  const isSocialIntent =
    p.includes('social') ||
    p.includes('linkedin') ||
    p.includes('instagram') ||
    p.includes('github') ||
    p.includes('facebook') ||
    p.includes('twitter');

  if (isSocialIntent) {
    if (p.includes('linkedin')) addAction('linkedin');
    if (p.includes('instagram') || p.includes('insta') || p.includes('ig')) addAction('instagram');
    if (p.includes('github') || p.includes('git')) addAction('github');
    if (p.includes('facebook') || p.includes('fb')) addAction('facebook');

    // If generic "social media" requested, give the primary two
    if (matchedActions.length === 0) {
      addAction('linkedin');
      addAction('github');
    }
  } else if (p.includes('cv') || p.includes('resume') || t.includes('geddada_devicharan_cv.pdf') || t.includes('verified cv')) {
    addAction('cv');
  } else if (p.includes('contact') || p.includes('hire') || p.includes('email') || p.includes('whatsapp') || p.includes('reach')) {
    addAction('whatsapp');
    addAction('email');
  } else if (p.includes('examflow') || p.includes('cbt') || t.includes('examflowos.in')) {
    addAction('examflowos');
  } else if (p.includes('video') || p.includes('edit') || p.includes('davinci') || p.includes('color') || t.includes('/video')) {
    addAction('video');
  } else if (p.includes('software') || p.includes('product') || t.includes('/software')) {
    addAction('software');
  } else if (p.includes('system') || p.includes('automation') || p.includes('n8n') || t.includes('/systems')) {
    addAction('systems');
  } else {
    // Contextual scan of the generated response
    if (t.includes('/geddada_devicharan_cv.pdf') || t.includes('download cv') || t.includes('view cv')) {
      addAction('cv');
    }
    if (t.includes('examflowos.in') || t.includes('examflow')) {
      addAction('examflowos');
    }
    if (t.includes('/video') && matchedActions.length < 2) {
      addAction('video');
    }
    if (t.includes('/software') && matchedActions.length < 2) {
      addAction('software');
    }
    if ((t.includes('wa.me') || t.includes('whatsapp')) && matchedActions.length < 2) {
      addAction('whatsapp');
    }
    if (t.includes('linkedin.com') && matchedActions.length < 2) {
      addAction('linkedin');
    }
    if (t.includes('github.com') && matchedActions.length < 2) {
      addAction('github');
    }
    if (t.includes('instagram.com') && matchedActions.length < 2) {
      addAction('instagram');
    }
  }

  // Max 2 actions per response to prevent link fatigue
  const finalActions = matchedActions.slice(0, 2);

  // Clean raw links from text so they don't appear as naked unformatted URLs
  let cleanedText = text
    .replace(/\[([^\]]+)\]\((?:https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, '$1')
    .replace(/https?:\/\/[^\s)<>]+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return { cleanedText, actions: finalActions };
}

/**
 * 6. Multilingual Preservation Check
 * Ensures structural English artifacts are not injected into Telugu or Hindi responses.
 */
export function preserveMultilingualIntegrity(text: string): string {
  const isTelugu = /[\u0C00-\u0C7F]/.test(text);
  const isHindi = /[\u0900-\u097F]/.test(text);

  if (!isTelugu && !isHindi) {
    return text;
  }

  let cleaned = text;

  // Remove English headings that sometimes get generated before Telugu text
  const englishHeadings = [
    /^About Devicharan:?\s*/i,
    /^Overview:?\s*/i,
    /^Key Details:?\s*/i,
    /^Details:?\s*/i,
    /^Background:?\s*/i,
  ];

  for (const heading of englishHeadings) {
    cleaned = cleaned.replace(heading, '');
  }

  return cleaned.trim();
}

/**
 * 7. Master Final Check Before Rendering
 * Runs the full naturalness and quality inspection pipeline via NaturalConversationEngine.
 */
export function runNaturalnessPipeline(
  rawText: string,
  context: NaturalnessCheckContext = {}
): RefinedResponse {
  const result = defaultNaturalConversationEngine.process(rawText, {
    userPrompt: context.userPrompt,
    recentHistory: context.recentHistory,
    taskType: context.taskType,
  });

  return {
    refinedText: result.refinedText,
    actions: result.actions,
  };
}
