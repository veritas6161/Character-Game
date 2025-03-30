import React from "react";
import { Character, Message } from "@shared/schema";

type ChatMessageProps = {
  role: Message["role"];
  content: Message["content"];
  timestamp: Message["timestamp"];
  character?: Character | null;
};

const characterNames: Record<Character, string> = {
  trump: "Donald Trump",
  milchick: "Seth Milchick",
  yoda: "Yoda"
};

// Icons for each character - simplified SVG representations
const characterIcons: Record<Character, React.ReactNode> = {
  trump: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 11.43c-.8-.4-2.01-.76-3.25-.76-.57 0-1.1.08-1.62.2.53.52 1.23.8 2.01.8.89 0 1.67-.36 2.24-.92.47.34.86.76 1.14 1.24-.42-.14-.85-.25-1.31-.33-.46.69-1.23 1.15-2.13 1.15-.89 0-1.66-.46-2.12-1.15-.46.08-.9.19-1.32.33.29-.48.68-.9 1.15-1.24.57.56 1.35.92 2.23.92.78 0 1.48-.28 2.01-.8-.51-.12-1.05-.2-1.62-.2-1.24 0-2.45.36-3.25.76-1.56.8-2.75 1.76-2.75 2.57h13c0-.81-1.19-1.77-2.75-2.57z"/>
    </svg>
  ),
  milchick: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z"/>
    </svg>
  ),
  yoda: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-1 9h2v2h-2z"/>
      <path d="M8 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm8 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
    </svg>
  )
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

  if (role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="flex flex-col gap-1 min-w-0 items-end">
          <div className="px-4 py-3 rounded-lg bg-primary text-primary-foreground">
            <p>{formatContent(content)}</p>
          </div>
          <span className="text-xs text-muted-foreground mr-2">You · {formatTimestamp()}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>
    );
  }

  // Get character display name and icon
  const characterName = character && characterNames[character] 
    ? characterNames[character] 
    : "AI Assistant";
  
  const characterIcon = character && character in characterIcons 
    ? characterIcons[character] 
    : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
      </svg>
    );

  // Assistant message
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        {characterIcon}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <div className="px-4 py-3 rounded-lg bg-muted/50 text-foreground max-w-3xl">
          <p>{formatContent(content)}</p>
        </div>
        <span className="text-xs text-muted-foreground ml-2">{characterName} · {formatTimestamp()}</span>
      </div>
    </div>
  );
}
