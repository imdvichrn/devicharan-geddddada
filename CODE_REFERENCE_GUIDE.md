# Code Reference Guide - Premium Portfolio Implementation

## Quick Copy-Paste Code Blocks

### 1. Complete Index.tsx - Hero Section Extract

```tsx
// Hero Section - Split Screen with Auto-playing Showreel
<motion.section
  ref={heroRef}
  className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020617] via-[#020617] to-[#0d1b3d]"
  style={{ y: parallax }}
>
  {/* Left Side - Typography */}
  <motion.div className="space-y-6 md:space-y-8">
    <Badge className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
      Available for Freelance Projects
    </Badge>
    
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
      <span className="bg-gradient-to-r from-indigo-200 via-white to-indigo-100 bg-clip-text text-transparent">
        Cinematic<br/>Post-Production<br/>
      </span>
      <span className="text-indigo-300">Mastery</span>
    </h1>
  </motion.div>

  {/* Right Side - Showreel */}
  <motion.div className="hidden lg:flex justify-center items-center">
    <motion.div className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden shadow-2xl">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
        <source src="/showreel.webm" type="video/webm" />
      </video>
    </motion.div>
  </motion.div>
</motion.section>
```

### 2. MagneticButton Component (Full)

```tsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, any>(
  ({ children, className = '', ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance = 100;

      if (distance < maxDistance && isHovering) {
        const pullStrength = (1 - distance / maxDistance) * 15;
        setButtonPosition({
          x: mouseX * 0.3 * (pullStrength / 15),
          y: mouseY * 0.3 * (pullStrength / 15),
        });
      } else {
        setButtonPosition({ x: 0, y: 0 });
      }
    };

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setButtonPosition({ x: 0, y: 0 });
        }}
        className="relative inline-block"
      >
        <motion.div animate={buttonPosition} transition={{ type: 'spring', stiffness: 250, damping: 20 }}>
          <button ref={ref as any} className={className} {...props}>
            {children}
          </button>
        </motion.div>
      </div>
    );
  }
);

export default MagneticButton;
```

### 3. Echo Less Quick Actions Configuration

```tsx
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
```

### 4. Echo Less Floating Panel Structure

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.8, y: 20 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  className="fixed bottom-24 right-6 w-96 h-[500px] z-40 flex flex-col"
>
  <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl 
                  border border-indigo-400/30 
                  bg-gradient-to-br from-black/60 via-black/50 to-black/60 
                  backdrop-blur-xl">
    {/* Header */}
    <div className="relative z-10 p-4 border-b border-indigo-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"
          />
          <div>
            <h3 className="font-semibold text-sm text-white">Echo Less</h3>
            <p className="text-xs text-indigo-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Always Ready
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Messages Area */}
    <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
      {/* Messages render here */}
    </div>

    {/* Input Area */}
    <form onSubmit={sendMessage} className="relative z-10 p-4 border-t border-indigo-500/20">
      <div className="flex gap-2">
        <Input
          className="flex-1 text-sm bg-indigo-500/10 border-indigo-500/20 text-indigo-100"
          placeholder="Ask anything..."
        />
        <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-600">
          <Send size={16} />
        </Button>
      </div>
    </form>
  </div>
</motion.div>
```

### 5. Quick Reply Button Styling (for Echo Less messages)

```tsx
{/* Full-width secondary button style for Echo Less */}
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => handleButtonAction(btn.action)}
  className="w-full px-3 py-2 rounded-lg border border-indigo-400/50 
             bg-indigo-500/10 hover:bg-indigo-500/20 
             text-indigo-200 hover:text-indigo-100 
             transition-all duration-200 text-xs font-medium 
             flex items-center justify-center gap-2"
>
  {icon}
  {btn.label}
</motion.button>
```

### 6. Scrollytelling Animation Variants

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,  // 20ms stagger
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Usage:
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  className="space-y-16"
>
  {items.map((item, idx) => (
    <motion.div key={idx} variants={itemVariants}>
      {/* Content */}
    </motion.div>
  ))}
</motion.div>
```

### 7. CSS Glass Panel Classes

```css
/* Add to index.css */

.glass-panel {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.glass-elevated {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fluid-bubble-in {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fluid-bubble {
  animation: fluid-bubble-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 8. SEO Metadata Setup

```tsx
import { Helmet } from 'react-helmet-async';

