import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2, Linkedin, Instagram, Facebook, Sparkles, Film, Zap, Download, PlayCircle, Phone, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from './WindowChrome';
import { SiriOrb } from './SiriOrb';
import { useNavigate, useLocation } from 'react-router-dom';
import { ActionButtons } from './ActionButtons';
import { useToast } from '@/hooks/use-toast';
import { streamChatMessage, sendChatMessage, getUserNameFromStorage, saveUserNameToStorage, parseUserNameFromMessage } from '@/services/chatService';
import { defaultEngine } from '@/echoless/engine';
import { runNaturalnessPipeline } from '@/echoless/naturalness';
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

export const Chatbot = forwardRef<{ toggleChat: () => void }, {}>((props, ref) => {
  const location = useLocation();
  
  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const isHomePage = location.pathname === '/';
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 64;
        const y = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }

    if (sectionId === 'home') {
      window.location.href = '/';
    } else {
      window.location.href = '/#' + sectionId;
    }
  };

  const initialMessages: Message[] = [
    {
      role: 'assistant',
      content: `Hey. I'm Echoless. What would you like to explore across Devicharan's software products, video post-production, or digital systems?`,
      timestamp: new Date(),
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(() => getUserNameFromStorage());
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [showQuickActions, setShowQuickActions] = useState(messages.length === 1);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelMode, setModelMode] = useState<'general' | 'fast' | 'complex'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textBufferRef = useRef<string>("");
  const streamActiveRef = useRef<boolean>(false);
  const currentResponseTextRef = useRef<string>("");
  const streamIntervalRef = useRef<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Quick Actions Configuration
  const quickActions: QuickAction[] = [
    {
      id: 'examflow-os',
      label: 'ExamFlowOS',
      icon: <img src="/examflow-logo.jpg" alt="ExamFlowOS logo" className="w-4 h-4 rounded-xs object-cover" loading="lazy" decoding="async" />,
      description: '10K+ users CBT testing platform (100% Free)',
      action: () => {
        window.open('https://examflowos.in', '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'explore-work',
      label: 'Explore Work',
      icon: <Film size={16} className="text-primary" />,
      description: 'Software, 700+ video projects, web ecosystems',
      action: () => {
        navigate('/work');
        setIsOpen(false);
      }
    },
    {
      id: 'download-cv',
      label: 'Download CV',
      icon: <Download size={16} className="text-blue-400" />,
      description: 'Get verified resume & qualifications',
      action: () => {
        window.open('/Geddada_Devicharan_CV.pdf', '_blank', 'noopener,noreferrer');
        toast({
          title: "CV Opened",
          description: "Geddada Devicharan's CV has been opened in a new tab.",
        });
      }
    },
    {
      id: 'book-call',
      label: 'Direct Contact',
      icon: <Phone size={16} className="text-emerald-400" />,
      description: 'Connect directly on WhatsApp or email',
      action: () => {
        window.open('https://wa.me/916303468707', '_blank');
      }
    }
  ];

  useImperativeHandle(ref, () => ({
    toggleChat: () => setIsOpen(!isOpen)
  }));

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const smartScrollToBottom = (force = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    
    if (force || isAtBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  // Scroll on user messages or initial load
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (messages.length === 1 || lastMessage?.role === 'user') {
      scrollToBottom();
    }
  }, [messages.length]);

  // Scroll to bottom when chatbot is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom('auto'), 80);
    }
  }, [isOpen]);

  // Cleanup stream interval on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // try to play message-sent audio, fallback to WebAudio beep if blocked/missing
    const playFallbackBeep = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 880;
        g.gain.value = 0.02;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(() => { o.stop(); ctx.close(); }, 300);
      } catch (err) {
        // no-op
      }
    };

    try {
      const audio = new Audio('/siri-wave.webm');
      audio.volume = 0.4;
      audio.play().catch(() => playFallbackBeep());
    } catch (err) {
      playFallbackBeep();
    }

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
      // Build API messages from conversation history
      const apiMessages = [...messages, newUserMessage].map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Initialize streaming states
      textBufferRef.current = "";
      streamActiveRef.current = true;
      currentResponseTextRef.current = "";

      const finalizeAssistantMessage = (rawText: string) => {
        const { refinedText, actions } = runNaturalnessPipeline(rawText, {
          userPrompt: userMessage,
          recentHistory: messages,
        });

        setMessages(prev => {
          const last = prev[prev.length - 1];
          const actionButtons: ActionButton[] | undefined =
            actions.length > 0
              ? actions.map(a => ({
                  label: a.label,
                  action: a.id,
                  icon: 'link' as const,
                }))
              : undefined;

          if (last?.role === "assistant") {
            return prev.map((m, i) =>
              i === prev.length - 1
                ? {
                    ...m,
                    content: refinedText,
                    buttons: actionButtons,
                  }
                : m
            );
          }
          return [
            ...prev,
            {
              role: "assistant" as const,
              content: refinedText,
              buttons: actionButtons,
              timestamp: new Date(),
            },
          ];
        });
      };

      const startStreamConsumption = () => {
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
        }

        streamIntervalRef.current = setInterval(() => {
          if (textBufferRef.current.length === 0) {
            if (!streamActiveRef.current) {
              finalizeAssistantMessage(currentResponseTextRef.current);
              smartScrollToBottom(true);
              clearInterval(streamIntervalRef.current!);
              streamIntervalRef.current = null;
            }
            return;
          }

          if (!streamActiveRef.current) {
            const remaining = textBufferRef.current;
            textBufferRef.current = "";
            currentResponseTextRef.current += remaining;
            
            finalizeAssistantMessage(currentResponseTextRef.current);
            smartScrollToBottom(true);
            
            clearInterval(streamIntervalRef.current!);
            streamIntervalRef.current = null;
            return;
          }

          const bufferLength = textBufferRef.current.length;
          let takeLength = 4;
          
          if (bufferLength > 200) {
            takeLength = 28;
          } else if (bufferLength > 90) {
            takeLength = 16;
          } else if (bufferLength > 40) {
            takeLength = 8;
          } else if (bufferLength > 15) {
            takeLength = 5;
          }
          
          const chunkToAppend = textBufferRef.current.slice(0, takeLength);
          textBufferRef.current = textBufferRef.current.slice(takeLength);
          currentResponseTextRef.current += chunkToAppend;

          // Transition smoothly from thinking indicator to rendered bubble on first chunk
          setIsLoading(false);

          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && !last.buttons) {
              return prev.map((m, i) =>
                i === prev.length - 1
                  ? { ...m, content: currentResponseTextRef.current }
                  : m
              );
            }
            return [
              ...prev,
              { role: "assistant" as const, content: currentResponseTextRef.current, timestamp: new Date() },
            ];
          });

          smartScrollToBottom(false);
        }, 35);
      };

      const upsertAssistantChunk = (nextChunk: string) => {
        textBufferRef.current += nextChunk;
        if (!streamIntervalRef.current) {
          startStreamConsumption();
        }
      };

      await streamChatMessage({
        messages: apiMessages,
        taskType: modelMode,
        modelPreference: modelMode,
        onDelta: (chunk) => {
          upsertAssistantChunk(chunk);
        },
        onDone: () => {
          streamActiveRef.current = false;
        },
        onError: (error) => {
          console.warn("Chat notice:", error);
          setIsLoading(false);
          streamActiveRef.current = false;
          upsertAssistantChunk(defaultEngine.getHonestUnavailableResponse());
        },
      });
    } catch (error) {
      console.warn('Chat notice caught:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant' as const,
          content: defaultEngine.getHonestUnavailableResponse(),
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonAction = (action: string) => {
    switch (action) {
      case 'examflowos':
        window.open('https://examflowos.in', '_blank', 'noopener,noreferrer');
        break;
      case 'software':
        navigate('/software');
        setIsOpen(false);
        break;
      case 'video':
        navigate('/video');
        setIsOpen(false);
        break;
      case 'web':
        navigate('/web');
        setIsOpen(false);
        break;
      case 'systems':
        navigate('/systems');
        setIsOpen(false);
        break;
      case 'writing':
        navigate('/writing');
        setIsOpen(false);
        break;
      case 'view-showreel':
        navigate('/video');
        setIsOpen(false);
        break;
      case 'scroll-projects':
      case 'view-portfolio':
      case 'projects':
        navigate('/work');
        setIsOpen(false);
        break;
      case 'cv':
      case 'download-cv':
        window.open('/Geddada_Devicharan_CV.pdf', '_blank', 'noopener,noreferrer');
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
        window.open('https://www.facebook.com/imdvichrn', '_blank');
        break;
      case 'twitter':
        window.open('https://x.com/devi_charan_2004', '_blank');
        break;
      case 'github':
        window.open('https://github.com/imdvichrn/imdvichrn', '_blank');
        break;
      case 'whatsapp':
        window.open('https://wa.me/916303468707', '_blank');
        break;
      case 'contact-page':
        navigate('/contact');
        setIsOpen(false);
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Geddada Devicharan Portfolio',
            text: 'Explore Devicharan\'s software, systems, and post-production portfolio.',
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
      default:
        if (action.startsWith('project-')) {
          const projectLink = action.replace('project-', '');
          if (projectLink.includes('video')) {
            navigate('/video');
          } else if (projectLink.includes('examflow')) {
            navigate('/software');
          } else if (projectLink.includes('perfect-pack')) {
            navigate('/perfect-pack');
          } else {
            navigate('/work');
          }
          setIsOpen(false);
        }
    }
  };

  // --- Link extraction & rendering helpers ---
  const URL_FRIENDLY_NAMES: Record<string, string> = {
    'linkedin.com': 'LinkedIn',
    'instagram.com': 'Instagram',
    'facebook.com': 'Facebook',
    'twitter.com': 'X (Twitter)',
    'x.com': 'X (Twitter)',
    'github.com': 'GitHub',
    'wa.me': 'WhatsApp',
    'examflowos.vercel.app': 'ExamFlow OS — Live Demo',
    'youtube.com': 'YouTube',
    'youtu.be': 'YouTube',
  };

  const getFriendlyLinkName = (url: string): string => {
    for (const [domain, name] of Object.entries(URL_FRIENDLY_NAMES)) {
      if (url.includes(domain)) return name;
    }
    // For internal paths, format nicely
    if (url.startsWith('/')) {
      const parts = url.split('/').filter(Boolean);
      const last = parts[parts.length - 1]?.replace(/-/g, ' ') || 'View Page';
      return last.charAt(0).toUpperCase() + last.slice(1);
    }
    // Fallback: clean domain
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      return hostname;
    } catch {
      return 'Open Link';
    }
  };

  const extractLinks = (text: string): { url: string; label: string; isInternal: boolean }[] => {
    const links: { url: string; label: string; isInternal: boolean }[] = [];
    const seen = new Set<string>();

    // Match markdown links [label](url)
    const mdRegex = /\[([^\]]+)\]\(((?:https?:\/\/[^\s)]+|\/[^\s)]+))\)/g;
    let match;
    while ((match = mdRegex.exec(text)) !== null) {
      if (!seen.has(match[2])) {
        seen.add(match[2]);
        links.push({ url: match[2], label: getFriendlyLinkName(match[2]), isInternal: match[2].startsWith('/') });
      }
    }

    // Match bare URLs not already captured
    const urlRegex = /(?<!\]\()https?:\/\/[^\s)<>]+/g;
    while ((match = urlRegex.exec(text)) !== null) {
      const url = match[0].replace(/[.,;:!?)]+$/, '');
      if (!seen.has(url)) {
        seen.add(url);
        links.push({ url, label: getFriendlyLinkName(url), isInternal: false });
      }
    }

    // Match internal paths like /projects/something
    const pathRegex = /(?:^|\s)(\/[a-zA-Z0-9_/-]+)/gm;
    while ((match = pathRegex.exec(text)) !== null) {
      const path = match[1];
      if (!seen.has(path) && path.length > 1) {
        seen.add(path);
        links.push({ url: path, label: getFriendlyLinkName(path), isInternal: true });
      }
    }

    return links.slice(0, 2);
  };

  const renderContentWithLinks = (content: string): string => {
    // Strip markdown link syntax from display text
    let cleaned = content.replace(/\[([^\]]+)\]\((?:https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, '$1');
    // Strip bare URLs from display text since buttons handle them
    cleaned = cleaned.replace(/https?:\/\/[^\s)<>]+/g, '').replace(/\s{2,}/g, ' ').trim();
    return cleaned;
  };

  const getActionStyle = (actionOrUrl: string) => {
    const a = actionOrUrl.toLowerCase();
    if (a.includes('instagram')) {
      // Restrained Instagram-inspired accent (subtle warm rose/amber glass border)
      return 'bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 hover:from-rose-500/15 hover:to-amber-500/15 text-rose-100 border border-rose-400/30 hover:border-rose-400/50 shadow-xs';
    }
    if (a.includes('github')) {
      // Neutral monochrome
      return 'bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-200 border border-zinc-700/60 hover:border-zinc-500/70 shadow-xs';
    }
    if (a.includes('linkedin') || a.includes('facebook') || a.includes('twitter') || a.includes('x.com')) {
      // Restrained blue
      return 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 border border-sky-400/30 hover:border-sky-400/50 shadow-xs';
    }
    if (a.includes('whatsapp') || a.includes('wa.me')) {
      // Restrained green
      return 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 hover:border-emerald-400/50 shadow-xs';
    }
    if (a.includes('video') || a.includes('showreel')) {
      // Cinematic violet/blue
      return 'bg-violet-500/10 hover:bg-violet-500/20 text-violet-200 border border-violet-400/30 hover:border-violet-400/50 shadow-xs';
    }
    if (a.includes('software') || a.includes('examflow') || a.includes('web')) {
      // Sapphire blue
      return 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 border border-blue-400/30 hover:border-blue-400/50 shadow-xs';
    }
    if (a.includes('cv') || a.includes('resume') || a.includes('.pdf')) {
      // Neutral document treatment
      return 'bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 border border-slate-600/40 hover:border-slate-400/60 shadow-xs';
    }
    // Apple-inspired unified glass pill
    return 'bg-muted/40 hover:bg-muted/60 text-chat-text border border-chat-border/50 hover:border-primary/40 shadow-xs';
  };

  return (
    <>
      {/* Echo Less Toggle Button - Always-floating Siri Orb */}
      <motion.div
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] pointer-events-auto"
        style={{
          bottom: 'max(1.5rem, env(safe-area-inset-bottom) + 0.5rem)',
          right: 'max(1.5rem, env(safe-area-inset-right) + 0.5rem)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full shadow-2xl transition-all duration-200 overflow-hidden bg-transparent hover:bg-transparent border-0 outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none flex items-center justify-center p-0 cursor-pointer"
          style={{ border: 'none', outline: 'none' }}
          aria-label="Chat Support - Click to talk with Echoless"
        >
          {/* Continuous looping Siri Orb - runs regardless of chat state */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatType: 'loop' }}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-[72px] md:h-[72px] rounded-full overflow-hidden flex items-center justify-center"
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
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed left-3 right-3 sm:left-auto sm:right-6 sm:w-96 max-w-[calc(100vw-1.5rem)] h-[min(520px,calc(100dvh-5.5rem))] z-[9998] flex flex-col"
            style={{
              bottom: 'max(4.5rem, calc(env(safe-area-inset-bottom) + 4.25rem))',
            }}
          >
            {/* Glass Panel Container */}
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border border-chat-border bg-chat-bg/95 backdrop-blur-xl flex flex-col">
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent" />
              </div>

              {/* Header */}
              <div className="relative z-10 px-4 py-3 border-b border-chat-border/50 flex-shrink-0 bg-background/40 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 flex-1">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                    <div>
                      <h3 className="font-semibold text-xs tracking-wide uppercase text-chat-text">Echoless</h3>
                      <p className="text-[11px] text-chat-text-muted flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Online
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-chat-text-muted hover:text-chat-text transition-colors p-1.5 rounded-md hover:bg-muted/30 cursor-pointer"
                    aria-label="Close chat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Container - Scrollable */}
              <div 
                ref={messagesContainerRef}
                className="relative z-10 flex-1 min-h-0 overflow-y-auto p-4 space-y-3"
              >
                {/* Quick Actions Display */}
                {showQuickActions && messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 mb-4"
                  >
                    <p className="text-xs font-medium text-chat-text-muted px-2">Quick Actions:</p>
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
                        className="w-full text-left p-3 rounded-lg border border-chat-border/50 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {action.icon}
                          <span className="text-sm font-medium text-chat-text group-hover:text-primary-foreground transition-colors">{action.label}</span>
                        </div>
                        <p className="text-xs text-chat-text-muted/70 ml-6">{action.description}</p>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Messages */}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.98, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      layout
                      className={`max-w-[85%] p-3 rounded-2xl text-sm transition-all duration-200 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-chat-bubble-user to-primary text-primary-foreground rounded-br-none'
                          : 'bg-chat-bubble-bot border border-chat-border/50 text-chat-text rounded-bl-none backdrop-blur-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed text-sm">
                        {message.role === 'assistant' ? renderContentWithLinks(message.content) : message.content}
                      </div>

                      {/* Action Buttons (Unified Apple/macOS Design System) */}
                      {(() => {
                        const displayButtons = message.buttons && message.buttons.length > 0 ? message.buttons : [];

                        if (!displayButtons || displayButtons.length === 0) return null;

                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="mt-3 flex flex-col gap-1.5"
                          >
                            {displayButtons.map((btn, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.015, y: -1 }}
                                whileTap={{ scale: 0.985 }}
                                onClick={() => {
                                  if (btn.action.startsWith('http') || btn.action.startsWith('/')) {
                                    if (btn.action.startsWith('/')) {
                                      navigate(btn.action);
                                      setIsOpen(false);
                                    } else {
                                      window.open(btn.action, '_blank', 'noopener,noreferrer');
                                    }
                                  } else {
                                    handleButtonAction(btn.action);
                                  }
                                }}
                                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-all duration-200 backdrop-blur-md cursor-pointer ${getActionStyle(btn.action)}`}
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="truncate">{btn.label}</span>
                                </span>
                                <svg className="w-3.5 h-3.5 opacity-65 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </motion.button>
                            ))}
                          </motion.div>
                        );
                      })()}

                      {/* Timestamp */}
                      {message.timestamp && (
                        <div className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Thinking Animation using Siri visual language */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-start"
                  >
                    <div className="bg-chat-bubble-bot border border-chat-border/50 text-chat-text px-3 py-2 rounded-2xl rounded-bl-none backdrop-blur-md flex items-center gap-2.5 shadow-xs">
                      <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center">
                        <SiriOrb className="w-full h-full" />
                      </div>
                      <div className="flex items-center gap-1">
                        <motion.span
                          animate={{ opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                          className="w-1.5 h-1.5 rounded-full bg-primary/80"
                        />
                        <motion.span
                          animate={{ opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-primary/80"
                        />
                        <motion.span
                          animate={{ opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                          className="w-1.5 h-1.5 rounded-full bg-primary/80"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={sendMessage} className="relative z-10 p-4 border-t border-chat-border/50 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 text-sm bg-chat-input-bg border-chat-border/50 text-chat-text placeholder:text-chat-text-muted/50 rounded-lg focus:border-primary/50 focus:ring-primary/20"
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
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-lg"
                    >
                      <Send size={16} />
                    </Button>
                  </motion.div>
                </div>
              </form>

              {/* Social Links Footer */}
              <div className="relative z-10 px-4 py-3 border-t border-chat-border/50 flex justify-center items-center gap-3">
                {[
                  { icon: Linkedin, url: 'https://www.linkedin.com/in/geddadadevicharan', label: 'LinkedIn' },
                  { icon: Instagram, url: 'https://www.instagram.com/imdvichrn', label: 'Instagram' },
                  { icon: Facebook, url: 'https://www.facebook.com/imdvichrn', label: 'Facebook' },
                ].map((social, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.open(social.url, '_blank')}
                    className="w-8 h-8 rounded-full hover:bg-primary/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={16} className="text-chat-text-muted hover:text-primary transition-colors" />
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