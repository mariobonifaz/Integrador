// src/routes/orderRoutes.ts
import { Router } from 'express';
import { createOrder, getOrderById, getOrdersByUserId, getAllOrders, updateOrder, deleteOrder} from '../controllers/orderController';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);
router.get('/orders/users/:userId', getOrdersByUserId);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;