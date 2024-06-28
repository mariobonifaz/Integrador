import { MysqlPlatilloRepository } from "./repository/mysqlPlatilloRepository.js";
import { MongoPlatilloRepository } from "./repository/mongoDbPlatilloRepository.js";

import { CreatePlatilloUseCase } from "../application/UseCase/createPlatilloUseCase.js";
import { CreatePlatilloController } from "./controller/createPlantillaController.js";

//const mysqlPlatilloRepository = new MysqlPlatilloRepository();
const mongoPlatilloRepository = new MongoPlatilloRepository();


const createPlatilloUseCase = new CreatePlatilloUseCase(mongoPlatilloRepository);
export const createPlatillaController = new CreatePlatilloController(createPlatilloUseCase);