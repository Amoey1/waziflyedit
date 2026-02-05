import { type User, type InsertUser, type Waitlist, type InsertWaitlist, users, waitlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistByEmail(email: string): Promise<Waitlist | undefined>;
  getAllWaitlist(): Promise<Waitlist[]>;
  updateWaitlistInsight(email: string, biggestChallenge: string): Promise<Waitlist | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const result = await db.insert(waitlist).values(entry).returning();
    return result[0];
  }

  async getWaitlistByEmail(email: string): Promise<Waitlist | undefined> {
    const result = await db.select().from(waitlist).where(eq(waitlist.email, email));
    return result[0];
  }

  async getAllWaitlist(): Promise<Waitlist[]> {
    return await db.select().from(waitlist);
  }

  async updateWaitlistInsight(email: string, biggestChallenge: string): Promise<Waitlist | undefined> {
    const result = await db.update(waitlist)
      .set({ biggestChallenge })
      .where(eq(waitlist.email, email))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
