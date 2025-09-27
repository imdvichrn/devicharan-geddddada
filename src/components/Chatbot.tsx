  // Expanded details for smart memory/context
  const expanded = {
    aboutMe: [
      "I’m always learning and growing in my field, taking on new challenges and collaborating with peers to deepen my understanding.",
      "My academic journey includes hands-on projects, internships, and active participation in tech communities.",
      "I value both theory and practical experience, striving to bridge the gap between classroom learning and real-world application."
    ],
    skills: [
      "I’ve applied my skills in real projects, such as designing control systems and building digital solutions for academic challenges.",
      "My programming experience includes automation scripts and simulation tools for electrical engineering problems.",
      "I regularly use my analytical skills to troubleshoot systems and optimize performance in both coursework and personal projects."
    ],
    projects: [
      "One of my academic projects involved designing a microcontroller-based energy monitoring system.",
      "I’ve also built a web-based portfolio to showcase my coding and engineering work, integrating real-time chat and interactive features.",
      "My personal experiments include prototyping IoT devices and collaborating on open-source software for engineering students."
    ]
  };

  // Track discussed topics in session
  // Allow discussedTopics to store booleans and arrays for FAQ indexes
  const [discussedTopics, setDiscussedTopics] = useState<{ [key: string]: any }>({});
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
  // FAQ variations for each FAQ topic
  // FAQ variations for each FAQ topic (with 3 professional variations each)
  const faqReplies = {
    faq_cgpa: [
      "I’m focused on achieving top results in my program and continuously improving my performance.",
      "I maintain strong academic performance and strive for excellence in all subjects.",
      "My current focus is on mastering my coursework and achieving the best possible results."
    ],
    faq_goals: [
      "I aim to build a career in Electrical & Electronics Engineering while applying my skills to real-world solutions.",
      "My goal is to contribute to impactful projects in EEE and technology-driven innovations.",
      "I’m focused on developing expertise in my field and working on projects that solve real problems."
    ],
    faq_achievements: [
      "I’ve completed several academic projects, participated in practical training, and built hands-on skills across EEE and coding domains.",
      "My achievements include successfully executing complex projects, developing skills in digital and electrical systems, and improving problem-solving abilities.",
      "I have a track record of academic and practical achievements in both engineering and coding projects."
    ],
    faq_motivation: [
      "I chose Electrical & Electronics Engineering because it combines theory with practical applications, allowing me to work on impactful solutions.",
      "EEE fascinated me for its blend of problem-solving, technology, and real-world implementation.",
      "I’m passionate about understanding and building electrical systems, which is why I pursued EEE."
    ]
  };
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

