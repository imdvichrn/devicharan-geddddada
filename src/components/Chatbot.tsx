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

export const Chatbot = forwardRef<{ toggleChat: () => void }>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `👋 Hello! I'm Devicharan's AI assistant with complete access to his portfolio, projects, and experience.

🎯 **What I can help with:**
• Projects & technical work
• Skills & expertise 
• Education & background
• Contact & collaboration
• Real-time portfolio insights

💬 **Pro tips:**
• Ask specific questions for detailed answers
• Try: "Tell me about your latest projects"
• Try: "What technologies do you work with?"
• Try: "How can I contact you?"

Ready to explore? What would you like to know first?`,
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

    // Check for social media queries
    const socialMediaResponse = checkSocialMediaQuery(userMessage);
    if (socialMediaResponse) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: socialMediaResponse,
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
      let assistantContent = data.reply || "Sorry, I couldn't process that request.";
      
      // Add conversation continuation suggestions
      if (Math.random() > 0.7) { // 30% chance to add suggestions
        const suggestions = [
          "\n\n💡 **Want to know more?** Ask about specific projects or technologies!",
          "\n\n🚀 **Next steps?** Check out my latest work or get in touch!",
          "\n\n🔍 **Explore deeper:** Ask about my learning journey or future goals!",
          "\n\n📈 **Curious about growth?** Ask how I'm developing new skills!",
          "\n\n🤝 **Ready to collaborate?** Let's discuss how we can work together!"
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