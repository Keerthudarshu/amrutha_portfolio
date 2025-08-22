import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // const httpServer = createServer(app);

  return httpServer;
}
/*
// Vercel deployment: Custom server logic is disabled. All code commented out for static/frontend deployment.
// const httpServer = createServer(app);
// return httpServer;
*/
