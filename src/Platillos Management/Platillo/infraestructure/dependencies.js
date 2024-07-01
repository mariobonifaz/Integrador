import { MysqlPlatilloRepository } from "./repository/mysqlPlatilloRepository.js";
import { MongoPlatilloRepository } from "./repository/mongoDbPlatilloRepository.js";

import { CreatePlatilloUseCase } from "../application/UseCase/createPlatilloUseCase.js";
import { CreatePlatilloController } from "./controller/createPlantillaController.js";

import { GetAllPlatilloUseCase } from "../application/UseCase/getAllPlatilloUseCase.js";
import { GetAllPlatilloController } from "./controller/getAllPlatilloController.js";

import { GetPlatilloByIdUseCase } from "../application/UseCase/getPlatilloByIdUseCase.js";
import { GetPlatilloByIdController } from "./controller/getPlatilloByIdController.js";

import { UpdatePlatilloUseCase } from "../application/UseCase/updatePlatilloUseCase.js";
import { UpdatePlatilloController } from "./controller/updatePlatilloController.js";

import { DeletePlatilloUseCase } from "../application/UseCase/deletePlatilloUseCase.js";
import { DeletePlatilloController } from "./controller/deletePlatilloController.js";


//const mysqlPlatilloRepository = new MysqlPlatilloRepository();
const mongoPlatilloRepository = new MongoPlatilloRepository();


const createPlatilloUseCase = new CreatePlatilloUseCase(mongoPlatilloRepository);
export const createPlatillaController = new CreatePlatilloController(createPlatilloUseCase);

const getAllPlatilloUseCase = new GetAllPlatilloUseCase(mongoPlatilloRepository);
export const  getAllPlatilloController = new GetAllPlatilloController(getAllPlatilloUseCase);

const getPlatilloByIdUseCase = new GetPlatilloByIdUseCase(mongoPlatilloRepository);
export const getPlatilloByIdController = new GetPlatilloByIdController(getPlatilloByIdUseCase);

const updatePlatilloUseCase = new UpdatePlatilloUseCase(mongoPlatilloRepository);
export const updatePlatilloController = new UpdatePlatilloController(updatePlatilloUseCase);

const deletePlatilloUseCase = new DeletePlatilloUseCase(mongoPlatilloRepository);
export const deletePlatilloController = new DeletePlatilloController(deletePlatilloUseCase)