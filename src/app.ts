// src/app.ts
import express from 'express';
import { connectRabbitMQ } from './rabbitmq';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(express.json());
app.use(orderRoutes);

// Conectar a RabbitMQ
connectRabbitMQ();

app.listen(3001, () => {
  console.log('Orders Service is running on port 3001');
});