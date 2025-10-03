import Clerk from "@clerk/fastify";
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

const port = Number(process.env.PORT) || 8001;

fastify.register(Clerk.clerkPlugin);

fastify.get("/health", async (request, reply) => {
  reply.code(200).send({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() });
});

fastify.get("/clerk", async (request, reply) => {
  const { isAuthenticated, userId } = Clerk.getAuth(request);

  console.log({ isAuthenticated, userId });

  if (!isAuthenticated) {
    return reply.code(401).send({ error: "User not authenticated" });
  }

  const user = await Clerk.clerkClient.users.getUser(userId);

  reply.code(200).send({ message: "Authenticated order service is running!", user });
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
