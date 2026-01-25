import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Film, 
  Palette, 
  TrendingUp, 
  Users, 
  Scissors, 
  Sparkles, 
  Volume2, 
  ArrowRight, 
  Play,
  Pause,
  ChevronRight,
  Layers,
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  Rocket,
  MessageSquare,
  Clock,
  ExternalLink
} from 'lucide-react';

// Video Editing Timeline Visual Component
const VideoTimeline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="relative w-full h-20 rounded-lg bg-background/50 border border-glass-border overflow-hidden">
      {/* Playhead */}
      <div 
        className={`absolute top-0 w-0.5 h-full bg-primary z-10 ${isPlaying ? 'animate-playhead' : ''}`}
        style={{ left: isPlaying ? '80%' : '20%', transition: isPlaying ? 'left 3s linear' : 'none' }}
      />
      
      {/* Timeline tracks */}
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-3 py-2">
        {/* Video track */}
        <div className="flex items-center gap-1 h-5">
          <Film size={12} className="text-primary shrink-0" />
          <div className="flex-1 flex gap-0.5">
            <div className="h-4 bg-primary/40 rounded-sm flex-[3]" />
            <div className="h-4 bg-primary/60 rounded-sm flex-[2]" />
            <div className="h-4 bg-primary/40 rounded-sm flex-[4]" />
            <div className="h-4 bg-primary/50 rounded-sm flex-[2]" />
          </div>
        </div>
        
        {/* Audio track */}
        <div className="flex items-center gap-1 h-5">
          <Volume2 size={12} className="text-accent shrink-0" />
          <div className="flex-1 h-3 bg-accent/30 rounded-sm relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-around">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-0.5 bg-accent/70 rounded-full"
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Effects track */}
        <div className="flex items-center gap-1 h-5">
          <Sparkles size={12} className="text-warning shrink-0" />
          <div className="flex-1 flex gap-1">
            <div className="h-3 bg-warning/30 rounded-sm flex-[2]" />
            <div className="h-3 bg-warning/50 rounded-sm flex-[1]" />
            <div className="h-3 bg-warning/30 rounded-sm flex-[3]" />
          </div>
        </div>
      </div>
      
      {/* Play button overlay */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-all opacity-0 hover:opacity-100"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
};

