import { getChannel, connectRabbitMQ } from './rabbitmq.js';
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://root:Miller2001@platillosmanagement.usy4jnm.mongodb.net/'; // Reemplaza esto con tu URI de MongoDB

const platilloSchema = new mongoose.Schema({
  nombre_platillo: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  imagen: String,
});

const Platillo = mongoose.model('Platillo', platilloSchema);

// Conectar a la base de datos MongoDB
mongoose.connect(MONGODB_URI, {});

export const startDishConsumer = async () => {
  await connectRabbitMQ(); // Asegúrate de que la conexión se establece antes de obtener el canal

  const channel = getChannel();
  if (!channel) {
    throw new Error('RabbitMQ channel is not available');
  }

  const dishQueue = 'dishQueue';

  channel.consume(dishQueue, async (msg) => {
    if (msg) {
      const dishId = msg.content.toString();
      console.log(`Received request for dish ID: ${dishId}`);
      try {
        // Usar Mongoose para obtener el platillo por ID
        const platillo = await Platillo.findById(dishId).exec();
        if (!platillo) {
          console.error('Platillo not found');
          throw new Error('Platillo not found');
        }
        const response = {
          id: platillo._id,
          nombre: platillo.nombre_platillo,
          descripcion: platillo.descripcion,
          precio: platillo.precio,
        };
        console.log(`Sending response for dish ID: ${dishId}`, response);
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: msg.properties.correlationId,
        });
        channel.ack(msg);
      } catch (error) {
        console.error('Error fetching platillo:', error);
        channel.nack(msg);
      }
    }
  }, { noAck: false });
};

// Inicia el consumidor al arrancar la aplicación
startDishConsumer().catch(console.error);