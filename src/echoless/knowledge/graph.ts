/**
 * Echoless Deterministic Semantic Knowledge Graph
 * 
 * Represents verified entities, relationships, and attributes for Geddada Devicharan's portfolio.
 * Enables structured semantic reasoning without hallucination or statistical guesswork.
 */

import { TypedFact, VERIFIED_FACTS, getFactsByEntity } from './facts';
import { VERIFIED_ACTIONS_REGISTRY, VerifiedAction } from './actions';

export type EntityType =
  | 'person'
  | 'product'
  | 'domain'
  | 'organization'
  | 'tool'
  | 'education'
  | 'training'
  | 'social_channel'
  | 'contact_channel'
  | 'document';

export type RelationType =
  | 'built'
  | 'works_in'
  | 'manages'
  | 'created'
  | 'worked_with'
  | 'studied_at'
  | 'trained_at'
  | 'uses_tool'
  | 'targets'
  | 'has_initiative'
  | 'has_feature'
  | 'has_social'
  | 'has_contact'
  | 'has_document';

export interface GraphNode {
  id: string;
  name: string;
  type: EntityType;
  aliases: string[];
  description: string;
  actionId?: string;
  verified: boolean;
}

export interface GraphEdge {
  fromId: string;
  toId: string;
  relation: RelationType;
  context?: string;
  verified: boolean;
}

export class KnowledgeGraph {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: GraphEdge[] = [];
  private nodeIndex: Map<string, string> = new Map(); // alias -> nodeId

  constructor() {
    this.initializeNodes();
    this.initializeEdges();
    this.buildIndex();
  }

