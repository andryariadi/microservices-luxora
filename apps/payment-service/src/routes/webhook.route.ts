import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";

const webhookRoute = new Hono();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

webhookRoute.get("/", (c) => {
  return c.json({
    status: "ok webhook",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

webhookRoute.post("/stripe", async (c) => {
  const body = await c.req.text();

  const sig = c.req.header("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);

    console.log({ event }, "<--webhookRoute1");
  } catch (error) {
    console.log("Webhook verification failed:", error);
    return c.json({ error }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      console.log({ session }, "<--webhookRoute2");

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      break;

    default:
      break;
  }

  return c.json({ received: true });
});

export default webhookRoute;
