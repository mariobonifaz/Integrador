import express from 'express';
import cors from 'cors';
import { Signale } from 'signale';
import { userRoute } from './UserManagement/User/infraestructure/routes/userRoute';

const signale = new Signale();

const app = express();

// Middleware para manejar JSON y CORS
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/v1/user', userRoute);

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  signale.success(`Corriendo en el puerto ${port}`);
});
