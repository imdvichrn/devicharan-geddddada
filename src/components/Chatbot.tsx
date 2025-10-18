import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from './WindowChrome';
import { SiriOrb } from './SiriOrb';

import { ActionButtons } from './ActionButtons';
import { useToast } from '@/hooks/use-toast';
import getResponse from './echoless.js';

interface ActionButton {
  label: string;
  icon: 'mail' | 'link' | 'heart';
  action: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp?: Date;
  buttons?: ActionButton[];
}

export const Chatbot = forwardRef<{ toggleChat: () => void }>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `👋 Hi! I'm Devicharan from Visakhapatnam, India.

I'm pursuing B.Tech in Electrical & Electronics Engineering and I'm passionate about AI-assisted content creation, video editing, and digital tools.

Ask me about:
• My skills and projects
• How to contact me
• My social media links
• Ways to support my work

What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
    
    // Add user message with timestamp
    const newUserMessage: Message = { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Use local chatbot logic (echoless)
      const reply = await getResponse(userMessage);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: reply.text,
        timestamp: new Date(),
        buttons: reply.buttons
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
        content: `I'm having a bit of trouble right now. But you can still reach me at:

📧 Email: devicharangeddada@gmail.com
📱 Phone: +91 6303468707
📍 Location: Visakhapatnam, India`,
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
        window.open('https://www.linkedin.com/in/devi-charan-1a8b49302', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/imdvichrn', '_blank');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/userdead.610', '_blank');
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
            text: 'Check out Devicharan\'s portfolio!',
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
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {/* Action Buttons */}
                  {message.buttons && message.buttons.length > 0 && (
                    <ActionButtons 
                      buttons={message.buttons.map(btn => ({
                        ...btn,
                        action: () => handleButtonAction(btn.action)
                      }))}
                    />
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
                onClick={() => window.open('https://www.linkedin.com/in/devi-charan-1a8b49302', '_blank')}
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