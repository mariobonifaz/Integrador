"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('Users', 'postgres', 'POSTGRES', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {}
});
// Autenticación y sincronización de la base de datos
exports.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    // Sincroniza todos los modelos con la base de datos
    exports.sequelize.sync().then(() => {
        console.log('Models are synchronized with the database.');
    });
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
