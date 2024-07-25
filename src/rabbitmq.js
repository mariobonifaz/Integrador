import amqp from 'amqplib';

let channel = null;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqps://rabbit:rabbit1pruebas234@b-fd3a9a95-89ed-45b1-b02e-376d0db68c39.mq.us-east-1.amazonaws.com:5671'); // Asegúrate de que la URL es correcta
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
