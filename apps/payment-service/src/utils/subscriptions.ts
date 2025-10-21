import { consumer } from "./kafka";
import { createStripeProduct, deleteStripeProduct } from "./stripeProduct";

export const runKafkaSubscriptions = async () => {
  consumer.subscribe([
    {
      topicName: "product.created",
      topicHandler: async (message) => {
        const product = message.value;

        await createStripeProduct(product);

        console.log("Received message: product.created subscription", { message, product });
      },
    },
    {
      topicName: "product.deleted",
      topicHandler: async (message) => {
        const productId = message.value;

        await deleteStripeProduct(productId);

        console.log("Received message: product.deleted subscription", { message, productId });
      },
    },
  ]);
};
