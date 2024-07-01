import { GetPlatilloByIdUseCase } from "../../application/UseCase/getPlatilloByIdUseCase.js";

export class GetPlatilloByIdController{
    constructor(getPlatilloByIdUseCase){
        this.getPlatilloByIdUseCase = getPlatilloByIdUseCase;
    }
    async run(req,res){
        try {
            const{id} = req.params;
            const result = await this.getPlatilloByIdUseCase.run({id});

            if (result) {
                res.status(201).json(result);
            } else {
                res.status(500).json({ error: "Unable to get Platillo" });
            }
             
        } catch (error) {
            if (error.message.startsWith("Validation error:")) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    }
}