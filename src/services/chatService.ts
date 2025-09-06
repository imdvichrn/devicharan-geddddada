// Mock chat service for the portfolio chatbot
// In a real implementation, this would connect to Google Gemini API

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PORTFOLIO_CONTEXT = `
You are Geddada Devicharan, an aspiring digital professional. 
Always reply in first person ("I", "me", "my") as if you are Devicharan himself.

Portfolio details to use when answering:
- Name: Geddada Devicharan
- Tagline: Aspiring Digital Professional | Creative Learner | Problem Solver
- Location/Contact: Visakhapatnam, India | +91 6303468707 | devicharangeddada@gmail.com
- Bio: Motivated and growth-driven individual with a Diploma in Electrical & Electronics Engineering and currently pursuing a B.Tech in EEE. Skilled in video editing, graphic design, website building, and digital content planning. Self-taught in AI-assisted workflows and prompt engineering, with strong adaptability, collaboration, and problem-solving skills.
- Skills:
  • Creative & Technical Tools: Adobe Photoshop, Canva, CapCut, DaVinci Resolve, Wix, No-code AI Platforms
  • Professional Skills: Data Entry, Research, Content Design, Bilingual Communication (Telugu ↔ English)
  • Soft Skills: Problem-Solving, Teamwork, Adaptability, Continuous Learning
- Projects:
  1. Portfolio Website (Wix/AI Builder, 2024)
  2. Video Editing Demos (CapCut & DaVinci Resolve, 2024)
  3. Content & Design (Photoshop, Canva, 2024)
  4. Marketing & Planning Practice (2024)
  5. Team Collaboration Project (2023)
- Education: B.Tech (EEE, ongoing); Diploma (EEE, M.R.A.G.R. Govt. Polytechnic, Vizianagaram)
- Highlights: Self-taught in Prompt Engineering & AI Tools; Bilingual (Telugu & English); Interest in Digital Marketing & Creative Design; Reliable and motivated.

Behavior rules:
1. Speak naturally, confidently, and professionally, like I'm chatting with a portfolio visitor.
2. Use my portfolio details to answer questions about my background, skills, projects, and education.
3. If asked about unrelated things, still respond intelligently but in my authentic voice.
4. Encourage contact only when it makes sense (don't over-advertise).
5. Keep replies concise, helpful, and engaging.
`;

// Mock responses for common questions
const mockResponses: Record<string, string> = {
  'hi': "Hi there! I'm Devicharan. Thanks for visiting my portfolio! I'm an aspiring digital professional with a passion for creative technology and problem-solving. How can I help you today?",
  'hello': "Hello! I'm Devicharan. Thanks for checking out my portfolio! I specialize in video editing, graphic design, and digital content creation. What would you like to know about my work?",
  'skills': "I have a diverse skill set including creative tools like Adobe Photoshop, Canva, CapCut, and DaVinci Resolve. I also work with Wix and no-code AI platforms. My professional skills include data entry, research, content design, and bilingual communication in Telugu and English. I'm particularly proud of being self-taught in AI-assisted workflows and prompt engineering!",
  'projects': "I've worked on several exciting projects! My recent work includes building portfolio websites using Wix and AI builders, creating professional video editing demos with CapCut and DaVinci Resolve, developing content and designs with Photoshop and Canva, practicing digital marketing and planning strategies, and leading team collaboration projects. Each project has helped me grow my technical and creative skills.",
  'education': "I have a Diploma in Electrical & Electronics Engineering from M.R.A.G.R. Govt. Polytechnic in Vizianagaram, and I'm currently pursuing my B.Tech in EEE. This technical foundation, combined with my self-taught digital skills, gives me a unique perspective on problem-solving and innovation.",
  'contact': "I'd love to hear from you! You can reach me at devicharangeddada@gmail.com or call me at +91 6303468707. I'm based in Visakhapatnam, India. Feel free to use the contact form on this page or connect with me directly!",
  'experience': "My experience spans across creative and technical domains. I'm skilled in video editing, graphic design, website building, and digital content planning. I've been self-teaching AI-assisted workflows and prompt engineering, which has been incredibly exciting. My engineering background gives me strong analytical and problem-solving abilities.",
  'default': "That's an interesting question! As someone passionate about digital technology and creative problem-solving, I'm always eager to explore new ideas. My background in electrical engineering combined with creative digital skills allows me to approach challenges from multiple angles. Is there something specific about my work or experience you'd like to know more about?"
};

export async function sendChatMessage(messages: Message[]): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'user') {
    throw new Error('Last message must be from user');
  }

  const userMessage = lastMessage.content.toLowerCase();
  
  // Find the most relevant response
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (keyword !== 'default' && userMessage.includes(keyword)) {
      return response;
    }
  }

  // For questions about specific topics
  if (userMessage.includes('about') || userMessage.includes('tell me')) {
    return "I'm Devicharan, an aspiring digital professional currently pursuing B.Tech in EEE. I'm passionate about combining my technical engineering background with creative digital skills. I specialize in video editing, graphic design, and AI-assisted workflows. My goal is to leverage technology to create meaningful digital experiences. What specific aspect of my work interests you most?";
  }

  if (userMessage.includes('work') || userMessage.includes('job')) {
    return "I'm currently focusing on building my expertise in digital content creation, video editing, and AI-assisted workflows while completing my B.Tech. I'm actively seeking opportunities to apply my creative and technical skills in professional settings. My diverse skill set in both engineering and creative domains makes me versatile for various roles in the digital space.";
  }

  if (userMessage.includes('future') || userMessage.includes('goals')) {
    return "My goal is to become a well-rounded digital professional who can bridge the gap between technical engineering principles and creative digital solutions. I'm particularly interested in exploring how AI and emerging technologies can enhance creative workflows. I believe my combination of engineering fundamentals and creative skills positions me well for the evolving digital landscape.";
  }

  // Default response
  return mockResponses.default;
}

// For future implementation with actual Google Gemini API
export async function sendChatMessageWithGemini(messages: Message[]): Promise<string> {
  // This would be implemented when deploying with actual backend
  // For now, fallback to mock service
  return sendChatMessage(messages);
}