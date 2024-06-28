import { UpdateIngredienteUseCase } from "../../application/usecase/updateIngredienteUseCase.js";
import Ingrediente from "../../domain/entity/ingrediente.js";

export class UpdateIngredienteController{
    constructor(updateIngredienteUseCase){
        this.updateIngredienteUseCase = updateIngredienteUseCase;
    }
    async run(req, res){
        try {
            const {id} = req.params;
            const {nombre, cantidad} = req.body;
            console.log(id)
            const result = await this.updateIngredienteUseCase.run({id, nombre, cantidad});

            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({ error: "Unable to update ingrediente" });
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