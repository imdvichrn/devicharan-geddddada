import { motion } from 'framer-motion';
import { Bell, ArrowLeft, CheckCircle, Sparkles, Loader2, Package, Layers, Palette, Music, Type } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WindowChrome } from '@/components/WindowChrome';
import { Helmet } from 'react-helmet-async';
import { HiddenIdentityBlock, FooterMicroBio } from '@/components/SEOContent';

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
};

const features = [
  { icon: Palette, label: 'Cinematic Textures', desc: 'High-res overlays & grain packs' },
  { icon: Music, label: 'Sound Effects', desc: 'Pro-grade SFX & ambient beds' },
  { icon: Layers, label: 'DRFX Presets', desc: 'Drag-and-drop Resolve presets' },
  { icon: Type, label: 'Motion Titles', desc: 'Animated typography templates' },
];

export default function PerfectPackPage() {
  const { toast } = useToast();
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (registered || isSubmitting) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('launch_registrations')
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === '23505') {
          setRegistered(true);
          toast({ title: "Already registered!", description: "This email is already on the list." });
        } else {
          throw error;
        }
      } else {
        setRegistered(true);
        toast({ title: "You're on the list!", description: "We'll notify you the moment Perfect Pack drops." });
        supabase.functions.invoke('send-perfect-pack-email', {
          body: { email: email.trim().toLowerCase() },
        }).catch(console.error);
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Perfect Pack — All-In-One Creative Assets by Geddada Devicharan (imdvichrn)</title>
        <meta name="description" content="Perfect Pack by Geddada Devicharan (Charan / imdvichrn): professional textures, sound effects, DRFX presets and motion titles for DaVinci Resolve. Launching soon — register for early access." />
        <meta name="keywords" content="Perfect Pack, Perfect Pack imdvichrn, Geddada Devicharan, Devicharan, Charan, imdvichrn, iamdvichrn, DaVinci Resolve assets, DRFX presets, motion titles, video editing pack, Devicharan editor, Charan video editor" />
        <link rel="canonical" href="https://geddadadevicharan.netlify.app/perfect-pack" />
        <meta property="og:title" content="Perfect Pack — All-In-One Creative Assets by Geddada Devicharan" />
        <meta property="og:description" content="Professional textures, sound effects, DRFX presets & motion titles by imdvichrn. Launching soon." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Perfect Pack - All-In-One Creative Assets",
            "description": "Professional-grade textures and drag-and-drop elements optimized for DaVinci Resolve and major NLEs",
            "brand": { "@type": "Brand", "name": "imdvichrn" },
            "offers": { "@type": "Offer", "price": "10", "priceCurrency": "USD", "availability": "https://schema.org/PreOrder" },
            "author": { "@type": "Person", "name": "Geddada Devicharan", "alternateName": ["Charan", "Devicharan", "imdvichrn"] },
          })}
        </script>
      </Helmet>

      <HiddenIdentityBlock page="perfect-pack" />

      <div className="min-h-screen bg-background pt-20 md:pt-28 pb-20 px-3 md:px-4 transition-colors duration-300">
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Back */}
          <motion.div variants={fadeUp}>
            <Link to="/#projects">
              <Button variant="ghost" size="sm" className="hover-scale group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>

          {/* Hero Card */}
          <motion.div variants={fadeUp}>
            <Card className="glass-elevated border-glass-border overflow-hidden">
              <div className="px-4 md:px-8 pt-6 md:pt-8">
                <WindowChrome className="mb-6" />

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Package className="mr-1 h-3 w-3" />
                    DaVinci Resolve
                  </Badge>
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Launching Soon
                    </Badge>
                  </motion.div>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                  Perfect Pack
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                  Professional-grade textures and drag-and-drop elements specifically optimized for DaVinci Resolve and all major NLEs. Everything you need to elevate your video production.
                </p>
              </div>

              {/* Video showcase */}
              <div className="px-4 md:px-8 pb-6 md:pb-8">
                <div className="glass-panel border-glass-border rounded-xl overflow-hidden">
                  <div className="bg-background/40 backdrop-blur-md px-4 py-2.5 border-b border-glass-border flex items-center relative">
                    <WindowChrome />
                    <div className="absolute left-0 right-0 text-center pointer-events-none">
                      <span className="text-[10px] md:text-xs text-muted-foreground font-medium">
                        Perfect Pack Demo — Preview
                      </span>
                    </div>
                  </div>
                  <div className="aspect-video bg-black/50 relative">
                    <video
                      src="/assets/perfect-pack-demo.mp4"
                      controls
                      className="w-full h-full object-cover"
                      poster="/assets/perfect-pack-preview.png"
                      aria-label="Perfect Pack All-In-One Creative Assets Demo"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={fadeUp}>
            <Card className="glass-panel border-glass-border">
              <CardContent className="p-4 md:p-8">
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
                  <Layers className="text-primary w-5 h-5" />
                  What's Inside
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 300, damping: 30 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-glass-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <f.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{f.label}</p>
                        <p className="text-xs text-muted-foreground">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA / Registration Card */}
          <motion.div variants={fadeUp}>
            <Card className="glass-elevated border-glass-border">
              <CardContent className="p-6 md:p-10 flex flex-col items-center text-center space-y-6">
                {/* Logo with glow */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.15, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src="/assets/product-logo.png"
                    alt="Perfect Pack by imdvichrn"
                    className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Starting at</p>
                  <span className="text-5xl md:text-6xl font-black text-foreground">$10</span>
                </div>

                {/* Email input */}
                <div className="w-full max-w-sm space-y-3">
                  {!registered && (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                    />
                  )}

                  <Button
                    onClick={handleRegister}
                    disabled={isSubmitting || registered}
                    size="lg"
                    className={`w-full text-sm font-bold tracking-wide relative overflow-hidden ${
                      registered
                        ? 'bg-muted text-primary border border-primary/30'
                        : 'bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]'
                    }`}
                    aria-label={registered ? "Registered for launch" : "Register for launch notification"}
                  >
                    {!registered && !isSubmitting && (
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                      {isSubmitting ? 'Registering...' : registered ? 'Registered ✓' : 'Notify Me at Launch'}
                    </span>
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    {registered ? "You'll be first to know when it drops." : "Be the first to access exclusive launch pricing."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}