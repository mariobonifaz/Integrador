import { sequelize } from '../../Database/Sequelize';
import { Users } from '../Users/domain/entities/Users';
import { Directions } from '../Directions/domain/entities/Directions';
import { UserDirections } from './User-Directions';

// Define todas las asociaciones aquí
Users.belongsToMany(Directions, { through: UserDirections, as: 'Directions', foreignKey: 'userId' });
Directions.belongsToMany(Users, { through: UserDirections, as: 'Users', foreignKey: 'directionId' });

UserDirections.belongsTo(Directions, { as: 'direction', foreignKey: 'directionId' });

export {
  sequelize,
  Users,
  Directions,
  UserDirections,
};