// Strategy Flow Diagram
const StrategyFlow = () => {
  const steps = [
    { icon: Target, label: 'Analysis', color: 'text-primary' },
    { icon: Lightbulb, label: 'Strategy', color: 'text-accent' },
    { icon: Rocket, label: 'Execute', color: 'text-success' },
  ];
  
  return (
    <div className="flex items-center justify-between w-full py-4">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 rounded-xl bg-background/50 border border-glass-border flex items-center justify-center ${step.color}`}>
              <step.icon size={20} />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight size={18} className="mx-2 text-muted-foreground/50" />
          )}
        </div>
      ))}
    </div>
  );
};

// Mini Bar Chart Component
const MiniBarChart = () => {
  const bars = [40, 65, 85, 70, 90, 75, 95];
  
  return (
    <div className="flex items-end justify-center gap-1 h-16 w-full">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-4 rounded-t-sm bg-gradient-to-t from-primary/40 to-primary transition-all hover:from-primary/60 hover:to-primary"
          style={{ 
            height: `${height}%`,
            animationDelay: `${index * 100}ms`
          }}
        />
      ))}
    </div>
  );
};

// Collaboration Network
const CollaborationNetwork = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Center node */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10 relative">
          <Users size={16} className="text-primary" />
        </div>
        
        {/* Orbiting nodes */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-6 h-6 rounded-full bg-background border border-glass-border flex items-center justify-center"
            style={{
              transform: `rotate(${i * 90}deg) translateX(32px) rotate(-${i * 90}deg)`,
            }}
          >
            <MessageSquare size={10} className="text-muted-foreground" />
          </div>
        ))}
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-20 h-20 -translate-x-5 -translate-y-5" viewBox="0 0 80 80">
          <circle 
            cx="40" 
            cy="40" 
            r="28" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1" 
            strokeDasharray="4 4"
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
};

interface WorkflowCardProps {
  title: string;
  description: string;
  visual: React.ReactNode;
  specs?: string[];
  tools?: string[];
  isComingSoon?: boolean;
  modalContent?: React.ReactNode;
  projectLink?: string;
  className?: string;
  size?: 'normal' | 'large' | 'tall';
  style?: React.CSSProperties;
}

const WorkflowCard = ({ 
  title, 
  description, 
  visual, 
  specs, 
  tools,
  isComingSoon,
  modalContent,
  projectLink,
  className = '',
  size = 'normal',
  style
}: WorkflowCardProps) => {
  const sizeClasses = {
    normal: '',
    large: 'md:col-span-2',
    tall: 'md:row-span-2'
  };

  return (
    <Card className={`glass-panel border-glass-border hover-scale transition-all duration-300 group overflow-hidden ${sizeClasses[size]} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {isComingSoon && (
            <Badge variant="outline" className="text-xs bg-muted/50 shrink-0">
              <Clock size={10} className="mr-1" />
              Coming Soon
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Visual representation */}
        <div className="rounded-lg overflow-hidden">
          {visual}
        </div>
        
        {/* Tools badges */}
        {tools && tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool) => (
              <Badge 
                key={tool} 
                variant="secondary" 
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                {tool}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Technical specs */}
        {specs && specs.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {specs.map((spec) => (
              <div 
                key={spec}
                className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 rounded-md px-2 py-1.5 border border-glass-border/50"
              >
                <Zap size={10} className="text-primary shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Action buttons */}
        {!isComingSoon && (
          <div className="flex gap-2 mt-2">
            {modalContent && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all"
                  >
                    <Layers size={14} className="mr-2" />
                    View Process
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-elevated border-glass-border max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl">{title} - Detailed Workflow</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    {modalContent}
                  </div>
                </DialogContent>
              </Dialog>
            )}
            {projectLink && (
              <Link to={projectLink} className="flex-1">
                <Button 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <ExternalLink size={14} className="mr-2" />
                  View Project
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Modal content components
const VideoEditingDetails = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <h4 className="font-semibold flex items-center gap-2">
        <Film size={16} className="text-primary" />
        Production Pipeline
      </h4>
      <div className="grid gap-2">
        {[
          { step: 'Import & Organize', desc: 'RAW footage ingestion, proxy workflow, metadata tagging' },
          { step: 'Rough Cut', desc: 'Assembly edit, story structure, pacing decisions' },
          { step: 'Color Grading', desc: 'Node-based color science, LUT application, look development' },
          { step: 'VFX & Motion', desc: 'Fusion compositing, motion graphics, visual effects' },
          { step: 'Sound Design', desc: 'Audio mixing, Foley, music sync, dialogue enhancement' },
          { step: 'Delivery', desc: '4K master, codec selection, platform optimization' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-glass-border/50">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium shrink-0">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-sm">{item.step}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GrowthStrategyDetails = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <h4 className="font-semibold flex items-center gap-2">
        <TrendingUp size={16} className="text-primary" />
        Strategic Framework
      </h4>
      <div className="grid gap-2">
        {[
          { phase: 'Discovery & Analysis', tasks: ['Market research', 'Competitor analysis', 'Audience mapping'] },
          { phase: 'Strategy Development', tasks: ['Goal setting', 'Channel selection', 'Content planning'] },
          { phase: 'Execution & Optimization', tasks: ['Campaign launch', 'A/B testing', 'Performance tracking'] },
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/30 border border-glass-border/50">
            <p className="font-medium text-sm mb-2">{item.phase}</p>
            <div className="flex flex-wrap gap-1">
              {item.tasks.map((task) => (
                <Badge key={task} variant="outline" className="text-xs">
                  {task}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VisualDesignDetails = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <h4 className="font-semibold flex items-center gap-2">
        <Palette size={16} className="text-primary" />
        Design Process
      </h4>
      <div className="grid gap-2">
        {[
          { step: 'Brief & Research', desc: 'Understanding requirements, mood boards, reference gathering' },
          { step: 'Concept Development', desc: 'Sketching, ideation, style exploration' },
          { step: 'Design Execution', desc: 'High-fidelity design, typography, color application' },
          { step: 'Refinement', desc: 'Feedback integration, iteration, polish' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-glass-border/50">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-medium shrink-0">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-sm">{item.step}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export function WorkflowsGrid() {
  const workflows = [
    {
      title: 'Video Editing & Post-Production',
      description: 'Professional video editing with industry-standard color grading, VFX compositing, and cinematic sound design.',
      visual: <VideoTimeline />,
      tools: ['DaVinci Resolve Studio', 'Fusion VFX', 'Fairlight Audio'],
      specs: ['4K Workflow', 'RAW Processing', 'Node-based Grading', 'HDR Mastering'],
      modalContent: <VideoEditingDetails />,
      projectLink: '/projects/video-editing-post-production',
      size: 'large' as const,
    },
    {
      title: 'Growth Strategy',
      description: 'Data-driven digital marketing strategies from analysis through execution and optimization.',
      visual: (
        <div className="space-y-3">
          <StrategyFlow />
          <MiniBarChart />
        </div>
      ),
      tools: ['Analytics', 'Content Strategy', 'SEO'],
      specs: ['Market Analysis', 'KPI Tracking'],
      modalContent: <GrowthStrategyDetails />,
      projectLink: '/projects/growth-strategy',
      size: 'normal' as const,
    },
    {
      title: 'Visual Design',
      description: 'Creative graphic design including posters, infographics, brand materials, and digital assets.',
      visual: (
        <div className="h-20 rounded-lg bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 border border-glass-border flex items-center justify-center gap-3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 left-4 w-8 h-8 rounded-lg bg-primary/40" />
            <div className="absolute bottom-3 right-6 w-12 h-6 rounded bg-accent/40" />
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-warning/40" />
          </div>
          <Palette size={24} className="text-primary relative z-10" />
          <Layers size={20} className="text-accent relative z-10" />
          <Sparkles size={18} className="text-warning relative z-10" />
        </div>
      ),
      tools: ['Photoshop', 'Canva', 'Figma'],
      specs: ['Brand Identity', 'Print & Digital'],
      modalContent: <VisualDesignDetails />,
      projectLink: '/projects/visual-design',
      size: 'normal' as const,
    },
    {
      title: 'Teamwork & Collaboration',
      description: 'Experienced in cross-functional team environments with strong communication and adaptability skills.',
      visual: <CollaborationNetwork />,
      tools: ['Agile Workflow', 'Remote Teams', 'Clear Communication'],
      isComingSoon: true,
      size: 'normal' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {workflows.map((workflow, index) => (
        <WorkflowCard
          key={workflow.title}
          {...workflow}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
