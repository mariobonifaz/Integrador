import { UsersController } from '../../controllers/UsersController';
import { PostgresUserRepository } from '../../repositories/PostgresUsersRepository';
import { UserService } from '../../../aplication/Use-Cases/UserService';

const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);
const usersController = new UsersController(userService);

export { usersController };
