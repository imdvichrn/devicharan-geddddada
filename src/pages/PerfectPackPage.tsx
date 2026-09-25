import { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Package, 
  Layers, 
  Palette, 
  Music, 
  Type,
  Film,
  Sliders,
  CheckCircle2,
  Bell,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WindowChrome } from '@/components/WindowChrome';
import { SEOHead } from '@/components/SEOHead';
import { generatePerfectPackProductSchema } from '@/lib/structuredData';
import { HiddenIdentityBlock, FooterMicroBio } from '@/components/SEOContent';
import { PageShell } from '@/components/PageShell';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SVGLoadingSpinner, SVGSubscriptionSuccess, SVGErrorCross } from '@/components/motion/MicroFeedback';

const features = [
  { 
    id: 'textures',
    icon: Palette, 
    label: 'Cinematic Textures & 16mm Grain', 
    desc: '4K scan overlays, realistic halogen halation, and organic 35mm / 16mm film grain loops.',
    badge: '4K Overlays'
  },
  { 
    id: 'sfx',
    icon: Music, 
    label: 'Sound Effects & Ambient Beds', 
    desc: 'Bespoke cinematic risers, sub-bass impacts, UI ticks, and spatial atmospheric textures mastered to -14 LUFS.',
    badge: 'Mastered Audio'
  },
  { 
    id: 'drfx',
    icon: Layers, 
    label: 'DRFX Presets & Fusion Macros', 
    desc: 'Native DaVinci Resolve Studio .drfx templates with exposed keyframe-stretch and custom inspector controls.',
    badge: 'Native DRFX'
  },
  { 
    id: 'titles',
    icon: Type, 
    label: 'Motion Titles & Typography', 
    desc: 'Editorial lower-thirds, kinetic headline animations, and minimal typography treatments for video finishing.',
    badge: 'Kinetic Type'
  },
];

const sampleCategories = [
  {
    title: 'Resource Previews (In Development)',
    items: [
      { name: 'Film Scans & Halation', detail: 'Organic 4K ProRes 422 alpha matte overlays', tag: 'Visual' },
      { name: 'Fairlight Audio Elements', detail: '24-bit 48kHz spatial whooshes & textural hits', tag: 'Audio' },
      { name: 'Fusion Kinetic Generators', detail: 'Auto-responsive title bars & crop mattes', tag: 'Motion' },
      { name: 'Color Management LUTS', detail: 'Arri LogC3 & BMD Film Gen 5 transform matrices', tag: 'Color' }
    ]
  }
];

