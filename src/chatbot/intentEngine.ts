/**
 * Intent Engine
 * High-precision intent classification with context referent preservation and confidence scoring.
 */

import { NormalizedQuery } from './queryNormalizer';

export type IntentType =
  | 'GREETING'
  | 'PROJECT_QUERY'
  | 'EXPERIMENTS_QUERY'
  | 'VIDEO_QUERY'
  | 'SOFTWARE_QUERY'
  | 'WEB_QUERY'
  | 'SYSTEMS_QUERY'
  | 'SKILLS_QUERY'
  | 'EXPERIENCE_QUERY'
  | 'EDUCATION_QUERY'
  | 'CONTACT_QUERY'
  | 'PHILOSOPHY_QUERY'
  | 'FAQ_QUERY'
  | 'MULTI_TURN_FOLLOWUP'
  | 'UNKNOWN';

export interface IntentResult {
  intent: IntentType;
  confidence: number;
  targetEntityId?: string;
  topic?: string;
  followupType?: 'more' | 'tech' | 'metrics' | 'link' | 'general';
}

const GREETING_TRIGGERS = [
  'hello', 'hi', 'hey', 'greetings', 'namaste', 'good morning', 'good evening', 'good afternoon', 'sup', 'yo'
];

export function detectIntent(
  query: NormalizedQuery,
  currentContextEntity?: string
): IntentResult {
  const { cleaned, expandedTerms, isReferent, referentType } = query;

  // 1. Multi-turn referent with active context (e.g. "tell me more", "what technology?", "link?")
  if ((isReferent || referentType) && currentContextEntity) {
    return {
      intent: 'MULTI_TURN_FOLLOWUP',
      confidence: 0.95,
      targetEntityId: currentContextEntity,
      followupType: referentType || 'more',
    };
  }

  // 2. Pure Greeting
  if (
    GREETING_TRIGGERS.some((g) => cleaned === g || cleaned.startsWith(`${g} `)) &&
    expandedTerms.length <= 3 &&
    !expandedTerms.some((t) => ['video', 'examflowos', 'work', 'project', 'edit', 'davinci', 'hire', 'experiment'].includes(t))
  ) {
    return { intent: 'GREETING', confidence: 0.98 };
  }

  // 3. Contact & Hire Intent
  if (
    expandedTerms.some((t) => ['contact', 'hire', 'email', 'reach', 'freelance', 'collaborate', 'available', 'rates', 'pricing'].includes(t)) ||
    cleaned.includes('get in touch') ||
    cleaned.includes('work with you')
  ) {
    return { intent: 'CONTACT_QUERY', confidence: 0.94, topic: 'contact' };
  }

  // 4. Specific Projects
  if (
    expandedTerms.some((t) => ['examflow', 'examflowos', 'cbt', 'ecet', 'polycet', 'icet'].includes(t)) ||
    cleaned.includes('examflow') ||
    cleaned.includes('cbt') ||
    cleaned.includes('ecet') ||
    cleaned.includes('polycet') ||
    cleaned.includes('icet')
  ) {
    return { intent: 'PROJECT_QUERY', confidence: 0.96, targetEntityId: 'examflow-os', topic: 'examflowos' };
  }

  if (
    (expandedTerms.includes('perfect') && expandedTerms.includes('pack')) ||
    expandedTerms.includes('drfx') ||
    (expandedTerms.includes('pack') && expandedTerms.includes('davinci')) ||
    cleaned.includes('perfect pack')
  ) {
    return { intent: 'PROJECT_QUERY', confidence: 0.96, targetEntityId: 'perfect-pack', topic: 'perfect-pack' };
  }

  if (cleaned.includes('annapurna') || cleaned.includes('food seva') || cleaned.includes('ngo')) {
    return { intent: 'PROJECT_QUERY', confidence: 0.95, targetEntityId: 'annapurna-foundation', topic: 'annapurna-foundation' };
  }

  if (cleaned.includes('sri lahari') || cleaned.includes('lahari') || cleaned.includes('photo studio')) {
    return { intent: 'PROJECT_QUERY', confidence: 0.95, targetEntityId: 'sri-lahari-studios', topic: 'sri-lahari-studios' };
  }

  // 5. Experiments & Research Domain
  if (
    expandedTerms.some((t) => ['experiment', 'experiments', 'research', 'lab', 'explorations', 'study', 'sm2', 'mppt', 'circadian', 'longevity', 'senescence', 'microgrid'].includes(t)) ||
    cleaned.includes('experiment') ||
    cleaned.includes('spaced repetition') ||
    cleaned.includes('ebbinghaus')
  ) {
    let specificExp: string | undefined;
    if (cleaned.includes('sm2') || cleaned.includes('spaced repetition') || cleaned.includes('ebbinghaus') || cleaned.includes('recall')) {
      specificExp = 'sm2-cbt-recall';
    } else if (cleaned.includes('cli') || (cleaned.includes('script') && cleaned.includes('davinci')) || (cleaned.includes('automation') && cleaned.includes('timeline'))) {
      specificExp = 'local-cli-davinci-automation';
    } else if (cleaned.includes('mppt') || cleaned.includes('solar') || cleaned.includes('inverter') || cleaned.includes('microgrid')) {
      specificExp = 'mppt-solar-microgrid';
    } else if (cleaned.includes('circadian') || cleaned.includes('sleep') || cleaned.includes('stamina') || cleaned.includes('caffeine')) {
      specificExp = 'circadian-focus-stamina';
    } else if (cleaned.includes('longevity') || cleaned.includes('senescence') || cleaned.includes('autophagy') || cleaned.includes('nad')) {
      specificExp = 'cellular-longevity-senescence';
    }

    return {
      intent: 'EXPERIMENTS_QUERY',
      confidence: 0.95,
      targetEntityId: specificExp || 'experiments',
      topic: 'experiments'
    };
  }

  // 6. Video & Post-Production Domain
  if (
    expandedTerms.some((t) => ['video', 'editing', 'color', 'grading', 'davinci', 'resolve', 'fairlight', 'fusion', 'cut', 'post'].includes(t)) ||
    cleaned.includes('700') ||
    cleaned.includes('reels') ||
    cleaned.includes('post production')
  ) {
    return { intent: 'VIDEO_QUERY', confidence: 0.95, targetEntityId: 'video', topic: 'video' };
  }

  // 7. Software & Web Domains
  if (expandedTerms.some((t) => ['software', 'react', 'typescript', 'frontend', 'app', 'developer', 'coding'].includes(t))) {
    return { intent: 'SOFTWARE_QUERY', confidence: 0.9, targetEntityId: 'software', topic: 'software' };
  }

  if (expandedTerms.some((t) => ['web', 'websites', 'website', 'seo', 'sitemap', 'uptime'].includes(t))) {
    return { intent: 'WEB_QUERY', confidence: 0.9, targetEntityId: 'web', topic: 'web' };
  }

  if (expandedTerms.some((t) => ['systems', 'automation', 'n8n', 'webhook', 'crm', 'pipeline', 'workflow'].includes(t))) {
    return { intent: 'SYSTEMS_QUERY', confidence: 0.9, targetEntityId: 'systems', topic: 'systems' };
  }

  // 8. Skills, Education & Experience
  if (expandedTerms.some((t) => ['skill', 'skills', 'tools', 'stack', 'technologies'].includes(t))) {
    return { intent: 'SKILLS_QUERY', confidence: 0.88, topic: 'skills' };
  }

  if (expandedTerms.some((t) => ['education', 'college', 'degree', 'eee', 'btech', 'university'].includes(t))) {
    return { intent: 'EDUCATION_QUERY', confidence: 0.92, topic: 'education' };
  }

  if (expandedTerms.some((t) => ['experience', 'years', 'background', 'career'].includes(t))) {
    return { intent: 'EXPERIENCE_QUERY', confidence: 0.88, topic: 'experience' };
  }

  // 9. Philosophy & Principles
  if (expandedTerms.some((t) => ['philosophy', 'principles', 'ethics', 'rules', 'design system'].includes(t))) {
    return { intent: 'PHILOSOPHY_QUERY', confidence: 0.85, topic: 'philosophy' };
  }

  // 10. Contextual follow-up under active entity if terms relate to it
  if (currentContextEntity) {
    if (
      currentContextEntity === 'video' &&
      expandedTerms.some((t) => ['sound', 'audio', 'fairlight', 'fusion', 'timeline', 'cut', 'reel', 'vfx', 'codec'].includes(t))
    ) {
      return { intent: 'VIDEO_QUERY', confidence: 0.85, targetEntityId: 'video' };
    }
    if (
      currentContextEntity === 'examflow-os' &&
      expandedTerms.some((t) => ['database', 'drive', 'backup', 'cost', 'free', 'cbt', 'student', 'users', 'offline'].includes(t))
    ) {
      return { intent: 'PROJECT_QUERY', confidence: 0.85, targetEntityId: 'examflow-os' };
    }
  }

  return { intent: 'UNKNOWN', confidence: 0.2 };
}
