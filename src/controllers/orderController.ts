import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { getChannel, connectRabbitMQ } from '../rabbitmq';
import { Channel, ConsumeMessage } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';

interface OrderRequestBody {
  userId: number;
  directionId: number;
  dishIds: string[];
  quantities: number[];
}

export const createOrder = async (req: Request, res: Response) => {
  const { userId, directionId, dishIds, quantities }: OrderRequestBody = req.body;
  try {
    await connectRabbitMQ();
    const channel = getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel is not available');
    }

    const dishQueue = 'dishQueue';

    // Crear una cola única para las respuestas de platillos
    const replyQueue = `replyQueue-${uuidv4()}`;
    await channel.assertQueue(replyQueue, { exclusive: true });

    console.log('Sending messages to dishQueue...');
    // Obtener detalles de los platillos y calcular el total
    const platillos = await Promise.all(dishIds.map((dishId: string, index: number) => {
      return new Promise((resolve, reject) => {
        const correlationId = `${uuidv4()}`;
        console.log(`Sending request for dishId: ${dishId} with correlationId: ${correlationId}`);

        channel.sendToQueue(dishQueue, Buffer.from(dishId), {
          correlationId,
          replyTo: replyQueue,
        });

        const consumePlatillo = (msg: ConsumeMessage | null) => {
          if (msg && msg.properties.correlationId === correlationId) {
            console.log('Received message for dish:', JSON.parse(msg.content.toString()));
            resolve(JSON.parse(msg.content.toString()));
            channel.ack(msg);  // Reconocer el mensaje aquí
          } else if (msg) {
            channel.nack(msg);  // No reconocer si el correlationId no coincide
          }
        };

        console.log('Starting consumer for dish correlationId:', correlationId);
        channel.consume(replyQueue, consumePlatillo, { noAck: false });
      });
    }));

    const total = platillos.reduce((sum: number, platillo: any, index: number) => {
      return sum + (platillo.precio * quantities[index]);
    }, 0);

    if (isNaN(total)) {
      throw new Error('Total calculation resulted in NaN');
    }

    const newOrder = await Order.create({ userId, directionId, dishIds, quantities, total, status: 'pending',});
    res.status(201).json(newOrder);

    await channel.deleteQueue(replyQueue);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    await connectRabbitMQ();
    const channel = getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel is not available');
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const userQueue = 'userQueue';
    const directionQueue = 'directionQueue';
    const dishQueue = 'dishQueue';

    // Crear colas únicas para las respuestas
    const userReplyQueue = `userReplyQueue-${uuidv4()}`;
    const directionReplyQueue = `directionReplyQueue-${uuidv4()}`;
    const dishReplyQueue = `dishReplyQueue-${uuidv4()}`;

    await channel.assertQueue(userReplyQueue, { exclusive: true });
    await channel.assertQueue(directionReplyQueue, { exclusive: true });
    await channel.assertQueue(dishReplyQueue, { exclusive: true });

    // Función para consumir mensajes
    const consumeMessage = (queue: string, correlationId: string) => {
      return new Promise((resolve, reject) => {
        channel.consume(queue, (msg) => {
          if (msg && msg.properties.correlationId === correlationId) {
            resolve(JSON.parse(msg.content.toString()));
            channel.ack(msg);  // Reconocer el mensaje aquí
          } else if (msg) {
            channel.nack(msg);  // No reconocer si el correlationId no coincide
          }
        }, { noAck: false });
      });
    };

    // Solicitar detalles del usuario
    const userCorrelationId = uuidv4();
    channel.sendToQueue(userQueue, Buffer.from(order.userId.toString()), {
      correlationId: userCorrelationId,
      replyTo: userReplyQueue,
    });
    const user = await consumeMessage(userReplyQueue, userCorrelationId);

    // Solicitar detalles de la dirección
    const directionCorrelationId = uuidv4();
    channel.sendToQueue(directionQueue, Buffer.from(order.directionId.toString()), {
      correlationId: directionCorrelationId,
      replyTo: directionReplyQueue,
    });
    const direction = await consumeMessage(directionReplyQueue, directionCorrelationId);

    // Solicitar detalles de los platillos
    const platillos = await Promise.all(order.dishIds.map(async (dishId: string) => {
      const dishCorrelationId = uuidv4();
      channel.sendToQueue(dishQueue, Buffer.from(dishId), {
        correlationId: dishCorrelationId,
        replyTo: dishReplyQueue,
      });
      return consumeMessage(dishReplyQueue, dishCorrelationId);
    }));

    const response = {
      id: order.id,
      user,
      direction,
      platillos,
      quantities: order.quantities,
      total: order.total,
    };

    res.status(200).json(response);

    // Limpiar colas
    await channel.deleteQueue(userReplyQueue);
    await channel.deleteQueue(directionReplyQueue);
    await channel.deleteQueue(dishReplyQueue);

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    await connectRabbitMQ();
    const channel = getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel is not available');
    }

    const orders = await Order.findAll({ where: { userId } });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found for the user' });
    }

    const userQueue = 'userQueue';
    const directionQueue = 'directionQueue';
    const dishQueue = 'dishQueue';

    const userCorrelationId = uuidv4();
    const userReplyQueue = `userReplyQueue-${userCorrelationId}`;
    await channel.assertQueue(userReplyQueue, { exclusive: true });

    channel.sendToQueue(userQueue, Buffer.from(userId), {
      correlationId: userCorrelationId,
      replyTo: userReplyQueue,
    });

    const user = await new Promise((resolve, reject) => {
      channel.consume(userReplyQueue, (msg) => {
        if (msg && msg.properties.correlationId === userCorrelationId) {
          resolve(JSON.parse(msg.content.toString()));
          channel.ack(msg);
        }
      }, { noAck: false });
    });

    const ordersWithDetails = await Promise.all(orders.map(async (order) => {
      const directionCorrelationId = uuidv4();
      const directionReplyQueue = `directionReplyQueue-${directionCorrelationId}`;
      await channel.assertQueue(directionReplyQueue, { exclusive: true });

      channel.sendToQueue(directionQueue, Buffer.from(order.directionId.toString()), {
        correlationId: directionCorrelationId,
        replyTo: directionReplyQueue,
      });

      const direction = await new Promise((resolve, reject) => {
        channel.consume(directionReplyQueue, (msg) => {
          if (msg && msg.properties.correlationId === directionCorrelationId) {
            resolve(JSON.parse(msg.content.toString()));
            channel.ack(msg);
          }
        }, { noAck: false });
      });

      const platillos = await Promise.all(order.dishIds.map(async (dishId: string) => {
        const dishCorrelationId = uuidv4();
        const dishReplyQueue = `dishReplyQueue-${dishCorrelationId}`;
        await channel.assertQueue(dishReplyQueue, { exclusive: true });

        channel.sendToQueue(dishQueue, Buffer.from(dishId), {
          correlationId: dishCorrelationId,
          replyTo: dishReplyQueue,
        });

        return new Promise((resolve, reject) => {
          channel.consume(dishReplyQueue, (msg) => {
            if (msg && msg.properties.correlationId === dishCorrelationId) {
              resolve(JSON.parse(msg.content.toString()));
              channel.ack(msg);
            }
          }, { noAck: false });
        });
      }));

      return {
        id: order.id,
        user,
        direction,
        platillos,
        quantities: order.quantities,
        total: order.total,
      };
    }));

    res.status(200).json(ordersWithDetails);

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    await connectRabbitMQ();
    const channel = getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel is not available');
    }

    const orders = await Order.findAll();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    const userQueue = 'userQueue';
    const directionQueue = 'directionQueue';
    const dishQueue = 'dishQueue';

    const ordersWithDetails = await Promise.all(orders.map(async (order) => {
      // Obtener detalles del usuario
      const userCorrelationId = uuidv4();
      const userReplyQueue = `userReplyQueue-${userCorrelationId}`;
      await channel.assertQueue(userReplyQueue, { exclusive: true });

      channel.sendToQueue(userQueue, Buffer.from(order.userId.toString()), {
        correlationId: userCorrelationId,
        replyTo: userReplyQueue,
      });

      const user = await new Promise((resolve, reject) => {
        channel.consume(userReplyQueue, (msg) => {
          if (msg && msg.properties.correlationId === userCorrelationId) {
            resolve(JSON.parse(msg.content.toString()));
            channel.ack(msg);
          }
        }, { noAck: false });
      });

      // Obtener detalles de la dirección
      const directionCorrelationId = uuidv4();
      const directionReplyQueue = `directionReplyQueue-${directionCorrelationId}`;
      await channel.assertQueue(directionReplyQueue, { exclusive: true });

      channel.sendToQueue(directionQueue, Buffer.from(order.directionId.toString()), {
        correlationId: directionCorrelationId,
        replyTo: directionReplyQueue,
      });

      const direction = await new Promise((resolve, reject) => {
        channel.consume(directionReplyQueue, (msg) => {
          if (msg && msg.properties.correlationId === directionCorrelationId) {
            resolve(JSON.parse(msg.content.toString()));
            channel.ack(msg);
          }
        }, { noAck: false });
      });

      // Obtener detalles de los platillos
      const platillos = await Promise.all(order.dishIds.map(async (dishId: string) => {
        const dishCorrelationId = uuidv4();
        const dishReplyQueue = `dishReplyQueue-${dishCorrelationId}`;
        await channel.assertQueue(dishReplyQueue, { exclusive: true });

        channel.sendToQueue(dishQueue, Buffer.from(dishId), {
          correlationId: dishCorrelationId,
          replyTo: dishReplyQueue,
        });

        return new Promise((resolve, reject) => {
          channel.consume(dishReplyQueue, (msg) => {
            if (msg && msg.properties.correlationId === dishCorrelationId) {
              resolve(JSON.parse(msg.content.toString()));
              channel.ack(msg);
            }
          }, { noAck: false });
        });
      }));

      return {
        id: order.id,
        user,
        direction,
        platillos,
        quantities: order.quantities,
        total: order.total,
      };
    }));

    res.status(200).json(ordersWithDetails);

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { userId, directionId, dishIds, quantities }: Partial<Order> = req.body;

  try {
    await connectRabbitMQ();
    const channel = getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel is not available');
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Actualizar los campos si se proporcionan
    if (userId !== undefined) order.userId = userId;
    if (directionId !== undefined) order.directionId = directionId;
    if (dishIds !== undefined) order.dishIds = dishIds;
    if (quantities !== undefined) order.quantities = quantities;

    // Recalcular el total si se actualizan los platillos o las cantidades
    if (dishIds !== undefined || quantities !== undefined) {
      const dishQueue = 'dishQueue';
      const replyQueue = `replyQueue-${uuidv4()}`;
      await channel.assertQueue(replyQueue, { exclusive: true });

      const platillos = await Promise.all(order.dishIds.map((dishId: string, index: number) => {
        return new Promise((resolve, reject) => {
          const correlationId = `${uuidv4()}`;
          channel.sendToQueue(dishQueue, Buffer.from(dishId), {
            correlationId,
            replyTo: replyQueue,
          });

          const consumePlatillo = (msg: ConsumeMessage | null) => {
            if (msg && msg.properties.correlationId === correlationId) {
              resolve(JSON.parse(msg.content.toString()));
              channel.ack(msg);
            }
          };

          channel.consume(replyQueue, consumePlatillo, { noAck: false });
        });
      }));

      const total = platillos.reduce((sum: number, platillo: any, index: number) => {
        return sum + (platillo.precio * order.quantities[index]);
      }, 0);

      if (isNaN(total)) {
        throw new Error('Total calculation resulted in NaN');
      }

      order.total = total;

      await channel.deleteQueue(replyQueue);
    }

    await order.save();
    res.status(200).json(order);

  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    await connectRabbitMQ();
    const channel = getChannel();
    if (!channel) {
      throw new Error('RabbitMQ channel is not available');
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });

  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    // Buscar la orden por ID
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Actualizar el estado de la orden
    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Error updating order status' });
  }
};