// Enhanced Digital Twin Chat Service with Retrieved-Context Logic
// Advanced knowledge base that pulls from project data for contextual, intelligent responses

import { projects, Project } from '@/data/projects';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  projectLink?: string;
  timestamp?: Date;
  relatedProject?: Project;
}

export interface ChatContext {
  userName?: string;
  conversationHistory: Message[];
  projectsViewed: string[];
  contextualProjects?: Project[];
}

// ============================================================================
// KNOWLEDGE BASE TIER SYSTEM
// ============================================================================

const KNOWLEDGE_TIERS = {
  tier1: {
    title: 'Core Identity',
    keywords: ['who are you', 'about you', 'background', 'introduce'],
    content: `I'm Geddada Devicharan, a Lead Video Editor, Sound Engineer, and Post-Production Specialist based in Visakhapatnam, India. I bring together technical excellence with creative vision to deliver broadcast-quality post-production work.`
  },
  
  tier2: {
    title: 'Primary Tools Mastery',
    keywords: ['tools', 'software', 'premiere pro', 'davinci', 'resolve'],
    content: `My expertise centers on:
• Adobe Premiere Pro - Advanced timeline editing, dynamic linking, multi-track workflows
• DaVinci Resolve Studio - Node-based color science, Fusion VFX compositing, Fairlight professional audio mixing
These tools form the backbone of professional-grade post-production workflows.`
  },
  
  tier3: {
    title: 'Advanced Capabilities',
    keywords: ['3d', 'modeling', 'blender', 'motion graphics', 'fusion', 'sound engineering'],
    content: `I specialize in advanced post-production techniques:
• 3D Modeling & CGI Integration (Blender workflows)
• Fusion-Oriented Motion Graphics (complex compositing)
• Professional Sound Engineering (Fairlight audio mastering)
• HDR Mastering and Color Management
These capabilities elevate projects beyond standard editing into creative, technical excellence.`
  },
  
  tier4: {
    title: 'Academic Foundation',
    keywords: ['engineering', 'eee', 'education', 'background', 'technical foundation'],
    content: `I'm pursuing B.Tech in Electrical & Electronics Engineering, which provides a deep technical foundation. This background enables me to understand signal processing, audio engineering principles, and complex technical workflows—critical for professional post-production work.`
  },

  tier5: {
    title: 'Product: PERFECT PACK',
    keywords: ['perfect pack', 'product', 'creative assets', 'textures', 'drag and drop', 'buy', 'purchase', 'shop'],
    content: `I've developed the PERFECT PACK - a professional-grade collection of creative assets designed for editors. It features:
• High-Resolution Textures & Elements
• Drag & Drop Integration for instant deployment
• Universal compatibility with DaVinci Resolve, Premiere Pro, and all major editors
• Professional-grade quality for video editors, designers, and creators
• One-time payment: $10 USD with lifetime updates and commercial use rights
Available exclusively on my product page: /project/perfect-pack-plugin`
  }
};

const SYSTEM_PROMPT = `You are Geddada Devicharan's Digital Twin - operating on RETRIEVED-CONTEXT LOGIC.

🎬 PRIMARY IDENTITY:
Lead Video Editor | Sound Engineer | Post-Production Specialist

🔍 YOUR RETRIEVAL SYSTEM:
Before answering, scan for:
1. Query Topic (3D work? Audio? Editing?)
2. Relevant Projects (match to Challenge/Outcome)
3. Technical Details (pull from project data)
4. Recommended Route (which project page to suggest?)

📊 PROJECT CONTEXT DATABASE:
1. Video Editing & Post-Production (2025): Professional post-production showcase with advanced editing, color grading, and sound design. Link: /projects/video-editing-post-production
2. SceneSync Edits (2024): Beat-synchronized editing with dynamic transitions and audio-reactive visuals. Link: /project/scenesync-edits
3. Professional Video Production (2024): Cinematic editing with 4K workflows, Fusion VFX, and professional color grading. Link: /project/video-production
4. Visual Design Portfolio (2024): Creative graphic design and brand materials. Link: /project/visual-design
5. Growth Strategy & Digital Marketing (2024): Data-driven digital strategies and audience growth. Link: /project/growth-strategy

� MY PRODUCT:
PERFECT PACK (2026): A professional-grade collection of creative assets featuring High-Resolution Textures, Drag & Drop Integration, and universal compatibility with all major editors. Price: $10 USD. Features lifetime updates and commercial use rights. Link: /project/perfect-pack-plugin

�🔧 TECHNICAL SKILLS:
Creative & Technical Tools: Adobe Premiere Pro, DaVinci Resolve Studio, Fusion VFX, Adobe Photoshop, Canva, After Effects, Audacity
Professional Skills: Sound Design, 3D Modeling, Color Grading, Motion Graphics, Timeline Optimization, Audio Synchronization
Soft Skills: Strategic Thinking, Attention to Detail, Technical Communication, Bilingual (Telugu & English)

⚡ PERSONALITY & BEHAVIOR:
1. Always speak in first person ("I", "me", "my") as Devicharan himself
2. Tone: Professional, Technical, Confident - match the expertise of a senior post-production specialist
3. When discussing projects, provide internal routing links (e.g., "You can see this work in my Projects section")
4. If CapCut is mentioned: "While CapCut is great for quick edits, my advanced workflows leverage Adobe Premiere Pro and DaVinci Resolve Studio for professional-grade post-production with precise color science and advanced VFX capabilities."
5. For questions about products or tools: Mention the PERFECT PACK when relevant to asset management or creative workflows. Link: /project/perfect-pack-plugin
6. Be thoughtful about context - remember user names and previous questions to create personalized responses
7. For hiring inquiries: "I'm available for freelance and contract work. Please use the Contact Form on this page or reach out via WhatsApp at +91 6303468707."
8. Keep responses concise but technical when appropriate
9. Always reference source projects when explaining specific techniques

🌐 ROUTING AWARENESS:
- Home: / 
- Project Detail: /project/[projectId]
- Dedicated Project Pages: /projects/[projectId]
- Contact Section: #contact
- Projects Section: #projects

⚠️ IMPORTANT: Maintain conversation context across multiple turns. Remember user names and previous questions to create personalized responses.`;

