import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from './WindowChrome';
import { SiriOrb } from './SiriOrb';
import { QuickActions } from './QuickActions';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp?: Date;
}

export const Chatbot = forwardRef(function Chatbot(props, ref) {
  // Utility to pick a random item from an array
  function pickRandom(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Multi-variation reply sets for Echoless
  // Greetings variations for initial assistant message
  const greetings = [
    "👋 Hi! I'm DevAssist AI. Ask me about my projects, skills, or experience!",
    "Hello! Ready to explore my portfolio? Just type your question.",
    "Welcome! I can share info about my work, skills, and more. What would you like to know?",
    "Hey there! Curious about my projects or background? Ask away!"
  ];

  // Social media query handler
  function checkSocialMediaQuery(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('linkedin')) {
      return `🔗 **LinkedIn Profile**\n\n📋 Connect with me on LinkedIn for professional updates and networking:\n👉 [www.linkedin.com/in/devi-charan-1a8b49302](https://www.linkedin.com/in/devi-charan-1a8b49302)\n\nPerfect for:\n• Professional discussions\n• Career opportunities  \n• Technical collaborations\n• Industry insights`;
    }
    if (lowerMessage.includes('instagram')) {
      return `📸 **Instagram Profile**\n\n🎨 Follow me on Instagram for behind-the-scenes content and personal updates:\n👉 [@imdvichrn](https://www.instagram.com/imdvichrn)\n\nYou'll find:\n• Project highlights\n• Daily tech insights\n• Personal moments\n• Creative content`;
    }
    if (lowerMessage.includes('facebook')) {
      return `📘 **Facebook Profile**\n\n👥 Connect with me on Facebook for community interactions:\n👉 [Facebook Profile](https://www.facebook.com/userdead.610)\n\nGreat for:\n• Community discussions\n• Event updates\n• Casual conversations\n• Networking`;
    }
    if (lowerMessage.includes('social') || lowerMessage.includes('social media')) {
      return `🌐 **All Social Media Links**\n\nConnect with me across platforms:\n\n🔗 **LinkedIn:** [Professional Profile](https://www.linkedin.com/in/devi-charan-1a8b49302)\n📸 **Instagram:** [@imdvichrn](https://www.instagram.com/imdvichrn)  \n📘 **Facebook:** [Personal Profile](https://www.facebook.com/userdead.610)\n\nEach platform offers different insights into my work and interests!`;
    }
    return null;
  }

  // State hooks
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: pickRandom(greetings),
    timestamp: new Date()
  }]);
  const [isOpen, setIsOpen] = useState(false);
  const [animateSocial, setAnimateSocial] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // FAQ replies for each topic
  const faqReplies: { [key: string]: string[] } = {
    faq_cgpa: [
      "My current CGPA is 8.7, reflecting consistent academic performance throughout my engineering studies.",
      "I've maintained a strong academic record, with a CGPA of 8.7 in Electrical and Electronics Engineering.",
      "My grades showcase my dedication to learning and understanding core engineering concepts."
    ],
    faq_goals: [
      "My career goal is to become a leading engineer in the field of electrical systems and automation.",
      "I'm passionate about leveraging technology to solve real-world problems and aim to work on impactful projects.",
      "I aspire to contribute to innovative solutions in the energy and automation sectors."
    ],
    faq_achievements: [
      "I've completed several hands-on projects in IoT and automation, including a smart home system.",
      "I received recognition for my project on renewable energy integration during my final year.",
      "My achievements include academic excellence awards and successful internships in the electrical domain."
    ],
    faq_motivation: [
      "I chose Electrical Engineering because I'm fascinated by how technology powers our world.",
      "My motivation comes from a desire to innovate and improve energy efficiency and automation.",
      "I enjoy solving complex problems and Electrical Engineering offers endless opportunities for creativity."
    ]
  };

  // Expanded replies for follow-up queries for each topic
  const expanded: { [key: string]: string[] } = {
    aboutMe: [
      "I'm Devi Charan, an Electrical and Electronics Engineering graduate with a passion for automation and IoT.",
      "Beyond my academic background, I enjoy working on personal tech projects and collaborating with others in the field.",
      "I'm always eager to learn new technologies and apply them to solve real-world problems."
    ],
    skills: [
      "My technical skills include proficiency in C, Python, and embedded systems development.",
      "I'm experienced with IoT platforms, automation protocols, and hands-on circuit design.",
      "I also have strong problem-solving abilities and a knack for learning new tools quickly."
    ],
    projects: [
      "I've built a smart home automation system using IoT sensors and microcontrollers.",
      "One of my notable projects involved integrating renewable energy sources with automated control systems.",
      "I regularly experiment with new technologies to create innovative solutions for everyday challenges."
    ],
    contact: [
      "You can reach me via email at devicharangeddada@gmail.com or connect on LinkedIn.",
      "Feel free to call me at +91 6303468707 for professional inquiries.",
      "I'm based in Visakhapatnam, India, and open to remote collaborations."
    ],
    socialLinks: [
      "Find me on LinkedIn, Instagram, and Facebook for updates and networking opportunities.",
      "Each social platform offers a unique glimpse into my professional and personal interests.",
      "I'm active on social media and enjoy connecting with like-minded individuals."
    ],
    closing: [
      "Thank you for chatting! If you have more questions, feel free to ask anytime.",
      "It was great connecting with you. Hope to hear from you soon!",
      "Goodbye! Reach out if you need more information about my portfolio."
    ]
  };

  // Track discussed topics and indexes for FAQ replies
  const [discussedTopics, setDiscussedTopics] = useState<{ [key: string]: any }>({});

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handler for sending messages
  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message with timestamp
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Intent-based reply selection with smart memory/context and FAQ
    const lowerUser = userMessage.toLowerCase();
    let intentReply: string | null = null;
    let topic: string | null = null;

    // FAQ detection
    const faqIntents = [
      { name: 'faq_cgpa', triggers: ['cgpa', 'grades', 'marks', 'academic performance'] },
      { name: 'faq_goals', triggers: ['career goals', 'future plans', 'ambitions', 'what are your goals'] },
      { name: 'faq_achievements', triggers: ['achievements', 'awards', 'accomplishments', 'what have you achieved'] },
      { name: 'faq_motivation', triggers: ['why electrical engineering', 'why eee', 'motivation', 'why did you choose'] }
    ];
    let faqTopic: string | null = null;
    for (const intent of faqIntents) {
      if (intent.triggers.some(trigger => lowerUser.includes(trigger))) {
        faqTopic = intent.name;
        break;
      }
    }

    // Main topic detection
    if (lowerUser.includes('about') || lowerUser.includes('who are you') || lowerUser.includes('yourself')) {
      topic = 'aboutMe';
    } else if (lowerUser.includes('skill') || lowerUser.includes('strength') || lowerUser.includes('expertise')) {
      topic = 'skills';
    } else if (lowerUser.includes('project') || lowerUser.includes('work') || lowerUser.includes('portfolio')) {
      topic = 'projects';
    } else if (lowerUser.includes('contact') || lowerUser.includes('email') || lowerUser.includes('connect')) {
      topic = 'contact';
    } else if (lowerUser.includes('social') || lowerUser.includes('linkedin') || lowerUser.includes('github') || lowerUser.includes('twitter')) {
      topic = 'socialLinks';
    } else if (lowerUser.includes('bye') || lowerUser.includes('exit') || lowerUser.includes('close') || lowerUser.includes('thank')) {
      topic = 'closing';
    }

    // Detect follow-up queries like "tell me more"
    const isFollowUp = lowerUser.includes('more') || lowerUser.includes('expand') || lowerUser.includes('example') || lowerUser.includes('details');

    // FAQ reply logic with memory/context
    if (faqTopic) {
      const usedFaqIndexes = Array.isArray(discussedTopics[faqTopic + '_indexes']) ? discussedTopics[faqTopic + '_indexes'] : [];
      let availableIndexes = faqReplies[faqTopic].map((_, i) => i).filter(i => !usedFaqIndexes.includes(i));
      if (availableIndexes.length === 0) availableIndexes = faqReplies[faqTopic].map((_, i) => i);
      const chosenIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      intentReply = faqReplies[faqTopic][chosenIndex];
      setDiscussedTopics(prev => ({
        ...prev,
        [faqTopic]: true,
        [faqTopic + '_indexes']: [...usedFaqIndexes, chosenIndex]
      }));
    } else if (topic && isFollowUp && discussedTopics[topic] && expanded[topic]) {
      intentReply = pickRandom(expanded[topic]);
      if (!discussedTopics[topic]) {
        setDiscussedTopics(prev => ({ ...prev, [topic]: true }));
      }
    } else if (topic) {
      intentReply = topic && Array.isArray(eval(topic)) ? pickRandom(eval(topic)) : null;
      if (!discussedTopics[topic]) {
        setDiscussedTopics(prev => ({ ...prev, [topic]: true }));
      }
    }

    // Social media direct queries (keep original logic for buttons)
    const socialMediaResponse = checkSocialMediaQuery(userMessage);
    if (socialMediaResponse) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: socialMediaResponse,
        timestamp: new Date()
      };
      setAnimateSocial(true);
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500 + Math.random() * 500);
      return;
    }

    // If intent detected, reply immediately
    if (intentReply) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: intentReply,
        timestamp: new Date()
      };
      setAnimateSocial(topic === 'socialLinks');
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500 + Math.random() * 500); // 0.5–1s delay
      return;
    }

    // If no intent matched, fallback reply
    if (!intentReply) {
      const fallbackMessage: Message = {
        role: 'assistant',
        content: "I’m here to talk about my skills, projects, and background. Could you please rephrase your question?",
        timestamp: new Date()
      };
      setTimeout(() => {
        setMessages(prev => [...prev, fallbackMessage]);
        setIsLoading(false);
      }, 500 + Math.random() * 500);
      return;
    }
  }

  // ...existing code...
