const amqplib = require("amqplib");
const {
  EXCHANGE_NAME,
  MSG_QUEUE_URL,
  QUEUE_NAME,
  PROPERTY_SERVICE,
} = require("../config");

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    return new Error("Data not found");
  }
};

// message broker

// create channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

// publish messages

module.exports.PublishMessage = async (channel, binding_key, msg) => {
  try {
    channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
    console.log("Sent: ", msg);
  } catch (error) {
    throw error;
  }
};

// subscribe messages

module.exports.SubscribeMessage = async (channel, service) => {
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
  const appQueue = await channel.assertQueue("", { exclusive: true });
  console.log(` Waiting for messages in queue: ${appQueue.queue}`);

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, PROPERTY_SERVICE);

  channel.consume(
    appQueue.queue,
    (data) => {
      if (data.content) {
        console.log(`Received: ${data.content.toString()}`);
        service.SubscribeEvents(data.content.toString());
      }
      console.log("[X] received");
    },
    { noAck: true }
  );
};
