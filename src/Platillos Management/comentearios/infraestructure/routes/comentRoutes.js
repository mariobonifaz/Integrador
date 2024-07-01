import { createComentController,getComentByPlatilloController,deleteComentController,updateComentController,getAllComentsController} from "../dependencies.js";
import express from "express";

export const comentRoute = express.Router();

comentRoute.post("/",createComentController.run.bind(createComentController))
comentRoute.get("/:id_platillo",getComentByPlatilloController.run.bind(getComentByPlatilloController))
comentRoute.delete("/",deleteComentController.run.bind(deleteComentController))
comentRoute.put("/:id",updateComentController.run.bind(updateComentController))
comentRoute.get("/",getAllComentsController.run.bind(getAllComentsController))


