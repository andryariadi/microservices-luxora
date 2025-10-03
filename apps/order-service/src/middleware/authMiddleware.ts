import { FastifyReply, FastifyRequest } from "fastify";
import Clerk from "@clerk/fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = Clerk.getAuth(request);

  if (!userId) {
    return reply.code(401).send({ error: "User not authenticated!" });
  }

  request.userId = userId;
};
