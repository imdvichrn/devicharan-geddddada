import { useState } from 'react';
import { credentialsList, Credential } from '@/data/credentialsData';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { VerifiedCheckIcon } from '@/components/icons/PortfolioIcons';
import { 
  FileText, 
  ExternalLink, 
  X, 
  Award, 
  CheckCircle2, 
  Maximize2, 
  ShieldCheck,
  Percent,
  Calendar,
  KeyRound,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

export function CredentialsSection() {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [activeTab, setActiveTab] = useState<'certificate' | 'evidence'>('certificate');
  const [zoomScale, setZoomScale] = useState<number>(1);

  const handleOpenLightbox = (cred: Credential, tab: 'certificate' | 'evidence') => {
    setSelectedCredential(cred);
    setActiveTab(tab);
    setZoomScale(1);
  };

  const handleCloseLightbox = () => {
    setSelectedCredential(null);
    setZoomScale(1);
  };

  return (
    <section id="credentials" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1240px] 2xl:max-w-[1380px] mx-auto border-t border-border/40">
      <div className="space-y-12">
        
        {/* Section Header */}
        <ScrollReveal distance={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" />
                <span>VERIFIED CREDENTIALS</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                Credentials & Certifications.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Official industry certifications, technical qualifications, and verified assessment credentials.
              </p>
            </div>

            <div className="text-xs font-mono text-muted-foreground/70 hidden sm:block text-right">
              <div>Structured Credential Ledger</div>
              <div className="text-primary font-semibold">1 Verified Certificate</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Credentials Cards Ledger */}
        <div className="grid grid-cols-1 gap-8">
          {credentialsList.map((cred, idx) => (
            <ScrollReveal key={cred.id} staggerIndex={idx} distance={18}>
              <div 
                className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-xs p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_-6px_rgba(0,225,227,0.12)] group"
              >
                {/* Subtle Glow Accent */}
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
                  
                  {/* Left Column: Brand, Title, Metadata Specs & Assessment Coverage */}
                  <div className="space-y-6 flex-1 min-w-0">
                    
                    {/* Issuer & Status Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Official Blackmagic Design Logo */}
                        <div className="w-12 h-12 rounded-xl border border-border/60 bg-white dark:bg-zinc-900 p-1.5 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                          <img 
                            src={cred.issuerLogo} 
                            alt={`${cred.issuer} official logo`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 block">
                            Issuer
                          </span>
                          <span className="text-sm font-semibold text-foreground font-display tracking-tight">
                            {cred.issuer}
                          </span>
                        </div>
                      </div>

                      {/* Credential Status Pill */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 dark:text-emerald-300">
                        <VerifiedCheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{cred.credentialName}</span>
                      </div>
                    </div>

                    {/* Official Certificate Title */}
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground leading-snug tracking-tight">
                        {cred.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {cred.verificationNotes}
                      </p>
                    </div>

                    {/* Metadata Specs: Issue Date, Credential ID, 94% Score Detail */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-border/40 text-xs font-mono">
                      <div className="space-y-1">
                        <span className="text-muted-foreground/70 block flex items-center gap-1">
                          <Calendar size={12} className="text-primary" />
                          <span>Issue Date</span>
                        </span>
                        <span className="text-foreground font-medium">{cred.issueDate}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-muted-foreground/70 block flex items-center gap-1">
                          <KeyRound size={12} className="text-primary" />
                          <span>Credential ID</span>
                        </span>
                        <span className="text-foreground font-medium selection:bg-primary/20">{cred.credentialId}</span>
                      </div>

                      <div className="space-y-1 col-span-2 sm:col-span-1">
                        <span className="text-muted-foreground/70 block flex items-center gap-1">
                          <Percent size={12} className="text-emerald-400" />
                          <span>Assessment Score</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-400 text-sm">
                            <span>{cred.assessmentResult.score}</span>
                            <span className="text-[10px] text-emerald-500/80 font-normal">(Exam Pass)</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenLightbox(cred, 'evidence')}
                            className="text-[10px] text-muted-foreground hover:text-primary underline font-mono flex items-center gap-0.5"
                            title="Inspect 94% assessment score sheet"
                          >
                            <span>Evidence</span>
                            <Eye size={10} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Coverage Section (Subtle Typography Labels) */}
                    <div className="space-y-2.5 pt-2 border-t border-border/30">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold block">
                        Assessment Coverage
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cred.assessmentCoverage.map((item) => (
                          <span 
                            key={item}
                            className="px-2.5 py-1 rounded-md text-xs font-mono text-muted-foreground bg-muted/30 border border-border/40 hover:border-border/80 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: High-Res Official Signed Certificate Preview Frame & Actions */}
                  <div className="flex flex-col gap-4 shrink-0 lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border/40 pt-6 lg:pt-0 lg:pl-8">
                    
                    {/* Compact Landscape Certificate Preview Frame with object-fit: contain */}
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => handleOpenLightbox(cred, 'certificate')}
                        className="group/cert relative w-full rounded-xl border border-border/60 overflow-hidden bg-zinc-950/90 dark:bg-zinc-950 p-2 text-left hover:border-primary/60 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary depth-interactive shadow-md"
                        title="Click to expand signed certificate preview"
                      >
                        {/* Certificate Image Frame: Landscape 1.4:1 ratio, object-contain, no cropping */}
                        <div className="relative aspect-[1.38/1] w-full rounded-lg overflow-hidden bg-white/95 dark:bg-zinc-900/90 flex items-center justify-center p-1">
                          <img 
                            src={cred.certificatePreviewImage} 
                            alt={`${cred.title} — Official Signed Certificate`} 
                            className="w-full h-full object-contain transition-transform duration-300 group-hover/cert:scale-[1.02]"
                          />
                          {/* Hover Overlay Prompt */}
                          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px] opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono font-medium text-white">
                            <ZoomIn size={15} className="text-primary" />
                            <span>Expand Certificate View</span>
                          </div>
                        </div>

                        <div className="pt-2 px-1 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Award size={12} className="text-primary" />
                            <span>Signed Certificate Letter</span>
                          </span>
                          <span className="text-primary group-hover/cert:underline flex items-center gap-0.5">
                            <span>Inspect</span>
                            <Maximize2 size={10} />
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Primary Action: View Original Certificate PDF in New Tab */}
                    <a
                      href={cred.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 shadow-xs group/btn depth-interactive"
                    >
                      <FileText size={15} />
                      <span>View Original Certificate (PDF)</span>
                      <ExternalLink size={13} className="opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>

                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* ACCESSIBLE CERTIFICATE & EVIDENCE LIGHTBOX MODAL WITH ZOOM */}
      {selectedCredential && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseLightbox();
          }}
        >
          <div className="relative w-full max-w-5xl h-[92vh] bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
            
            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 border-b border-border/40 flex items-center justify-between gap-4 bg-muted/20 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg border border-border/60 bg-white dark:bg-zinc-900 p-1 flex items-center justify-center shrink-0">
                  <img 
                    src={selectedCredential.issuerLogo} 
                    alt={selectedCredential.issuer} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base sm:text-lg font-medium text-foreground truncate">
                    {selectedCredential.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground truncate">
                    {selectedCredential.issuer} · Credential ID: {selectedCredential.credentialId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Lightbox Tab Bar & Zoom Controls */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-border/40 flex flex-wrap items-center justify-between gap-4 bg-background/60 shrink-0">
              {/* Document Selection Tabs */}
              <div className="flex gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('certificate');
                    setZoomScale(1);
                  }}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === 'certificate' 
                      ? 'bg-primary/10 text-primary border border-primary/30' 
                      : 'border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <Award size={14} />
                  <span>Signed Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('evidence');
                    setZoomScale(1);
                  }}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === 'evidence' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>Assessment Score (94%)</span>
                </button>
              </div>

              {/* Zoom Controls & Direct Actions */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1 border border-border/40">
                  <button
                    type="button"
                    onClick={() => setZoomScale((prev) => Math.max(0.75, prev - 0.25))}
                    disabled={zoomScale <= 0.75}
                    className="p-1.5 rounded hover:bg-background disabled:opacity-40 text-muted-foreground hover:text-foreground transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="px-1.5 text-[11px] font-mono text-foreground min-w-[3rem] text-center">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomScale((prev) => Math.min(2.5, prev + 0.25))}
                    disabled={zoomScale >= 2.5}
                    className="p-1.5 rounded hover:bg-background disabled:opacity-40 text-muted-foreground hover:text-foreground transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  {zoomScale !== 1 && (
                    <button
                      type="button"
                      onClick={() => setZoomScale(1)}
                      className="p-1.5 rounded hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                      title="Reset Zoom"
                    >
                      <RotateCcw size={13} />
                    </button>
                  )}
                </div>

                <a
                  href={selectedCredential.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-border/80 hover:border-primary/60 text-primary transition-colors flex items-center gap-1 hidden sm:flex"
                >
                  <span>Open PDF</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Lightbox Canvas Area */}
            <div className="p-4 sm:p-8 overflow-auto flex-1 flex items-center justify-center bg-zinc-950/90 relative">
              <div 
                className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                style={{ transform: `scale(${zoomScale})` }}
              >
                {activeTab === 'certificate' ? (
                  <img 
                    src={selectedCredential.certificatePreviewImage} 
                    alt={`${selectedCredential.title} — Official Certificate`}
                    className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg border border-border/60 shadow-2xl bg-white"
                  />
                ) : (
                  <img 
                    src={selectedCredential.assessmentResult.evidenceImage} 
                    alt="Blackmagic Design Assessment Evidence Sheet (94%)"
                    className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg border border-border/60 shadow-2xl bg-zinc-900"
                  />
                )}
              </div>
            </div>

            {/* Lightbox Footer */}
            <div className="p-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-4 bg-card shrink-0 text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award size={14} className="text-primary" />
                <span>
                  {activeTab === 'certificate' 
                    ? 'Official Signed Certificate from Blackmagic Design Training' 
                    : selectedCredential.assessmentResult.evidenceLabel}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedCredential.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-border/80 hover:border-foreground text-foreground transition-colors flex items-center gap-1.5"
                >
                  <FileText size={13} />
                  <span>View PDF</span>
                </a>
                <button 
                  onClick={handleCloseLightbox} 
                  className="px-5 py-2 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors font-sans font-medium"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
