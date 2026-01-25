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

interface QueryAnalysis {
  relevantProjects: Project[];
  queryType: 'editing' | 'audio' | '3d' | 'color' | 'hiring' | 'skills' | 'education' | 'contact' | 'greeting' | 'default';
  contextData: {
    challenges?: string[];
    outcomes?: string[];
    tools?: string[];
  };
}

// ============================================================================
// RETRIEVED-CONTEXT LOGIC FUNCTIONS
// ============================================================================

function analyzeQueryContext(userMessage: string): QueryAnalysis {
  const messageLower = userMessage.toLowerCase();
  let queryType: QueryAnalysis['queryType'] = 'default';
  let relevantProjects: Project[] = [];
  const contextData: QueryAnalysis['contextData'] = {};

  // 1. IDENTIFY QUERY TYPE
  if (/^(hi|hello|hey|greetings)$/i.test(userMessage.trim())) {
    queryType = 'greeting';
  } else if (/edit|premiere|timeline|transition|cut/.test(messageLower)) {
    queryType = 'editing';
    // Retrieve all video projects with editing context
    relevantProjects = projects.filter(p => p.category === 'video');
    contextData.challenges = relevantProjects.map(p => p.challenge);
    contextData.tools = ['Adobe Premiere Pro', 'DaVinci Resolve'];
  } else if (/audio|sound|fairlight|music|beat|synchron/.test(messageLower)) {
    queryType = 'audio';
    // Retrieve projects with sound engineering context
    relevantProjects = projects.filter(p => 
      p.technicalDetails?.some(detail => 
        detail.toLowerCase().includes('audio') || detail.toLowerCase().includes('sound')
      )
    );
    contextData.challenges = relevantProjects.map(p => p.challenge);
    contextData.tools = ['Fairlight Audio', 'Sound Design', 'Audio Synchronization'];
  } else if (/3d|model|blender|motion|graphic|fusion|compose/.test(messageLower)) {
    queryType = '3d';
    // Retrieve projects with 3D/Motion Graphics context
    relevantProjects = projects.filter(p => 
      p.tools?.some(tool => tool.includes('3D')) || 
      p.tools?.some(tool => tool.includes('Fusion'))
    );
    contextData.challenges = relevantProjects.map(p => p.challenge);
    contextData.tools = ['Blender', '3D Modeling', 'Fusion-Oriented Motion Graphics', 'CGI Integration'];
  } else if (/color|grade|grading|correction|davinci/.test(messageLower)) {
    queryType = 'color';
    // Retrieve projects with color grading context
    relevantProjects = projects.filter(p => 
      p.technicalDetails?.some(detail => detail.includes('Grading') || detail.includes('Correction'))
    );
    contextData.challenges = relevantProjects.map(p => p.challenge);
    contextData.tools = ['DaVinci Resolve Studio', 'Node-based Grading', 'HDR Mastering'];
  } else if (/hire|freelance|contract|work|collaborate|project/.test(messageLower)) {
    queryType = 'hiring';
  } else if (/skill|expertise|capabil|what can/.test(messageLower)) {
    queryType = 'skills';
  } else if (/education|background|degree|study|eee|engineering/.test(messageLower)) {
    queryType = 'education';
  } else if (/contact|email|phone|reach|message|connect/.test(messageLower)) {
    queryType = 'contact';
  }

  return { relevantProjects, queryType, contextData };
}

