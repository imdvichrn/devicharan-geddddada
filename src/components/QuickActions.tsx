import React from 'react';
import { Button } from '@/components/ui/button';

// Define the props interface for QuickActions
interface QuickActionsProps {
  onActionClick: (question: string) => void;
  disabled?: boolean;
}

// Removed unused imports
// import Chatbot from "./Chatbot";
// import Chat from "./Chat";
// import { chatService } from "../services/chatService";

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, disabled = false }) => {
  const quickQuestions = [
    "Tell me about your latest projects",
    "What technologies do you work with?", 
    "Show me your skills and experience",
    "How can I contact you for work?",
    "What makes you unique as a developer?"
  ];

  return (
    <div className="p-3 border-t border-glass-border bg-background/30">
      <div className="text-xs font-medium text-muted-foreground mb-2">💡 Quick Actions:</div>
      <div className="flex flex-wrap gap-1">
        {quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-7 px-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            onClick={() => onActionClick(question)}
            disabled={disabled}
          >
            {question}
          </Button>
        ))}
      </div>
      
      <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
        <span>💬 Type "help" for conversation tips</span>
        <span>✨ Real-time portfolio data</span>
      </div>
    </div>
  );
};