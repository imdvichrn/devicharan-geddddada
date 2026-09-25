/**
 * Echoless Core Language Parser
 * 
 * Tokenizes, normalizes, detects user language, and extracts syntactic cues.
 */

export type SupportedLanguage = 'en' | 'te' | 'telglish' | 'hi' | 'ur';

export interface ParsedInput {
  raw: string;
  normalized: string;
  tokens: string[];
  cleanTokens: string[];
  language: SupportedLanguage;
  isSingleWord: boolean;
  questionWord?: string;
  isAmbiguous: boolean;
}

// Telugu script range: \u0C00-\u0C7F
const TELUGU_REGEX = /[\u0C00-\u0C7F]/;
// Devanagari script range: \u0900-\u097F
const DEVANAGARI_REGEX = /[\u0900-\u097F]/;
// Arabic / Urdu script range: \u0600-\u06FF
const ARABIC_URDU_REGEX = /[\u0600-\u06FF]/;

// Telglish keywords (Telugu in English characters)
const TELGLISH_KEYWORDS = new Set([
  'cheppu', 'cheppandi', 'enti', 'endi', 'emi', 'chesadu', 'chesaru',
  'evadu', 'evaru', 'atanu', 'athadu', 'athanu', 'aayana', 'gurinchi',
  'inkem', 'inkemi', 'undhi', 'undi', 'chudu', 'telugulo', 'telugu lo',
  'cheppava', 'enduku', 'ela', 'ekkadiki', 'ekkada', 'ippudu', 'cheppava'
]);

// Hinglish keywords (Hindi in English characters)
const HINGLISH_KEYWORDS = new Set([
  'batao', 'bataiye', 'kya', 'kaun', 'hai', 'kiya', 'banaya', 'aur',
  'kuch', 'batao', 'kahan', 'kyun', 'kaise', 'hindi me', 'hindime'
]);

// Roman Urdu keywords
const ROMAN_URDU_KEYWORDS = new Set([
  'batao', 'bataiye', 'kya', 'kon', 'hai', 'kiya', 'banaya', 'aur',
  'kuch', 'kahan', 'kyun', 'kaise', 'urdu me', 'urdume'
]);

/**
 * Normalize text for deterministic matching
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0C00-\u0C7F\u0900-\u097F\u0600-\u06FF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Detect language of the input
 */
export function detectLanguage(text: string, currentPreference?: SupportedLanguage): SupportedLanguage {
  // 1. Script checks
  if (TELUGU_REGEX.test(text)) return 'te';
  if (DEVANAGARI_REGEX.test(text)) return 'hi';
  if (ARABIC_URDU_REGEX.test(text)) return 'ur';

  // 2. Explicit switch requests in text
  const norm = normalizeText(text);
  if (norm.includes('telugu') || norm.includes('telugulo')) return 'telglish';
  if (norm.includes('hindi') || norm.includes('hindime')) return 'hi';
  if (norm.includes('urdu') || norm.includes('urdume')) return 'ur';
  if (norm.includes('english') || norm.includes('englishlo')) return 'en';

  // 3. Token check for transliterated dialects
  const tokens = norm.split(' ');
  let telglishCount = 0;
  let hinglishCount = 0;
  let urduCount = 0;

  for (const t of tokens) {
    if (TELGLISH_KEYWORDS.has(t)) telglishCount++;
    if (HINGLISH_KEYWORDS.has(t)) hinglishCount++;
    if (ROMAN_URDU_KEYWORDS.has(t)) urduCount++;
  }

  if (telglishCount > 0 && telglishCount >= hinglishCount) return 'telglish';
  if (hinglishCount > 0) return 'hi';
  if (urduCount > 0) return 'ur';

  // 4. Common English syntactic tokens
  const commonEnglishWords = new Set([
    'what', 'who', 'why', 'how', 'when', 'where', 'which', 'is', 'are', 'did', 'do',
    'does', 'he', 'his', 'him', 'build', 'make', 'tell', 'me', 'more', 'about',
    'give', 'all', 'links', 'for', 'social', 'media', 'the', 'other', 'one', 'no',
    'project', 'projects', 'video', 'work', 'software', 'exam', 'exams', 'system'
  ]);

  let englishCount = 0;
  for (const t of tokens) {
    if (commonEnglishWords.has(t)) englishCount++;
  }

  if (englishCount > 0 && telglishCount === 0 && hinglishCount === 0 && urduCount === 0) {
    return 'en';
  }

  // Fallback to conversation preference if already established, else default English
  if (currentPreference && currentPreference !== 'en') {
    return currentPreference;
  }

  return 'en';
}

/**
 * Parse input into structured metadata
 */
export function parseInput(rawInput: string, currentLanguage?: SupportedLanguage): ParsedInput {
  const raw = rawInput.trim();
  const normalized = normalizeText(raw);
  const tokens = raw.split(/\s+/).filter(Boolean);
  const cleanTokens = normalized.split(' ').filter(Boolean);
  const language = detectLanguage(raw, currentLanguage);

  const isSingleWord = cleanTokens.length === 1;

  // Extract question word / prefix
  let questionWord: string | undefined;
  const qWords = ['what', 'who', 'why', 'how', 'where', 'when', 'which', 'tell', 'show', 'give'];
  for (const q of qWords) {
    if (cleanTokens[0] === q || normalized.startsWith(q + ' ')) {
      questionWord = q;
      break;
    }
  }

  // Ambiguity flag for bare monosyllables with zero entity clues
  const isAmbiguous =
    cleanTokens.length <= 1 &&
    ['what', 'who', 'why', 'huh', 'ok', 'okay', 'yes', 'no', 'h', 'w', 'what?'].includes(cleanTokens[0] || '');

  return {
    raw,
    normalized,
    tokens,
    cleanTokens,
    language,
    isSingleWord,
    questionWord,
    isAmbiguous,
  };
}
