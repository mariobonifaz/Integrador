import { createIngredienteController,getIngredientesController,updateIngredienteController,deleteIngredienteController, getIngredienteController } from "../dependencies.js";
import express from 'express';

export const ingredienteRoute = express.Router();

ingredienteRoute.post("/", createIngredienteController.run.bind(createIngredienteController));
ingredienteRoute.get("/", getIngredientesController.run.bind(getIngredientesController));
ingredienteRoute.put("/:id", updateIngredienteController.run.bind(updateIngredienteController));
ingredienteRoute.delete("/:id", deleteIngredienteController.run.bind(deleteIngredienteController));
ingredienteRoute.get("/:id", getIngredienteController.run.bind(getIngredienteController));



