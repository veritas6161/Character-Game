import { useEffect, useRef } from "react";
import { Character, Message } from "@shared/schema";
import ChatMessage from "./ChatMessage";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  character?: Character | null;
}

export default function ChatContainer({ messages, isLoading, character }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Use the character prop directly if provided, otherwise try to find it in messages
  let currentCharacter = character as Character | undefined;
  // If not provided via prop but messages exist, get from first message
  if (!currentCharacter && messages.length > 0 && messages[0].character) {
    currentCharacter = messages[0].character as Character;
  }

  // Get welcome message based on character
  const getWelcomeMessage = (character?: Character) => {
    if (!character) return "Hello! I'm your AI assistant. How can I help you today?";
    
    switch(character) {
      case "philosopher":
        return "Ah… a curious soul approaches. What you seek may not be what you find—but find, you shall.";
      case "strategist":
        return "Ah, a new player on the board. Let us sharpen your wit and plot your next victorious move.";
      case "hero":
        return "YES! A new challenger enters! Ready to rise, fight, and ROAR your way forward? 'Cause I am!";
      case "loner":
        return "You're here. Cool. Ask what you need. I'll respond. Maybe.";
      case "trickster":
        return "🎩✨ Ta-da! A wild YOU appears! Ready for some mischief, mayhem, and metaphors? Let's spin the cosmic wheel!";
      case "healer":
        return "Welcome, dear one. You've found a quiet place. Speak your heart—I'm listening with warmth.";
      default:
        return "Hello! I'm your AI assistant. How can I help you today?";
    }
  };

  return (
    <div className="flex-grow overflow-hidden relative">
      <div className="h-full overflow-y-auto p-4 pb-6 space-y-6 max-w-7xl mx-auto">
        {messages.length === 0 ? (
          // Welcome message based on selected character
          <ChatMessage 
            role="assistant"
            content={getWelcomeMessage(currentCharacter)}
            timestamp={new Date()}
            character={currentCharacter}
          />
        ) : (
          // Render all messages
          messages.map((message, index) => (
            <ChatMessage 
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              character={message.character as Character}
            />
          ))
        )}

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
