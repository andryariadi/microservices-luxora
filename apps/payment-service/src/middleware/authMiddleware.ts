import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { Variables } from "hono/types";

export const authMiddleware = createMiddleware<{
  Variables: { userId: string };
}>(async (c, next) => {
  const auth = getAuth(c);
  //   const clerkClient = c.get("clerk");

  if (!auth?.userId) {
    return c.json({ error: "User not authenticated!" }, 401);
  }

  c.set("userId", auth.userId);

  await next();
});
