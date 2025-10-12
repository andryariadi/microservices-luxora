import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authUserMiddleware } from "./middleware/authMiddleware";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() }, 200);
});

app.get("/clerk", authUserMiddleware, async (c) => {
  const userId = c.get("userId");

  return c.json({ message: "Authenticated payment service is running!", userId }, 200);
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: Number(process.env.PORT) || 8002,
      },
      (info) => {
        console.log(`Payment service is running on port ${info.port}`);
      }
    );
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

start();
