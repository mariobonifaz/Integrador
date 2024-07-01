import { LoginUserUseCase } from "../../application/UseCase/loginUserUseCase";
import { Request, Response } from "express";

export class LoginUserController{
    constructor(readonly loginUserUseCase: LoginUserUseCase ){}

    async run(req:Request,res:Response) {
        
        try {
           
            let {email,password} = req.body
    
            let loginUser = await this.loginUserUseCase.run(email, password)

            
            if (loginUser) {
                return res.status(201).send(
                   loginUser
                )
            }else{
                return res.status(400).send({
                    status: "error",
                    message: "Errro al inciar sesion",
                })
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