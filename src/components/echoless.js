// ------------------------------
// Echoless – Personal AI Assistant for Devi Charan
// ------------------------------

const context = {
  topicsAsked: {},  // tracks topics: about, skills, projects, contact
  faqUsed: {}       // tracks used FAQ variations per session
};

// ------------------------------
// Helper Functions
// ------------------------------
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Smart memory for topics
function handleTopic(topicKey, variations) {
  context.topicsAsked[topicKey] = true;
  return randomChoice(variations);
}

// Smart memory for FAQs
function handleFAQ(faqKey, faqData) {
  context.faqUsed[faqKey] = context.faqUsed[faqKey] || [];
  const available = faqData[faqKey].filter(r => !context.faqUsed[faqKey].includes(r));
  const reply = available.length > 0 ? randomChoice(available) : randomChoice(faqData[faqKey]);
  context.faqUsed[faqKey].push(reply);
  return reply;
}

// Social Links Display (Animated Buttons)
function displaySocialLinks() {
  const links = [
    { name: "LinkedIn", url: "https://linkedin.com/in/devicharan" },
    { name: "GitHub", url: "https://github.com/imdvichrn" },
    { name: "Twitter", url: "https://twitter.com/imdvichrn" }
  ];
  return links.map(link => `<a href="${link.url}" target="_blank" class="animate-glow-bounce">${link.name}</a>`).join(' | ');
}

// Typing delay simulation
function withTypingDelay(text, delay = 800) {
  return new Promise(resolve => setTimeout(() => resolve(text), delay));
}

// ------------------------------
// Conversation Data
// ------------------------------
const greetings = [
  "Hello! 👋 I’m Echoless, Devi Charan’s personal assistant. I can guide you through skills, projects, or connect with me.",
  "Hi there! 👋 I’m Echoless. Shall we start with skills, projects, or my background?",
  "Welcome! I’m Echoless. I can introduce you to Devi Charan’s portfolio. Where shall we begin?",
  "Greetings! I’m Echoless, Devi Charan’s assistant. I can help you explore my projects, skills, or ways to connect. Which would you like first?",
  "Hello visitor! 👋 I’m Echoless. I’ll guide you through my portfolio. Shall we start with skills, projects, or my background?",
  "Hi! I’m Echoless, here to assist you with all things about Devi Charan. Would you like to see his skills or projects first?",
  "Welcome! I’m Echoless. I can introduce you to Devi Charan’s work, skills, and accomplishments. Which topic interests you first?"
];

const aboutVariations = [
  "I’m Devi Charan, a B.Tech student in Electrical & Electronics Engineering at Andhra University, Visakhapatnam. I’m passionate about technology and problem-solving.",
  "I specialize in Electrical & Electronics Engineering and enjoy blending theory with hands-on projects.",
  "I’m Devi Charan, focused on innovative solutions and practical applications in engineering.",
  "I’m Devi Charan, currently pursuing EEE at Andhra University. My focus is on combining theory with practical projects. Want me to highlight my technical skills or projects first?",
  "I’m Devi Charan. My focus is on Electrical & Electronics Engineering and applying knowledge to real-world solutions. Shall I start with skills or achievements?",
  "I’m Devi Charan, passionate about problem-solving in Electrical & Electronics Engineering. Shall I walk you through my skills or my career goals?",
  "I’m Devi Charan, focused on engineering and innovative projects. I can tell you about my skills, projects, or achievements — where shall we start?",
  "I’m Devi Charan, combining my engineering education with practical experience. Would you like to explore my academic or technical background first?"
];

const skillsVariations = [
  "My skills include Electrical & Electronics fundamentals, Power Systems, Electrical Machines, Control Systems, Programming, and problem-solving.",
  "I specialize in core EEE subjects, digital systems, and practical problem-solving.",
  "I have hands-on experience with Electrical Machines, Control Systems, and programming.",
  "My key strengths include Electrical & Electronics Engineering fundamentals, Power Systems, Electrical Machines, Control Systems, Programming, and analytical problem-solving. Would you like examples of projects where I applied these skills?",
  "Some of my strengths: Power Electronics, Control Systems, Signals & Systems, and hands-on problem-solving. Do you want me to show projects?",
  "I’m proficient in Electrical Machines, Power Systems, Control Systems, and coding. Want me to explain how I applied these in projects?",
  "My skills cover EEE fundamentals, electronics, programming, and analytical problem-solving. Shall I show projects where I applied them?",
  "I have strong problem-solving abilities combined with technical knowledge in Electrical & Electronics Engineering. Do you want me to give project examples?",
  "My skills include designing, analyzing, and implementing EEE projects, programming, and applying analytical solutions. Would you like me to detail a few key projects?"
];

