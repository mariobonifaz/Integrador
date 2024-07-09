import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../../../../Database/Sequelize';
import { Users } from "../../../Users/domain/entities/Users";
import { UserDirections } from "../../../User-Directions/User-Directions";

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

    public static associations: {
        users: Association<Directions, Users>;
    };
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

export default Directions