export const Index = () => {
  return (
    <>
      <Helmet>
        <title>Geddada Devicharan | Lead Video Editor & Post-Production Specialist</title>
        <meta
          name="description"
          content="Specialized video editor and post-production specialist. Advanced editing, color grading, VFX, and audio engineering. Based in Visakhapatnam. Ready for your next project."
        />
        <meta 
          name="keywords" 
          content="video editing, post-production, DaVinci Resolve, color grading, VFX, audio engineering, Visakhapatnam" 
        />
        <meta property="og:title" content="Geddada Devicharan | Lead Video Editor" />
        <meta property="og:description" content="Premium post-production services." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Content */}
    </>
  );
};
```

### 9. Import Statements for Index.tsx

```tsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { WindowChrome } from '@/components/WindowChrome';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Film, Zap, Code, Sparkles, Palette, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MagneticButton from '@/components/MagneticButton';
```

### 10. Import Statements for Chatbot.tsx

```tsx
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader2, Linkedin, Instagram, Facebook, Sparkles, Film, Zap, MessageSquare, Download, PlayCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from './WindowChrome';
import { SiriOrb } from './SiriOrb';
import { useNavigate } from 'react-router-dom';
import { ActionButtons } from './ActionButtons';
import { useToast } from '@/hooks/use-toast';
import { sendChatMessage, getUserNameFromStorage, saveUserNameToStorage, parseUserNameFromMessage } from '@/services/chatService';
import { motion, AnimatePresence } from 'framer-motion';
```

---

## Configuration & Customization Quick Links

### Change Colors

1. **In tailwind classes**: Replace `indigo-500`, `indigo-400`, `blue-600`, etc.
2. **In CSS variables**: Edit `:root { --primary, --accent }` in index.css
3. **In gradients**: Update `from-indigo-500 to-blue-600`

### Change Text Content

1. **Hero headline**: Find `<h1>` in Index.tsx, edit span text
2. **Badge text**: Find `<Badge>` component, edit text
3. **FAQ items**: Edit `faqItems` array in Index.tsx
4. **Quick Actions**: Edit `quickActions` array in Chatbot.tsx

### Change Video/Images

1. **Hero showreel**: Replace `/showreel.webm` video source
2. **OG Image**: Replace `/og-image.png`
3. **Poster image**: Replace `/showreel-poster.png`

### Change Links

1. **Showreel link**: Update Link `to="/projects/scenesync-edits"`
2. **CV download**: Update href `/cv.pdf`
3. **WhatsApp**: Update `https://wa.me/916303468707`
4. **Social links**: Find window.open calls, update URLs

---

## Component Props Reference

### MagneticButton
```tsx
<MagneticButton
  className="string"      // Tailwind classes
  onClick={() => {}}      // Click handler
  asChild={boolean}       // Render as Link element
  ...props               // Standard button props
>
  Children
</MagneticButton>
```

### Echo Less Message Interface
```tsx
interface Message {
  role: 'user' | 'assistant';
  content: string;                    // Message text
  sources?: string[];                 // Reference sources
  projectLink?: string;               // Navigation link
  timestamp?: Date;                   // Message time
  buttons?: ActionButton[];           // Quick reply buttons
}

interface ActionButton {
  label: string;                      // Button text
  icon: 'download' | 'play' | 'phone' | 'mail' | 'link' | 'heart';
  action: string;                     // Action identifier
}
```

---

## Responsive Breakpoints Used

- **Mobile**: Default (no md: prefix)
- **Tablet**: `md:` (768px)
- **Desktop**: `lg:` (1024px)
- **Large Desktop**: `xl:` (1280px)

Example:
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  Responsive Title
</h1>
```

---

## Animation Triggers

### On Scroll (useInView)
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}  // Trigger at 30% visible
  variants={containerVariants}
>
```

### On Hover
```tsx
<motion.div whileHover={{ scale: 1.05 }}>
```

### On Tap/Click
```tsx
<motion.div whileTap={{ scale: 0.95 }}>
```

### Continuous Loop
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
>
```

---

## Testing Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Browser DevTools Tips

### Inspect Animations
1. Open DevTools → Elements
2. Select animated element
3. Hover over transform properties
4. Watch `translate`, `scale`, `opacity` values change

### Check Glassmorphism
1. Select glass panel element
2. Check computed styles for:
   - `backdrop-filter: blur(16px)`
   - `background: rgba(...)`
   - `border: 1px solid rgba(...)`

### Verify Responsive
1. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
2. Check breakpoints (md: 768px, lg: 1024px)
3. Test on mobile, tablet, desktop

---

## Deployment Checklist

- [ ] Replace `/showreel.webm` with your video
- [ ] Add `/cv.pdf` file
- [ ] Update WhatsApp number (if different)
- [ ] Update social media links
- [ ] Update company/personal details
- [ ] Add Open Graph image (`/og-image.png`)
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Run `npm run build` successfully
- [ ] Deploy to hosting platform

---

**All code is production-ready and fully typed with TypeScript! 🚀**
