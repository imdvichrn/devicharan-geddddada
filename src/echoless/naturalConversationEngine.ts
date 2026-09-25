/**
 * NaturalConversationEngine
 * Dedicated response-quality layer between AI generation and the chat renderer.
 * 
 * Enforces:
 * 1. Repetition prevention across multi-turn memory via lightweight fingerprints
 * 2. Answering follow-ups directly and advancing conversation rather than re-introducing known facts
 * 3. Restrained markdown and emphasis (no gratuitous headers, bullets, or bolded sentences)
 * 4. Conversational prose rhythm suited to a calm, observant female persona (Echoless)
 * 5. Elimination of robotic AI signatures and customer-support clichés
 * 6. Intent-aware verified action extraction (single-intent restraint, max 2 actions)
 * 7. Multilingual purity (English, Telugu, Telglish, Hindi, Urdu)
 */

import { ChatMessage } from './types';
import { PUBLIC_LINKS, CV_METADATA } from './knowledge';
import { ConversationState } from './conversation/state';

export type VerifiedActionId =
  | 'instagram'
  | 'github'
  | 'linkedin'
  | 'facebook'
  | 'whatsapp'
  | 'email'
  | 'cv'
  | 'examflowos'
  | 'video'
  | 'software'
  | 'work'
  | 'web'
  | 'systems';

export interface ActionMetadata {
  id: VerifiedActionId;
  label: string;
  url: string;
  isInternal: boolean;
  styleTheme: 'instagram' | 'github' | 'linkedin' | 'whatsapp' | 'video' | 'software' | 'cv' | 'neutral';
}

export const VERIFIED_ACTIONS: Record<VerifiedActionId, ActionMetadata> = {
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    url: PUBLIC_LINKS.instagram,
    isInternal: false,
    styleTheme: 'instagram',
  },
  github: {
    id: 'github',
    label: 'GitHub',
    url: PUBLIC_LINKS.github,
    isInternal: false,
    styleTheme: 'github',
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    url: PUBLIC_LINKS.linkedin,
    isInternal: false,
    styleTheme: 'linkedin',
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    url: PUBLIC_LINKS.facebook,
    isInternal: false,
    styleTheme: 'linkedin',
  },
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: PUBLIC_LINKS.whatsApp,
    isInternal: false,
    styleTheme: 'whatsapp',
  },
  email: {
    id: 'email',
    label: 'Send Email',
    url: `mailto:${PUBLIC_LINKS.email}`,
    isInternal: false,
    styleTheme: 'neutral',
  },
  cv: {
    id: 'cv',
    label: 'Verified CV (PDF)',
    url: CV_METADATA.publicUrl,
    isInternal: true,
    styleTheme: 'cv',
  },
  examflowos: {
    id: 'examflowos',
    label: 'ExamFlowOS',
    url: PUBLIC_LINKS.examFlowLive,
    isInternal: false,
    styleTheme: 'software',
  },
  video: {
    id: 'video',
    label: 'Video Post-Production',
    url: '/video',
    isInternal: true,
    styleTheme: 'video',
  },
  software: {
    id: 'software',
    label: 'Software & Products',
    url: '/software',
    isInternal: true,
    styleTheme: 'software',
  },
  work: {
    id: 'work',
    label: 'Selected Works',
    url: '/work',
    isInternal: true,
    styleTheme: 'neutral',
  },
  web: {
    id: 'web',
    label: 'Web Ecosystems',
    url: '/web',
    isInternal: true,
    styleTheme: 'software',
  },
  systems: {
    id: 'systems',
    label: 'Business Systems',
    url: '/systems',
    isInternal: true,
    styleTheme: 'neutral',
  },
};

export interface ResponseFingerprint {
  openingPhrase: string;
  sentenceCount: number;
  avgSentenceLength: number;
  closingPhrase: string;
  keyTokens: Set<string>;
  factsIncluded: string[];
}

export interface NaturalnessEngineContext {
  userPrompt?: string;
  recentHistory?: ChatMessage[];
  taskType?: string;
  orchestratorState?: ConversationState;
}

