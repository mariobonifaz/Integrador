import express  from "express";
import { registerUserController,loginUserController } from "../dependencies";

export const userRoute = express.Router();

userRoute.post("/",registerUserController.run.bind(registerUserController));
userRoute.post("/login/",loginUserController.run.bind(loginUserController));
