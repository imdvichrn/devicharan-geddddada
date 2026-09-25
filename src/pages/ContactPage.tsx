import { SEOHead } from '@/components/SEOHead';
import { 
  Mail, 
  ArrowUpRight, 
  MapPin, 
  Clock 
} from 'lucide-react';
import {
  OfficialGithubIcon,
  OfficialInstagramIcon,
  OfficialLinkedinIcon,
  OfficialWhatsappIcon
} from '@/components/icons/PortfolioIcons';
import { WindowChrome } from '@/components/WindowChrome';
import { ContactForm } from '@/components/ContactForm';
import { PageShell } from '@/components/PageShell';

export function ContactPage() {
  return (
    <PageShell maxWidth="wide">
      <SEOHead
        title="Contact & Communication | Geddada Devicharan"
        description="Get in touch with Geddada Devicharan (@imdvichrn). Direct communication for software products, business workflows, video post-production, or web ecosystems."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Contact', url: 'https://geddadadevicharan.vercel.app/contact' }
        ]}
      />

      <main className="space-y-8 sm:space-y-10 md:space-y-12">
        
        {/* Header Window */}
        <div className="depth-widget p-6 sm:p-8 md:p-10 lg:p-12 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <WindowChrome />
            <span className="text-[11px] sm:text-xs font-mono text-primary uppercase tracking-wider font-medium">
              Available for New Systems
            </span>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Communication · Direct Channels
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal tracking-tight text-foreground">
              Have something worth building?
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Whether you are looking to build a digital product, automate manual business workflows, manage web infrastructure, or commission video post-production, feel free to reach out directly.
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Direct Channels on Left, Clean Contact Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Left Column: Direct channels (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-7">
            
            {/* Primary Direct Methods */}
            <div className="depth-widget p-6 sm:p-7 md:p-8 space-y-5">
              <div className="space-y-1">
                <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-primary font-semibold">
                  Direct Channels
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Fastest response via WhatsApp or direct email.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <a 
                  href="https://wa.me/916303468707" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3.5 sm:p-4 rounded-xl depth-surface depth-interactive hover:border-primary/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <OfficialWhatsappIcon size={18} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-foreground">WhatsApp Direct</div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-mono">+91 6303468707</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                </a>

                <a 
                  href="mailto:devicharangeddada@gmail.com" 
                  className="p-3.5 sm:p-4 rounded-xl depth-surface depth-interactive hover:border-primary/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-foreground">Email</div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-mono">devicharangeddada@gmail.com</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            {/* Online Profiles & Code */}
            <div className="depth-widget p-6 sm:p-7 md:p-8 space-y-4">
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Online Profiles & Code
              </h2>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
                <a 
                  href="https://github.com/imdvichrn/imdvichrn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <OfficialGithubIcon size={15} />
                    GitHub
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a 
                  href="https://www.linkedin.com/in/geddadadevicharan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <OfficialLinkedinIcon size={15} />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a 
                  href="https://www.instagram.com/imdvichrn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <OfficialInstagramIcon size={15} />
                    Instagram
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a 
                  href="https://www.facebook.com/imdvichrn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    Facebook
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Location & Response Time */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border/50 bg-muted/30 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-primary shrink-0" />
                <span>Based in Visakhapatnam & Vizianagaram, AP, India (IST / UTC+5:30)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={15} className="text-primary shrink-0" />
                <span>Response time: usually within 24 hours on business days</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ContactForm 
              title="Send a Direct Message" 
              subtitle="Fill out the form below for new product collaborations, video finishing, or consulting."
            />
          </div>

        </div>

      </main>
    </PageShell>
  );
}
export default ContactPage;
