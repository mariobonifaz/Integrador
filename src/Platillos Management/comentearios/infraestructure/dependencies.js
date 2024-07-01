import { MongoDBComentRepository } from "./repository/mongoDbComentRepository.js";

import { CreateComentUseCase } from "../application/UseCase/createComentUseCase.js";
import { CreateComentController } from "./controller/createComentController.js";

import { GetComentByPlatilloUseCase } from "../application/UseCase/getComentsByPlatilloUseCase.js";
import { GetComentByPlatilloController } from "./controller/getComentByPlatilloController.js";

import { DeleteComentUseCase } from "../application/UseCase/deleteComentUseCase.js";
import { DeleteComentController } from "./controller/deleteComentController.js";

import { UpdateComentUseCase } from "../application/UseCase/updateComentUseCase.js";
import { UpdateComentController } from "./controller/updateComentController.js";

import { GetAllComentsUseCase } from "../application/UseCase/getAllComentsUseCase.js";
import { GetAllComentsController } from "./controller/getAllComentsController.js";

const mongoDBComentRepository = new MongoDBComentRepository()

const createComentUseCase = new CreateComentUseCase(mongoDBComentRepository);
export const createComentController = new CreateComentController(createComentUseCase);

const getComentByPlatilloUseCase = new GetComentByPlatilloUseCase(mongoDBComentRepository);
export const getComentByPlatilloController = new GetComentByPlatilloController(getComentByPlatilloUseCase);

const deleteComentUseCase = new DeleteComentUseCase(mongoDBComentRepository);
export const deleteComentController = new DeleteComentController(deleteComentUseCase);

const updateComentUseCase = new UpdateComentUseCase(mongoDBComentRepository);
export const updateComentController = new UpdateComentController(updateComentUseCase);

const getAllComentsUseCase = new GetAllComentsUseCase(mongoDBComentRepository);
export const getAllComentsController = new GetAllComentsController(getAllComentsUseCase);


