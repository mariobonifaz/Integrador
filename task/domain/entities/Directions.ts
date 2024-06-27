import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize';

export class Directions extends Model{
    public id!:number;
    public calle!:string;
    public postcode!:number;
    public colonia!:string;
    public num_ext!:number;
    public num_int!:number;
    public estado!:string;
    public ciudad!:string;
    public descripcion!:string;
}

Directions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calle: {
        type: DataTypes.STRING,
        allowNull:false
    },
    postcode: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    colonia: {
        type: DataTypes.STRING,
        allowNull:false
    },
    num_ext: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    num_int: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull:false
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull:false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    tableName: 'Directions'
});