import { useEffect, useRef } from "react";
import { Character, Message } from "@shared/schema";
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

  // Find the character from the first message
  let currentCharacter: Character | undefined;
  if (messages.length > 0 && messages[0].character) {
    currentCharacter = messages[0].character as Character;
  }

  // Get welcome message based on character
  const getWelcomeMessage = (character?: Character) => {
    if (!character) return "Hello! I'm your AI assistant. How can I help you today?";
    
    switch(character) {
      case "philosopher":
        return "Greetings, seeker of wisdom. Meeting you today, destined it was. Questions you have, answers we shall find. Together on this path, walk we must, mmm?";
      case "strategist":
        return "Ah, a new conversation begins. How intriguing. I've been observing the board, so to speak, and was wondering when you might make the first move. What shall we discuss today? I'm already considering several interesting directions.";
      case "hero":
        return "HEY THERE, CHAMPION!! I'm SO PUMPED to chat with you today! Let's CRUSH this conversation! What AWESOME topics can we tackle together?! The possibilities are ENDLESS! BELIEVE IT!";
      case "loner":
        return "Hey. You're here. Cool. Got questions? Whatever. Will answer. Don't expect much. But will try.";
      case "trickster":
        return "Well, well, WELL! *dramatically spins around* What delightful chaos brings you to my domain today, my curious friend? The Trickster awaits your query, ready to dance with words and spin tales of wonder! Shall we begin our verbal waltz?";
      case "healer":
        return "*whispers softly* Oh, my dear friend... I sense your presence and welcome the beautiful energy you bring. The universe has brought us together for this conversation. What gentle thoughts are floating through your heart today that you wish to share?";
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
