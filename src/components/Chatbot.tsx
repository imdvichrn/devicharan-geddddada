import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2, Linkedin, Instagram, Facebook, Sparkles, Film, Zap, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from './WindowChrome';
import { SiriOrb } from './SiriOrb';
import { useNavigate } from 'react-router-dom';
import { ActionButtons } from './ActionButtons';
import { useToast } from '@/hooks/use-toast';
import { sendChatMessage, getUserNameFromStorage, saveUserNameToStorage, parseUserNameFromMessage } from '@/services/chatService';

interface ActionButton {
  label: string;
  icon: 'mail' | 'link' | 'heart';
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
  const initialMessages: Message[] = [
    {
      role: 'assistant',
      content: `👋 Hi! I'm Devicharan, a Lead Video Editor, Sound Engineer, and Post-Production Specialist based in Visakhapatnam.

I specialize in:
• Advanced Video Editing with Adobe Premiere Pro & DaVinci Resolve
• Professional Sound Design & Audio Engineering
• 3D Modeling & Fusion-Oriented Motion Graphics
• Complete Post-Production Workflows

Ask me about my projects, services, or how we can work together! 🎬`,
      timestamp: new Date()
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

  // Quick Actions Configuration
  const quickActions: QuickAction[] = [
    {
      id: 'modeling-work',
      label: 'View 3D Modeling Work',
      icon: <Sparkles size={16} className="text-accent" />,
      description: 'See my advanced 3D modeling projects',
      action: () => {
        setInput('Show me your 3D modeling and motion graphics work');
        navigate('/#projects');
      }
    },
    {
      id: 'editing-process',
      label: 'Video Editing Process',
      icon: <Film size={16} className="text-primary" />,
      description: 'Learn about my post-production workflow',
      action: () => {
        setInput('Tell me about your video editing and post-production process');
      }
    },
    {
      id: 'hire',
      label: 'Hire for Post-Production',
      icon: <Zap size={16} className="text-cyan-400" />,
      description: 'Discuss freelance opportunities',
      action: () => {
        setInput('I\'d like to hire you for a project');
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
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleButtonAction = (action: string) => {
    switch (action) {
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
      case 'whatsapp':
        window.open('https://wa.me/916303468707', '_blank');
        break;
      case 'projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        break;
      case 'cv':
        const link = document.createElement('a');
        link.href = '/cv.pdf';
        link.download = 'Geddada_Devicharan_CV.pdf';
        link.click();
        break;
      case 'contact-page':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
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
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50 overflow-hidden ${
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
        <div className="fixed bottom-16 right-2 left-2 md:bottom-24 md:right-6 md:left-auto md:w-96 h-[500px] md:h-[500px] glass-elevated rounded-2xl shadow-2xl z-40 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="p-3 md:p-4 border-b border-glass-border">
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
                <h3 className="font-medium text-sm md:text-base text-foreground">Echoless</h3>
                <p className="text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Personal Assistant
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 h-[340px]">
            {/* Quick Actions Display */}
            {showQuickActions && messages.length === 1 && (
              <div className="space-y-2 mb-4">
                <p className="text-xs md:text-sm font-medium text-muted-foreground px-2">Quick Actions:</p>
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.action();
                      // Simulate sending the message
                      setTimeout(() => sendMessage({ preventDefault: () => {} } as any), 100);
                    }}
                    className="w-full text-left p-2 md:p-3 rounded-lg border border-glass-border hover:bg-muted/50 transition-all duration-200 hover:border-primary/50 group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {action.icon}
                      <span className="text-xs md:text-sm font-medium group-hover:text-primary transition-colors">{action.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">{action.description}</p>
                  </button>
                ))}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[85%] p-2.5 md:p-3 rounded-2xl text-xs md:text-sm transition-all duration-200 group-hover:shadow-md ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-2 md:ml-4'
                      : 'bg-muted text-muted-foreground mr-2 md:mr-4 border border-border/50'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  
                  {/* Source Reference Link */}
                  {message.projectLink && (
                    <button
                      onClick={() => {
                        navigate(message.projectLink!);
                        setIsOpen(false);
                      }}
                      className="mt-2 text-xs font-medium bg-primary/20 hover:bg-primary/30 text-primary px-2.5 py-1 rounded-full transition-colors inline-block"
                    >
                      View Project →
                    </button>
                  )}

                  {/* Action Buttons */}
                  {message.buttons && message.buttons.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {message.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonAction(btn.action)}
                          className="text-xs bg-primary/20 hover:bg-primary/30 text-primary px-2.5 py-1 rounded-full transition-colors"
                        >
                          {btn.label}
                        </button>
                      ))}
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
            
            {/* Thinking Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground p-3 rounded-2xl flex items-center gap-2 border border-cyan-400/30">
                  {/* Turquoise & Silver Thinking Animation */}
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-200 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="ml-1 text-xs md:text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>


          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 md:p-4 border-t border-glass-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-background/50 border-glass-border text-xs md:text-sm"
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
          </form>

          {/* Social Media Footer */}
          <div className="px-4 pb-4 border-t border-glass-border/50">
            <div className="flex justify-center items-center gap-4 pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors"
                onClick={() => window.open('https://www.linkedin.com/in/geddadadevicharan', '_blank')}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors"
                onClick={() => window.open('https://www.instagram.com/imdvichrn', '_blank')}
                aria-label="Instagram Profile"
              >
                <Instagram size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors"
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