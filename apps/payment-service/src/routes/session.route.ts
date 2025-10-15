import { Hono } from "hono";
import stripe from "../utils/stripe";
import { authUserMiddleware } from "../middleware/authMiddleware";
import { CartItemType } from "@repo/types";
import { getStripeProductPrice } from "../utils/stripeProduct";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", authUserMiddleware, async (c) => {
  const { cart }: { cart: CartItemType[] } = await c.req.json();
  const userId = c.get("userId");

  console.log({ cart }, "<---sessionRoute1");

  const lineItems = await Promise.all(
    cart.map(async (item) => {
      const unitAmount = await getStripeProductPrice(item.id);

      console.log({ unitAmount }, "<---sessionRoute2");

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: unitAmount as number,
        },
        quantity: item.quantity,
      };
    })
  );

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      client_reference_id: userId,
      mode: "payment",
      ui_mode: "custom",
      // The URL of your payment completion page
      return_url: "http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}",
    });

    console.log({ session }, "<---sessionRoute3");

    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return c.json({ error }, 500);
  }
});

export default sessionRoute;
