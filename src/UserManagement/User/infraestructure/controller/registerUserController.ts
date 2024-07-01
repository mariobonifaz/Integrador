import { RegisterUserUseCase } from "../../application/UseCase/registerUserUseCase";
import { Request,Response } from "express";
import { User } from "../../domain/entity/user";

export class RegisterUserController{
    constructor(readonly registerUserUseCase:RegisterUserUseCase){}

    async run(req:Request, res:Response){
        try {
            const {nombre,email,password,phone,admin} = req.body;

            const newUser = await this.registerUserUseCase.run(nombre,email,password,phone,admin);
            if (newUser instanceof User) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        id: newUser.id,
                        nombre:newUser.name,
                        email: newUser.email,
                        password:newUser.password,
                        phone:newUser.phone,
                        admin:newUser.admin
                    },
                    message: "Usuario ha sido creado exitosamente"
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [], // TODO: implementar validaciones
                    message: "Error al crear Usuario nuevo, intentalo mas tarde"
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while get the user."
            });   
        }
    }
}