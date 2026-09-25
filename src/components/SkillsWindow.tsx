import React from 'react';
import { WindowChrome } from '@/components/WindowChrome';
import { Palette, Code2, Cpu, Compass } from 'lucide-react';

export function SkillsWindow({ className = "" }: { className?: string }) {
  const skillGroups = [
    {
      title: "Creative & Post-Production",
      icon: Palette,
      primary: ["DaVinci Resolve Studio", "Video Editing & Post-Production", "Colorist & Color Grading"],
      secondary: ["Fusion VFX", "Motion Graphics", "Sound Design & Audio Engineering (-14 LUFS)"]
    },
    {
      title: "Software & Web Engineering",
      icon: Code2,
      primary: ["React", "TypeScript", "Node.js", "Professional Web Development"],
      secondary: [
        "Website Management",
        "Technical SEO & Structured Data (JSON-LD)",
        "Open Graph",
        "Sitemaps & Site Architecture",
        "Search Discoverability"
      ]
    },
    {
      title: "Engineering Fundamentals",
      icon: Cpu,
      primary: ["Electrical & Electronics Engineering (EEE)", "VLSI Circuit Design"],
      secondary: ["MATLAB & Simulink", "Power Systems & Grid Quality", "Photovoltaic Solar Systems"]
    },
    {
      title: "Working Approach",
      icon: Compass,
      primary: ["Strategic Thinking", "Systems Thinking", "Automation Thinking"],
      secondary: ["Time Management", "Adaptability", "Continuous Learning", "Problem Solving"]
    }
  ];

  return (
    <div className={`border border-border/60 rounded-2xl bg-card/40 backdrop-blur-xs overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.25)] ${className}`}>
      <WindowChrome 
        title="Skills & Expertise — Technical & Creative Inventory"
        rightElement={
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-mono text-muted-foreground">Production Verified</span>
          </div>
        }
      />

      <div className="p-6 sm:p-8 space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
            Capabilities Matrix
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
            Skills & Production Expertise
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Accurate, real-world proficiencies applied daily across software engineering, cinema post-production, web ecosystems, and technical design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div 
                key={group.title}
                className="p-5 sm:p-6 rounded-xl border border-border/40 bg-background/50 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Icon size={15} />
                    </div>
                    <span>{group.title}</span>
                  </div>

                  {/* Primary Skills (Higher visual weight) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      Primary Disciplines
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-foreground font-medium">
                      {group.primary.map((skill, sIdx) => (
                        <React.Fragment key={skill}>
                          <span className="text-foreground">{skill}</span>
                          {sIdx < group.primary.length - 1 && (
                            <span className="text-muted-foreground/40 font-mono" aria-hidden="true">/</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Skills (Quiet, natural typography) */}
                  <div className="space-y-1.5 pt-2 border-t border-border/30">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      Supporting Capabilities
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      {group.secondary.map((skill, sIdx) => (
                        <React.Fragment key={skill}>
                          <span>{skill}</span>
                          {sIdx < group.secondary.length - 1 && (
                            <span className="text-border" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SkillsWindow;
