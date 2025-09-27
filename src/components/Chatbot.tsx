import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
      content: `👋 Hello! I'm Devicharan's AI assistant with complete access to his portfolio, projects, and experience.\n\n🎯 **What I can help with:**\n• Projects & technical work\n• Skills & expertise \n• Education & background\n• Contact & collaboration\n• Real-time portfolio insights\n\n💬 **Pro tips:**\n• Ask specific questions for detailed answers\n• Try: "Tell me about your latest projects"\n• Try: "What technologies do you work with?"\n• Try: "How can I contact you?"\n\nReady to explore? What would you like to know first?`,
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
    
    const newUserMessage: Message = { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
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

      let assistantContent = data.reply || "Sorry, I couldn't process that request.";
      
      if (Math.random() > 0.7) {
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
        content: `🔧 **Connection Issue** - I'm temporarily unavailable, but you can reach Devicharan directly:\n\n📧 **Email:** devicharangeddada@gmail.com\n📱 **Phone:** +91 6303468707\n📍 **Location:** Visakhapatnam, India\n\nI'll be back online soon with full portfolio insights!`,
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
    const event = new Event('submit') as any;
    sendMessage(event);
  };

  const handleConversationEnd = () => {
    const endMessage: Message = {
      role: 'assistant',
      content: `👋 **Thanks for chatting!** \n\n🎯 **What we covered:** Portfolio insights, projects, and opportunities to connect\n\n📬 **Next steps:**\n• Email: devicharangeddada@gmail.com  \n• Phone: +91 6303468707\n• Based in: Visakhapatnam, India\n\n💡 **Come back anytime** for updated portfolio information and project details!\n\n*Hope to hear from you soon!* 🚀`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, endMessage]);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50 overflow-hidden ${isOpen ? 'animate-scale-out' : 'animate-scale-in'}`}
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
            const video = e.currentTarget;
            video.currentTime = 0;
            video.play().catch(console.error);
          }}
          onEnded={(e) => {
            const video = e.currentTarget;
            video.currentTime = 0;
            video.play().catch(console.error);
          }}
          className="w-full h-full object-cover rounded-full"
          style={{ display: 'block' }}
        />
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] glass-elevated rounded-2xl shadow-2xl z-40 animate-slide-up overflow-hidden flex flex-col">
          <div className="p-4 border-b border-glass-border flex justify-center items-center">
            <SiriOrb />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm transition-all duration-200 group-hover:shadow-md ${message.role === 'user' ? 'bg-primary text-primary-foreground ml-4' : 'bg-muted text-muted-foreground mr-4 border border-border/50'}`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
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

          {messages.length <= 2 && (
            <QuickActions 
              onActionClick={handleQuickAction} 
              disabled={isLoading}
            />
          )}

          <form onSubmit={sendMessage} className="p-4 border-t border-glass-border mt-auto">
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
        </div>
      )}
    </>
  );
});
