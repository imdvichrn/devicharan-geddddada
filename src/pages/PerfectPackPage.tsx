import { motion } from 'framer-motion';
import { Bell, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

const pulseRing = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.5, 0, 0.5],
  },
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const floatAnimation = {
  animate: {
    y: [0, -8, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function PerfectPackPage() {
  const { toast } = useToast();
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    if (registered) return;
    setRegistered(true);
    toast({
      title: "You're on the list!",
      description: "We'll notify you the moment Perfect Pack drops.",
      className: "bg-primary text-black font-bold",
    });
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Navigation back */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:underline transition-all group"
          aria-label="Return to portfolio homepage"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
          Back
        </Link>

        {/* Cinematic Video Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900"
        >
          <video 
            src="/assets/perfect-pack-demo.mp4"
            controls
            className="w-full h-full object-cover"
            poster="/assets/perfect-pack-preview.png"
            aria-label="imdvichrn's PERFECT PACK All-In-One Creative Assets Demo Video"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 pt-8">
          
          {/* Content Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">
              Perfect Pack
            </h1>
            <p className="text-3xl text-primary font-bold tracking-[0.2em]">
              ALL-IN-ONE CREATIVE ASSETS
            </p>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed border-l-2 border-primary/20 pl-6">
              <p>
                Professional-grade textures and drag-and-drop elements specifically optimized for DaVinci Resolve and all major NLEs. Everything you need to elevate your video production.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {['High-Res Textures', 'Drag & Drop', 'Optimized', 'Universal'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-white/90 bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> 
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section Right (Sticky) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center p-8 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl border border-white/10 h-fit sticky top-24 shadow-2xl"
          >
            {/* BRAND LOGO with animated glow */}
            <div className="relative mb-8">
              {/* Pulsing ring behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                {...pulseRing}
              />
              <motion.div
                className="absolute inset-[-8px] rounded-full border border-primary/15"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <img 
                src="/assets/product-logo.png" 
                alt="imdvichrn official branding - PERFECT PACK" 
                className="w-56 h-56 object-contain relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="w-full text-center space-y-6">
              {/* Coming Soon Badge */}
              <motion.div 
                {...floatAnimation}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold tracking-wider uppercase"
              >
                <Sparkles className="w-4 h-4" />
                Launching Soon
              </motion.div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Starting at</p>
                <div className="text-6xl font-black text-white">$10</div>
              </div>
              
              {/* Register / Notify Button */}
              <motion.button
                onClick={handleRegister}
                whileHover={{ scale: registered ? 1 : 1.05 }}
                whileTap={{ scale: registered ? 1 : 0.95 }}
                className={`w-full py-5 font-black rounded-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                  registered 
                    ? 'bg-white/10 text-primary border border-primary/30 cursor-default' 
                    : 'bg-primary text-black shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)]'
                }`}
                aria-label={registered ? "Registered for PERFECT PACK launch notification" : "Register for PERFECT PACK launch notification by imdvichrn"}
              >
                {!registered && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  {registered ? 'REGISTERED ✓' : 'NOTIFY ME AT LAUNCH'}
                </span>
              </motion.button>
              
              <p className="text-xs text-zinc-500">
                {registered 
                  ? "You'll be first to know when it drops." 
                  : "Be the first to access exclusive launch pricing."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Schema JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Perfect Pack - All-In-One Creative Assets",
          "description": "Professional-grade textures and drag-and-drop elements optimized for DaVinci Resolve and major NLEs",
          "brand": {
            "@type": "Brand",
            "name": "imdvichrn"
          },
          "offers": {
            "@type": "Offer",
            "price": "10",
            "priceCurrency": "USD",
            "availability": "https://schema.org/PreOrder"
          }
        })}
      </script>
    </div>
  );
}
