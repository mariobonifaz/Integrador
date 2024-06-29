import express from 'express';
import { createPlatillaController,getAllPlatilloController } from '../dependencies.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const routePlatillo = express.Router();

routePlatillo.post("/",upload.single('imagen'),createPlatillaController.run.bind(createPlatillaController));
routePlatillo.get("/",getAllPlatilloController.run.bind(getAllPlatilloController));


export default routePlatillo;