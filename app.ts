import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import './src/Database/Sequelize';
import usersRoutes from './src/UsersManagement/Users/infraestructure/routes/UserRoutes';
import directionsRoutes from './src/UsersManagement/Directions/infraestructure/routes/DirectionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Usar las rutas importadas
app.use(usersRoutes);
app.use(directionsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});