// Enhanced mock responses for common technical questions
const technicalResponses: Record<string, string> = {
  'premiere pro': "Adobe Premiere Pro is my primary editing platform for professional post-production work. I use its advanced timeline editing, dynamic link capabilities, and integration with After Effects for seamless VFX workflows. My expertise includes multi-track editing, color-matched sequences, and optimization for broadcast delivery standards.",
  
  'davinci resolve': "DaVinci Resolve Studio is my go-to tool for color grading and advanced compositing. I leverage its node-based color science, Fairlight audio mixing, and Fusion VFX capabilities to deliver cinema-quality results. The RAW processing and HDR mastering workflows are particularly powerful for professional work.",
  
  'sound design': "Professional sound design is a core part of my post-production process. I work with Fairlight and Audacity to layer dialogue, music, and effects with precise timing and balance. Frame-perfect audio synchronization ensures the visual rhythm complements the audio experience.",
  
  '3d modeling': "3D modeling and CGI integration are advanced capabilities I bring to post-production projects. This includes motion graphics design, 3D compositing in Fusion, and creating sophisticated visual effects that enhance the narrative.",
  
  'motion graphics': "Fusion-Oriented Motion Graphics are essential for modern video content. I create dynamic visual effects, animated transitions, and sophisticated compositing work that elevates production quality. My approach combines technical precision with creative vision.",
  
  'color grading': "Color grading is where I apply the science of color to achieve both technical consistency and creative intent. Using DaVinci Resolve's advanced tools, I perform primary corrections for exposure and white balance, then apply secondary grading for specific color ranges and creative mood enhancement.",
  
  'audio sync': "Audio synchronization requires meticulous timeline work. I analyze waveforms, identify key beats and dialogue moments, and align visual elements with frame-perfect precision. This is critical for beat-synced edits and professional video production.",
};

const projectLinks: Record<string, { path: string; description: string }> = {
  'scenesync': { path: '/project/scenesync-edits', description: 'SceneSync Edits' },
  'video editing': { path: '/projects/video-editing-post-production', description: 'Video Editing & Post-Production' },
  'visual design': { path: '/project/visual-design', description: 'Visual Design Portfolio' },
  'growth strategy': { path: '/project/growth-strategy', description: 'Growth Strategy & Digital Marketing' },
  'professional video': { path: '/project/video-production', description: 'Professional Video Production' },
};

