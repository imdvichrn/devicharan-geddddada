import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from './WindowChrome';
import { SiriOrb } from './SiriOrb';
import { sendChatMessage } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Devicharan's portfolio assistant. Ask me about my skills, projects, or anything else you'd like to know!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage([...messages, { role: 'user', content: userMessage }]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Sorry, I'm having trouble responding right now. Please try again later.",
        variant: "destructive",
      });
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble responding right now. Please try again later or contact me directly at devicharangeddada@gmail.com" 
      }]);
    } finally {
      setIsLoading(false);
    }
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
              <WindowChrome />
              <div className="flex-1 text-center">
                <h3 className="font-medium text-foreground">echoless</h3>
                <p className="text-sm text-muted-foreground">Devi charañ assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[340px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'bg-muted text-muted-foreground mr-4'
                  }`}
                >
                  {message.content}
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
          <form onSubmit={sendMessage} className="p-4 border-t border-glass-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-background/50 border-glass-border"
                disabled={isLoading}
                maxLength={1500}
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
        </div>
      )}
    </>
  );
}