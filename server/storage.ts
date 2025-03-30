import { 
  users, 
  type User, 
  type InsertUser, 
  messages,
  type Message,
  type InsertMessage
} from "@shared/schema";

// Interface for storage methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Message related methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  clearMessages(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private userCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const timestamp = insertMessage.timestamp || new Date();
    const message: Message = { ...insertMessage, id, timestamp };
    this.messages.set(id, message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values())
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async clearMessages(): Promise<void> {
    this.messages.clear();
  }
}

export const storage = new MemStorage();
