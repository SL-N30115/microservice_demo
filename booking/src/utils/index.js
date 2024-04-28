const amqplib = require("amqplib");
const {
  EXCHANGE_NAME,
  MSG_QUEUE_URL,
  QUEUE_NAME,
  BOOKING_SERVICE,
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
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    return channel;
  } catch (error) {
    throw error;
  }
};

// publish messages

module.exports.PublishMessage = async (channel, service, msg) => {
  try {
    const options = { persistent: true, durable: true };
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg), options);
    console.log("Message Sent: ", msg);
  } catch (error) {
    throw error;
  }
};

// subscribe messages

module.exports.SubscribeMessage = async (channel, service) => {
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
  const queueOptions = { durable: true, exclusive: true };
  const appQueue = await channel.assertQueue("", queueOptions);
  console.log(` Waiting for messages in queue: ${appQueue.queue}`);

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, BOOKING_SERVICE);

  channel.consume(appQueue.queue, (data) => {
    console.log("received data");
    console.log(data.content.toString());
    channel.ack(data);
  });
};
