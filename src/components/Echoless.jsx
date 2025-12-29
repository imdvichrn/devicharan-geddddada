import React, { useState, useRef, useEffect } from "react";

// Echoless Persona & Variations
const persona = {
  name: "Echoless",
  role: "Professional AI portfolio assistant for Devi Charan",
  tone: "Friendly, professional, concise, clear",
  perspective: "first-person",
  goal: "Guide visitors through skills, projects, experience, contact info, social links, and FAQs"
};

const variations = {
  greeting: [
    "Hello! 👋 I’m Echoless, Devi Charan’s personal assistant. I can guide you through my skills, projects, background, or show you how to connect with me. What would you like to know?",
    "Hi there! 👋 I’m Echoless. I can walk you through my portfolio including skills, projects, and contact info. Where shall we start?",
    "Welcome! I’m Echoless, here to introduce you to my work and achievements. Would you like to start with skills, projects, or contact info?",
    "Greetings! I’m Echoless, Devi Charan’s assistant. I can help you explore my projects, skills, or ways to connect. Which would you like first?",
    "Hello visitor! 👋 I’m Echoless. I’ll guide you through my portfolio. Shall we start with skills, projects, or my background?",
    "Hi! I’m Echoless, here to assist you with all things about Devi Charan. Would you like to see his skills or projects first?",
    "Welcome! I’m Echoless. I can introduce you to Devi Charan’s work, skills, and accomplishments. Which topic interests you first?"
  ],
  about: [
    "I’m Devi Charan, a B.Tech student in Electrical & Electronics Engineering at Andhra University, Visakhapatnam. I’m passionate about technology, problem-solving, and impactful projects. Would you like me to share my skills, academic journey, or career goals?",
    "I’m Devi Charan, currently pursuing EEE at Andhra University. My focus is on combining theory with practical projects. Want me to highlight my technical skills or projects first?",
    "I’m Devi Charan. My focus is on Electrical & Electronics Engineering and applying knowledge to real-world solutions. Shall I start with skills or achievements?",
    "I’m Devi Charan, specializing in Electrical & Electronics Engineering. I enjoy blending theory with hands-on projects. Would you like to hear about my skills or projects first?",
    "I’m Devi Charan, passionate about problem-solving in Electrical & Electronics Engineering. Shall I walk you through my skills or my career goals?",
    "I’m Devi Charan, focused on engineering and innovative projects. I can tell you about my skills, projects, or achievements — where shall we start?",
    "I’m Devi Charan, combining my engineering education with practical experience. Would you like to explore my academic or technical background first?"
  ],
  skills: [
    "My key strengths include Electrical & Electronics Engineering fundamentals, Power Systems, Electrical Machines, Control Systems, Programming, and analytical problem-solving. Would you like examples of projects where I applied these skills?",
    "I specialize in core EEE subjects, digital systems, programming, and problem-solving. Should I connect these to real projects I’ve done?",
    "Some of my strengths: Power Electronics, Control Systems, Signals & Systems, and hands-on problem-solving. Do you want me to show projects?",
    "I’m proficient in Electrical Machines, Power Systems, Control Systems, and coding. Want me to explain how I applied these in projects?",
    "My skills cover EEE fundamentals, electronics, programming, and analytical problem-solving. Shall I show projects where I applied them?",
    "I have strong problem-solving abilities combined with technical knowledge in Electrical & Electronics Engineering. Do you want me to give project examples?",
    "My skills include designing, analyzing, and implementing EEE projects, programming, and applying analytical solutions. Would you like me to detail a few key projects?"
  ],
  projects: [
    "I’ve worked on academic and personal projects that demonstrate my abilities. Would you like details on academic, coding, or electrical engineering projects?",
    "My portfolio includes academic and practical projects. Which category interests you more?",
    "I’ve applied my skills in multiple projects. Shall I walk you through academic or software-based projects?",
    "I’ve developed projects in Electrical Systems and Programming. Do you want me to show academic or personal projects first?",
    "I’ve executed projects that showcase problem-solving and technical skills. Would you like examples from academics or coding?",
    "I’ve designed projects that combine theory and practical applications. Which type of project would you like me to explain first?",
    "I have hands-on experience with projects in Electrical Engineering and coding. Shall we start with academic projects or coding projects?"
  ],
  contact: [
    "You can reach me via the contact form on this site or email me at [YourEmailHere]. Would you like me to open the form now?",
    "Feel free to contact me through the site’s form or email [YourEmailHere]. Shall I guide you to the contact form?",
    "You can email me at [YourEmailHere] or use the contact page. Want me to open it for you?",
    "I’m available via the contact form on this website or by email [YourEmailHere]. Do you want me to open it?",
    "To connect, use the contact form or email [YourEmailHere]. Shall I bring up the form?",
    "I can provide direct contact options — email or the website form. Do you want me to show them now?",
    "You can easily reach me via the contact page or email. Would you like me to open the form for you?"
  ],
  social: [
    "You can connect with me here: LinkedIn\n GitHub\n Twitter\n",
    "Check out my social profiles: LinkedIn\n | GitHub\n | Twitter\n",
    "Here are my professional social profiles: LinkedIn, GitHub, and Twitter. Each link is clickable!",
    "To follow or connect with me, use these links: LinkedIn, GitHub, Twitter.",
    "My online profiles are available for networking: LinkedIn, GitHub, and Twitter — click to open."
  ],
  exit: [
    "It was a pleasure assisting you. If you want to know more about me, just ask — I’ll always be here to help.",
    "Thanks for visiting! Feel free to ask me more about my portfolio anytime.",
    "Glad I could help! Let me know if you’d like to dive deeper into my work.",
    "I’m always here to answer questions about my skills, projects, and experience. Come back anytime!",
    "It was great chatting! Ask me anything about my portfolio whenever you like.",
    "I hope I was helpful. Reach out anytime if you want to explore more about my projects or skills.",
    "Thanks for stopping by! I’m here whenever you want to know more about my portfolio."
  ],
  fallback: [
    "I'm here to help with anything related to my portfolio. Could you please clarify your question?",
    "Sorry, I didn't catch that. Ask me about my skills, projects, or contact info!",
    "I'm focused on portfolio topics. Let me know if you want details on my work or experience.",
    "I can answer questions about my skills, projects, or achievements. What would you like to know?",
    "Let's keep the conversation professional. Ask me about my career, skills, or how to connect!"
  ]
};