export interface RefinedNaturalResponse {
  refinedText: string;
  actions: ActionMetadata[];
  wasRestructured: boolean;
  repetitionDampened: boolean;
}

export class NaturalConversationEngine {
  private recentFingerprints: ResponseFingerprint[] = [];
  private readonly maxMemorySize = 6;

  /**
   * Derive a lightweight semantic fingerprint from a response
   */
  public createFingerprint(text: string): ResponseFingerprint {
    const clean = text.trim();
    const sentences = clean.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);
    const openingPhrase = (sentences[0] || '').slice(0, 45).toLowerCase().trim();
    const closingPhrase = (sentences[sentences.length - 1] || '').slice(-45).toLowerCase().trim();

    const sentenceCount = sentences.length;
    const avgSentenceLength = sentenceCount > 0
      ? sentences.reduce((acc, s) => acc + s.length, 0) / sentenceCount
      : 0;

    // Extract significant content tokens (ignoring common grammatical words)
    const stopWords = new Set([
      'the', 'is', 'are', 'was', 'were', 'and', 'or', 'a', 'an', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'about', 'as', 'into', 'that', 'this', 'it', 'its', 'he', 'his',
      'i', 'you', 'your', 'we', 'our', 'be', 'been', 'has', 'have', 'had', 'do', 'does', 'did',
      'but', 'if', 'so', 'just', 'more', 'also', 'can', 'will', 'would', 'should'
    ]);

