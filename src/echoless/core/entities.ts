/**
 * Echoless Entity Extractor
 * 
 * Deterministic entity recognition with fuzzy typo tolerance (Levenshtein distance & n-grams).
 */

import { knowledgeGraph, GraphNode } from '../knowledge/graph';
import { ParsedInput } from './parser';

export interface ExtractedEntity {
  node: GraphNode;
  matchedText: string;
  confidence: number;
  isFuzzy: boolean;
}

// Special dictionary for common colloquial and typo mappings
const FUZZY_ALIAS_MAP: Record<string, string> = {
  // Social typos
  'facboook': 'social_facebook',
  'facbook': 'social_facebook',
  'face book': 'social_facebook',
  'fb': 'social_facebook',
  'facebook': 'social_facebook',

  'insta': 'social_instagram',
  'instgram': 'social_instagram',
  'instagarm': 'social_instagram',
  'ig': 'social_instagram',
  'instagram': 'social_instagram',

  'linkdin': 'social_linkedin',
  'linked in': 'social_linkedin',
  'linkedin': 'social_linkedin',

  'git hub': 'social_github',
  'github': 'social_github',
  'git': 'social_github',

  'twitter': 'social_twitter',
  'x': 'social_twitter',

  'whats app': 'contact_whatsapp',
  'whatsapp': 'contact_whatsapp',
  'wa': 'contact_whatsapp',

  // Product & Exam aliases
  'exam': 'examflowos',
  'exams': 'examflowos',
  'examflow': 'examflowos',
  'examflowos': 'examflowos',
  'exam flow': 'examflowos',
  'exam flow os': 'examflowos',
  'cbt': 'examflowos',
  'cbt platform': 'examflowos',
  'ecet': 'examflowos',
  'polycet': 'examflowos',
  'icet': 'examflowos',
  'entrance exam': 'examflowos',

  // Video & Tools
  'video': 'video',
  'videos': 'video',
  'video work': 'video',
  'video editing': 'video',
  'editing': 'video',
  'edit': 'video',
  'editor': 'video',
  'color grading': 'video',
  'color grade': 'video',
  'grading': 'video',
  'grades': 'video',
  'color': 'video',
  'davinci': 'video',
  'davinci resolve': 'video',
  'resolve': 'video',
  'fairlight': 'video',
  'fusion': 'video',
  'post production': 'video',
  'post-production': 'video',

  // Software & Engineering
  'software': 'software',
  'softwares': 'software',
  'code': 'software',
  'coding': 'software',
  'apps': 'software',
  'products': 'software',
  'builds': 'software',
  'engineering': 'software',
  'development': 'software',

  // Products
  'perfect pack': 'perfect_pack',
  'perfectpack': 'perfect_pack',
  'powergrade': 'perfect_pack',
  'power grades': 'perfect_pack',

  // Organizations
  'annapurna': 'annapurna_foundation',
  'annapurna foundation': 'annapurna_foundation',
  'ngo': 'annapurna_foundation',
  'goseva': 'annapurna_foundation',
  'sri lahari': 'sri_lahari_studios',
  'lahari': 'sri_lahari_studios',

  // Web & Systems
  'web': 'web_ecosystems',
  'websites': 'web_ecosystems',
  'web development': 'web_ecosystems',
  'systems': 'business_systems',
  'automation': 'business_systems',
  'n8n': 'business_systems',
  'workflows': 'business_systems',

  // Documents
  'cv': 'doc_cv',
  'resume': 'doc_cv',
  'pdf': 'doc_cv',
  'curriculum vitae': 'doc_cv',

  // Person
  'devicharan': 'devicharan',
  'geddada devicharan': 'devicharan',
  'devi': 'devicharan',
  'charan': 'devicharan',
  'atanu': 'devicharan',
  'author': 'devicharan',
  'builder': 'devicharan',
  'who are you': 'devicharan',
  'who is devicharan': 'devicharan',
  'about devicharan': 'devicharan',
  'about you': 'devicharan',
  'who is he': 'devicharan',
  'yourself': 'devicharan',
};

export function extractEntities(parsed: ParsedInput): ExtractedEntity[] {
  const norm = parsed.normalized;
  const results: ExtractedEntity[] = [];
  const seenNodeIds = new Set<string>();

  // 1. Direct dictionary match against normalized whole string
  if (FUZZY_ALIAS_MAP[norm]) {
    const nodeId = FUZZY_ALIAS_MAP[norm];
    const node = knowledgeGraph.getNode(nodeId);
    if (node && !seenNodeIds.has(node.id)) {
      seenNodeIds.add(node.id);
      results.push({
        node,
        matchedText: norm,
        confidence: 0.98,
        isFuzzy: false,
      });
      return results;
    }
  }

  // 2. Substring & phrase matching on dictionary
  for (const [alias, nodeId] of Object.entries(FUZZY_ALIAS_MAP)) {
    if (alias.length >= 2) {
      const regex = new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i');
      if (regex.test(norm)) {
        const node = knowledgeGraph.getNode(nodeId);
        if (node && !seenNodeIds.has(node.id)) {
          seenNodeIds.add(node.id);
          results.push({
            node,
            matchedText: alias,
            confidence: 0.95,
            isFuzzy: false,
          });
        }
      }
    }
  }

  // 3. Knowledge Graph Aliases Match (Exact token boundary match)
  const allNodes = knowledgeGraph.getAllNodes();
  for (const node of allNodes) {
    if (seenNodeIds.has(node.id)) continue;

    for (const alias of node.aliases) {
      const regex = new RegExp(`\\b${escapeRegExp(alias.toLowerCase())}\\b`, 'i');
      if (regex.test(norm)) {
        seenNodeIds.add(node.id);
        results.push({
          node,
          matchedText: alias,
          confidence: 0.95,
          isFuzzy: false,
        });
        break;
      }
    }
  }

  // 4. Fuzzy Levenshtein Distance match on unknown words
  if (results.length === 0 && parsed.tokens.length > 0) {
    for (const token of parsed.cleanTokens) {
      if (token.length < 3) continue;

      for (const node of allNodes) {
        if (seenNodeIds.has(node.id)) continue;

        for (const alias of node.aliases) {
          const aliasLower = alias.toLowerCase();
          const dist = levenshtein(token, aliasLower);
          const maxAllowed = aliasLower.length <= 4 ? 1 : 2;

          if (dist <= maxAllowed) {
            seenNodeIds.add(node.id);
            results.push({
              node,
              matchedText: token,
              confidence: 0.75,
              isFuzzy: true,
            });
            break;
          }
        }
      }
    }
  }

  return results;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function levenshtein(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = new Array<number[]>(bn + 1);
  for (let i = 0; i <= bn; ++i) {
    let row = (matrix[i] = new Array<number>(an + 1));
    row[0] = i;
  }
  const firstRow = matrix[0];
  for (let j = 1; j <= an; ++j) {
    firstRow[j] = j;
  }
  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }
  return matrix[bn][an];
}
