import { connectRabbitMQ, getChannel } from './rabbitmq';
import { Users } from '../UsersManagement/Users/domain/entities/Users'; // Ajustar según la estructura real
import { Directions } from '../UsersManagement/Directions/domain/entities/Directions'; // Ajustar según la estructura real

export const startUserConsumer = async () => {
  await connectRabbitMQ(); // Asegúrate de que la conexión se establece antes de obtener el canal

  const channel = getChannel();
  if (!channel) {
    throw new Error('RabbitMQ channel is not available');
  }

  const userQueue = 'userQueue';
  const directionQueue = 'directionQueue';

  channel.consume(userQueue, async (msg) => {
    if (msg) {
      const userId = msg.content.toString();
      console.log(`Received request for user ID: ${userId}`);
      try {
        const user = await Users.findByPk(userId);
        if (!user) {
          console.error('User not found');
          throw new Error('User not found');
        }
        const response = {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          admin: user.admin,
        };
        console.log(`Sending response for user ID: ${userId}`, response);
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: msg.properties.correlationId,
        });
        channel.ack(msg);
      } catch (error) {
        console.error('Error fetching user:', error);
        channel.nack(msg);
      }
    }
  }, { noAck: false });

  channel.consume(directionQueue, async (msg) => {
    if (msg) {
      const directionId = msg.content.toString();
      console.log(`Received request for direction ID: ${directionId}`);
      try {
        const direction = await Directions.findByPk(directionId);
        if (!direction) {
          console.error('Direction not found');
          throw new Error('Direction not found');
        }
        const response = {
          id: direction.id,
          calle: direction.calle,
          postcode: direction.postcode,
          colonia: direction.colonia,
          num_ext: direction.num_ext,
          num_int: direction.num_int,
          estado: direction.estado,
          ciudad: direction.ciudad,
          descripcion: direction.descripcion,
        };
        console.log(`Sending response for direction ID: ${directionId}`, response);
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: msg.properties.correlationId,
        });
        channel.ack(msg);
      } catch (error) {
        console.error('Error fetching direction:', error);
        channel.nack(msg);
      }
    }
  }, { noAck: false });
};

// Inicia el consumidor al arrancar la aplicación
startUserConsumer().catch(console.error);