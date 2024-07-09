import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../Database/Sequelize';

export class UserDirections extends Model {
  public userId!: number;
  public directionId!: number;
}

UserDirections.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    primaryKey: true,
  },
  directionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Directions',
      key: 'id'
    },
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'UserDirections',
});