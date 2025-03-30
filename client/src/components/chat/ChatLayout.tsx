import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);

  const chatMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/chat", { content });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data]);
    }
  });

  const handleSendMessage = (content: string) => {
    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Send message to API
    chatMutation.mutate(content);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader onClearChat={handleClearChat} />
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
