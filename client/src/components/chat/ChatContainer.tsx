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
      case "trump":
        return "Hello folks, it's me, Donald Trump. Many people are saying I give the best answers, maybe ever. What do you want to talk about? It's gonna be tremendous, believe me!";
      case "milchick":
        return "Good day. Seth Milchick here from Lumon Industries. How may I be of assistance? Per company protocol, I'm here to facilitate a productive conversation.";
      case "yoda":
        return "Greetings, young one. Yoda, I am. Help you with your questions, I will. The Force, strong with our conversation it shall be, hmm?";
      case "clooney":
        return "Hey there, George Clooney here. Great to connect with you. What's on your mind today? I've got some time between takes, so let's have a conversation.";
      case "obama":
        return "Hello. Barack Obama here. It's good to be with you today. I'm looking forward to our conversation and hearing what's on your mind. So, what would you like to discuss?";
      case "oprah":
        return "Hello there! It's Oprah. I'm so excited to connect with you today. You know what I always say - every conversation has the potential to open doors to new understanding. So what would you like to talk about?";
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
