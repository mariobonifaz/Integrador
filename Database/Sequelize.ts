import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('Users', 'postgres', 'POSTGRES', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {}
});

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