  private initializeNodes() {
    const rawNodes: GraphNode[] = [
      // Person / Creator
      {
        id: 'devicharan',
        name: 'Geddada Devicharan',
        type: 'person',
        aliases: [
          'devicharan', 'geddada devicharan', 'devi charan', 'devi', 'charan',
          'imdvichrn', 'him', 'he', 'author', 'creator', 'developer', 'editor', 'builder',
          'అతను', 'దేవిచరణ్', 'చరణ్'
        ],
        description: 'Digital Product Builder, Video Editor / Post-Production Specialist, and Business Systems Creator',
        actionId: 'contact',
        verified: true,
      },

      // Products & Software
      {
        id: 'examflowos',
        name: 'ExamFlowOS',
        type: 'product',
        aliases: [
          'examflowos', 'examflow', 'exam flow', 'exam flow os', 'cbt platform',
          'exam software', 'cbt software', 'entrance exam app', 'exam', 'exams',
          'ecet', 'polycet', 'icet', 'exams app'
        ],
        description: '100% Free CBT Practice & Study Operating System for AP & TS Entrance Exams (10K+ Users, ~700 Active)',
        actionId: 'examflowos',
        verified: true,
      },
      {
        id: 'perfect_pack',
        name: 'Perfect Pack',
        type: 'product',
        aliases: [
          'perfect pack', 'perfectpack', 'power grades', 'presets', 'transitions',
          'davinci pack', 'editing pack', 'davinci resolve pack'
        ],
        description: 'Professional asset, power grade, and transition toolkit crafted for DaVinci Resolve Studio creators',
        actionId: 'perfect_pack',
        verified: true,
      },

      // Core Professional Domains
      {
        id: 'video',
        name: 'Video Post-Production & Color Grading',
        type: 'domain',
        aliases: [
          'video', 'videos', 'video editing', 'color grading', 'post production',
          'editing', 'davinci resolve', 'davinci', 'fusion', 'fairlight', 'grades',
          'video work', 'deliverables', '700 videos', 'showreel'
        ],
        description: '700+ commercial, narrative, wedding, corporate, and creative video deliverables in DaVinci Resolve Studio',
        actionId: 'video',
        verified: true,
      },
      {
        id: 'web_ecosystems',
        name: 'Web Ecosystems & Development',
        type: 'domain',
        aliases: [
          'web', 'websites', 'web dev', 'web development', 'frontend', 'managed websites',
          'react', 'typescript', 'nextjs', 'tailwind', '8 websites', 'web design'
        ],
        description: 'Full-stack web architectures, clean typography, sub-second performance, and 8+ actively managed business websites',
        actionId: 'web',
        verified: true,
      },
      {
        id: 'business_systems',
        name: 'Business Systems & Automation',
        type: 'domain',
        aliases: [
          'systems', 'automation', 'business systems', 'n8n', 'workflows', 'crm',
          'lead routing', 'webhooks', 'business automation', 'operations'
        ],
        description: 'Automated business operations, n8n event-driven pipelines, CRM integration, and operational workflows',
        actionId: 'systems',
        verified: true,
      },
      {
        id: 'software',
        name: 'Software Engineering & Products',
        type: 'domain',
        aliases: [
          'software', 'code', 'coding', 'apps', 'engineering', 'development',
          'tech stack', 'full stack', 'programming'
        ],
        description: 'TypeScript, React, Next.js, Node.js, and practical software applications',
        actionId: 'software',
        verified: true,
      },

      // Organizations & Client Partnerships
      {
        id: 'annapurna_foundation',
        name: 'Annapurna Foundation',
        type: 'organization',
        aliases: [
          'annapurna foundation', 'annapurna', 'ngo', 'charity', 'foundation',
          'project annapurna', 'goseva', 'saraswati devi', 'street dogs'
        ],
        description: 'Andhra Pradesh non-profit NGO for food seva, cattle care, school sanitation, and animal welfare (Web & Digital Presence managed pro bono)',
        actionId: 'annapurna',
        verified: true,
      },
      {
        id: 'sri_lahari_studios',
        name: 'Sri Lahari Studios',
        type: 'organization',
        aliases: [
          'sri lahari studios', 'sri lahari', 'lahari studios', 'photography studio',
          'sri lahari studios os', 'kothavalasa studio'
        ],
        description: 'Decade-old photography & videography studio in Kothavalasa (Built Sri Lahari Studios OS for operations & inquiry routing)',
        verified: true,
      },

      // Primary Tools
      {
        id: 'davinci_resolve',
        name: 'DaVinci Resolve Studio',
        type: 'tool',
        aliases: ['davinci resolve studio', 'davinci resolve', 'davinci', 'resolve', 'blackmagic'],
        description: 'Primary NLE, color grading (DWG/ACES), motion graphics (Fusion), and audio post (Fairlight) environment',
        verified: true,
      },

      // Education & Training
      {
        id: 'education_btech',
        name: 'B.Tech in Electrical and Electronics Engineering',
        type: 'education',
        aliases: ['btech', 'b tech', 'engineering degree', 'andhra university', 'degree', 'college'],
        description: 'Final Year B.Tech EEE at Andhra University Affiliated Engineering College, Visakhapatnam',
        verified: true,
      },
      {
        id: 'education_diploma',
        name: 'Diploma in Electrical and Electronics Engineering',
        type: 'education',
        aliases: ['diploma', 'polytechnic', 'mragr polytechnic', 'diploma eee'],
        description: 'Diploma in EEE from M.R.A.G.R. Government Polytechnic, Vizianagaram',
        verified: true,
      },
      {
        id: 'training_bhel',
        name: 'BHEL Visakhapatnam Industrial Training',
        type: 'training',
        aliases: ['bhel', 'bhel training', 'bharat heavy electricals', 'industrial training'],
        description: 'Industrial practical training on heavy electrical equipment and manufacturing protocols at BHEL Visakhapatnam',
        verified: true,
      },
      {
        id: 'training_hmies',
        name: 'HMIES / APSCHE Computational Internship',
        type: 'training',
        aliases: ['hmies', 'apsche', 'matlab internship', 'computational modeling'],
        description: 'Industrial internship on MATLAB simulation, algorithm modeling, and control systems',
        verified: true,
      },

      // Social & Communication Channels
      {
        id: 'social_instagram',
        name: 'Instagram',
        type: 'social_channel',
        aliases: ['instagram', 'insta', 'instgram', 'instagarm', 'ig', 'his instagram', 'his insta'],
        description: 'Instagram handle @imdvichrn for visual edits, color grading clips, and creative work',
        actionId: 'instagram',
        verified: true,
      },
      {
        id: 'social_github',
        name: 'GitHub',
        type: 'social_channel',
        aliases: ['github', 'git hub', 'git', 'github profile', 'his github', 'repos'],
        description: 'GitHub profile @imdvichrn with code repositories and open source projects',
        actionId: 'github',
        verified: true,
      },
      {
        id: 'social_linkedin',
        name: 'LinkedIn',
        type: 'social_channel',
        aliases: ['linkedin', 'linkdin', 'linked in', 'his linkedin', 'linkedin profile'],
        description: 'Professional profile and industry network on LinkedIn',
        actionId: 'linkedin',
        verified: true,
      },
      {
        id: 'social_facebook',
        name: 'Facebook',
        type: 'social_channel',
        aliases: ['facebook', 'facboook', 'fb', 'face book', 'facbook', 'his facebook'],
        description: 'Facebook profile @imdvichrn',
        actionId: 'facebook',
        verified: true,
      },
      {
        id: 'social_twitter',
        name: 'X (Twitter)',
        type: 'social_channel',
        aliases: ['twitter', 'x', 'x.com', 'tweet', 'his twitter', 'his x'],
        description: 'X profile @devi_charan_2004',
        actionId: 'twitter',
        verified: true,
      },
      {
        id: 'contact_whatsapp',
        name: 'WhatsApp',
        type: 'contact_channel',
        aliases: ['whatsapp', 'whats app', 'wa', 'chat on whatsapp', 'his whatsapp', 'phone number'],
        description: 'Direct WhatsApp communication (+91 6303468707)',
        actionId: 'whatsapp',
        verified: true,
      },
      {
        id: 'contact_email',
        name: 'Email',
        type: 'contact_channel',
        aliases: ['email', 'mail', 'gmail', 'his email', 'inbox', 'send email'],
        description: 'Direct email contact (devicharangeddada@gmail.com)',
        actionId: 'email',
        verified: true,
      },
      {
        id: 'doc_cv',
        name: 'Official CV',
        type: 'document',
        aliases: ['cv', 'resume', 'pdf cv', 'download cv', 'biodata'],
        description: 'Curriculum Vitae document (~3.52 MB PDF)',
        actionId: 'cv',
        verified: true,
      },
    ];

    for (const node of rawNodes) {
      this.nodes.set(node.id, node);
    }
  }

