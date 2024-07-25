import express from 'express';
import { createPaymentController } from '../dependencies.js';


export const paymnetRouter = express.Router();

paymnetRouter.post("/",createPaymentController.run.bind(createPaymentController));