// ...existing code...
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message with timestamp
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Intent-based reply selection with smart memory/context and FAQ
    const lowerUser = userMessage.toLowerCase();
    let intentReply: string | null = null;
    let topic: string | null = null;

    // FAQ detection
    const faqIntents = [
      { name: 'faq_cgpa', triggers: ['cgpa', 'grades', 'marks', 'academic performance'] },
      { name: 'faq_goals', triggers: ['career goals', 'future plans', 'ambitions', 'what are your goals'] },
      { name: 'faq_achievements', triggers: ['achievements', 'awards', 'accomplishments', 'what have you achieved'] },
      { name: 'faq_motivation', triggers: ['why electrical engineering', 'why eee', 'motivation', 'why did you choose'] }
    ];
    let faqTopic: string | null = null;
    for (const intent of faqIntents) {
      if (intent.triggers.some(trigger => lowerUser.includes(trigger))) {
        faqTopic = intent.name;
        break;
      }
    }

    // Main topic detection
    if (lowerUser.includes('about') || lowerUser.includes('who are you') || lowerUser.includes('yourself')) {
      topic = 'aboutMe';
    } else if (lowerUser.includes('skill') || lowerUser.includes('strength') || lowerUser.includes('expertise')) {
      topic = 'skills';
    } else if (lowerUser.includes('project') || lowerUser.includes('work') || lowerUser.includes('portfolio')) {
      topic = 'projects';
    } else if (lowerUser.includes('contact') || lowerUser.includes('email') || lowerUser.includes('connect')) {
      topic = 'contact';
    } else if (lowerUser.includes('social') || lowerUser.includes('linkedin') || lowerUser.includes('github') || lowerUser.includes('twitter')) {
      topic = 'socialLinks';
    } else if (lowerUser.includes('bye') || lowerUser.includes('exit') || lowerUser.includes('close') || lowerUser.includes('thank')) {
      topic = 'closing';
    }

    // Detect follow-up queries like "tell me more"
    const isFollowUp = lowerUser.includes('more') || lowerUser.includes('expand') || lowerUser.includes('example') || lowerUser.includes('details');

    // FAQ reply logic with memory/context
    if (faqTopic) {
      const usedFaqIndexes = Array.isArray(discussedTopics[faqTopic + '_indexes']) ? discussedTopics[faqTopic + '_indexes'] : [];
      let availableIndexes = faqReplies[faqTopic].map((_, i) => i).filter(i => !usedFaqIndexes.includes(i));
      if (availableIndexes.length === 0) availableIndexes = faqReplies[faqTopic].map((_, i) => i);
      const chosenIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      intentReply = faqReplies[faqTopic][chosenIndex];
      setDiscussedTopics(prev => ({
        ...prev,
        [faqTopic]: true,
        [faqTopic + '_indexes']: [...usedFaqIndexes, chosenIndex]
      }));
    } else if (topic && isFollowUp && discussedTopics[topic] && expanded[topic]) {
  intentReply = pickRandom(expanded[topic]);
      if (!discussedTopics[topic]) {
        setDiscussedTopics(prev => ({ ...prev, [topic]: true }));
      }
    } else if (topic) {
  intentReply = topic && Array.isArray(eval(topic)) ? pickRandom(eval(topic)) : null;
      if (!discussedTopics[topic]) {
        setDiscussedTopics(prev => ({ ...prev, [topic]: true }));
      }
    }

    // Social media direct queries (keep original logic for buttons)
    const socialMediaResponse = checkSocialMediaQuery(userMessage);
    if (socialMediaResponse) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: socialMediaResponse,
        timestamp: new Date()
      };
      setAnimateSocial(true);
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500 + Math.random() * 500);
      return;
    // If intent detected, reply immediately
    if (intentReply) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: intentReply,
        timestamp: new Date()
      };
      setAnimateSocial(topic === 'socialLinks');
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500 + Math.random() * 500); // 0.5–1s delay
      return;
    }

    // If no intent matched, fallback reply
    if (!intentReply) {
      const fallbackMessage: Message = {
        role: 'assistant',
        content: "I’m here to talk about my skills, projects, and background. Could you please rephrase your question?",
        timestamp: new Date()
      };
      setTimeout(() => {
        setMessages(prev => [...prev, fallbackMessage]);
        setIsLoading(false);
      }, 500 + Math.random() * 500);
      return;
    }
  };

  // ...existing code...

  // ...existing code...

  // Handler for quick actions (e.g., FAQ shortcuts, topic buttons)
  const handleQuickAction = (action: string) => {
    setInput(action);
    // Optionally, you can trigger sendMessage automatically:
    // sendMessage({ preventDefault: () => {} } as React.FormEvent);
  };

  const handleConversationEnd = () => {
    const endMessage: Message = {
      role: 'assistant',
      content: `👋 **Thanks for chatting!** 

🎯 **What we covered:** Portfolio insights, projects, and opportunities to connect

📬 **Next steps:**
• Email: devicharangeddada@gmail.com  
• Phone: +91 6303468707
• Based in: Visakhapatnam, India

💡 **Come back anytime** for updated portfolio information and project details!

*Hope to hear from you soon!* 🚀`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, endMessage]);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50 overflow-hidden ${
          isOpen ? 'animate-scale-out' : 'animate-scale-in'
        }`}
        aria-label="Toggle chatbot"
        style={{ padding: 0, background: 'none' }}
      >
        <video
          src="/siri-wave.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={(e) => {
            // Ensure video loops continuously
            const video = e.currentTarget;
            video.currentTime = 0;
            video.play().catch(console.error);
          }}
          onEnded={(e) => {
            // Force restart if loop fails
            const video = e.currentTarget;
            video.currentTime = 0;
            video.play().catch(console.error);
          }}
          className="w-full h-full object-cover rounded-full"
          style={{ display: 'block' }}
        />
      </Button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] glass-elevated rounded-2xl shadow-2xl z-40 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-glass-border">
            <div className="flex items-center justify-between">
              <WindowChrome 
                onClose={() => setIsOpen(false)}
                onMinimize={() => {
                  // Minimize animation
                  const panel = document.querySelector('.fixed.bottom-24.right-6') as HTMLElement;
                  if (panel) {
                    panel.style.transform = 'scale(0.1)';
                    panel.style.opacity = '0';
                    setTimeout(() => setIsOpen(false), 200);
                  }
                }}
                onZoom={() => {
                  // Toggle between normal and expanded view
                  const panel = document.querySelector('.fixed.bottom-24.right-6') as HTMLElement;
                  if (panel) {
                    const isExpanded = panel.classList.contains('expanded');
                    if (isExpanded) {
                      panel.style.width = '24rem';
                      panel.style.height = '500px';
                      panel.classList.remove('expanded');
                    } else {
                      panel.style.width = '32rem';
                      panel.style.height = '600px';
                      panel.classList.add('expanded');
                    }
                  }
                }}
              />
              <div className="flex-1 text-center">
                <h3 className="font-medium text-foreground">DevAssist AI</h3>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live Portfolio Data
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[340px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm transition-all duration-200 group-hover:shadow-md ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'bg-muted text-muted-foreground mr-4 border border-border/50'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <div className="text-xs font-medium mb-1 text-muted-foreground/70">Sources:</div>
                      <div className="flex flex-wrap gap-1">
                        {message.sources.map((source, idx) => (
                          <span key={idx} className="text-xs bg-background/50 text-foreground/60 px-2 py-1 rounded border border-border/30">
                            📄 {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamp */}
                  {message.timestamp && (
                    <div className="text-xs text-muted-foreground/50 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground p-3 rounded-2xl flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <QuickActions 
              onActionClick={handleQuickAction} 
              disabled={isLoading}
            />
          )}

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-glass-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, experience..."
                className="flex-1 bg-background/50 border-glass-border"
                disabled={isLoading}
                maxLength={2000}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="sm" 
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                <Send size={16} />
              </Button>
            </div>
            
            {/* Conversation controls */}
            {messages.length > 6 && (
              <div className="flex justify-between items-center mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleConversationEnd}
                  className="text-xs text-muted-foreground"
                >
                  End conversation
                </Button>
                <div className="text-xs text-muted-foreground">
                  {messages.length} messages • Live data
                </div>
              </div>
            )}
          </form>

          {/* Social Media Footer */}
          <div className="px-4 pb-4 border-t border-glass-border/50">
            <div className="flex justify-center items-center gap-4 pt-3">
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors ${animateSocial ? 'animate-glow-bounce' : ''}`}
                onClick={() => window.open('https://www.linkedin.com/in/devi-charan-1a8b49302', '_blank')}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors ${animateSocial ? 'animate-glow-bounce' : ''}`}
                onClick={() => window.open('https://www.instagram.com/imdvichrn', '_blank')}
                aria-label="Instagram Profile"
              >
                <Instagram size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors ${animateSocial ? 'animate-glow-bounce' : ''}`}
                onClick={() => window.open('https://www.facebook.com/userdead.610', '_blank')}
                aria-label="Facebook Profile"
              >
                <Facebook size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Button>
            </div>
          </div>

        </div>
      )}
    </>
  );
});