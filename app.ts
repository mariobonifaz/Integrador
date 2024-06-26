import express from 'express';
import bodyParser from 'body-parser';
import './Database/Sequelize';

import { UsersController } from './task/infraestructure/controllers/UsersController';
import { PostgresUserRepository } from './task/infraestructure/repositories/PostgresUsersRepository';
import { UserService } from './task/aplication/services/user-cases/UserServie';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);
const usersController = new UsersController(userService);

app.post('/api/v1/users', (req,res) => usersController.registerUser(req,res));
app.post('/api/v1/userslogin', (req,res) => usersController.loginUser(req, res));
app.delete('/api/v1/delete/:email', (req, res) => usersController.deleteUser(req, res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});