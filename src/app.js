import express from 'express';
import cors from 'cors';
import pkg from 'signale';
const { Signale } = pkg;
import signale from 'signale';
import { routePlatillo } from './Platillos Management/Platillo/infraestructure/routes/platilloRouter.js';
import { ingredienteRoute } from './Platillos Management/Ingredientes/infraestructure/routes/ingredientesRouter.js';
import { comentRoute } from './Platillos Management/comentearios/infraestructure/routes/comentRoutes.js';

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/platillos', routePlatillo);
app.use('/ingrediente', ingredienteRoute);
app.use('/comentarios', comentRoute);


// Inicio del servidor
const PORT = 3001;
app.listen(PORT, () => {
    signale.success(`Servidor corriendo en el puerto ${PORT}`);
});
