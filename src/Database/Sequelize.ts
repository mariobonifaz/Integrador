import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT as Dialect, // Ajustar el tipo según sea necesario
        dialectOptions: {}
    }
);

// Autenticación y sincronización de la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // Sincroniza todos los modelos con la base de datos
        sequelize.sync().then(() => {
            console.log('Models are synchronized with the database.');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });