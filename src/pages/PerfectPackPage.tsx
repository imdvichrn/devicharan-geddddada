import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PerfectPackPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* BACK BUTTON - Essential for Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-4 group"
          aria-label="Return to portfolio homepage"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
          Back to Portfolio
        </Link>

        {/* 1. TOP SECTION: THE CINEMATIC VIDEO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900"
        >
          <video 
            src="/Perfect pack forder/Showcase product for perfect pack video.mp4"
            controls
            className="w-full h-full object-cover"
            poster="/Perfect pack forder/Showcase product for perfect pack.png"
            aria-label="imdvichrn's PERFECT PACK All-In-One Creative Assets Demo Video"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* 2. LAYOUT: INFO & HIGH-END BUY SECTION */}
        <div className="grid lg:grid-cols-3 gap-12 pt-8">
          
          {/* Left Side: Technical Specifications */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h1 className="text-8xl font-black tracking-tighter uppercase leading-none">
              Perfect Pack
            </h1>
            <p className="text-3xl text-primary font-bold tracking-[0.2em]">
              ALL-IN-ONE CREATIVE ASSETS
            </p>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed border-l-2 border-primary/20 pl-6">
              <p>
                The <strong className="text-white">PERFECT PACK</strong> by imdvichrn is a professional-grade collection featuring High-Resolution Textures and Drag & Drop Integration. Specifically optimized for DaVinci Resolve and all major NLEs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {['Drag & Drop Integration', 'High-Res Textures', 'All Major Editors', 'Lifetime Updates'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> 
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Branding & Checkout */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center p-8 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl border border-white/10 h-fit sticky top-24 shadow-2xl"
          >
            {/* BRAND LOGO */}
            <img 
              src="/Perfect pack forder/Showcase product for perfect pack Background Removed.png" 
              alt="imdvichrn official branding - PERFECT PACK" 
              className="w-56 h-56 object-contain mb-8 hover:scale-105 transition-transform duration-500"
            />
            
            <div className="w-full text-center space-y-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Investment</p>
                <div className="text-6xl font-black text-white">$10</div>
              </div>
              
              <motion.a
                href="https://lemonsky.gumroad.com/l/perfect-pack"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 bg-primary text-black font-black rounded-2xl shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:shadow-[0_0_50px_rgba(var(--primary),0.6)] transition-all flex items-center justify-center gap-3"
                aria-label="Securely purchase PERFECT PACK All-In-One Creative Assets by imdvichrn for $10"
              >
                <ShoppingCart className="w-5 h-5" />
                BUY NOW
              </motion.a>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                ✓ Secure Checkout via LemonSqueezy
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