export default function PerfectPackPage() {
  const { toast } = useToast();
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activePreview, setActivePreview] = useState<string>('textures');

  const handleRegister = async () => {
    if (registered || submitState === 'submitting') return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setSubmitState('error');
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      setTimeout(() => setSubmitState('idle'), 3000);
      return;
    }

    setSubmitState('submitting');
    try {
      const resp = await fetch('/api/register-launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await resp.json().catch(() => ({}));

      setRegistered(true);
      setSubmitState('success');

      if (data.status === 'duplicate') {
        toast({ title: "Already registered!", description: "This email is already on the early notification list." });
      } else {
        toast({ title: "You're on the list!", description: "We'll notify you the moment Perfect Pack is released." });
      }
    } catch {
      setRegistered(true);
      setSubmitState('success');
      toast({ title: "You're on the list!", description: "We'll notify you the moment Perfect Pack is released." });
    }
  };

  return (
    <>
      <SEOHead
        title="Perfect Pack for DaVinci Resolve — Geddada Devicharan"
        description="In-development professional DaVinci Resolve toolkit featuring cinematic presets, sound effects, motion titles, and workflow assets by Geddada Devicharan."
        path="/perfect-pack"
        ogImage="https://geddadadevicharan.vercel.app/og/og-perfectpack.png"
        ogType="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Perfect Pack', url: 'https://geddadadevicharan.vercel.app/perfect-pack' }
        ]}
        structuredData={generatePerfectPackProductSchema()}
      />

      <HiddenIdentityBlock page="perfect-pack" />

      <PageShell maxWidth="default">
        <div className="w-full space-y-12">
          {/* Back navigation */}
          <ScrollReveal distance={12}>
            <Link to="/work">
              <Button variant="ghost" size="sm" className="depth-interactive text-muted-foreground hover:text-foreground group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Work
              </Button>
            </Link>
          </ScrollReveal>

          {/* Hero Card */}
          <ScrollReveal distance={18}>
            <Card className="depth-widget overflow-hidden">
              <div className="px-6 md:px-10 pt-8 md:pt-10">
                <WindowChrome 
                  title="Perfect Pack — Creative Toolkit for DaVinci Resolve"
                  rightElement={
                    <span className="text-xs font-mono text-primary font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span>In Development</span>
                    </span>
                  }
                  className="mb-6" 
                />

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-xs font-mono bg-background/50 border-border/80">
                    <Package className="mr-1.5 h-3 w-3 text-primary" />
                    DaVinci Resolve Studio
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono">
                    <Sparkles className="mr-1.5 h-3 w-3" />
                    Early Access Target • $10 USD
                  </Badge>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground mb-4">
                  Perfect Pack
                </h1>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  A paid $10 USD creative asset kit currently in active development. Tailored specifically for commercial editors and motion creators in DaVinci Resolve Studio on macOS/Windows, packaging high-density motion titles, organic film textures, drag-and-drop .drfx macros, and broadcast-calibrated sound design.
                </p>
              </div>

              {/* Video showcase / Product Preview */}
              <div className="px-6 md:px-10 pb-8 md:pb-10">
                <div className="rounded-2xl border border-border/80 overflow-hidden bg-background/50 shadow-sm">
                  <div className="bg-muted/40 px-4 py-2.5 border-b border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Film size={14} className="text-primary" />
                      <span className="text-xs font-mono text-muted-foreground">
                        Perfect Pack Demo Reel — Preview
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase">
                      In-Progress Asset Teaser
                    </span>
                  </div>
                  <div className="aspect-video bg-black/60 relative">
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
          </ScrollReveal>

          {/* Interactive Resource Modules Preview */}
          <ScrollReveal distance={18}>
            <Card className="depth-widget">
              <CardContent className="p-6 md:p-10 space-y-6">
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider flex items-center gap-2">
                    <Layers size={14} />
                    <span>Modular Asset Architecture</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
                    What's Inside the Toolkit
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Four dedicated resource categories engineered for rapid timeline workflows.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <div
                      key={f.id}
                      onClick={() => setActivePreview(f.id)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer depth-interactive ${
                        activePreview === f.id
                          ? 'border-primary bg-primary/5 shadow-xs'
                          : 'border-border/70 bg-card hover:border-foreground/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-muted/80 border border-border flex items-center justify-center shrink-0 text-primary">
                          <f.icon size={18} strokeWidth={1.8} />
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40">
                          {f.badge}
                        </span>
                      </div>
                      <h3 className="font-medium text-sm text-foreground mb-1">{f.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Early Access Notification Card */}
          <ScrollReveal distance={20}>
            <Card className="depth-widget">
              <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
                {/* Logo & Status */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-border bg-card flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src="/assets/product-logo.png"
                    alt="Perfect Pack by Geddada Devicharan"
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                    Release Access & Launch Notification
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
                    Get notified when Perfect Pack drops.
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Perfect Pack is currently under active refinement. Enter your email to receive early access notice and launch pricing ($10 USD).
                  </p>
                </div>

                {/* Email Registration Input */}
                <div className="w-full max-w-md space-y-3">
                  {!registered ? (
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          disabled={submitState === 'submitting'}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm"
                          onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                        />
                        <Button
                          onClick={handleRegister}
                          disabled={submitState === 'submitting'}
                          className="h-11 sm:h-auto px-6 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-medium shrink-0 depth-interactive"
                        >
                          {submitState === 'submitting' ? (
                            <span className="inline-flex items-center gap-2">
                              <SVGLoadingSpinner size={14} />
                              <span>Registering...</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2">
                              <Bell size={14} />
                              <span>Notify Me</span>
                            </span>
                          )}
                        </Button>
                      </div>
                      {submitState === 'error' && (
                        <p className="text-xs text-destructive flex items-center justify-center gap-1.5">
                          <SVGErrorCross size={13} />
                          <span>Please provide a valid email address.</span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center gap-2.5 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium animate-in fade-in-0 duration-300">
                      <SVGSubscriptionSuccess size={18} className="text-emerald-500" />
                      <span>You're on the early access notification list.</span>
                    </div>
                  )}

                  <p className="text-[11px] font-mono text-muted-foreground/80">
                    No spam. One-time notification upon public launch.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Technical Specifications / Engineering Note */}
          <ScrollReveal distance={16}>
            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <h3 className="font-display text-xl font-normal text-foreground">
                Development & Compatibility Note
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Engineered for DaVinci Resolve Studio 18.5+ and 19+ on Apple Silicon (M1/M2/M3/M4) and Windows RTX workstations. All presets are delivered as drag-and-drop .drfx plugin installers and standalone .settings Fusion templates with zero third-party plugin dependencies required.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <FooterMicroBio />
      </PageShell>
    </>
  );
}
