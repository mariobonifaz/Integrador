import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, // Agregar puerto
  dialect: 'postgres',
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database', error);
});
