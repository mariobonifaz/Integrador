import express from 'express';
import { createPaymentController,confirmetPaymentController } from '../dependencies.js';


export const paymnetRouter = express.Router();

paymnetRouter.post("/",createPaymentController.run.bind(createPaymentController));
paymnetRouter.post("/verifi/:paypal_payment_id",confirmetPaymentController.run.bind(confirmetPaymentController));

