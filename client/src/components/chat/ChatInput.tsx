import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Character } from "@shared/schema";
import { characterImages } from "./CharacterImages";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  character?: Character | null;
}

export default function ChatInput({ onSendMessage, isLoading, character }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  // Get character theme color (if any)
  const characterInfo = character && characterImages[character] 
    ? characterImages[character] 
    : null;
  const themeColor = characterInfo?.themeColor || "#6366f1";

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
    <div className="border-t border-muted bg-background/95 backdrop-blur-sm p-4 sticky bottom-0 z-10">
      <form className="flex gap-3 max-w-5xl mx-auto" onSubmit={handleSubmit}>
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder={character ? `Chat with ${characterInfo?.name}...` : "Type your message here..."} 
            className={`w-full p-4 pr-10 rounded-xl bg-card shadow-sm border border-muted-foreground/10 focus:outline-none focus:ring-2 transition-all ${character ? "focus:ring-primary/60" : ""}`}
            style={{
              boxShadow: character ? `0 4px 12px ${themeColor}15` : undefined
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !inputValue.trim()}
          className="rounded-xl px-6 font-medium shadow-md transition-all"
          style={{
            background: character ? themeColor : undefined,
            color: character ? 'white' : undefined
          }}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing
            </span>
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </div>
  );
}
