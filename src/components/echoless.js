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

  contact: {
    text: [
      "Here are the ways you can reach me:",
      "I'd love to hear from you! Here's how you can contact me:",
    ],
    buttons: [
      { label: 'Email Me', icon: 'mail', action: 'email' },
      { label: 'View Contact', icon: 'link', action: 'contact-page' }
    ]
  },

  social: {
    text: [
      "Let's connect! You can find me on these platforms:",
      "I'm active on social media! Connect with me:",
    ],
    buttons: [
      { label: 'LinkedIn', icon: 'link', action: 'linkedin' },
      { label: 'Instagram', icon: 'link', action: 'instagram' },
      { label: 'Facebook', icon: 'link', action: 'facebook' }
    ]
  },

  portfolio: {
    text: [
      "You're already on my portfolio! Want to explore specific sections?",
      "Welcome to my portfolio! Here's what you can check out:",
    ],
    buttons: [
      { label: 'View Projects', icon: 'link', action: 'projects' },
      { label: 'Download CV', icon: 'link', action: 'cv' }
    ]
  },

  support: {
    text: [
      "💙 Thank you for your interest in supporting me!",
      "I really appreciate your support! 🙏",
    ],
    buttons: [
      { label: 'Follow on LinkedIn', icon: 'heart', action: 'linkedin' },
      { label: 'Share Portfolio', icon: 'heart', action: 'share' },
      { label: 'Get in Touch', icon: 'mail', action: 'contact-page' }
    ]
  },

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
    return { text: randomChoice(responses.greeting) };
  }

  // About
  if (matchKeywords(input, ['about', 'who are you', 'introduce yourself', 'tell me about yourself', 'background'])) {
    return { text: randomChoice(responses.about) };
  }

  // Skills
  if (matchKeywords(input, ['skills', 'what can you do', 'expertise', 'abilities', 'technologies'])) {
    return { text: randomChoice(responses.skills) };
  }

  // Projects - with buttons
  if (matchKeywords(input, ['projects', 'work', 'portfolio', 'what have you built', 'showcase'])) {
    return {
      text: randomChoice(responses.projects),
      buttons: responses.portfolio.buttons
    };
  }

  // Portfolio - with buttons
  if (matchKeywords(input, ['website', 'portfolio link', 'site', 'webpage'])) {
    return {
      text: randomChoice(responses.portfolio.text),
      buttons: responses.portfolio.buttons
    };
  }

  // Contact - with buttons
  if (matchKeywords(input, ['contact', 'email', 'phone', 'reach', 'get in touch', 'location'])) {
    return {
      text: randomChoice(responses.contact.text),
      buttons: responses.contact.buttons
    };
  }

  // Social Media - with buttons
  if (matchKeywords(input, ['social', 'linkedin', 'instagram', 'facebook', 'follow', 'connect'])) {
    return {
      text: randomChoice(responses.social.text),
      buttons: responses.social.buttons
    };
  }

  // Support - with buttons
  if (matchKeywords(input, ['support', 'help you', 'contribute', 'share', 'promote'])) {
    return {
      text: randomChoice(responses.support.text),
      buttons: responses.support.buttons
    };
  }

  // Experience
  if (matchKeywords(input, ['experience', 'work history', 'jobs', 'internship'])) {
    return { text: randomChoice(responses.experience) };
  }

  // Education
  if (matchKeywords(input, ['education', 'study', 'college', 'university', 'degree', 'diploma'])) {
    return { text: randomChoice(responses.education) };
  }

  // Achievements
  if (matchKeywords(input, ['achievement', 'accomplishment', 'certification', 'awards'])) {
    return { text: randomChoice(responses.achievements) };
  }

  // Goodbye
  if (matchKeywords(input, ['bye', 'goodbye', 'see you', 'later', 'thanks', 'thank you'])) {
    return { text: randomChoice(responses.goodbye) };
  }

  // Fallback
  return { text: randomChoice(responses.fallback) };
}

export default getResponse;
