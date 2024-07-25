import amqp from 'amqplib';

let channel = null;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqps://rabbit:rabbit1pruebas234@b-6372f5ba-9527-47d5-86f7-fe4099b2329b.mq.us-east-1.amazonaws.com:5671'); // Asegúrate de que la URL es correcta
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

    await channel.assertQueue('dishQueue', { durable: true })

  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
};

export const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel is not available');
  }
  return channel;
};
