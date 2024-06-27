import express from 'express';
import bodyParser from 'body-parser';
import './Database/Sequelize';

import { UsersController } from './task/infraestructure/controllers/UsersController';
import { PostgresUserRepository } from './task/infraestructure/repositories/PostgresUsersRepository';
import { UserService } from './task/aplication/services/user-cases/UserServie';
import { DirectionsController } from './task/infraestructure/controllers/DirectionsController';
import { PostgresDirectionsRepository } from './task/infraestructure/repositories/PostgresDirectionRepository';
import { DirectionService } from './task/aplication/services/user-cases/DirectionService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);
const usersController = new UsersController(userService);

const directionRepository = new PostgresDirectionsRepository();
const directionService = new DirectionService(directionRepository);
const directionController = new DirectionsController(directionService);

app.post('/api/v1/users', (req,res) => usersController.registerUser(req,res));
app.post('/api/v1/userslogin', (req,res) => usersController.loginUser(req, res));
app.delete('/api/v1/delete/:email', (req, res) => usersController.deleteUser(req, res));

app.post('/api/v2/directions', (req,res) => directionController.createDirection(req,res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});