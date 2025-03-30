import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Message, Character } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import CharacterSelection from "./CharacterSelection";

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const chatMutation = useMutation({
    mutationFn: async (content: string) => {
      const payload = selectedCharacter 
        ? { content, character: selectedCharacter } 
        : { content };
        
      const response = await apiRequest("POST", "/api/chat", payload);
      return response.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data]);
    }
  });

  const handleSendMessage = (content: string) => {
    if (!selectedCharacter) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
      character: selectedCharacter,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Send message to API
    chatMutation.mutate(content);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    // Clear messages when changing character
    setMessages([]);
  };

  // Show character selection if no character is selected
  if (!selectedCharacter) {
    return (
      <div className="flex flex-col h-screen">
        <ChatHeader onClearChat={handleClearChat} />
        <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
          <CharacterSelection 
            selectedCharacter={selectedCharacter}
            onSelectCharacter={handleSelectCharacter}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader 
        onClearChat={handleClearChat} 
        character={selectedCharacter}
        onChangeCharacter={() => setSelectedCharacter(null)}
      />
      <ChatContainer 
        messages={messages} 
        isLoading={chatMutation.isPending} 
      />
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={chatMutation.isPending}
      />
    </div>
  );
}
