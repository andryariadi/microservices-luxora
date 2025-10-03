import Clerk from "@clerk/fastify";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware } from "./middleware/authMiddleware.js";

const fastify = Fastify({
  logger: true,
});

const port = Number(process.env.PORT) || 8001;

fastify.register(Clerk.clerkPlugin);

fastify.get("/health", async (request, reply) => {
  reply.code(200).send({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() });
});

fastify.get("/clerk", { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send({ message: "Authenticated order service is running!", userId: request.userId });
});

const start = async () => {
  try {
    await fastify.listen({ port });
    console.log(`Order service is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
