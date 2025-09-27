import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const shortcuts = [
  { keys: ['C'], description: 'Toggle Chat' },
  { keys: ['Ctrl', 'Shift', 'C'], description: 'Toggle Chat (Alt)' },
  { keys: ['Home'], description: 'Scroll to Top' },
  { keys: ['Ctrl', 'Home'], description: 'Scroll to Top (Alt)' },
  { keys: ['Ctrl', 'Shift', 'M'], description: 'Scroll to Contact' },
  { keys: ['F'], description: 'Toggle Fullscreen' },
  { keys: ['F11'], description: 'Toggle Fullscreen (Alt)' },
  { keys: ['D'], description: 'Download CV' },
  { keys: ['Ctrl', 'D'], description: 'Download CV (Alt)' },
  { keys: ['P'], description: 'Go to Projects' },
  { keys: ['Ctrl', 'P'], description: 'Go to Projects (Alt)' },
  { keys: ['Escape'], description: 'Exit Fullscreen' },
  { keys: ['?'], description: 'Show/Hide Shortcuts' },
];

export function KeyboardShortcutsHelp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        // Only show if not in input field
        if (document.activeElement?.tagName !== 'INPUT' && 
            document.activeElement?.tagName !== 'TEXTAREA') {
          event.preventDefault();
          setIsVisible(!isVisible);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-6 left-6 z-40 glass-panel border-glass-border"
        onClick={() => setIsVisible(true)}
        title="Show keyboard shortcuts"
      >
        <Keyboard size={16} />
        <span className="ml-2 hidden sm:inline">?</span>
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-elevated border-glass-border max-w-md w-full max-h-[80vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Keyboard size={20} />
            Keyboard Shortcuts
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
          >
            <X size={16} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <Badge
                      key={keyIndex}
                      variant="outline"
                      className="text-xs font-mono px-2 py-1"
                    >
                      {key}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-glass-border">
            <p className="text-xs text-muted-foreground">
              Single key shortcuts work when not typing in input fields.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}