import express from 'express';
import { createPlatillaController } from '../dependencies.js';

export const routePlatillo = express.Router();

routePlatillo.post("/",createPlatillaController.run.bind(createPlatillaController));

export default routePlatillo;