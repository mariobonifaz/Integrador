import { GetAllPlatilloUseCase } from "../../application/UseCase/getAllPlatilloUseCase.js";
import { Platillo } from "../../domain/entity/platillo.js";

export class GetAllPlatilloController{
    constructor(getAllPlatilloUseCase){
        this.getAllPlatilloUseCase = getAllPlatilloUseCase;
    }
     async run(req,res){
        try {
            
            const result = await this.getAllPlatilloUseCase.run()
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({ error: "Unable to register product" });
            }
        } catch (error) {
            return null;
        }
        
        
     }
}