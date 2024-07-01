import { DeletePlatilloUseCase } from "../../application/UseCase/deletePlatilloUseCase.js";

export class DeletePlatilloController{
    constructor(deletePlatilloUseCase){
        this.deletePlatilloUseCase = deletePlatilloUseCase
    }
    async run(req,res){
        try {
            const id = req.params;
            const result = await this.deletePlatilloUseCase.run(id);

            if (result) {
                res.status(201).json(result);
            } else {
                res.status(500).json({ error: "Unable to delete Platillo" });
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
