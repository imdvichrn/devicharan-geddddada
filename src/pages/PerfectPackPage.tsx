import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VideoEmbed } from '../components/VideoEmbed';

export default function PerfectPackPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* BACK BUTTON */}
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* 1. TOP SECTION: THE PRODUCT VIDEO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900"
        >
          <VideoEmbed 
            youtubeId="YOUR_VIDEO_ID" 
            title="PERFECT PACK Showcase - Professional Creative Assets Collection"
          />
        </motion.div>

        {/* 2. LAYOUT: INFO & BUY SECTION */}
        <div className="grid lg:grid-cols-3 gap-12 pt-8">
          
          {/* Left Side: Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h1 className="text-6xl font-black tracking-tighter uppercase">Perfect Pack</h1>
            <p className="text-xl text-primary font-bold">ALL-IN-ONE CREATIVE ASSETS BY IMDVICHRN</p>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>The <strong className="text-white">PERFECT PACK</strong> is a professional-grade collection of assets featuring High-Resolution Textures and Drag & Drop Integration. Optimized specifically for DaVinci Resolve and all major editors.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                {['Drag & Drop Integration', 'High-Res Textures', 'All Major Editors', 'One-Time Payment'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Logo & Buy Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-zinc-900 border border-white/10 h-fit sticky top-24"
          >
            {/* PRODUCT LOGO */}
            <img 
              src="/Perfect pack forder/Showcase product for perfect pack Background Removed.png" 
              alt="Perfect Pack by imdvichrn" 
              className="w-40 h-40 object-contain mb-8"
            />
            
            <div className="w-full text-center space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Price</p>
                <div className="text-5xl font-black text-primary">$10</div>
              </div>
              
              <motion.a
                href="https://lemonsky.gumroad.com/l/perfect-pack"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--primary), 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="block w-full py-4 bg-primary text-black font-black rounded-xl flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)]"
                aria-label="Purchase the Perfect Pack by imdvichrn for $10"
              >
                <ShoppingCart className="w-5 h-5" />
                BUY NOW
              </motion.a>
              
              <p className="text-xs text-muted-foreground">
                ✓ Secure Checkout via LemonSqueezy
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
