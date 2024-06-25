"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./Database/Sequelize");
const UsersController_1 = require("./task/infraestructure/controllers/UsersController");
const PostgresUsersRepository_1 = require("./task/infraestructure/repositories/PostgresUsersRepository");
const UserServie_1 = require("./task/aplication/services/user-cases/UserServie");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
const userRepository = new PostgresUsersRepository_1.PostgresUserRepository();
const userService = new UserServie_1.UserService(userRepository);
const usersController = new UsersController_1.UsersController(userService);
app.post('/api/v1/users', (req, res) => usersController.registerUser(req, res));
app.post('/api/v1/userslogin', (req, res) => usersController.loginUser(req, res));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
