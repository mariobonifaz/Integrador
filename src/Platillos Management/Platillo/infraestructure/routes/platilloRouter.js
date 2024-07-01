import express from 'express';
import { createPlatillaController,getAllPlatilloController,getPlatilloByIdController,updatePlatilloController,deletePlatilloController } from '../dependencies.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const routePlatillo = express.Router();

routePlatillo.post("/",upload.single('imagen'),createPlatillaController.run.bind(createPlatillaController));
routePlatillo.get("/",getAllPlatilloController.run.bind(getAllPlatilloController));
routePlatillo.get("/:id",getPlatilloByIdController.run.bind(getPlatilloByIdController));
routePlatillo.put("/update/:id",upload.single('imagen'),updatePlatilloController.run.bind(updatePlatilloController));
routePlatillo.delete("/:id",deletePlatilloController.run.bind(deletePlatilloController));





export default routePlatillo;