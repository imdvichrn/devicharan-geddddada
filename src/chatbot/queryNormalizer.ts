/**
 * Query Normalizer & Fuzzy Typo Corrector
 * Zero-dependency, local-first tokenizer, typo corrector, and synonym resolver.
 */

// Levenshtein distance for fuzzy typo matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const CANONICAL_VOCABULARY = [
  'davinci', 'resolve', 'editing', 'color', 'grading', 'fairlight', 'fusion',
  'video', 'examflowos', 'examflow', 'perfect', 'pack', 'presets', 'transitions',
  'react', 'typescript', 'vite', 'tailwind', 'software', 'websites', 'systems',
  'automation', 'n8n', 'webhooks', 'annapurna', 'lahari', 'studios', 'contact',
  'email', 'hire', 'resume', 'skills', 'experience', 'education', 'deliverables',
  'cbt', 'ecet', 'icet', 'polycet', 'pricing', 'cost', 'free', 'location',
  'visakhapatnam', 'vizianagaram', 'india', 'btech', 'github', 'linkedin',
  'experiment', 'experiments', 'research', 'recall', 'spaced', 'repetition',
  'mppt', 'circadian', 'longevity', 'senescence', 'autophagy', 'microgrid'
];

const SYNONYM_MAP: Record<string, string> = {
  'davinci': 'davinci resolve',
  'resolve': 'davinci resolve',
  'dvr': 'davinci resolve',
  'yt': 'youtube',
  'cv': 'curriculum vitae resume cv',
  'resume': 'curriculum vitae cv resume',
  'reels': 'short form video reels deliverables',
  'shorts': 'short form video reels',
  'grade': 'color grading',
  'grading': 'color grading',
  'colorist': 'color grading',
  'colour': 'color grading',
  'edit': 'editing video',
  'editor': 'editing video',
  'cutting': 'editing video pacing',
  'exam': 'examflowos competitive exams cbt',
  'cbt': 'examflowos cbt exam engine',
  'ecet': 'examflowos ecet exam',
  'icet': 'examflowos icet exam',
  'pack': 'perfect pack davinci',
  'presets': 'perfect pack presets',
  'lut': 'color grading presets',
  'rates': 'pricing contact hire',
  'cost': 'pricing free examflowos',
  'price': 'pricing contact hire',
  'hire': 'contact availability hire',
  'freelance': 'contact freelance hire',
  'location': 'visakhapatnam vizianagaram andhra pradesh india',
  'where': 'location visakhapatnam india',
  'college': 'education btech eee',
  'degree': 'education btech eee engineering',
  'btech': 'education btech eee engineering',
  'eee': 'education btech eee electrical engineering',
  'automate': 'business systems automation n8n webhooks',
  'automation': 'business systems automation n8n webhooks',
  'n8n': 'business systems automation n8n webhooks',
  'stack': 'technologies tools skills react typescript davinci',
  'tech': 'technologies tools stack',
  'tools': 'tools software technologies davinci react',
  'recall': 'recall memory spaced repetition sm2 experiment',
  'spaced': 'spaced repetition sm2 recall experiment',
  'repetition': 'spaced repetition sm2 recall experiment',
  'experiment': 'experiments research lab exploration',
  'experiments': 'experiments research lab exploration',
  'research': 'experiments research lab exploration',
  'mppt': 'mppt solar microgrid clean energy experiment',
  'circadian': 'circadian sleep stamina biohacking experiment',
  'longevity': 'longevity cellular senescence healthspan experiment',
};

// Common referent patterns for multi-turn conversations
export const REFERENT_PATTERNS = {
  tellMeMore: /(tell me more|more details|elaborate|details|go deeper|explain more)/i,
  technologies: /(what (tech|technology|stack|tools)|technology|tech stack|tools used|what did you use|how was it built|how is it built|built with)/i,
  metrics: /(how many (users|projects|deliverables|clients|students)|metrics|numbers|stats|how many people)/i,
  links: /(show me the link|link|website|where can i see it|url|github|repo)/i,
  thatProject: /(that project|this project|it|that|this tool|the app)/i,
};

export interface NormalizedQuery {
  raw: string;
  cleaned: string;
  tokens: string[];
  expandedTerms: string[];
  correctedTokens: string[];
  isReferent: boolean;
  referentType?: 'more' | 'tech' | 'metrics' | 'link' | 'general';
}

export function normalizeQuery(input: string): NormalizedQuery {
  const raw = input || '';
  
  // Clean punctuation but keep hyphens and alphanumeric
  const cleaned = raw
    .toLowerCase()
    .replace(/[^\w\s@.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const rawTokens = cleaned.split(' ').filter(Boolean);
  const correctedTokens: string[] = [];

  // Check for multi-turn referents
  let isReferent = false;
  let referentType: NormalizedQuery['referentType'] = undefined;

  if (REFERENT_PATTERNS.tellMeMore.test(cleaned)) {
    isReferent = true;
    referentType = 'more';
  } else if (REFERENT_PATTERNS.technologies.test(cleaned)) {
    isReferent = true;
    referentType = 'tech';
  } else if (REFERENT_PATTERNS.metrics.test(cleaned)) {
    isReferent = true;
    referentType = 'metrics';
  } else if (REFERENT_PATTERNS.links.test(cleaned)) {
    isReferent = true;
    referentType = 'link';
  } else if (REFERENT_PATTERNS.thatProject.test(cleaned)) {
    isReferent = true;
    referentType = 'general';
  }

  // Fuzzy typo correction against vocabulary
  for (const token of rawTokens) {
    if (token.length <= 2) {
      correctedTokens.push(token);
      continue;
    }

    if (CANONICAL_VOCABULARY.includes(token) || SYNONYM_MAP[token]) {
      correctedTokens.push(token);
      continue;
    }

    // Attempt fuzzy match with threshold of 1 or 2
    let bestMatch = token;
    let minDistance = 999;
    const maxThreshold = token.length > 5 ? 2 : 1;

    for (const vocab of CANONICAL_VOCABULARY) {
      const dist = levenshteinDistance(token, vocab);
      if (dist <= maxThreshold && dist < minDistance) {
        minDistance = dist;
        bestMatch = vocab;
      }
    }

    correctedTokens.push(bestMatch);
  }

  // Expand synonyms
  const expandedTerms: string[] = [...correctedTokens];
  for (const token of correctedTokens) {
    if (SYNONYM_MAP[token]) {
      const syns = SYNONYM_MAP[token].split(' ');
      expandedTerms.push(...syns);
    }
  }

  return {
    raw,
    cleaned,
    tokens: correctedTokens,
    expandedTerms: Array.from(new Set(expandedTerms)),
    correctedTokens,
    isReferent,
    referentType,
  };
}
