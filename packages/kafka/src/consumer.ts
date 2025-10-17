import type { Kafka, Consumer } from "kafkajs";

export const createConsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId });

  const connect = async () => {
    await consumer.connect();
    console.log("Kafka consumer connected:" + groupId);
  };

  const subscribe = async (
    topics: {
      topicName: string;
      topicHandler: (message: any) => Promise<void>;
    }[]
  ) => {
    const res = await consumer.subscribe({
      topics: topics.map((topic) => topic.topicName),
      fromBeginning: true,
    });

    console.log({ res }, "<--costumerKafka1");

    const res2 = await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const topicConfig = topics.find((t) => t.topicName === topic);

          if (topicConfig) {
            const value = message.value?.toString();

            if (value) {
              await topicConfig.topicHandler(JSON.parse(value));
            }
          }
        } catch (error) {
          console.log("Error processing message", error);
        }
      },
    });

    console.log({ res }, "<--costumerKafka2");
  };

  const disconnect = async () => {
    await consumer.disconnect();
  };

  console.log({ connect, subscribe, disconnect }, "<--consumerKafka3");

  return { connect, subscribe, disconnect };
};
