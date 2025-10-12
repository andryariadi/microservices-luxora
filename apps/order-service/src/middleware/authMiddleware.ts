import { FastifyReply, FastifyRequest } from "fastify";
import Clerk from "@clerk/fastify";
import type { CustomJwtSessionClaims } from "@repo/types";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authUserMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = Clerk.getAuth(request);

  if (!userId) {
    return reply.code(401).send({ error: "User not authenticated!" });
  }

  console.log({ userId }, "<---authMiddlewareFastify");

  request.userId = userId;
};

export const authAdminMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const auth = Clerk.getAuth(request);

  if (!auth.userId) {
    return reply.code(401).send({ error: "User not authenticated!" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  console.log({ claims }, "<---authMiddlewareFastify");

  if (claims.metadata?.role !== "admin") {
    return reply.status(403).send({ message: "Unauthorized, you are not an admin!" });
  }

  request.userId = auth.userId;
};
