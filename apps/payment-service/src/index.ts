import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() }, 200);
});

app.get("/clerk", async (c) => {
  const auth = getAuth(c);
  const clerkClient = c.get("clerk");

  console.log({ auth });

  if (!auth?.isAuthenticated) {
    return c.json({ error: "User not authenticated!" }, 401);
  }

  const user = await clerkClient.users.getUser(auth.userId);

  return c.json({ message: "Authenticated payment service is running!", user }, 200);
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
