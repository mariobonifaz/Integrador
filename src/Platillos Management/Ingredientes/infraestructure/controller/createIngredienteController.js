import { CreateIngredienteUseCase } from "../../application/usecase/createIngredienteUseCase.js";

export class CreateIngredienteController{
    constructor(createIngredienteUseCase){
        this.createIngredienteUseCase = createIngredienteUseCase;
    }
    async run(req,res){
        try {
            const{nombre, cantidad} = req.body;
            const result = await this.createIngredienteUseCase.run({nombre,cantidad});

            if (result) {
                res.status(201).json(result);
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