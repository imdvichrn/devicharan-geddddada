import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export default function PerfectPackPage() {
  const { toast } = useToast();

  const handlePurchase = () => {
    // Play sensory feedback
    const audio = new Audio('/message-sent.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Fallback: create a simple beep if audio fails
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
    });

    toast({
      title: "Redirecting...",
      description: "Opening secure checkout.",
      className: "bg-primary text-black font-bold",
    });

    // Navigate to checkout (replace with your actual URL)
    setTimeout(() => {
      window.location.href = "https://lemonsky.gumroad.com/l/perfect-pack";
    }, 500);
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

          {/* Buy Section Right (Sticky) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center p-8 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl border border-white/10 h-fit sticky top-24 shadow-2xl"
          >
            {/* BRAND LOGO */}
            <img 
              src="/assets/product-logo.png" 
              alt="imdvichrn official branding - PERFECT PACK" 
              className="w-56 h-56 object-contain mb-8 hover:scale-105 transition-transform duration-500"
            />
            
            <div className="w-full text-center space-y-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Investment</p>
                <div className="text-6xl font-black text-white">$10</div>
              </div>
              
              <motion.button
                onClick={handlePurchase}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 bg-primary text-black font-black rounded-2xl shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:shadow-[0_0_50px_rgba(var(--primary),0.6)] transition-all flex items-center justify-center gap-3"
                aria-label="Securely purchase PERFECT PACK All-In-One Creative Assets by imdvichrn for $10"
              >
                <ShoppingBag className="w-5 h-5" />
                BUY NOW
              </motion.button>
              
              <p className="text-xs text-zinc-500 italic">Secure payment via LemonSqueezy</p>
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
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "24"
          }
        })}
      </script>
    </div>
  );
}
