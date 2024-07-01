import { PostgresSqlUserRepository } from "./repository/postgreSqlUserRepository";

import { RegisterUserUseCase } from "../application/UseCase/registerUserUseCase";
import { RegisterUserController } from "./controller/registerUserController";

import { LoginUserUseCase } from "../application/UseCase/loginUserUseCase";
import { LoginUserController } from "./controller/loginUserController";

const postgresSqlUserRepository = new PostgresSqlUserRepository()

const registerUserUseCasec = new RegisterUserUseCase(postgresSqlUserRepository);
export const registerUserController = new RegisterUserController(registerUserUseCasec);

const loginUserUseCase = new LoginUserUseCase(postgresSqlUserRepository);
export const loginUserController = new LoginUserController(loginUserUseCase);