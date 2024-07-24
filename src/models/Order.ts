import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

// Define los atributos de la orden
interface OrderAttributes {
  id: number;
  userId: number;
  directionId: number;
  dishIds: string[];
  quantities: number[];
  total: number;
}

// Define la creación de atributos opcionales (auto-generados por la base de datos)
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

// Define el modelo de orden extendiendo los atributos
class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public directionId!: number;
  public dishIds!: string[];
  public quantities!: number[];
  public total!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define el modelo
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    directionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    quantities: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'orders',
    sequelize, // passing the `sequelize` instance is required
    timestamps: true,
  }
);

export { Order };
