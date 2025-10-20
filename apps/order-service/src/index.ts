import Clerk from "@clerk/fastify";
import Fastify from "fastify";
import { authUserMiddleware } from "./middleware/authMiddleware";
import { orderRoute } from "./routes/order";
import { connectOrderDB } from "@repo/order-db";
import { consumer, producer } from "./utils/kafka";

const fastify = Fastify();

const port = Number(process.env.PORT) || 8001;

fastify.register(Clerk.clerkPlugin);

fastify.get("/health", async (request, reply) => {
  reply.code(200).send({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() });
});

fastify.get("/clerk", { preHandler: authUserMiddleware }, (request, reply) => {
  reply.code(200).send({ message: "Authenticated order service is running!", userId: request.userId });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    Promise.all([await connectOrderDB(), await producer.connect(), await consumer.connect()]);

    await fastify.listen({ port });
    console.log(`Order service is running on port ${port}`);
  } catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
