import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authUserMiddleware } from "./middleware/authMiddleware";
import stripe from "./utils/stripe";
import sessionRoute from "./routes/session.route";
import { cors } from "hono/cors";
import webhookRoute from "./routes/webhook.route";

const app = new Hono();

app.use("*", clerkMiddleware());
app.use("*", cors({ origin: ["http://localhost:3002"], credentials: true }));

app.get("/health", (c) => {
  return c.json({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() }, 200);
});

app.get("/clerk", authUserMiddleware, async (c) => {
  const userId = c.get("userId");

  return c.json({ message: "Authenticated payment service is running!", userId }, 200);
});

app.post("/create-stripe-product", authUserMiddleware, async (c) => {
  const res = await stripe.products.create({
    id: "3",
    name: "Nike Air Essentials Pullover",
    default_price_data: {
      currency: "usd",
      unit_amount: 6990 * 100,
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

app.route("/sessions", sessionRoute);
app.route("/webhooks", webhookRoute);

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
