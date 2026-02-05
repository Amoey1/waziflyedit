import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsed = insertWaitlistSchema.parse(req.body);
      
      const existing = await storage.getWaitlistByEmail(parsed.email);
      if (existing) {
        return res.status(409).json({ 
          success: false, 
          message: "This email is already on the waitlist!" 
        });
      }
      
      const entry = await storage.addToWaitlist(parsed);
      return res.status(201).json({ 
        success: true, 
        message: "You've been added to the waitlist!",
        data: entry 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid email address",
          errors: error.errors 
        });
      }
      console.error("Waitlist error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again." 
      });
    }
  });

  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getAllWaitlist();
      return res.json({ success: true, data: entries, count: entries.length });
    } catch (error) {
      console.error("Waitlist fetch error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch waitlist" 
      });
    }
  });

  app.patch("/api/waitlist/:email/insight", async (req, res) => {
    try {
      const { email } = req.params;
      const { biggestChallenge } = req.body;
      
      if (!biggestChallenge || typeof biggestChallenge !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "biggestChallenge is required" 
        });
      }

      const updated = await storage.updateWaitlistInsight(email, biggestChallenge);
      if (!updated) {
        return res.status(404).json({ 
          success: false, 
          message: "Email not found on waitlist" 
        });
      }

      return res.json({ success: true, data: updated });
    } catch (error) {
      console.error("Insight update error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to save insight" 
      });
    }
  });

  return httpServer;
}