  private initializeEdges() {
    this.edges = [
      // Creator Relationships
      { fromId: 'devicharan', toId: 'examflowos', relation: 'built', context: 'Engineered complete CBT architecture, recall engines, and Google Drive cloud sync', verified: true },
      { fromId: 'devicharan', toId: 'video', relation: 'works_in', context: '700+ deliverables in DaVinci Resolve Studio across commercial, narrative, and wedding genres', verified: true },
      { fromId: 'devicharan', toId: 'web_ecosystems', relation: 'manages', context: 'Architects and maintains 8+ active business websites with modern frontend stack', verified: true },
      { fromId: 'devicharan', toId: 'business_systems', relation: 'created', context: 'Designs n8n event-driven automation, webhook routing, and operational CRM pipelines', verified: true },
      { fromId: 'devicharan', toId: 'perfect_pack', relation: 'created', context: 'Crafted curated power grades and transition toolkit for DaVinci Resolve creators', verified: true },
      { fromId: 'devicharan', toId: 'annapurna_foundation', relation: 'worked_with', context: 'Architected and maintains public web presence, donation workflows, and video documentation pro bono', verified: true },
      { fromId: 'devicharan', toId: 'sri_lahari_studios', relation: 'worked_with', context: 'Engineered Sri Lahari Studios OS for automated inquiry routing and operations', verified: true },

      // Education & Training
      { fromId: 'devicharan', toId: 'education_btech', relation: 'studied_at', context: 'Final Year Electrical & Electronics Engineering at AU Affiliated College', verified: true },
      { fromId: 'devicharan', toId: 'education_diploma', relation: 'studied_at', context: 'Diploma in Electrical & Electronics Engineering at MRAGR Govt Polytechnic', verified: true },
      { fromId: 'devicharan', toId: 'training_bhel', relation: 'trained_at', context: 'Heavy electrical industrial equipment & manufacturing protocols', verified: true },
      { fromId: 'devicharan', toId: 'training_hmies', relation: 'trained_at', context: 'MATLAB computational modeling & simulation internship', verified: true },

      // Channels
      { fromId: 'devicharan', toId: 'social_instagram', relation: 'has_social', context: '@imdvichrn', verified: true },
      { fromId: 'devicharan', toId: 'social_github', relation: 'has_social', context: '@imdvichrn', verified: true },
      { fromId: 'devicharan', toId: 'social_linkedin', relation: 'has_social', context: 'in/geddadadevicharan', verified: true },
      { fromId: 'devicharan', toId: 'social_facebook', relation: 'has_social', context: '@imdvichrn', verified: true },
      { fromId: 'devicharan', toId: 'social_twitter', relation: 'has_social', context: '@devi_charan_2004', verified: true },
      { fromId: 'devicharan', toId: 'contact_whatsapp', relation: 'has_contact', context: '+91 6303468707', verified: true },
      { fromId: 'devicharan', toId: 'contact_email', relation: 'has_contact', context: 'devicharangeddada@gmail.com', verified: true },
      { fromId: 'devicharan', toId: 'doc_cv', relation: 'has_document', context: 'Geddada_Devicharan_CV.pdf', verified: true },

      // Domain & Tool Connections
      { fromId: 'video', toId: 'davinci_resolve', relation: 'uses_tool', context: 'ACES/DWG color grading, Fusion motion graphics, Fairlight audio restoration', verified: true },
      { fromId: 'perfect_pack', toId: 'davinci_resolve', relation: 'targets', context: 'Built exclusively for DaVinci Resolve Studio workflows', verified: true },
    ];
  }

