import { GetIngredienteUseCase } from "../../application/usecase/getIngredienteUseCase.js";

export class GetIngredienteController{
    constructor(getIngredienteUseCase){
        this.getIngredienteUseCase = getIngredienteUseCase;
    }
    async run(req,res){
        try {
            const{id} = req.params;
            const result = await this.getIngredienteUseCase.run({id});

            if (result) {
                res.status(201).json(result);
            } else {
                res.status(500).json({ error: "Unable to get Ingrediente" });
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