function routeQueryType(
  userMessage: string,
  queryType: QueryAnalysis['queryType'],
  relevantProjects: Project[],
  contextData: QueryAnalysis['contextData']
): { text: string; sources?: string[]; projectLink?: string; relatedProject?: Project } {
  
  const messageLower = userMessage.toLowerCase();

  // GREETING
  if (queryType === 'greeting') {
    return {
      text: `Hi there! I'm Devicharan, a Lead Video Editor, Sound Engineer, and Post-Production Specialist based in Visakhapatnam. I specialize in professional video editing with Adobe Premiere Pro and DaVinci Resolve Studio, advanced sound design, and 3D motion graphics.

Ask me about:
• Video editing and post-production workflows
• Professional sound design and Fairlight audio
• 3D modeling and Fusion motion graphics
• My specific projects and case studies
• Opportunities to collaborate`,
      sources: []
    };
  }

  // VIDEO EDITING - Retrieved from project context
  if (queryType === 'editing') {
    const editingProject = relevantProjects.find(p => p.id.includes('editing') || p.id.includes('production'));
    const challengeContext = editingProject?.challenge || 'managing complex timelines with multiple video layers';
    
    return {
      text: `Video editing is my core expertise. I work primarily with Adobe Premiere Pro for advanced timeline editing and DaVinci Resolve Studio for the complete post-production workflow.

Real-world challenge I solve: "${challengeContext}"

My approach combines:
• Multi-track timeline organization for complex projects
• Seamless transition design maintaining visual rhythm
• Professional color-matched sequences
• Optimized delivery for broadcast standards

You can explore my complete editing process in my Video Editing & Post-Production project.`,
      projectLink: '/projects/video-editing-post-production',
      relatedProject: editingProject
    };
  }

  // AUDIO & SOUND ENGINEERING - Retrieved from project context
  if (queryType === 'audio') {
    const audioProject = relevantProjects.find(p => p.roles?.some(r => r.includes('Sound')));
    const audioChallenge = audioProject?.challenge || 'achieving frame-perfect audio synchronization';
    
    return {
      text: `Professional Sound Engineering is fundamental to my post-production workflow. I'm expert in both technical audio mixing and creative sound design.

Key challenge I master: "${audioChallenge}"

My sound design capabilities include:
• Fairlight Audio mixing - professional-grade mixing console
• Frame-perfect audio synchronization with visual content
• Dialogue editing, music layering, and effects design
• Beat-mapping for synchronized visual transitions
• Professional audio delivery standards

In my SceneSync Edits project, you'll see how I synchronize audio peaks with visual transitions for maximum impact.`,
      projectLink: '/project/scenesync-edits',
      relatedProject: audioProject,
      sources: ['audio', 'sound engineering', 'fairlight']
    };
  }

  // 3D MODELING & MOTION GRAPHICS - Retrieved from project context
  if (queryType === '3d') {
    const vfxProject = relevantProjects.find(p => p.tools?.some(t => t.includes('3D') || t.includes('Fusion')));
    const vfxChallenge = vfxProject?.challenge || 'integrating complex visual effects seamlessly';
    
    return {
      text: `3D Modeling and Fusion-Oriented Motion Graphics represent the advanced creative layer of my work. I combine technical precision with artistic vision.

Technical challenge I solve: "${vfxChallenge}"

My 3D/Motion Graphics expertise includes:
• Blender 3D modeling for custom visual elements
• Fusion compositing with node-based workflows
• CGI integration into video projects
• Complex particle effects and simulations
• Motion graphics for branding and promotional content

The Professional Video Production project showcases my Fusion VFX capabilities and how I integrate complex visual elements with professional color grading.`,
      projectLink: '/project/video-production',
      relatedProject: vfxProject,
      sources: ['3d', 'blender', 'motion graphics', 'fusion']
    };
  }

  // COLOR GRADING - Retrieved from project context
  if (queryType === 'color') {
    const colorProject = relevantProjects.find(p => p.technicalDetails?.some(d => d.includes('Grading')));
    const colorChallenge = colorProject?.challenge || 'maintaining consistent color science across diverse footage';
    
    return {
      text: `Color Grading is where art meets science in my workflow. I use DaVinci Resolve Studio's node-based color science to achieve both technical consistency and creative intent.

Real-world challenge: "${colorChallenge}"

My color grading process:
• Primary Color Correction - exposure, white balance, dynamic range
• Secondary Grading - selective color work using curves and hue ranges
• Creative LUT application - cohesive look development
• HDR Mastering - future-proofing for emerging standards
• Monitor calibration - ensuring delivery accuracy

You can see my color work across all my video projects, particularly in Professional Video Production where I demonstrate cinema-quality grading on 4K RAW footage.`,
      projectLink: '/project/video-production',
      relatedProject: colorProject,
      sources: ['color grading', 'davinci resolve', 'hdr mastering']
    };
  }

  // HIRING/COLLABORATION
  if (queryType === 'hiring') {
    const allTools = Array.from(new Set(
      projects.flatMap(p => p.tools).filter(t => !t.includes('Tools'))
    )).slice(0, 5).join(', ');
    
    return {
      text: `Absolutely! I'm available for freelance and contract work on diverse post-production projects.

My core deliverables:
✓ Professional video editing (Premiere Pro & DaVinci Resolve)
✓ Advanced color grading and HDR mastering
✓ Professional sound design with Fairlight audio
✓ 3D modeling and motion graphics (Blender/Fusion)
✓ Complete post-production workflows from raw footage to final delivery

I work with: ${allTools}, and more.

For project inquiries:
📧 Email: devicharangeddada@gmail.com
📱 WhatsApp: +91 6303468707
💬 Use the Contact Form on this page

Let's discuss your project requirements! I respond within 24 hours.`,
      sources: ['hiring', 'freelance', 'contact']
    };
  }

  // SKILLS OVERVIEW
  if (queryType === 'skills') {
    return {
      text: `My expertise spans the complete post-production pipeline:

🎬 VIDEO EDITING
• Adobe Premiere Pro - Advanced timeline, dynamic linking, multi-track workflows
• DaVinci Resolve Studio - Color grading, Fusion compositing, Fairlight mixing
• Professional pacing and visual storytelling

🎨 COLOR GRADING & VISUAL EFFECTS
• Node-based color science in DaVinci Resolve
• HDR and standard dynamic range mastering
• Fusion-based compositing and motion graphics
• Cinema-quality deliverables

🎵 PROFESSIONAL SOUND ENGINEERING
• Fairlight audio mixing and mastering
• Frame-perfect audio synchronization
• Dialogue editing and sound design
• Beat mapping and music synchronization

🔧 ADVANCED CAPABILITIES
• Blender 3D modeling and CGI integration
• Fusion-Oriented motion graphics
• Custom color LUT development
• Timeline optimization and RAW processing

Combined with my B.Tech EEE background, I bring both creative vision and technical precision to every project.`,
      sources: ['skills', 'expertise', 'capabilities']
    };
  }

  // EDUCATION/BACKGROUND
  if (queryType === 'education') {
    return {
      text: `I have a strong technical foundation in electrical engineering:

🎓 EDUCATION
• B.Tech in Electrical & Electronics Engineering (Currently Pursuing)
• Diploma in Electrical & Electronics Engineering
  - M.R.A.G.R. Govt. Polytechnic, Vizianagaram

🔌 WHY THIS MATTERS
My engineering background gives me critical advantages in post-production:

1. Signal Processing Understanding - Essential for audio engineering and Fairlight mastering
2. System Design Thinking - Complex workflow optimization and troubleshooting
3. Technical Problem-Solving - Solving edge cases in color science and VFX compositing
4. Precision and Detail - Critical for frame-perfect audio sync and quality assurance

This foundation combined with creative post-production expertise allows me to solve challenges at the intersection of technology and art—delivering professional-grade results that demand both technical excellence and creative vision.`,
      sources: ['education', 'engineering', 'technical foundation']
    };
  }

  // CONTACT/COMMUNICATION
  if (queryType === 'contact') {
    return {
      text: `Let's connect! You can reach me through multiple channels:

📧 Email: devicharangeddada@gmail.com
📱 WhatsApp/Phone: +91 6303468707
📍 Location: Visakhapatnam, India

💬 RECOMMENDED: Use the Contact Form on this page for detailed project inquiries
- Allows you to describe your needs in detail
- I respond within 24 hours with a comprehensive proposal
- Best for discussing timelines and budgets

🚀 QUICK CHAT: WhatsApp for immediate discussion
- Share project references and requirements
- Real-time conversation about your needs
- Perfect for clarifying scope and expertise

I'm enthusiastic about new challenges and ready to discuss how I can contribute to your creative vision!`,
      sources: ['contact', 'email', 'whatsapp']
    };
  }

  // DEFAULT - Intelligent fallback
  return {
    text: `That's an interesting question! As a post-production specialist with deep expertise across video editing, sound engineering, and 3D motion graphics, I approach challenges from both technical and creative angles.

My B.Tech EEE background gives me strong analytical capabilities in signal processing and system design, while my professional experience in DaVinci Resolve, Adobe Premiere Pro, and Fairlight enables sophisticated creative solutions.

Could you tell me more about what you're interested in? I'd be happy to discuss:
• Specific post-production techniques
• My project case studies and outcomes
• Technical workflows for your needs
• Collaboration opportunities`,
    sources: []
  };
}

export async function sendChatMessage(messages: Message[]): Promise<{ text: string; sources?: string[]; projectLink?: string; relatedProject?: Project }> {
  // Simulate thinking delay for better UX
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'user') {
    throw new Error('Last message must be from user');
  }

  const userMessage = lastMessage.content.toLowerCase();
  
  // RETRIEVED-CONTEXT LOGIC: Analyze query and pull relevant project data
  const { relevantProjects, queryType, contextData } = analyzeQueryContext(userMessage);

  // Route based on query type with contextual project data
  const response = routeQueryType(userMessage, queryType, relevantProjects, contextData);
  
  return response;
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
