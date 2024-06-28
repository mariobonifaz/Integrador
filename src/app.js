import express from 'express';
import pkg from 'signale';
const { Signale } = pkg;
import signale from 'signale';
import { routePlatillo}  from './Platillos Management/Platillo/infraestructure/routes/platilloRouter.js';
import { ingredienteRoute } from './Platillos Management/Ingredientes/infraestructure/routes/ingredientesRouter.js';

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/platillos', routePlatillo);
app.use('/ingrediente', ingredienteRoute);


// Inicio del servidor
const PORT = 3001;
app.listen(PORT, () => {
    signale.success(`Servidor corriendo en el puerto ${PORT}`);
});
