// ------------------------------
// Echoless – Simple First-Person Chatbot Backend
// ------------------------------

const responses = {
  greeting: [
    "Hi! 👋 I'm Devicharan from Visakhapatnam, India. I'm pursuing B.Tech in Electrical & Electronics Engineering. How can I help you today?",
    "Hello! I'm Devicharan, an EEE student passionate about AI, content creation, and digital tools. What would you like to know?",
    "Hey there! I'm Devicharan. I work with AI-assisted content, video editing, and data research. Ask me anything!",
  ],

  about: [
    "I'm Devicharan, currently pursuing B.Tech in Electrical & Electronics Engineering at Andhra University. I hold a Diploma in EEE and I'm passionate about AI-assisted content creation, video editing, data research, and digital tools.",
    "I'm an aspiring digital professional from Visakhapatnam with strong adaptability and bilingual communication skills (Telugu ↔ English). I focus on AI workflows, content creation, and problem-solving.",
    "I'm Devicharan - a tech enthusiast who loves working with AI tools, creating content, and building digital projects. I'm always learning and growing!",
  ],

  skills: [
    "My skills include:\n• Data Entry & Research (Google Sheets, Docs)\n• Content Creation & Design (Canva, AI Writing)\n• Video Editing (CapCut, DaVinci Resolve)\n• Web Tools (Wix, No-code AI Platforms)\n• Prompt Engineering (Basic Level)\n• JavaScript, TypeScript, React, Node.js, Python\n• Problem-solving and attention to detail",
    "I work with:\n• AI-assisted content creation and prompt engineering\n• Video editing tools like CapCut and DaVinci Resolve\n• Data research and organization\n• Web development (React, TypeScript, Node.js)\n• Bilingual communication (Telugu & English)",
  ],

  projects: [
    "Here are some of my projects:\n• Portfolio Website (2024) - Built using Wix & AI builders\n• Video Editing Demos (2024) - Social media-style clips with transitions and music\n• Data Entry & Research Practice (2024) - Mock databases with formulas\n• Content Design (2024) - Posters & infographics in Canva with AI copywriting",
    "I've worked on various projects including my personal portfolio website, video editing demos for social media, data entry practice projects, and AI-assisted content design work.",
  ],

  contact: [
    "You can reach me at:\n📧 Email: devicharangeddada@gmail.com\n📞 Phone: +91 6303468707\n📍 Location: Visakhapatnam, India\n\nFeel free to connect anytime!",
    "Here's how to contact me:\n• Email: devicharangeddada@gmail.com\n• Phone: +91 6303468707\n• Based in Visakhapatnam, India\n\nI'd love to hear from you!",
  ],

  social: [
    "Connect with me on:\n🔗 LinkedIn: www.linkedin.com/in/devi-charan-1a8b49302\n📸 Instagram: @imdvichrn\n📘 Facebook: facebook.com/userdead.610",
    "Find me on social media:\n• LinkedIn: linkedin.com/in/devi-charan-1a8b49302\n• Instagram: instagram.com/imdvichrn\n• Facebook: facebook.com/userdead.610",
  ],

  portfolio: [
    "You're already on my portfolio website! Feel free to explore around. If you want to see more of my work, check out my projects section or connect with me on social media.",
  ],

  support: [
    "💙 Thank you for your interest!\n\nYou can support me by:\n• Following me on LinkedIn, Instagram, or Facebook\n• Sharing my portfolio with others\n• Reaching out for collaboration opportunities\n• Providing feedback on my work\n\nEvery bit of support helps me grow!",
    "I really appreciate your support! 🙏\n\nYou can help by:\n• Connecting on my social media\n• Sharing my work with your network\n• Collaborating on projects\n• Spreading the word about my portfolio\n\nThank you!",
  ],

  experience: [
    "I'm currently focused on building a strong digital portfolio through self-driven projects. I'm open to internships and entry-level opportunities in:\n• Data Research\n• Content Creation\n• Customer Support\n• AI-assisted workflows",
  ],

  education: [
    "🎓 I'm currently in my 3rd year of B.Tech in Electrical & Electronics Engineering. Before this, I completed my Diploma in EEE from M.R.A.G.R. Government Polytechnic, Vizianagaram.",
  ],

  achievements: [
    "I'm self-taught in Prompt Engineering & AI Workflows, bilingual (Telugu & English), and consistently motivated to learn and grow. I focus on building real-world skills through practice and projects.",
  ],

  fallback: [
    "I'd love to help! I can tell you about:\n• Who I am and what I do\n• My skills and projects\n• How to contact me\n• My social media links\n• Ways to support my work\n\nWhat would you like to know?",
    "I'm not sure I understood that. Feel free to ask me about my skills, projects, experience, or how to get in touch. I'm here to help!",
  ],

  goodbye: [
    "Thanks for chatting! Feel free to reach out anytime at devicharangeddada@gmail.com or connect on social media. Have a great day! 👋",
    "It was great talking with you! Don't hesitate to contact me if you have more questions. Take care! ✨",
  ],
};

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function matchKeywords(input, keywords) {
  return keywords.some(keyword => input.includes(keyword));
}

async function getResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  // Greeting
  if (matchKeywords(input, ['hi', 'hello', 'hey', 'greetings', 'hola'])) {
    return randomChoice(responses.greeting);
  }

  // About
  if (matchKeywords(input, ['about', 'who are you', 'introduce yourself', 'tell me about yourself', 'background'])) {
    return randomChoice(responses.about);
  }

  // Skills
  if (matchKeywords(input, ['skills', 'what can you do', 'expertise', 'abilities', 'technologies'])) {
    return randomChoice(responses.skills);
  }

  // Projects
  if (matchKeywords(input, ['projects', 'work', 'portfolio', 'what have you built', 'showcase'])) {
    return randomChoice(responses.projects);
  }

  // Contact
  if (matchKeywords(input, ['contact', 'email', 'phone', 'reach', 'get in touch', 'location'])) {
    return randomChoice(responses.contact);
  }

  // Social Media
  if (matchKeywords(input, ['social', 'linkedin', 'instagram', 'facebook', 'follow', 'connect'])) {
    return randomChoice(responses.social);
  }

  // Portfolio Link
  if (matchKeywords(input, ['website', 'portfolio link', 'site', 'webpage'])) {
    return randomChoice(responses.portfolio);
  }

  // Support
  if (matchKeywords(input, ['support', 'help you', 'contribute', 'share', 'promote'])) {
    return randomChoice(responses.support);
  }

  // Experience
  if (matchKeywords(input, ['experience', 'work history', 'jobs', 'internship'])) {
    return randomChoice(responses.experience);
  }

  // Education
  if (matchKeywords(input, ['education', 'study', 'college', 'university', 'degree', 'diploma'])) {
    return randomChoice(responses.education);
  }

  // Achievements
  if (matchKeywords(input, ['achievement', 'accomplishment', 'certification', 'awards'])) {
    return randomChoice(responses.achievements);
  }

  // Goodbye
  if (matchKeywords(input, ['bye', 'goodbye', 'see you', 'later', 'thanks', 'thank you'])) {
    return randomChoice(responses.goodbye);
  }

  // Fallback
  return randomChoice(responses.fallback);
}

export default getResponse;
