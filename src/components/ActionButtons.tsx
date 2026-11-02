import { Mail, ExternalLink, Heart, Download, Play, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButton {
  label: string;
  icon: 'mail' | 'link' | 'heart' | 'download' | 'play' | 'phone';
  action: () => void;
  variant?: 'default' | 'outline' | 'secondary';
}

interface ActionButtonsProps {
  buttons: ActionButton[];
}

const iconMap = {
  mail: Mail,
  link: ExternalLink,
  heart: Heart,
  download: Download,
  play: Play,
  phone: Phone,
};

export const ActionButtons = ({ buttons }: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 animate-fade-in">
      {buttons.map((button, index) => {
        const Icon = iconMap[button.icon];
        return (
          <Button
            key={index}
            variant={button.variant || 'outline'}
            size="sm"
            onClick={button.action}
            className="rounded-xl depth-surface depth-interactive border-border/70 hover:border-primary/40 hover:bg-primary/10 text-xs font-medium"
          >
            <Icon className="mr-1.5 h-3.5 w-3.5 text-primary" />
            {button.label}
          </Button>
        );
      })}
    </div>
  );
};
