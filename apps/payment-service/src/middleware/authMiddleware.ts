import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { CustomJwtSessionClaims } from "@repo/types";

export const authUserMiddleware = createMiddleware<{
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

export const authAdminMiddleware = createMiddleware<{
  Variables: { userId: string };
}>(async (c, next) => {
  const auth = getAuth(c);
  //   const clerkClient = c.get("clerk");

  if (!auth?.userId) {
    return c.json({ error: "User not authenticated!" }, 401);
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  console.log({ claims }, "<----authMiddlewareHono");

  if (claims.metadata?.role !== "admin") {
    return c.json({ message: "Unauthorized, you are not an admin!" }, 403);
  }

  c.set("userId", auth.userId);

  await next();
});
