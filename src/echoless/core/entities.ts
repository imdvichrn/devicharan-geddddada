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

  'whats app': 'contact_whatsapp',
  'whatsapp': 'contact_whatsapp',
  'wa': 'contact_whatsapp',

  // Product & Exam aliases
  'exam': 'examflowos',
  'exams': 'examflowos',
  'examflow': 'examflowos',
  'examflowos': 'examflowos',
  'cbt': 'examflowos',
  'ecet': 'examflowos',
  'polycet': 'examflowos',
  'icet': 'examflowos',
  'entrance exam': 'examflowos',

  // Video & Tools
  'video': 'video',
  'videos': 'video',
  'video work': 'video',
  'video editing': 'video',
  'color grading': 'video',
  'davinci': 'video',
  'davinci resolve': 'video',
  'resolve': 'video',
  'fairlight': 'video',
  'fusion': 'video',

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
  'devi': 'devicharan',
  'charan': 'devicharan',
  'atanu': 'devicharan',
  'author': 'devicharan',
  'builder': 'devicharan',
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

  // 3. Knowledge Graph general lookup
  const graphNode = knowledgeGraph.findNode(norm);
  if (graphNode && !seenNodeIds.has(graphNode.id)) {
    seenNodeIds.add(graphNode.id);
    results.push({
      node: graphNode,
      matchedText: norm,
      confidence: 0.9,
      isFuzzy: false,
    });
  }

  // 4. Token-by-token fuzzy check if still empty
  if (results.length === 0) {
    for (const token of parsed.cleanTokens) {
      if (token.length < 3) continue;

      // Check fuzzy map keys for close edit distance (distance <= 1)
      for (const [alias, nodeId] of Object.entries(FUZZY_ALIAS_MAP)) {
        if (alias.length >= 4 && computeLevenshtein(token, alias) <= 1) {
          const node = knowledgeGraph.getNode(nodeId);
          if (node && !seenNodeIds.has(node.id)) {
            seenNodeIds.add(node.id);
            results.push({
              node,
              matchedText: token,
              confidence: 0.85,
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

function computeLevenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
