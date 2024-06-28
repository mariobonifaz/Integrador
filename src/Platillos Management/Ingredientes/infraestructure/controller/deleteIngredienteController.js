import { DeleteIngredienteUseCase } from "../../application/usecase/deleteIngredienteUseCase.js";

export class DeleteIngredienteController{
    constructor(deleteIngredienteUseCase){
        this.deleteIngredienteUseCase = deleteIngredienteUseCase;
    }
    async run(req,res){
        try {
            const{id} = req.params;
            const result = await this.deleteIngredienteUseCase.run({id});

            if (result) {
                res.status(201).json(result);
            } else {
                res.status(500).json({ error: "Unable to delete product" });
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