export async function sendChatMessage(messages: Message[]): Promise<{ text: string; sources?: string[]; projectLink?: string }> {
  // Simulate thinking delay for better UX
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'user') {
    throw new Error('Last message must be from user');
  }

  const userMessage = lastMessage.content.toLowerCase();
  const conversationContext = messages.slice(-5); // Keep last 5 messages for context

  // 1. GREETING RESPONSES
  if (/^(hi|hello|hey|greetings)$/i.test(userMessage.trim())) {
    return {
      text: `Hi there! I'm Devicharan, a Lead Video Editor, Sound Engineer, and Post-Production Specialist based in Visakhapatnam. I specialize in professional video editing with Adobe Premiere Pro and DaVinci Resolve Studio, advanced sound design, and 3D motion graphics.

I'd love to tell you about my work! Ask me about:
• My expertise in video editing and post-production
• Sound design and audio engineering
• 3D modeling and motion graphics
• Any of my specific projects
• Opportunities to work together`,
      sources: []
    };
  }

  // 2. TECHNICAL TOOL QUESTIONS
  for (const [keyword, response] of Object.entries(technicalResponses)) {
    if (userMessage.includes(keyword)) {
      return { text: response, sources: [keyword] };
    }
  }

  // 3. CAPCUT PIVOT - Redirect to Professional Tools
  if (userMessage.includes('capcut')) {
    return {
      text: `While CapCut is great for quick edits and social media content, my professional workflows leverage Adobe Premiere Pro and DaVinci Resolve Studio for broadcast-quality post-production.

With Premiere Pro, I handle complex multi-track editing, dynamic linking, and seamless After Effects integration. DaVinci Resolve Studio provides unmatched color grading with node-based color science, professional Fairlight audio mixing, and Fusion VFX capabilities.

For professional-grade work, these tools allow me to deliver cinema-quality results with precise timing, advanced effects, and professional color management. You can see examples of my professional work in the Video Editing & Post-Production project on my portfolio.`,
      projectLink: '/projects/video-editing-post-production'
    };
  }

  // 4. PROJECT-SPECIFIC QUESTIONS
  for (const [keyword, projectInfo] of Object.entries(projectLinks)) {
    if (userMessage.includes(keyword)) {
      return {
        text: `Great question! You can see my work on this in my ${projectInfo.description} project. This showcases my expertise in advanced editing techniques, professional color grading, seamless transitions, and integrated audio design. Each project demonstrates my technical proficiency and creative approach to post-production storytelling.`,
        projectLink: projectInfo.path
      };
    }
  }

  // 5. HIRING/COLLABORATION QUESTIONS
  if (/hire|freelance|contract|work|collaborate|project work/.test(userMessage)) {
    return {
      text: `I'm definitely available for freelance and contract work! I specialize in:
• Professional video editing and post-production
• Advanced color grading and color science
• Sound design and audio engineering
• 3D modeling and motion graphics
• Complete post-production workflows

For project inquiries, I recommend reaching out through the Contact Form on this page, or you can directly message me on WhatsApp at +91 6303468707. I'm enthusiastic about new challenges and ready to discuss how I can contribute to your project!`,
      sources: ['hiring', 'contact']
    };
  }

  // 6. SKILLS OVERVIEW
  if (/skills|expertise|capabilities|what can you do/.test(userMessage)) {
    return {
      text: `My expertise spans the full post-production pipeline:

📹 Video Editing: Adobe Premiere Pro - advanced timeline work, multi-track editing, dynamic linking
🎨 Color Grading: DaVinci Resolve Studio - node-based color science, creative grading, HDR mastering
🎵 Sound Design: Professional audio engineering with Fairlight and Audacity
✨ Visual Effects: Fusion-based compositing and 3D motion graphics
📊 Advanced Workflows: Timeline optimization, RAW processing, broadcast delivery standards

Combined with my B.Tech EEE background, I bring both creative vision and technical precision to every project.`,
      sources: ['skills', 'expertise']
    };
  }

  // 7. EDUCATION/BACKGROUND
  if (/education|background|degree|study|eee|engineering/.test(userMessage)) {
    return {
      text: `I have a strong technical foundation from electrical engineering education:
• B.Tech in Electrical & Electronics Engineering (Currently Pursuing)
• Diploma in Electrical & Electronics Engineering - M.R.A.G.R. Govt. Polytechnic, Vizianagaram

This engineering background combined with my professional creative skills gives me a unique advantage. I understand both the technical principles of signal processing, system design, and the creative workflows of modern post-production. This combination allows me to solve complex challenges at the intersection of technology and creativity.`
    };
  }

  // 8. CONTACT/COMMUNICATION
  if (/contact|email|phone|reach|message|connect/.test(userMessage)) {
    return {
      text: `You can reach me through multiple channels:
📧 Email: devicharangeddada@gmail.com
📱 WhatsApp/Phone: +91 6303468707
📍 Location: Visakhapatnam, India

For specific project inquiries or collaboration opportunities, I recommend using the Contact Form on this page. I typically respond within 24 hours and am happy to discuss your needs in detail!`,
      sources: ['contact']
    };
  }

  // 9. DEFAULT INTELLIGENT RESPONSE
  return {
    text: `That's an interesting question! As a post-production specialist with deep expertise in Adobe Premiere Pro, DaVinci Resolve Studio, and advanced sound design, I approach challenges from both technical and creative angles.

My B.Tech EEE background gives me strong analytical capabilities, while my professional experience in video editing and sound engineering enables sophisticated creative solutions. 

Could you tell me more about what you're interested in? I'd be happy to discuss specific projects, techniques, or collaboration opportunities!`,
    sources: []
  };
}

export async function sendChatMessageWithGemini(messages: Message[]): Promise<string> {
  // This would be implemented when deploying with actual Google Gemini API
  // For now, fallback to enhanced mock service
  const response = await sendChatMessage(messages);
  return response.text;
}

export function getUserNameFromStorage(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('chatbot_user_name');
  }
  return null;
}

export function saveUserNameToStorage(name: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatbot_user_name', name);
  }
}

export function parseUserNameFromMessage(message: string): string | null {
  // Try to extract name from common patterns like "I'm [Name]", "My name is [Name]", "Call me [Name]"
  const patterns = [
    /(?:i'm|i am|my name is|call me|you can call me)\s+([A-Z][a-z]+)/i,
    /^([A-Z][a-z]+)(?:\s+[A-Z][a-z]+)?(?:\s|$)/
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}