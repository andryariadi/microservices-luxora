import { FastifyInstance } from "fastify";
import { authAdminMiddleware, authUserMiddleware } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get("/user-orders", { preHandler: authUserMiddleware }, async (request, reply) => {
    const orders = await Order.find({ userId: request.userId });

    reply.code(200).send({ orders });
  });

  fastify.get("/orders", { preHandler: authAdminMiddleware }, async (request, reply) => {
    const orders = await Order.find();

    reply.code(200).send({ orders });
  });
};
