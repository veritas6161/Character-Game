import { useEffect, useRef } from "react";
import { Message } from "@shared/schema";
import ChatMessage from "./ChatMessage";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatContainer({ messages, isLoading }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-grow overflow-hidden relative">
      <div className="h-full overflow-y-auto p-4 pb-6 space-y-6 max-w-7xl mx-auto">
        {/* Welcome message */}
        <ChatMessage 
          role="assistant"
          content="Hello! I'm your AI assistant. How can I help you today?"
          timestamp={new Date()}
        />

        {/* Render all messages */}
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="px-4 py-3 rounded-lg bg-muted/50 text-foreground flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
