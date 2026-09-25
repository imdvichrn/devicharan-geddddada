/**
 * Echoless Intent Classifier
 * 
 * Deterministically maps normalized user input and syntactic cues into discrete intents.
 */

import { ParsedInput } from './parser';

export type IntentType =
  | 'EXPLAIN'
  | 'EXPAND'
  | 'WHY'
  | 'LIST_BUILDS'
  | 'LIST_SOCIALS'
  | 'OPEN_SOCIAL'
  | 'CONTACT'
  | 'NAVIGATE'
  | 'SWITCH_OTHER'
  | 'CHANGE_LANGUAGE'
  | 'GREETING'
  | 'CASUAL'
  | 'AMBIGUOUS'
  | 'UNKNOWN';

export interface IntentMatch {
  type: IntentType;
  confidence: number;
  extractedContext?: string;
}

export function classifyIntent(parsed: ParsedInput, hasActiveContext: boolean = false): IntentMatch {
  const norm = parsed.normalized;
  const raw = parsed.raw.toLowerCase();

  // 1. Ambiguity Guard: "what", "huh" with no other tokens
  if (parsed.isAmbiguous && !hasActiveContext) {
    return { type: 'AMBIGUOUS', confidence: 0.95 };
  }

  // 2. Language switch requests
  if (
    norm.includes('telugulo cheppu') ||
    norm.includes('telugu lo cheppu') ||
    raw.includes('తెలుగులో చెప్పు') ||
    raw.includes('తెలుగులో మాట్లాడు') ||
    norm.includes('speak in telugu') ||
    norm.includes('in telugu') ||
    norm.includes('hindi me') ||
    norm.includes('urdu me') ||
    norm.includes('in english')
  ) {
    return { type: 'CHANGE_LANGUAGE', confidence: 0.98 };
  }

  // 3. User Correction / Switch to Other: "no the other one", "other one", "not this"
  if (
    norm === 'no the other one' ||
    norm === 'the other one' ||
    norm === 'other one' ||
    norm === 'not this' ||
    norm === 'not that' ||
    norm.includes('the other project') ||
    norm.includes('the other work') ||
    norm.includes('inkoti') ||
    norm.includes('vereedi')
  ) {
    return { type: 'SWITCH_OTHER', confidence: 0.95 };
  }

  // 4. Expand / Follow-up: "tell me more", "more", "what else", "continue"
  if (
    norm === 'tell me more' ||
    norm === 'more' ||
    norm === 'more details' ||
    norm === 'tell me more about it' ||
    norm === 'what else' ||
    norm === 'inkem undi' ||
    norm === 'inkemi chesadu' ||
    norm === 'aur batao' ||
    norm === 'kuch aur' ||
    norm.startsWith('more about') ||
    norm.startsWith('tell more') ||
    norm === 'explain more'
  ) {
    return { type: 'EXPAND', confidence: 0.95 };
  }

  // 5. "Why" inquiries: "why did he build it?", "why?", "enduku"
  if (
    norm === 'why' ||
    norm === 'why did he build it' ||
    norm === 'why did he build this' ||
    norm.startsWith('why did he') ||
    norm.startsWith('why he') ||
    norm.startsWith('why build') ||
    norm === 'enduku' ||
    norm === 'kyun'
  ) {
    return { type: 'WHY', confidence: 0.92 };
  }

  // 6. List all socials: "give me all links for his social media", "all socials", "social media links"
  if (
    norm.includes('all links') ||
    norm.includes('all social') ||
    norm.includes('social media links') ||
    norm.includes('all his links') ||
    norm.includes('his socials') ||
    norm.includes('social links') ||
    norm === 'give me all links for his social media' ||
    norm === 'socials'
  ) {
    return { type: 'LIST_SOCIALS', confidence: 0.98 };
  }

  // 7. Individual Social / Fuzzy Social Names: "his instagram", "facboook", "linkdin", "git hub", "twitter"
  const socialKeywords = [
    'instagram', 'insta', 'instgram', 'instagarm', 'ig',
    'facebook', 'facboook', 'facbook', 'fb',
    'linkedin', 'linkdin', 'linked in',
    'github', 'git hub',
    'twitter', 'x com'
  ];
  for (const s of socialKeywords) {
    if (norm === s || norm === `his ${s}` || norm === `${s} link` || norm === `${s} profile` || norm.includes(s)) {
      return { type: 'OPEN_SOCIAL', confidence: 0.95, extractedContext: s };
    }
  }

  // 8. Contact inquiries: "contact", "whatsapp", "email", "how to contact him"
  if (
    norm.includes('whatsapp') ||
    norm.includes('whats app') ||
    norm.includes('email') ||
    norm.includes('phone') ||
    norm.includes('contact') ||
    norm.includes('reach him') ||
    norm.includes('hire him') ||
    norm.includes('message him') ||
    norm.includes('book a call')
  ) {
    return { type: 'CONTACT', confidence: 0.92 };
  }

  // 9. List builds / projects: "what did he build?", "what has he made?", "his projects", "atanu em chesadu"
  if (
    norm === 'what did he build' ||
    norm === 'what did he make' ||
    norm === 'what has he built' ||
    norm === 'what has he made' ||
    norm === 'his projects' ||
    norm === 'his software' ||
    norm === 'what are his projects' ||
    norm.includes('what did he build') ||
    norm.includes('what has he built') ||
    norm.includes('atanu em chesadu') ||
    norm.includes('atanu em build chesadu') ||
    norm.includes('emi build chesadu') ||
    norm.includes('em build chesadu') ||
    norm.includes('emi chesadu') ||
    norm.includes('em chesadu') ||
    norm.includes('kya banaya') ||
    norm.includes('kya banaye') ||
    raw.includes('అతను ఏం చేశాడు') ||
    raw.includes('అతను ఏం నిర్మించాడు') ||
    raw.includes('ఏం చేశాడు') ||
    raw.includes('क्या बनाया') ||
    raw.includes('क्या बनाया है') ||
    raw.includes('क्या किया है') ||
    raw.includes('क्या किया')
  ) {
    return { type: 'LIST_BUILDS', confidence: 0.95 };
  }

  // 10. Greetings & Casual
  if (
    norm === 'hi' ||
    norm === 'hello' ||
    norm === 'hey' ||
    norm === 'hey there' ||
    norm === 'who are you' ||
    norm === 'what is your name' ||
    norm === 'namaste' ||
    norm === 'namaskaram'
  ) {
    return { type: 'GREETING', confidence: 0.9 };
  }

  // 11. Navigation / Section Requests
  if (
    norm.startsWith('show me ') ||
    norm.startsWith('go to ') ||
    norm.startsWith('open ') ||
    norm === 'video' ||
    norm === 'software' ||
    norm === 'systems' ||
    norm === 'web' ||
    norm === 'cv' ||
    norm === 'resume'
  ) {
    return { type: 'NAVIGATE', confidence: 0.85 };
  }

  // 12. General Explain / Inquire: default for questions containing entities or keywords
  if (
    parsed.questionWord ||
    norm.startsWith('tell me about') ||
    norm.startsWith('what is') ||
    norm.startsWith('who is') ||
    norm.includes('about')
  ) {
    return { type: 'EXPLAIN', confidence: 0.8 };
  }

  return { type: 'UNKNOWN', confidence: 0.4 };
}
