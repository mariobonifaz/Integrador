import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqps://rabbit:rabbit1pruebas234@b-6372f5ba-9527-47d5-86f7-fe4099b2329b.mq.us-east-1.amazonaws.com:5671');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

  // Asegurarse de que la cola 'userQueue' exista
  await channel.assertQueue('userQueue', { durable: true });
  await channel.assertQueue('directionQueue', { durable: true });
  
} catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
};

export const getChannel = () => channel;
