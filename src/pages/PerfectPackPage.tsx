import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { VideoEmbed } from '../components/VideoEmbed';
import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { Helmet } from 'react-helmet-async';

export default function PerfectPackPage() {
  return (
    <>
      <Helmet>
        <title>PERFECT PACK - All-In-One Creative Assets by imdvichrn</title>
        <meta name="description" content="PERFECT PACK by imdvichrn: High-Resolution Textures, Drag & Drop Integration, and Professional Grade Assets for all major editors. Only $10." />
        <meta name="keywords" content="Perfect Pack, Creative Assets, DaVinci Resolve, Premiere Pro, High-Res Textures, Video Editing" />
        <meta property="og:title" content="PERFECT PACK - All-In-One Creative Assets" />
        <meta property="og:description" content="The ultimate utility for professional editors. Get Perfect Pack by imdvichrn for $10." />
        <meta property="og:image" content="/Perfect pack forder/Showcase product for perfect pack Background Removed.png" />
        <link rel="canonical" href="https://geddadadevicharan.netlify.app/project/perfect-pack" />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* 1. TOP SECTION: THE VIDEO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <VideoEmbed 
              youtubeId="YOUR_VIDEO_ID" 
              title="PERFECT PACK Showcase - Professional Creative Assets Collection"
            />
          </motion.div>

          {/* 2. BOTTOM SECTION: DESCRIPTION & PURCHASE */}
          <div className="grid lg:grid-cols-3 gap-12 pt-8 border-t border-white/5">
            
            {/* Left Side: Text Details (2 Columns wide) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <h1 className="text-6xl font-black tracking-tighter">
                PERFECT PACK
              </h1>
              <p className="text-2xl text-primary font-bold tracking-widest uppercase">
                All-In-One Creative Assets
              </p>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  The <strong className="text-white">PERFECT PACK</strong> by imdvichrn is the ultimate utility for editors who demand speed without compromising quality.
                </p>
                <p>
                  Professional-grade textures and elements optimized for all major non-linear editors, featuring seamless Drag & Drop Integration that works out of the box.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {[
                    'Drag & Drop Integration',
                    'High-Resolution Textures',
                    'Professional Grade Elements',
                    'Universal Editor Support',
                    'Instant Deployment',
                    'Secure License Validation'
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/90">
                      <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm uppercase tracking-widest font-bold text-primary mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Compatible With</p>
                    <p className="font-semibold">DaVinci Resolve, Premiere Pro, All Major NLEs</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Archive Format</p>
                    <p className="font-semibold">Optimized for instant deployment</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">License</p>
                    <p className="font-semibold">Personal & Commercial Use</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Support</p>
                    <p className="font-semibold">Lifetime Updates Included</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Logo & Buy Button (1 Column wide) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center justify-start space-y-8 p-8 rounded-3xl bg-white/5 border border-white/10 h-fit sticky top-32"
            >
              {/* Product Logo */}
              <div className="w-32 h-32 rounded-2xl overflow-hidden border border-primary/30 flex items-center justify-center">
                <img 
                  src="/Perfect pack forder/Showcase product for perfect pack Background Removed.png" 
                  alt="PERFECT PACK by imdvichrn" 
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div className="w-full space-y-4 text-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">Price</p>
                  <div className="text-5xl font-black text-primary">$10</div>
                  <p className="text-xs text-muted-foreground">.00 USD</p>
                </div>

                <motion.a
                  href="https://lemonsky.gumroad.com/l/perfect-pack"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--primary), 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full py-4 bg-primary text-black font-black text-lg rounded-xl flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)]"
                  aria-label="Purchase the Perfect Pack by imdvichrn for $10 - Secure checkout via LemonSqueezy"
                >
                  <ShoppingCart className="w-6 h-6" />
                  BUY NOW
                </motion.a>

                <div className="space-y-2 pt-2">
                  <p className="text-xs text-muted-foreground/70">
                    ✓ Instant Download
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    ✓ Secure via LemonSqueezy
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    ✓ Global Tax Included
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="w-full pt-4 border-t border-white/10">
                <p className="text-xs text-center text-muted-foreground/60 mb-3">TRUSTED BY PROFESSIONALS</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="px-2 py-1 text-[10px] bg-white/5 rounded border border-white/10 text-muted-foreground">
                    🎬 Video Editors
                  </span>
                  <span className="px-2 py-1 text-[10px] bg-white/5 rounded border border-white/10 text-muted-foreground">
                    🎨 Designers
                  </span>
                  <span className="px-2 py-1 text-[10px] bg-white/5 rounded border border-white/10 text-muted-foreground">
                    🎭 Creators
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* FAQ Section */}
          <div className="pt-12 border-t border-white/5">
            <h2 className="text-3xl font-black mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  q: "What's included in PERFECT PACK?",
                  a: "High-resolution textures, professional-grade elements, and drag-and-drop assets optimized for all major editors."
                },
                {
                  q: "Which editors does it support?",
                  a: "Perfect Pack works with DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro, and all major non-linear editors."
                },
                {
                  q: "How do I use it?",
                  a: "Simply drag and drop the assets into your editor. No complex setup required - ready to use immediately."
                },
                {
                  q: "Is there a license agreement?",
                  a: "Yes. PERFECT PACK includes both personal and commercial use rights with lifetime updates."
                }
              ].map((item, i) => (
                <div key={i} className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Chatbot />
    </>
  );
}
