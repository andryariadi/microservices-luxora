import { Kafka, Producer } from "kafkajs";

export const createProducer = (kafka: Kafka) => {
  const producer: Producer = kafka.producer();

  const connect = async () => {
    await producer.connect();
  };

  const send = async (topic: string, message: object) => {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  };

  const disconnect = async () => {
    await producer.disconnect();
  };

  console.log({ connect, send, disconnect }, "<--producerKafka");

  return { connect, send, disconnect };
};
