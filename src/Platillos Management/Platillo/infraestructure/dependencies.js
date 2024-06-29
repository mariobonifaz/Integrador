import { MysqlPlatilloRepository } from "./repository/mysqlPlatilloRepository.js";
import { MongoPlatilloRepository } from "./repository/mongoDbPlatilloRepository.js";

import { CreatePlatilloUseCase } from "../application/UseCase/createPlatilloUseCase.js";
import { CreatePlatilloController } from "./controller/createPlantillaController.js";

import { GetAllPlatilloUseCase } from "../application/UseCase/getAllPlatilloUseCase.js";
import { GetAllPlatilloController } from "./controller/getAllPlatilloController.js";

//const mysqlPlatilloRepository = new MysqlPlatilloRepository();
const mongoPlatilloRepository = new MongoPlatilloRepository();


const createPlatilloUseCase = new CreatePlatilloUseCase(mongoPlatilloRepository);
export const createPlatillaController = new CreatePlatilloController(createPlatilloUseCase);

const getAllPlatilloUseCase = new GetAllPlatilloUseCase(mongoPlatilloRepository);
export const  getAllPlatilloController = new GetAllPlatilloController(getAllPlatilloUseCase);