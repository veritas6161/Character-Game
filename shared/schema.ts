import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Message schema for the chat application
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // "user" or "assistant"
  content: text("content").notNull(),
  character: text("character"), // "trump", "milchick", or "yoda"
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  role: true,
  content: true,
  character: true,
});

export const characterTypes = ["trump", "milchick", "yoda", "clooney", "obama", "oprah"] as const;
export const characterSchema = z.enum(characterTypes);
export type Character = z.infer<typeof characterSchema>;

export const chatRequestSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  character: characterSchema.optional(),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
