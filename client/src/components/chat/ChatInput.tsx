import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-muted bg-card p-4">
      <form className="flex gap-2 max-w-7xl mx-auto" onSubmit={handleSubmit}>
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Type your message here..." 
            className="w-full p-3 pr-10 rounded-md bg-muted border border-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !inputValue.trim()}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
