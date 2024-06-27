"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directions = void 0;
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../Database/Sequelize");
class Directions extends sequelize_1.Model {
}
exports.Directions = Directions;
Directions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    postcode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    colonia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    num_ext: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    num_int: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: Sequelize_1.sequelize,
    tableName: 'Directions'
});
