import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../../../../Database/Sequelize';
import { Directions } from "../../../Directions/domain//entities/Directions";
import { UserDirections } from "../../../User-Directions/User-Directions";

export class Users extends Model{
    public id!: number;
    public name!:string;
    public phone!: number;
    public email!:string;
    public password!:string;
    public admin!:boolean;

    public static associations: {
        directions: Association<Users, Directions>;
    };
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'Users' // Nombre de la tabla en la base de datos
});

export default Users