  private buildIndex() {
    this.nodeIndex.clear();
    for (const [id, node] of this.nodes.entries()) {
      this.nodeIndex.set(id.toLowerCase(), id);
      this.nodeIndex.set(node.name.toLowerCase(), id);
      for (const alias of node.aliases) {
        this.nodeIndex.set(alias.toLowerCase(), id);
      }
    }
  }

  /**
   * Get a node by ID
   */
  public getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Resolve an entity node from raw text query using deterministic matching and alias table
   */
  public findNode(query: string): GraphNode | undefined {
    const cleanQuery = query.trim().toLowerCase().replace(/[?!.,;:]/g, '');
    if (!cleanQuery) return undefined;

    // Direct lookup
    if (this.nodeIndex.has(cleanQuery)) {
      const id = this.nodeIndex.get(cleanQuery)!;
      return this.nodes.get(id);
    }

    // Exact word or substring match
    for (const [alias, nodeId] of this.nodeIndex.entries()) {
      if (alias.length >= 3) {
        // Full token match
        const regex = new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i');
        if (regex.test(cleanQuery)) {
          return this.nodes.get(nodeId);
        }
      }
    }

    // Fuzzy single-character typo tolerance for key entities
    for (const [alias, nodeId] of this.nodeIndex.entries()) {
      if (alias.length >= 4 && computeLevenshteinDistance(cleanQuery, alias) <= 1) {
        return this.nodes.get(nodeId);
      }
    }

    return undefined;
  }

  /**
   * Get all outgoing edges from a node
   */
  public getOutgoingEdges(nodeId: string, relation?: RelationType): GraphEdge[] {
    return this.edges.filter(
      (e) => e.fromId === nodeId && (!relation || e.relation === relation)
    );
  }

  /**
   * Get all incoming edges to a node
   */
  public getIncomingEdges(nodeId: string, relation?: RelationType): GraphEdge[] {
    return this.edges.filter(
      (e) => e.toId === nodeId && (!relation || e.relation === relation)
    );
  }

  /**
   * Get nodes related to a given node by relationship
   */
  public getRelatedNodes(nodeId: string, relation?: RelationType): GraphNode[] {
    const outgoing = this.getOutgoingEdges(nodeId, relation).map((e) => this.nodes.get(e.toId));
    const incoming = this.getIncomingEdges(nodeId, relation).map((e) => this.nodes.get(e.fromId));
    return [...outgoing, ...incoming].filter((n): n is GraphNode => Boolean(n));
  }

  /**
   * Query all typed facts associated with an entity
   */
  public getFacts(entityId: string): TypedFact[] {
    return getFactsByEntity(entityId);
  }

  /**
   * Get the verified action associated with this entity if available
   */
  public getAction(nodeId: string): VerifiedAction | undefined {
    const node = this.nodes.get(nodeId);
    if (!node || !node.actionId) return undefined;
    return VERIFIED_ACTIONS_REGISTRY[node.actionId];
  }

  /**
   * List all entities in the graph
   */
  public getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }
}

// Utility: Levenshtein distance for fuzzy misspelling handling
function computeLevenshteinDistance(a: string, b: string): number {
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

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Global singleton instance
export const knowledgeGraph = new KnowledgeGraph();
