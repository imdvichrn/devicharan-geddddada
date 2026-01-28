import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2, Linkedin, Instagram, Facebook, Sparkles, Film, Zap, Download, PlayCircle, Phone, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from './WindowChrome';
import { SiriOrb } from './SiriOrb';
import { useNavigate, useLocation } from 'react-router-dom';
import { ActionButtons } from './ActionButtons';
import { useToast } from '@/hooks/use-toast';
import { sendChatMessage, getUserNameFromStorage, saveUserNameToStorage, parseUserNameFromMessage } from '@/services/chatService';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionButton {
  label: string;
  icon: 'mail' | 'link' | 'heart' | 'download' | 'play' | 'phone';
  action: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  projectLink?: string;
  timestamp?: Date;
  buttons?: ActionButton[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  action: () => void;
}

export const Chatbot = forwardRef<{ toggleChat: () => void }>((props, ref) => {
  const location = useLocation();
  
  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    // If not on home page, navigate first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const initialMessages: Message[] = [
    {
      role: 'assistant',
      content: `Hey there! 👋 I'm Echoless, Devicharan's AI assistant. 

I can tell you about his video editing work, skills, or help you get in touch. What would you like to know?`,
      timestamp: new Date(),
      buttons: [
        { label: '🎬 See My Work', icon: 'play' as const, action: 'scroll-projects' },
        { label: '💬 Get in Touch', icon: 'mail' as const, action: 'contact-page' }
      ]
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(() => getUserNameFromStorage());
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [showQuickActions, setShowQuickActions] = useState(messages.length === 1);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Quick Actions Configuration with new button types
  const quickActions: QuickAction[] = [
    {
      id: 'showreel',
      label: 'View My Showreel',
      icon: <PlayCircle size={16} className="text-indigo-400" />,
      description: 'Watch my professional video editing showreel',
      action: () => {
        setInput('Show me your video editing showreel');
      }
    },
    {
      id: 'download-cv',
      label: 'Download CV',
      icon: <Download size={16} className="text-blue-400" />,
      description: 'Get my resume and qualifications',
      action: () => {
        const link = document.createElement('a');
        link.href = '/cv.pdf';
        link.download = 'Geddada_Devicharan_CV.pdf';
        link.click();
        toast({
          title: "CV Downloaded!",
          description: "Your CV is ready to go",
        });
      }
    },
    {
      id: 'book-call',
      label: 'Book a Call',
      icon: <Phone size={16} className="text-emerald-400" />,
      description: 'Schedule a consultation with me',
      action: () => {
        window.open('https://wa.me/916303468707', '_blank');
      }
    }
  ];

  useImperativeHandle(ref, () => ({
    toggleChat: () => setIsOpen(!isOpen)
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Link Detection System - Detect when user asks for social media or GitHub
  const detectSocialMediaRequest = (userInput: string): string | null => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('linkedin') || lowerInput.includes('linked in') || lowerInput.includes('linkdin')) {
      return 'linkedin';
    }
    if (lowerInput.includes('instagram') || lowerInput.includes('insta') || lowerInput.includes('ig')) {
      return 'instagram';
    }
    if (lowerInput.includes('facebook') || lowerInput.includes('fb')) {
      return 'facebook';
    }
    if (lowerInput.includes('twitter') || lowerInput.includes('x.com') || lowerInput.includes('tweet')) {
      return 'twitter';
    }
    if (lowerInput.includes('github') || lowerInput.includes('git hub') || lowerInput.includes('git')) {
      return 'github';
    }
    if (lowerInput.includes('email') || lowerInput.includes('mail') || lowerInput.includes('contact') || lowerInput.includes('reach')) {
      return 'email';
    }
    
    return null;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setShowQuickActions(false);
    
    // Check for user name in message
    const extractedName = parseUserNameFromMessage(userMessage);
    if (extractedName && !userName) {
      setUserName(extractedName);
      saveUserNameToStorage(extractedName);
    }
    
    // Add user message with timestamp
    const newUserMessage: Message = { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Check for social media link requests
    const detectedSocial = detectSocialMediaRequest(userMessage);
    
    if (detectedSocial) {
      // Social media detected - respond with button-based redirect
      const socialResponses: Record<string, { text: string; buttons: ActionButton[] }> = {
        linkedin: {
          text: `Sure thing! Here's Devicharan's LinkedIn — he shares editing tips and industry insights there. Feel free to connect! 🤝`,
          buttons: [
            { label: '🔗 Open LinkedIn', icon: 'link' as const, action: 'linkedin' }
          ]
        },
        instagram: {
          text: `Great choice! You'll find behind-the-scenes content and portfolio highlights on his Instagram. Check it out! 📸`,
          buttons: [
            { label: '📸 Open Instagram', icon: 'link' as const, action: 'instagram' }
          ]
        },
        facebook: {
          text: `Here's the Facebook page! Drop a message or follow for updates on creative projects. 👋`,
          buttons: [
            { label: '👥 Open Facebook', icon: 'link' as const, action: 'facebook' }
          ]
        },
        twitter: {
          text: `Nice! Devicharan shares quick tips and creative thoughts on X/Twitter. Give it a follow! 🐦`,
          buttons: [
            { label: '🐦 Open Twitter/X', icon: 'link' as const, action: 'twitter' }
          ]
        },
        github: {
          text: `Looking for code? Here's the GitHub profile with all the projects and repositories! 💻`,
          buttons: [
            { label: '💻 Open GitHub', icon: 'link' as const, action: 'github' }
          ]
        },
        email: {
          text: `Want to get in touch? No problem! Pick your preferred way to reach out below. I'll make sure Devicharan gets back to you! 📬`,
          buttons: [
            { label: '📧 Send Email', icon: 'mail' as const, action: 'email' },
            { label: '💬 WhatsApp', icon: 'phone' as const, action: 'whatsapp' }
          ]
        }
      };

      const response = socialResponses[detectedSocial];
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text,
        buttons: response.buttons,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      // Use enhanced chatService with Digital Twin logic
      const response = await sendChatMessage([...messages, newUserMessage]);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text,
        sources: response.sources,
        projectLink: response.projectLink,
        timestamp: new Date(),
        buttons: response.sources?.map(source => ({
          label: `Learn More`,
          icon: 'link' as const,
          action: `project-${source}`
        }))
      };

      // Simulate a brief thinking delay
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: `I'm processing your message... In the meantime, you can reach me at:

📧 Email: devicharangeddada@gmail.com
📱 WhatsApp: +91 6303468707
📍 Location: Visakhapatnam, India

Let's connect directly! 🚀`,
        buttons: [
          { label: 'Send Email', icon: 'mail' as const, action: 'email' },
          { label: 'WhatsApp Message', icon: 'phone' as const, action: 'whatsapp' }
        ],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleButtonAction = (action: string) => {
    switch (action) {
      case 'view-showreel':
        navigate('/projects/scenesync-edits');
        setIsOpen(false);
        break;
      case 'scroll-projects':
        scrollToSection('projects');
        break;
      case 'view-portfolio':
        scrollToSection('projects');
        break;
      case 'download-cv':
        const link = document.createElement('a');
        link.href = '/cv.pdf';
        link.download = 'Geddada_Devicharan_CV.pdf';
        link.click();
        break;
      case 'book-call':
        window.open('https://wa.me/916303468707', '_blank');
        break;
      case 'email':
        window.location.href = 'mailto:devicharangeddada@gmail.com';
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/geddadadevicharan', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/imdvichrn', '_blank');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/userdead.610', '_blank');
        break;
      case 'twitter':
        window.open('https://twitter.com/imdvichrn', '_blank');
        break;
      case 'github':
        window.open('https://github.com/DeviCharan-Geddada', '_blank');
        break;
      case 'whatsapp':
        window.open('https://wa.me/916303468707', '_blank');
        break;
      case 'projects':
        scrollToSection('projects');
        break;
      case 'contact-page':
        scrollToSection('contact');
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Devicharan Portfolio',
            text: 'Check out Devicharan\'s post-production portfolio!',
            url: window.location.href
          }).catch(console.error);
        } else {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link Copied!",
            description: "Portfolio link copied to clipboard",
          });
        }
        break;
      // Handle project links
      default:
        if (action.startsWith('project-')) {
          const projectLink = action.replace('project-', '');
          // Route to project based on link
          if (projectLink.includes('video')) {
            navigate('/projects/video-editing-post-production');
          } else if (projectLink.includes('scenesync')) {
            navigate('/project/scenesync-edits');
          }
          setIsOpen(false);
        }
    }
  };



  return (
    <>
      {/* Echo Less Toggle Button - Continuous Siri Orb Loop */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full shadow-2xl transition-all duration-200 z-50 overflow-hidden bg-transparent hover:bg-transparent border-0 outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none flex items-center justify-center p-0"
          style={{ border: 'none', outline: 'none' }}
          aria-label="Chat Support - Click to talk with Echoless"
        >
          {/* Continuous looping Siri Orb - runs regardless of chat state */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
            className="w-14 h-14 rounded-full overflow-hidden"
            style={{ borderRadius: '50%', border: 'none', outline: 'none' }}
          >
            <SiriOrb className="w-full h-full" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Echo Less Floating Panel - Semi-transparent with glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] z-40 flex flex-col"
          >
            {/* Glass Panel Container */}
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border border-indigo-400/30 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-xl flex flex-col">
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
              </div>

              {/* Header */}
              <div className="relative z-10 p-4 border-b border-indigo-500/20 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"
                    />
                    <div>
                      <h3 className="font-semibold text-sm text-white">Echoless</h3>
                      <p className="text-xs text-indigo-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Online • Ready to help
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    aria-label="Close chat"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Container - Scrollable */}
              <div className="relative z-10 flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
                {/* Quick Actions Display */}
                {showQuickActions && messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 mb-4"
                  >
                    <p className="text-xs font-medium text-indigo-300 px-2">Quick Actions:</p>
                    {quickActions.map((action, idx) => (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          action.action();
                          setShowQuickActions(false);
                        }}
                        className="w-full text-left p-3 rounded-lg border border-indigo-500/20 hover:border-indigo-500/50 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {action.icon}
                          <span className="text-sm font-medium text-indigo-200 group-hover:text-indigo-100 transition-colors">{action.label}</span>
                        </div>
                        <p className="text-xs text-indigo-300/70 ml-6">{action.description}</p>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Messages */}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      layout
                      className={`max-w-[85%] p-3 rounded-2xl text-sm transition-all duration-200 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-br-none'
                          : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-100 rounded-bl-none backdrop-blur-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</div>

                      {/* Quick Reply Buttons - Full Width Secondary Style */}
                      {message.buttons && message.buttons.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mt-3 flex flex-col gap-2"
                        >
                          {message.buttons.map((btn, idx) => {
                            // Check if this is a social media button for special glow styling
                            const isSocialButton = ['linkedin', 'instagram', 'facebook', 'twitter', 'github', 'email', 'whatsapp'].some(
                              social => btn.action.includes(social)
                            );
                            
                            // Get platform-specific colors for glow effect
                            const getGlowColor = (action: string) => {
                              if (action.includes('linkedin')) return 'from-blue-500 to-blue-600 shadow-blue-500/50';
                              if (action.includes('instagram')) return 'from-pink-500 to-purple-600 shadow-pink-500/50';
                              if (action.includes('facebook')) return 'from-blue-600 to-blue-700 shadow-blue-600/50';
                              if (action.includes('twitter')) return 'from-sky-400 to-sky-600 shadow-sky-500/50';
                              if (action.includes('github')) return 'from-gray-600 to-gray-800 shadow-gray-500/50';
                              if (action.includes('email') || action.includes('whatsapp')) return 'from-emerald-500 to-teal-600 shadow-emerald-500/50';
                              return 'from-indigo-500 to-blue-600 shadow-indigo-500/50';
                            };

                            return (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.03, boxShadow: isSocialButton ? '0 0 20px rgba(99, 102, 241, 0.6)' : undefined }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleButtonAction(btn.action)}
                                className={`w-full px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                                  isSocialButton 
                                    ? `bg-gradient-to-r ${getGlowColor(btn.action)} text-white shadow-lg hover:shadow-xl`
                                    : 'border border-indigo-400/50 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-200 hover:text-indigo-100'
                                }`}
                              >
                                {btn.label}
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}

                      {/* Timestamp */}
                      {message.timestamp && (
                        <div className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Thinking Animation */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 p-3 rounded-2xl rounded-bl-none backdrop-blur-sm flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-indigo-400"
                        />
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                          className="w-2 h-2 rounded-full bg-indigo-400"
                        />
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-indigo-400"
                        />
                      </div>
                      <span className="ml-1 text-xs">Thinking...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={sendMessage} className="relative z-10 p-4 border-t border-indigo-500/20 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 text-sm bg-indigo-500/10 border-indigo-500/20 text-indigo-100 placeholder:text-indigo-400/50 rounded-lg focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    disabled={isLoading}
                    maxLength={2000}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!input.trim() || isLoading}
                      className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-lg"
                    >
                      <Send size={16} />
                    </Button>
                  </motion.div>
                </div>
              </form>

              {/* Social Links Footer */}
              <div className="relative z-10 px-4 py-3 border-t border-indigo-500/20 flex justify-center items-center gap-3">
                {[
                  { icon: Linkedin, url: 'https://www.linkedin.com/in/geddadadevicharan', label: 'LinkedIn' },
                  { icon: Instagram, url: 'https://www.instagram.com/imdvichrn', label: 'Instagram' },
                  { icon: Facebook, url: 'https://www.facebook.com/userdead.610', label: 'Facebook' },
                ].map((social, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.open(social.url, '_blank')}
                    className="w-8 h-8 rounded-full hover:bg-indigo-500/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={16} className="text-indigo-400 hover:text-indigo-300 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});