const projectsVariations = [
  "I’ve worked on academic and personal projects that showcase my problem-solving and technical skills. Would you like academic or coding projects first?",
  "My portfolio contains projects in Electrical Systems and Programming.",
  "I have designed projects combining theory and practical applications.",
  "My portfolio includes academic and practical projects. Which category interests you more?",
  "I’ve applied my skills in multiple projects. Shall I walk you through academic or software-based projects?",
  "I’ve developed projects in Electrical Systems and Programming. Do you want me to show academic or personal projects first?",
  "I’ve executed projects that showcase problem-solving and technical skills. Would you like examples from academics or coding?",
  "I’ve designed projects that combine theory and practical applications. Which type of project would you like me to explain first?",
  "I have hands-on experience with projects in Electrical Engineering and coding. Shall we start with academic projects or coding projects?"
];

const contactVariations = [
  "You can reach me via the contact form on this site or email me at devicharan@example.com. Would you like me to open the form now?",
  "Feel free to contact me through the site’s form or email devicharan@example.com. Shall I guide you to the contact form?",
  "You can email me at devicharan@example.com or use the contact page. Want me to open it for you?",
  "I’m available via the contact form on this website or by email devicharan@example.com. Do you want me to open it?",
  "To connect, use the contact form or email devicharan@example.com. Shall I bring up the form?",
  "I can provide direct contact options — email or the website form. Do you want me to show them now?",
  "You can easily reach me via the contact page or email. Would you like me to open the form for you?"
];

const exitVariations = [
  "It was a pleasure assisting you. Ask me anytime about my skills, projects, or background.",
  "Thanks for visiting! I’m always here to help explore my portfolio.",
  "Glad I could help! Let me know if you’d like to dive deeper into my work.",
  "I’m always here to answer questions about my skills, projects, and experience. Come back anytime!",
  "It was great chatting! Ask me anything about my portfolio whenever you like.",
  "I hope I was helpful. Reach out anytime if you want to explore more about my projects or skills.",
  "Thanks for stopping by! I’m here whenever you want to know more about my portfolio."
];

const faqData = {
  cgpa: [
    "I’m focused on achieving top results and continuously improving my performance.",
    "I maintain strong academic performance while mastering my coursework.",
    "My current focus is on academic excellence and practical skills.",
    "I strive for high grades while gaining hands-on expertise in engineering.",
    "I aim to excel in both academics and project-based learning."
  ],
  careerGoals: [
    "I aim to build a career in Electrical & Electronics Engineering while applying my skills to real-world projects.",
    "My goal is to contribute to impactful engineering projects and innovations.",
    "I’m focused on developing expertise in EEE and applying it to real-world solutions.",
    "I want to grow as a professional engineer and problem solver in EEE.",
    "I aspire to design and implement solutions that make a real difference in technology."
  ],
  achievements: [
    "I’ve completed academic projects and gained hands-on skills in both electrical systems and coding.",
    "My achievements include executing complex projects and developing practical expertise.",
    "I’ve participated in multiple engineering projects demonstrating problem-solving skills.",
    "I have successfully implemented projects in academics and personal coding ventures.",
    "I’ve acquired practical experience by combining coursework and real-world applications."
  ],
  reasonEEE: [
    "I chose Electrical & Electronics Engineering because it blends theory with practical problem-solving.",
    "EEE allows me to work on solutions that have real-world impact, which I’m passionate about.",
    "I pursued EEE to combine my interest in technology with applied problem-solving.",
    "EEE lets me explore both theoretical and practical aspects of engineering.",
    "I wanted a field where I could innovate and solve tangible technical problems."
  ]
};

// Fallback
const fallbackReply = "I’m here to discuss my skills, projects, or background. Could you please rephrase your question?";

// ------------------------------
// Main Response Function
// ------------------------------
async function getResponse(userInput) {
  const input = userInput.toLowerCase();

  // Greeting
  if (input.includes("hi") || input.includes("hello")) return withTypingDelay(randomChoice(greetings));

  // About
  if (input.includes("about") || input.includes("who are you") || input.includes("yourself")) return withTypingDelay(handleTopic("about", aboutVariations));

  // Skills
  if (input.includes("skills") || input.includes("can you do")) return withTypingDelay(handleTopic("skills", skillsVariations));

  // Projects
  if (input.includes("projects") || input.includes("portfolio") || input.includes("work")) return withTypingDelay(handleTopic("projects", projectsVariations));

  // Contact
  if (input.includes("contact") || input.includes("reach you") || input.includes("email")) return withTypingDelay(handleTopic("contact", contactVariations));

  // Social Links
  if (input.includes("linkedin") || input.includes("github") || input.includes("twitter") || input.includes("social")) return withTypingDelay(displaySocialLinks());

  // FAQs
  if (input.includes("cgpa")) return withTypingDelay(handleFAQ("cgpa", faqData));
  if (input.includes("career")) return withTypingDelay(handleFAQ("careerGoals", faqData));
  if (input.includes("achievement") || input.includes("achievements")) return withTypingDelay(handleFAQ("achievements", faqData));
  if (input.includes("why eee") || input.includes("reason eee")) return withTypingDelay(handleFAQ("reasonEEE", faqData));

  // Exit
  if (input.includes("bye") || input.includes("thanks") || input.includes("goodbye")) return withTypingDelay(randomChoice(exitVariations));

  // Fallback
  return withTypingDelay(fallbackReply);
}

// ------------------------------
// Export for use in React component
// ------------------------------
export default getResponse;
