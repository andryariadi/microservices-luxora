import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authUserMiddleware } from "./middleware/authMiddleware";
import stripe from "./utils/stripe";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() }, 200);
});

app.get("/clerk", authUserMiddleware, async (c) => {
  const userId = c.get("userId");

  return c.json({ message: "Authenticated payment service is running!", userId }, 200);
});

app.post("/create-stripe-product", authUserMiddleware, async (c) => {
  const res = await stripe.products.create({
    id: "12345",
    name: "Andry",
    default_price_data: {
      currency: "usd",
      unit_amount: 10 * 100,
    },
  });

  return c.json(res);
});

app.get("/stripe-product-price", async (c) => {
  const res = await stripe.prices.list({
    product: "12345",
  });

  return c.json(res);
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
