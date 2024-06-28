import { MongoIngredienteRepository } from "./repository/mongoDBIngredienteRepository.js";

import { CreateIngredienteUseCase } from "../application/usecase/createIngredienteUseCase.js";
import { CreateIngredienteController } from "./controller/createIngredienteController.js";

import { GetIngredientesUseCase } from "../application/usecase/getIngredientesUseCase.js";
import { GetIngredientesController } from "./controller/getIngredientesController.js";

import { UpdateIngredienteUseCase } from "../application/usecase/updateIngredienteUseCase.js";
import { UpdateIngredienteController } from "./controller/updateIngredienteController.js";

import { DeleteIngredienteUseCase } from "../application/usecase/deleteIngredienteUseCase.js";
import { DeleteIngredienteController } from "./controller/deleteIngredienteController.js";

import { GetIngredienteUseCase } from "../application/usecase/getIngredienteUseCase.js";
import { GetIngredienteController } from "./controller/getIngredienteController.js";

const mongoIngredienteRepository = new MongoIngredienteRepository()

const createIngredienteUseCase = new CreateIngredienteUseCase(mongoIngredienteRepository);
export const createIngredienteController = new CreateIngredienteController(createIngredienteUseCase);

const getIngredientesUseCase = new GetIngredientesUseCase(mongoIngredienteRepository);
export const getIngredientesController = new GetIngredientesController(getIngredientesUseCase);

const updateIngredienteUseCase = new UpdateIngredienteUseCase(mongoIngredienteRepository);
export const updateIngredienteController = new UpdateIngredienteController(updateIngredienteUseCase);

const deleteIngredienteUseCase = new DeleteIngredienteUseCase(mongoIngredienteRepository);
export const deleteIngredienteController = new DeleteIngredienteController(deleteIngredienteUseCase);

const getIngredienteUseCase = new GetIngredienteUseCase(mongoIngredienteRepository);
export const getIngredienteController = new GetIngredienteController(getIngredienteUseCase)