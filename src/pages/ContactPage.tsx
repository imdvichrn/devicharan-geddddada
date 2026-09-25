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
    <PageShell maxWidth="default">
      <SEOHead
        title="Contact & Communication | Geddada Devicharan"
        description="Get in touch with Geddada Devicharan (@imdvichrn). Direct communication for software products, business workflows, video post-production, or web ecosystems."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Contact', url: 'https://geddadadevicharan.vercel.app/contact' }
        ]}
      />

      <main className="space-y-10">
        
        {/* Header Window */}
        <div className="depth-widget p-6 sm:p-8 space-y-4">
          <WindowChrome className="mb-2" />
          <div className="space-y-2">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Communication · Direct Channels
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Have something worth building?
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Whether you are looking to build a digital product, automate manual business workflows, manage web infrastructure, or commission video post-production, feel free to reach out directly.
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Direct Channels on Left, Clean Contact Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Direct Methods */}
            <div className="depth-widget p-5 sm:p-6 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                Direct Channels
              </h2>

              <div className="space-y-3">
                <a 
                  href="https://wa.me/916303468707" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl depth-surface depth-interactive hover:border-primary/50 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <OfficialWhatsappIcon size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">WhatsApp Direct</div>
                      <div className="text-xs text-muted-foreground font-mono">+91 6303468707</div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                </a>

                <a 
                  href="mailto:devicharangeddada@gmail.com" 
                  className="p-3 rounded-xl depth-surface depth-interactive hover:border-primary/50 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Email</div>
                      <div className="text-xs text-muted-foreground font-mono">devicharangeddada@gmail.com</div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            {/* Online Profiles & Code */}
            <div className="depth-widget p-5 sm:p-6 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Online Profiles & Code
              </h2>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a 
                  href="https://github.com/imdvichrn/imdvichrn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <OfficialGithubIcon size={14} />
                    GitHub
                  </span>
                  <ArrowUpRight size={13} />
                </a>

                <a 
                  href="https://www.linkedin.com/in/geddadadevicharan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <OfficialLinkedinIcon size={14} />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={13} />
                </a>

                <a 
                  href="https://www.instagram.com/imdvichrn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <OfficialInstagramIcon size={14} />
                    Instagram
                  </span>
                  <ArrowUpRight size={13} />
                </a>

                <a 
                  href="https://www.facebook.com/imdvichrn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl depth-surface depth-interactive hover:border-primary/40 flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    Facebook
                  </span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Location & Response Time */}
            <div className="p-4 rounded-xl border border-border/50 bg-muted/30 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-primary" />
                <span>Based in Visakhapatnam & Vizianagaram, AP, India (IST / UTC+5:30)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-primary" />
                <span>Response time: usually within 24 hours on business days</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </main>
    </PageShell>
  );
}
export default ContactPage;