export const Chatbot = forwardRef<{ toggleChat: () => void }>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  // Multi-variation reply sets for Echoless
  const greetings = [
    "Hello! 👋 I’m Echoless, Devi Charan’s personal assistant. I can walk you through my skills, projects, and background. What would you like to explore?",
    "Welcome! I’m Echoless, here to guide you through my portfolio. Would you like to learn about my skills, projects, or connect with me?",
    "Hi there! 👋 I’m Echoless. Think of me as your guide to my journey — skills, projects, experience, and more. Where shall we start?",
    "Greetings! I’m Echoless, assisting on behalf of Devi Charan. I can share details about my work, abilities, and career path. What interests you?",
    "Hello visitor 👋 I’m Echoless. I’ll help you discover who I am, my skills, and my projects. Would you like me to start with an overview?"
  ];
  const aboutMe = [
    "I’m Devi Charan, a B.Tech student in Electrical & Electronics Engineering at Andhra University, Visakhapatnam. I’m passionate about problem-solving and impactful projects. Would you like me to share more about my skills or my academic journey?",
    "I’m Devi Charan, currently pursuing Electrical & Electronics Engineering at Andhra University. My focus is on technology, innovation, and creating solutions. Do you want to hear about my skills or projects first?",
    "My name is Devi Charan. I’m a B.Tech EEE student, and my interests revolve around electrical systems, control systems, and real-world problem solving. Would you like me to highlight my strengths or my projects?",
    "I’m Devi Charan, pursuing B.Tech in EEE from Andhra University, Visakhapatnam. I enjoy combining theory with practical application through projects. Would you like an overview of my skills or goals?",
    "I’m Devi Charan, specializing in Electrical & Electronics Engineering. My journey includes both academic and practical achievements. Should I walk you through my technical expertise or my projects?"
  ];
  const skills = [
    "Here’s what I’m good at: Power Systems, Electrical Machines, Control Systems, Signals & Systems, and analytical problem-solving. Would you like me to show you how I’ve applied these in projects?",
    "My technical strengths include: EEE fundamentals, digital systems, power electronics, and strong analytical thinking. Should I connect these to real projects I’ve worked on?",
    "I specialize in Electrical Machines, Power Systems, and Control Systems, with additional skills in programming and problem-solving. Would you like more details on applications?",
    "Some of my key skills: Electrical & Electronics Engineering basics, digital/analog circuits, and critical analysis. Would you like me to expand with project examples?",
    "My strengths are: Core EEE subjects (machines, systems), electronics, and logical problem-solving. Would you like me to link these to my portfolio projects?"
  ];
  const projects = [
    "I’ve worked on both academic and personal projects that demonstrate my problem-solving skills. Do you prefer academic or coding projects first?",
    "My portfolio includes academic, electrical, and coding projects. Which category interests you more?",
    "I’ve developed projects across EEE and programming domains. Would you like me to share an academic project or a personal one first?",
    "From university coursework to personal experiments, I’ve built several projects. Do you want me to show you an electrical system project or a digital coding one?",
    "I’ve applied my skills through projects in multiple areas. Shall I walk you through my academic engineering work or my software side projects?"
  ];
  const contact = [
    "You can contact me directly through the form on this site or via email at devicharangeddada@gmail.com. Would you like me to open the form for you?",
    "I’d be happy to connect! Use the site’s contact form, or email me at devicharangeddada@gmail.com. Should I open the contact section for you now?",
    "Feel free to reach out through the contact page or at devicharangeddada@gmail.com. Want me to guide you to the contact form?",
    "To connect with me, just head to the contact form here, or email devicharangeddada@gmail.com. Shall I take you there?",
    "I’m always open to collaboration! Contact me via the site form or email devicharangeddada@gmail.com. Would you like me to bring up the contact button?"
  ];
  const socialLinks = [
    "You can also connect with me here:\n🔹 LinkedIn\n\n🔹 GitHub\n\n🔹 Twitter",
    "Here are my social links:\n🔗 LinkedIn | 💻 GitHub | 🐦 Twitter",
    "Would you like to check out my social profiles?\n\nLinkedIn\n\nGitHub\n\nTwitter",
    "Here’s where you can follow me online:\n👉 LinkedIn\n\n👉 GitHub\n\n👉 Twitter",
    "You can explore more of my work and updates here:\n✨ LinkedIn\n\n✨ GitHub\n\n✨ Twitter"
  ];
  const closing = [
    "It was great having this conversation. If you’d like to explore more, just ask — I’m always here to help.",
    "Thanks for visiting! Feel free to ask me more about my portfolio anytime.",
    "I appreciate your time. I’ll be here whenever you need more info about my work.",
    "It was a pleasure assisting you. Have a great day, and do come back if you’d like to know more.",
    "Glad I could help! Let me know if you’d like to dive deeper into my portfolio."
  ];

  // Helper to pick a random reply
  function pickRandom(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Initial greeting
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: pickRandom(greetings),
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animateSocial, setAnimateSocial] = useState(false);
  const sendMessage = async (e: React.FormEvent) => {
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
      intentReply = eval(topic) ? pickRandom(eval(topic)) : null;
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
    }

    // If intent detected, reply immediately
    if (intentReply) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: intentReply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      return;
    }

    try {
      // Send to real backend API
      console.log("[Chatbot] Sending message to backend:", userMessage);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, newUserMessage].map(({ timestamp, ...msg }) => msg)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("[Chatbot] Received response:", data);

      // Enhanced response with sources and suggestions
      let assistantContent = data.reply || "I’m here to talk about my skills, projects, and background. Could you please rephrase your question?";
      // Add conversation continuation suggestions
      if (Math.random() > 0.7) {
        const suggestions = [
          "\n\n💡 Want to know more? Ask about my skills, projects, or how to contact me!",
          "\n\n🚀 Next steps? Explore my latest work or connect with me directly!",
          "\n\n🔍 Explore deeper: Ask about my academic journey or future goals!",
          "\n\n📈 Curious about growth? Ask how I’m developing new skills!",
          "\n\n🤝 Ready to collaborate? Let’s discuss how we can work together!"
        ];
        assistantContent += suggestions[Math.floor(Math.random() * suggestions.length)];
      }
      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantContent,
        sources: data.sources || [],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Connection Error",
        description: "I'm having trouble connecting. Please try again or contact Devicharan directly.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        role: 'assistant',
        content: `🔧 **Connection Issue** - I'm temporarily unavailable, but you can reach Devicharan directly:

📧 **Email:** devicharangeddada@gmail.com
📱 **Phone:** +91 6303468707
📍 **Location:** Visakhapatnam, India

I'll be back online soon with full portfolio insights!`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (question: string) => {
    if (isLoading) return;
    
    setInput(question);
    // Automatically send the message
    const event = new Event('submit') as any;
    sendMessage(event);
  };

  const checkSocialMediaQuery = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('linkedin')) {
      return `🔗 **LinkedIn Profile**

📋 Connect with me on LinkedIn for professional updates and networking:
👉 [www.linkedin.com/in/devi-charan-1a8b49302](https://www.linkedin.com/in/devi-charan-1a8b49302)

Perfect for:
• Professional discussions
• Career opportunities  
• Technical collaborations
• Industry insights`;
    }
    
    if (lowerMessage.includes('instagram')) {
      return `📸 **Instagram Profile**

🎨 Follow me on Instagram for behind-the-scenes content and personal updates:
👉 [@imdvichrn](https://www.instagram.com/imdvichrn)

You'll find:
• Project highlights
• Daily tech insights
• Personal moments
• Creative content`;
    }
    
    if (lowerMessage.includes('facebook')) {
      return `📘 **Facebook Profile**

👥 Connect with me on Facebook for community interactions:
👉 [Facebook Profile](https://www.facebook.com/userdead.610)

Great for:
• Community discussions
• Event updates
• Casual conversations
• Networking`;
    }
    
    if (lowerMessage.includes('social') || lowerMessage.includes('social media')) {
      return `🌐 **All Social Media Links**

Connect with me across platforms:

🔗 **LinkedIn:** [Professional Profile](https://www.linkedin.com/in/devi-charan-1a8b49302)
📸 **Instagram:** [@imdvichrn](https://www.instagram.com/imdvichrn)  
📘 **Facebook:** [Personal Profile](https://www.facebook.com/userdead.610)

Each platform offers different insights into my work and interests!`;
    }
    
    return null;
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
/* Add animation CSS for glowing and bouncing social buttons */
        </div>
      )}
    </>
  );
});