    const words = clean.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/);
    const keyTokens = new Set<string>();
    for (const w of words) {
      if (w.length > 3 && !stopWords.has(w)) {
        keyTokens.add(w);
      }
    }

    // Fact markers
    const factsIncluded: string[] = [];
    const lower = clean.toLowerCase();
    if (lower.includes('cbt') || lower.includes('polycet') || lower.includes('ecet') || lower.includes('icet')) {
      factsIncluded.push('examflow_cbt_exams');
    }
    if (lower.includes('700+') || lower.includes('davinci resolve studio') || lower.includes('6+ years')) {
      factsIncluded.push('video_metrics');
    }
    if (lower.includes('annapurna') || lower.includes('rural education')) {
      factsIncluded.push('annapurna_foundation');
    }
    if (lower.includes('perfect pack')) {
      factsIncluded.push('perfect_pack');
    }
    if (lower.includes('digital product builder') || lower.includes('sri lahari')) {
      factsIncluded.push('identity_builder');
    }

    return {
      openingPhrase,
      sentenceCount,
      avgSentenceLength,
      closingPhrase,
      keyTokens,
      factsIncluded,
    };
  }

  /**
   * Calculate semantic overlap (Jaccard similarity) between two token sets
   */
  public calculateSimilarity(tokensA: Set<string>, tokensB: Set<string>): number {
    if (tokensA.size === 0 || tokensB.size === 0) return 0;
    let intersection = 0;
    for (const token of tokensA) {
      if (tokensB.has(token)) {
        intersection++;
      }
    }
    const union = tokensA.size + tokensB.size - intersection;
    return union > 0 ? intersection / union : 0;
  }

  /**
   * 1. Remove AI signatures and corporate clichés
   */
  public removeAISignatures(text: string): string {
    let cleaned = text;

    // Suppress leading conversational fluff & corporate robotic openings
    const leadingFluffRegex = /^(Sure(!|(\.|\,))|Certainly(!|(\.|\,))|Absolutely(!|(\.|\,))|Great question(!|(\.|\,))|Good question(!|(\.|\,))|Here's the thing:|Here is the thing:|To answer your question,|Allow me to explain:|As an AI assistant,|As an AI,|I'd be happy to help(!|(\.|\,))|I am here to help(!|(\.|\,))|How may I assist you\??|Hey there!|Hello!|Based on your query,|Here's what you need to know:?|Let's dive into[^.\n]*:\s*)\s*/i;
    cleaned = cleaned.replace(leadingFluffRegex, '');

    // Suppress trailing assistant filler, sign-offs, and customer-service closings
    const trailingFillerRegex = /(\n\n)?(Let me know if you (have any( other)? questions|need anything else|want to know more|have questions)[!.]?|Hope this helps[!.]?|Feel free to ask( if you need anything)?[!.]?|I'm here if you need anything[!.]?|Is there anything else I can help you with\??|Let me know if you'd like to explore anything else[!.]?|I'd be glad to assist further[!.]?)\s*$/i;
    cleaned = cleaned.replace(trailingFillerRegex, '');

    // Artificial summary/conclusion headers
    cleaned = cleaned.replace(/(\n+)?(\*\*|\#\#\#|\#\#)?(In conclusion|Conclusion|Summary|Key takeaway|Final thoughts):?(\*\*)?\s*/gi, '\n\n');

    return cleaned.trim();
  }

  /**
   * 2. Markdown Restraint
   * Eliminates gratuitous ### headings, horizontal rules, decorative stars, and converts mechanical lists into natural prose.
   */
  public applyMarkdownRestraint(text: string): string {
    let cleaned = text;

    // Remove horizontal rules
    cleaned = cleaned.replace(/^---+$|^\*\*\*+$|^___+$/gm, '');

    // Remove markdown headings (e.g. ### Heading -> natural sentence flow)
    cleaned = cleaned.replace(/^#{1,4}\s+(.+)$/gm, (_match, title) => {
      const cleanTitle = title.replace(/\*+/g, '').trim();
      return cleanTitle;
    });

    // Remove standalone decorative stars (e.g. *** or * * *)
    cleaned = cleaned.replace(/\s*\*{3,}\s*/g, ' ');

    // Convert short, mechanical bullet lists (<= 3 items) into natural human prose
    const lines = cleaned.split('\n');
    const bulletLines = lines.filter((l) => /^\s*[-*•]\s+/.test(l));

    if (bulletLines.length > 0 && bulletLines.length <= 3 && lines.length <= 6) {
      const listItems = bulletLines.map((l) => l.replace(/^\s*[-*•]\s+/, '').trim());
      if (listItems.every((item) => item.length < 70)) {
        const prose = listItems.join(', ');
        cleaned = lines
          .filter((l) => !/^\s*[-*•]\s+/.test(l))
          .concat(prose)
          .join('\n')
          .trim();
      }
    }

    // Normalize excessive newlines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    return cleaned.trim();
  }

  /**
   * 3. Restrain mechanical emphasis
   * Prevents bolding whole sentences or ordinary grammatical words.
   * Retains bolding only for key project names, verified numbers, and distinct concepts.
   */
  public restrainEmphasis(text: string): string {
    let cleaned = text;

    // Un-bold long sentences (> 30 characters)
    cleaned = cleaned.replace(/\*\*([A-Z][^\*\n]{30,}\.?)\*\*/g, '$1');

    // Un-bold common grammatical words
    const commonWords = [
      'I', 'is', 'are', 'was', 'the', 'a', 'an', 'and', 'also', 'very', 'really',
      'just', 'that', 'this', 'to', 'for', 'in', 'on', 'with', 'from', 'we', 'he', 'it'
    ];
    for (const word of commonWords) {
      const regex = new RegExp(`\\*\\*(${word})\\*\\*`, 'gi');
      cleaned = cleaned.replace(regex, '$1');
    }

    return cleaned;
  }

  /**
   * 4. Multi-turn Repetition Prevention & Intent Restructuring
   * Inspects conversation history and lightweight fingerprints to ensure:
   * - No recycled opening sentences
   * - No redundant re-introductions ("Geddada Devicharan is...", "ExamFlowOS is a free CBT...")
   * - If user asks a follow-up, answer the follow-up directly rather than regurgitating known definitions
   */
  public preventRepetitionsAndRestructure(
    text: string,
    userPrompt: string = '',
    history: ChatMessage[] = []
  ): { text: string; wasRestructured: boolean; repetitionDampened: boolean } {
    let cleaned = text;
    let wasRestructured = false;
    let repetitionDampened = false;

    const assistantHistory = history
      .filter((m) => m.role === 'assistant')
      .map((m) => m.content.trim());

    if (assistantHistory.length === 0) {
      return { text: cleaned, wasRestructured, repetitionDampened };
    }

    const currentFingerprint = this.createFingerprint(cleaned);
    const p = userPrompt.toLowerCase().replace(/[.,!?;:]/g, '').trim();

    const isFollowUp =
      p === 'tell me more' ||
      p.startsWith('tell me more') ||
      p === 'more' ||
      p.startsWith('more about') ||
      p.includes('expand') ||
      p.includes('elaborate') ||
      p.includes('continue') ||
      p.includes('go on') ||
      p.includes('what else') ||
      p.startsWith('what about') ||
      p.startsWith('why did') ||
      p.startsWith('how does') ||
      p.includes('details') ||
      p.includes('inka cheppu') ||
      p.length < 25;

    // Check similarity against recent assistant turns
    for (const priorMsg of assistantHistory.slice(-3)) {
      const priorFingerprint = this.createFingerprint(priorMsg);
      const similarity = this.calculateSimilarity(currentFingerprint.keyTokens, priorFingerprint.keyTokens);

      // Check opening phrase duplication
      if (
        currentFingerprint.openingPhrase.length > 15 &&
        priorFingerprint.openingPhrase.length > 15 &&
        (currentFingerprint.openingPhrase === priorFingerprint.openingPhrase ||
          priorMsg.toLowerCase().includes(currentFingerprint.openingPhrase))
      ) {
        repetitionDampened = true;
        // Strip duplicate opening sentence
        const firstSentence = cleaned.split(/(?<=[.?!])\s+/)[0] || '';
        cleaned = cleaned.slice(firstSentence.length).trim();
        cleaned = cleaned.replace(/^[,\-–—.:\s]+/, '');
      }

      // Check high semantic similarity when user is asking a follow-up
      if ((similarity > 0.4 || isFollowUp)) {
        // Strip known list-like or introductory definitions that were already established
        const cbtIntroPattern = /^[^\n.]*(?:ExamFlowOS is (?:a free|an?|something)|ExamFlowOS was (?:built|created)|Devicharan built ExamFlowOS|CBT platform for ECET|exam preparation and CBT platform)[^.\n]*\.\s*/i;
        if (cbtIntroPattern.test(cleaned)) {
          cleaned = cleaned.replace(cbtIntroPattern, '').trim();
          wasRestructured = true;
          repetitionDampened = true;
        }

        // DaVinci / Video intro pattern
        const videoIntroPattern = /^[^\n.]*(?:Devicharan has worked on 700\+|worked on over 700|video post-production specialist|Devicharan is a video editor)[^.\n]*\.\s*/i;
        if (videoIntroPattern.test(cleaned)) {
          cleaned = cleaned.replace(videoIntroPattern, '').trim();
          wasRestructured = true;
          repetitionDampened = true;
        }
      }
    }

    // If follow up stripped too much or became empty
    if (isFollowUp && cleaned.length < 20) {
      cleaned = text;
    }

    // Strip redundant identity introductions if conversation has already established Devicharan or Echoless
    const introPatterns = [
      /^Geddada Devicharan is a digital product builder[^.\n]*\.\s*/i,
      /^Devicharan is a digital product builder[^.\n]*\.\s*/i,
      /^Geddada Devicharan is a[^.\n]*\.\s*/i,
      /^I am Echoless, Devicharan's personal assistant[^.\n]*\.\s*/i,
      /^I'm Echoless, Devicharan's personal assistant[^.\n]*\.\s*/i,
      /^I am Echoless[^.\n]*\.\s*/i,
      /^I'm Echoless[^.\n]*\.\s*/i,
    ];

    for (const pattern of introPatterns) {
      if (pattern.test(cleaned)) {
        cleaned = cleaned.replace(pattern, '').trim();
        repetitionDampened = true;
      }
    }

    // Store in recent fingerprints memory
    this.recentFingerprints.push(currentFingerprint);
    if (this.recentFingerprints.length > this.maxMemorySize) {
      this.recentFingerprints.shift();
    }

    return {
      text: cleaned.length > 0 ? cleaned : text,
      wasRestructured,
      repetitionDampened,
    };
  }

  /**
   * 5. Extract verified Action IDs with Single-Intent Restraint
   * Echoless is a conversational character, NOT a navigation assistant or menu.
   * Actions are ONLY returned when the user explicitly requests links, channels, or navigation.
   * "Tell me more" -> conversational continuation only (0 actions).
   * "What's your Instagram?" -> answer + Instagram action (1 action).
   * "Show me the project." -> relevant project action (1 action).
   */
  public extractVerifiedActions(
    text: string,
    userPrompt: string = ''
  ): { cleanedText: string; actions: ActionMetadata[] } {
    const p = userPrompt.toLowerCase().replace(/[.,!?;:]/g, '').trim();
    const t = text.toLowerCase();
    const matchedActions: ActionMetadata[] = [];
    const seenIds = new Set<VerifiedActionId>();

    const addAction = (id: VerifiedActionId) => {
      if (!seenIds.has(id)) {
        seenIds.add(id);
        matchedActions.push(VERIFIED_ACTIONS[id]);
      }
    };

    // If user is just expanding or asking conversational follow-ups, NEVER attach automatic action buttons
    const isConversationalContinuation =
      p === 'tell me more' ||
      p.startsWith('tell me more') ||
      p === 'more' ||
      p.startsWith('more about') ||
      p.includes('expand') ||
      p.includes('elaborate') ||
      p.includes('continue') ||
      p.includes('go on') ||
      p.includes('what else') ||
      p.includes('details') ||
      p.startsWith('why did') ||
      p.startsWith('how does');

    const explicitlyRequestedLink =
      p.includes('link') ||
      p.includes('url') ||
      p.includes('site') ||
      p.includes('website') ||
      p.includes('open') ||
      p.includes('demo') ||
      p.includes('try it') ||
      p.includes('show me') ||
      p.includes('show the project') ||
      p.includes('show project') ||
      p.includes('watch') ||
      p.includes('showreel');

    if (!isConversationalContinuation || explicitlyRequestedLink) {
      // Social inquiries
      if (p.includes('instagram') || p.includes('insta') || p.includes('ig')) {
        addAction('instagram');
      } else if (p.includes('github') || p.includes('git repo')) {
        addAction('github');
      } else if (p.includes('linkedin')) {
        addAction('linkedin');
      } else if (p.includes('facebook') || p.includes('fb')) {
        addAction('facebook');
      } else if (p.includes('social') || p.includes('socials')) {
        addAction('linkedin');
        addAction('github');
      } else if (p.includes('cv') || p.includes('resume') || (p.includes('download') && p.includes('cv'))) {
        addAction('cv');
      } else if (
        p.includes('contact') ||
        p.includes('hire') ||
        p.includes('reach out') ||
        p.includes('whatsapp') ||
        p.includes('email') ||
        p.includes('call')
      ) {
        if (p.includes('email')) {
          addAction('email');
        } else if (p.includes('whatsapp')) {
          addAction('whatsapp');
        } else {
          addAction('whatsapp');
          addAction('email');
        }
      } else if (
        explicitlyRequestedLink &&
        (p.includes('examflow') || t.includes('examflowos.in') || t.includes('examflow'))
      ) {
        addAction('examflowos');
      } else if (
        explicitlyRequestedLink &&
        (p.includes('video') || p.includes('showreel') || t.includes('/video'))
      ) {
        addAction('video');
      } else if (
        explicitlyRequestedLink &&
        (p.includes('software') || t.includes('/software'))
      ) {
        addAction('software');
      }
    }

    // Maximum 2 actions to prevent link overload
    const finalActions = matchedActions.slice(0, 2);

    // Strip raw URLs & markdown link syntax so the prose stays natural
    let cleanedText = text
      .replace(/\[([^\]]+)\]\((?:https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, '$1')
      .replace(/https?:\/\/[^\s)<>]+/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    // Clean up any trailing orphaned link phrases (e.g. "You can see the interface at", "Check it out at")
    cleanedText = cleanedText
      .replace(/(?:you can (?:see the interface|check it out|explore it|view it|try it|find it) at|available at|accessible at|visit:|link:?)\s*[.:]?\s*$/i, '')
      .trim();

    return { cleanedText, actions: finalActions };
  }

  /**
   * 6. Multilingual Preservation
   * Prevents English documentation artifacts from polluting Telugu or Hindi responses.
   */
  public preserveMultilingualIntegrity(text: string): string {
    const isTelugu = /[\u0C00-\u0C7F]/.test(text);
    const isHindi = /[\u0900-\u097F]/.test(text);

    if (!isTelugu && !isHindi) {
      return text;
    }

    let cleaned = text;
    const englishHeadings = [
      /^About Devicharan:?\s*/i,
      /^Overview:?\s*/i,
      /^Key Details:?\s*/i,
      /^Details:?\s*/i,
      /^Background:?\s*/i,
      /^Summary:?\s*/i,
    ];

    for (const heading of englishHeadings) {
      cleaned = cleaned.replace(heading, '');
    }

    return cleaned.trim();
  }

  /**
   * 7. Conversational Rhythm Adjustment
   * Formats sentence lengths naturally:
   * Short sentence -> developing thought -> short sentence.
   */
  public formatConversationalRhythm(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    const formattedParagraphs = paragraphs.map(para => {
      // If paragraph is a massive single unbroken wall of text (> 350 chars), break it naturally
      if (para.length > 350 && !para.includes('\n')) {
        const sentences = para.split(/(?<=[.?!])\s+/);
        if (sentences.length >= 3) {
          const midPoint = Math.ceil(sentences.length / 2);
          const firstHalf = sentences.slice(0, midPoint).join(' ');
          const secondHalf = sentences.slice(midPoint).join(' ');
          return `${firstHalf}\n\n${secondHalf}`;
        }
      }
      return para;
    });

    return formattedParagraphs.join('\n\n').trim();
  }

  /**
   * Master Pipeline: Refines raw AI output before passing to chat renderer
   */
  public process(
    rawText: string,
    context: NaturalnessEngineContext = {}
  ): RefinedNaturalResponse {
    if (!rawText || rawText.trim().length === 0) {
      return {
        refinedText: '',
        actions: [],
        wasRestructured: false,
        repetitionDampened: false,
      };
    }

    // Step 1: Strip AI signatures, robot greetings, and customer-service closings
    let text = this.removeAISignatures(rawText);

    // Step 2: Multi-turn repetition prevention & follow-up intent restructuring
    const {
      text: deDuplicatedText,
      wasRestructured,
      repetitionDampened,
    } = this.preventRepetitionsAndRestructure(
      text,
      context.userPrompt || '',
      context.recentHistory || []
    );
    text = deDuplicatedText;

    // Step 3: Markdown restraint (headers, horizontal lines, excessive stars, mechanical bullets)
    text = this.applyMarkdownRestraint(text);

    // Step 4: Restrain mechanical emphasis
    text = this.restrainEmphasis(text);

    // Step 5: Preserve multilingual purity
    text = this.preserveMultilingualIntegrity(text);

    // Step 6: Adjust conversational prose rhythm
    text = this.formatConversationalRhythm(text);

    // Step 7: Action & link psychology
    const { cleanedText, actions } = this.extractVerifiedActions(
      text,
      context.userPrompt || ''
    );

    return {
      refinedText: cleanedText,
      actions,
      wasRestructured,
      repetitionDampened,
    };
  }
}

// Global default instance of the NaturalConversationEngine
export const defaultNaturalConversationEngine = new NaturalConversationEngine();
