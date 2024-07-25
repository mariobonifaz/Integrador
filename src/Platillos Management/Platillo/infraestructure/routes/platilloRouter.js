import express from 'express';
import { createPlatillaController,getAllPlatilloController,getPlatilloByIdController,updatePlatilloController,deletePlatilloController } from '../dependencies.js';
import multer from 'multer';
import { query } from '../../../../database/mysql.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const routePlatillo = express.Router();

routePlatillo.get('/test-db', async (req, res) => {
    try {
        const result = await query('SELECT 1');
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

routePlatillo.post("/",upload.single('imagen'),createPlatillaController.run.bind(createPlatillaController));
routePlatillo.get("/",getAllPlatilloController.run.bind(getAllPlatilloController));
routePlatillo.get("/:id",getPlatilloByIdController.run.bind(getPlatilloByIdController));
routePlatillo.put("/update/:id",upload.single('imagen'),updatePlatilloController.run.bind(updatePlatilloController));
routePlatillo.delete("/:id",deletePlatilloController.run.bind(deletePlatilloController));





export default routePlatillo;