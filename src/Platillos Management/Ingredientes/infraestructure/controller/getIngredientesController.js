import { GetIngredientesUseCase } from "../../application/usecase/getIngredientesUseCase.js";

export class GetIngredientesController{
    constructor(getIngredientesUseCase){
        this.getIngredientesUseCase = getIngredientesUseCase;
    }
    async run(req,res){
        try {
            const result = await this.getIngredientesUseCase.run();
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({ error: "Unable to register product" });
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

