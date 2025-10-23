import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

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

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      console.log({ session, address: session.collected_information?.shipping_details?.address, lineItems: lineItems.data }, "<--webhookRoute2");

      const shippingAddress = `${session.collected_information?.shipping_details?.address.line1}, ${session.collected_information?.shipping_details?.address.city}`;

      producer.send("payment.successful", {
        value: {
          userId: session.client_reference_id,
          email: session.customer_details?.email,
          amount: session.amount_total,
          shipping: shippingAddress,
          status: session.payment_status === "paid" ? "success" : "failed",
          products: lineItems.data.map((item) => ({
            name: item.description,
            quantity: item.quantity,
            price: item.price?.unit_amount,
          })),
        },
      });

      break;

    default:
      break;
  }

  return c.json({ received: true });
});

export default webhookRoute;
