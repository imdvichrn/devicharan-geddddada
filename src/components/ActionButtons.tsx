import { Mail, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButton {
  label: string;
  icon: 'mail' | 'link' | 'heart';
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
            className="rounded-full border-primary/20 hover:bg-primary/10 hover:scale-105 transition-all duration-200 animate-slide-in-right"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Icon className="mr-2 h-3 w-3" />
            {button.label}
          </Button>
        );
      })}
    </div>
  );
};
