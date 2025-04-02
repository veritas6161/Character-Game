import React from "react";
import { Character, Message } from "@shared/schema";
import { getCharacterImage, characterImages } from "./CharacterImages";

type ChatMessageProps = {
  role: Message["role"];
  content: Message["content"];
  timestamp: Message["timestamp"];
  character?: Character | null;
};

export default function ChatMessage({ 
  role, 
  content, 
  timestamp, 
  character 
}: ChatMessageProps) {
  const formatTimestamp = () => {
    // For simplicity, just showing "Just now"
    // In a production app, you might use a library like date-fns
    return "Just now";
  };

  const formatContent = (content: string) => {
    // Basic formatting for newlines
    return content.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  // Get character information once for both user and assistant messages
  const characterInfo = character && characterImages[character] 
    ? characterImages[character] 
    : null;
  const themeColor = characterInfo?.themeColor || "#6366f1";
  const characterName = characterInfo ? characterInfo.name : "AI Assistant";
  const bgGradient = characterInfo?.bgGradient || "from-indigo-500/20 to-indigo-400/5";

  // User message
  if (role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="flex flex-col gap-1 min-w-0 items-end">
          <div 
            className="px-4 py-3 rounded-lg shadow-md max-w-3xl"
            style={{ 
              background: `linear-gradient(135deg, ${themeColor}CC, ${themeColor})`,
              color: 'white',
              boxShadow: `0 4px 12px ${themeColor}30`
            }}
          >
            <p className="font-medium">{formatContent(content)}</p>
          </div>
          <span 
            className="text-xs mr-2"
            style={{ color: `${themeColor}CC` }}
          >
            You · {formatTimestamp()}
          </span>
        </div>
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
          style={{
            background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}40)`,
            border: `2px solid ${themeColor}40`,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={themeColor} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>
    );
  }

  // Assistant message
  return (
    <div className="flex items-start gap-3">
      <div 
        className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md border-2" 
        style={{ 
          borderColor: `${themeColor}40`,
          boxShadow: `0 4px 12px ${themeColor}20`
        }}
      >
        {character ? (
          <img 
            src={getCharacterImage(character)} 
            alt={characterName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <div 
          className={`px-4 py-3 rounded-lg text-foreground max-w-3xl ${
            character ? `bg-gradient-to-r ${bgGradient}` : 'bg-muted/50'
          }`}
          style={{ 
            boxShadow: character ? `0 2px 10px ${themeColor}15` : undefined,
            borderLeft: character ? `2px solid ${themeColor}` : undefined
          }}
        >
          <p style={{ color: character ? themeColor : undefined }}>{formatContent(content)}</p>
        </div>
        <span 
          className="text-xs ml-2"
          style={{ color: character ? themeColor : 'var(--muted-foreground)' }}
        >
          {characterName} · {formatTimestamp()}
        </span>
      </div>
    </div>
  );
}
