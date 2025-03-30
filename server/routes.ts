import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { generateChatResponse } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request
      const result = chatRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request", 
          errors: result.error.errors 
        });
      }
      
      const { content } = result.data;
      
      // Generate response from OpenAI
      const responseContent = await generateChatResponse(content);
      
      // Store the message
      const message = await storage.createMessage({
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      });
      
      return res.status(200).json(message);
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
