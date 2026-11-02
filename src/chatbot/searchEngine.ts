/**
 * Fuzzy Weighted Search Engine
 * Zero-dependency local search over structured JSON knowledge bases.
 */

import portfolioData from '../data/portfolio.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import achievementsData from '../data/achievements.json';
import educationData from '../data/education.json';
import experimentsData from '../data/experiments.json';
import faqData from '../data/faq.json';
import { NormalizedQuery } from './queryNormalizer';

export interface SearchResult {
  source: 'project' | 'experiment' | 'skill' | 'faq' | 'experience' | 'portfolio' | 'education' | 'achievement';
  item: any;
  score: number;
}

export function searchKnowledge(query: NormalizedQuery): SearchResult[] {
  const { expandedTerms, cleaned } = query;
  const results: SearchResult[] = [];

  // 1. Search FAQ items (High priority for explicit questions)
  for (const faq of faqData) {
    let score = 0;
    if (faq.keywords.some((kw) => cleaned.includes(kw))) {
      score += 20;
    }
    for (const term of expandedTerms) {
      if (faq.keywords.some((kw) => kw.includes(term))) score += 4;
      if (faq.question.toLowerCase().includes(term)) score += 3;
    }
    if (score > 0) {
      results.push({ source: 'faq', item: faq, score });
    }
  }

  // 2. Search Projects
  for (const proj of projectsData) {
    let score = 0;
    if (cleaned.includes(proj.id) || cleaned.includes(proj.title.toLowerCase())) {
      score += 25;
    }
    for (const term of expandedTerms) {
      if (proj.topics.some((t) => t.includes(term))) score += 4;
      if (proj.technologies.some((tech) => tech.toLowerCase().includes(term))) score += 3;
      if (proj.shortDescription.toLowerCase().includes(term)) score += 1;
    }
    if (score > 0) {
      results.push({ source: 'project', item: proj, score });
    }
  }

  // 3. Search Experiments
  for (const exp of experimentsData) {
    let score = 0;
    if (cleaned.includes(exp.id) || cleaned.includes(exp.title.toLowerCase())) {
      score += 25;
    }
    for (const term of expandedTerms) {
      if (exp.topics.some((t: string) => t.includes(term))) score += 4;
      if (exp.category.toLowerCase().includes(term)) score += 3;
      if (exp.description.toLowerCase().includes(term)) score += 1;
    }
    if (score > 0) {
      results.push({ source: 'experiment', item: exp, score });
    }
  }

  // 4. Search Skills Disciplines
  for (const disc of skillsData.disciplines) {
    let score = 0;
    if (cleaned.includes(disc.id) || cleaned.includes(disc.name.toLowerCase())) {
      score += 15;
    }
    for (const term of expandedTerms) {
      if (disc.skills.some((s) => s.toLowerCase().includes(term))) score += 4;
      if (disc.tools.some((t) => t.toLowerCase().includes(term))) score += 3;
    }
    if (score > 0) {
      results.push({ source: 'skill', item: disc, score });
    }
  }

  // 5. Search Experience & Achievements
  for (const exp of experienceData) {
    let score = 0;
    for (const term of expandedTerms) {
      if (exp.role.toLowerCase().includes(term)) score += 5;
      if (exp.focus.toLowerCase().includes(term)) score += 3;
      if (exp.highlights.some((h) => h.toLowerCase().includes(term))) score += 2;
    }
    if (score > 0) {
      results.push({ source: 'experience', item: exp, score });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);
  return results;
}

export { portfolioData, projectsData, experimentsData, skillsData, experienceData, achievementsData, educationData, faqData };