const faqs = {
  cgpa: [
    "I’m focused on achieving top results and continuously improving my performance.",
    "I maintain strong academic performance while mastering my coursework.",
    "My current focus is on academic excellence and practical skills.",
    "I strive for high grades while gaining hands-on expertise in engineering.",
    "I aim to excel in both academics and project-based learning."
  ],
  career: [
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

// Helper Functions
function randomChoice(array, used = []) {
  const unused = array.filter((_, i) => !used.includes(i));
  if (unused.length === 0) return array[Math.floor(Math.random() * array.length)];
  const idx = unused[Math.floor(Math.random() * unused.length)];
  return array[array.indexOf(idx)];
}

function handleTopic(topicKey, context) {
  const used = context[topicKey] || [];
  const arr = variations[topicKey];
  const idx = arr.findIndex((_, i) => !used.includes(i));
  let reply;
  if (idx !== -1) {
    reply = arr[idx];
    context[topicKey] = [...used, idx];
  } else {
    reply = randomChoice(arr);
  }
  return reply;
}

function handleFAQ(faqKey, context) {
  const used = context[faqKey] || [];
  const arr = faqs[faqKey];
  const idx = arr.findIndex((_, i) => !used.includes(i));
  let reply;
  if (idx !== -1) {
    reply = arr[idx];
    context[faqKey] = [...used, idx];
  } else {
    reply = randomChoice(arr);
  }
  return reply;
}

function getResponse(userInput, context) {
  const input = userInput.toLowerCase();
  if (/hello|hi|hey|greet/.test(input)) return handleTopic("greeting", context);
  if (/about|yourself|who are you/.test(input)) return handleTopic("about", context);
  if (/skill|tech|stack|expertise/.test(input)) return handleTopic("skills", context);
  if (/project|work|portfolio/.test(input)) return handleTopic("projects", context);
  if (/contact|email|reach|connect/.test(input)) return handleTopic("contact", context);
  if (/social|linkedin|github|twitter/.test(input)) return handleTopic("social", context);
  if (/cgpa|grade|marks/.test(input)) return handleFAQ("cgpa", context);
  if (/career|goal|future/.test(input)) return handleFAQ("career", context);
  if (/achieve|award|recognition/.test(input)) return handleFAQ("achievements", context);
  if (/eee|electrical|reason/.test(input)) return handleFAQ("reasonEEE", context);
  if (/bye|exit|goodbye|quit/.test(input)) return handleTopic("exit", context);
  return handleTopic("fallback", context);
}

// Animated Social Buttons
function displaySocialLinks() {
  return (
    <div className="echoless-socials flex gap-4 mt-4">
      <a href="https://www.linkedin.com/in/geddadadevicharan" target="_blank" rel="noopener" className="echoless-btn linkedin">
        <span className="icon">🔗</span> LinkedIn
      </a>
      <a href="https://github.com/imdvichrn" target="_blank" rel="noopener" className="echoless-btn github">
        <span className="icon">💻</span> GitHub
      </a>
      <a href="https://twitter.com/imdvichrn" target="_blank" rel="noopener" className="echoless-btn twitter">
        <span className="icon">🐦</span> Twitter
      </a>
    </div>
  );
}

// CSS for animated buttons
const echolessCSS = `
.echoless-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: 999px;
  font-weight: 600;
  background: #fff;
  box-shadow: 0 0 8px 2px #a5b4fc;
  transition: box-shadow 0.3s, transform 0.3s;
  animation: echolessBounce 1.2s infinite alternate;
  margin-right: 0.5em;
}
.echoless-btn.linkedin { box-shadow: 0 0 12px 2px #0a66c2; }
.echoless-btn.github { box-shadow: 0 0 12px 2px #333; }
.echoless-btn.twitter { box-shadow: 0 0 12px 2px #1da1f2; }
.echoless-btn:hover {
  box-shadow: 0 0 24px 4px #6366f1;
  transform: scale(1.08);
}
@keyframes echolessBounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-6px); }
}
`;

// Main Echoless Chatbot Component
const Echoless = () => {
  const [messages, setMessages] = useState([
    { from: "echoless", text: handleTopic("greeting", {}) }
  ]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState({});
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Inject CSS for animated buttons
    if (!document.getElementById("echoless-css")) {
      const style = document.createElement("style");
      style.id = "echoless-css";
      style.innerHTML = echolessCSS;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setTyping(true);
    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      const newContext = { ...context };
      let reply = getResponse(input, newContext);
      setMessages((msgs) => [...msgs, { from: "echoless", text: reply }]);
      setContext(newContext);
      setTyping(false);
      setInput("");
    }, delay);
  };

  // Reset any localStorage/sessionStorage used for chatbot context
  useEffect(() => {
    window.localStorage.removeItem("chatbotContext");
    window.sessionStorage.removeItem("chatbotContext");
  }, []);

  return (
    <div className="echoless-chatbot max-w-lg mx-auto p-4 rounded-xl bg-white/80 shadow-lg">
      <div className="font-bold text-lg mb-2 text-indigo-700">Echoless – Devi Charan's AI Assistant</div>
      <div className="echoless-messages space-y-2 mb-4" style={{ minHeight: "180px" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`echoless-msg ${msg.from}`}>{msg.text}</div>
        ))}
        {typing && <div className="echoless-msg echoless"><span className="animate-pulse">Typing…</span></div>}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Echoless about Devi Charan…"
          autoFocus
        />
        <button type="submit" className="echoless-btn linkedin">Send</button>
      </form>
      {displaySocialLinks()}
    </div>
  );
};

export default Echoless;
export { getResponse, handleTopic, handleFAQ, randomChoice, displaySocialLinks };
