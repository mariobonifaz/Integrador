import { CreatePlatilloUseCase } from "../../application/UseCase/createPlatilloUseCase.js";
import { Platillo } from "../../domain/entity/platillo.js";

export class CreatePlatilloController{
    constructor(createPlatilloUseCase){
        this.createPlatilloUseCase = createPlatilloUseCase;
    }
     async run(req,res){
        try {
            
            const {nombre_platillo,descripcion,precio,categoria,imagen} = req.body
            const {ingredientes} = req.body
            console.log("Controller", nombre_platillo,ingredientes)
            const result = await this.createPlatilloUseCase.run({nombre_platillo,descripcion,precio,categoria,imagen},ingredientes);
            if (result) {
                res.status(201).json(result);
            } else {
                res.status(500).json({ error: "Unable to register product" });
            }
        } catch (error) {
            return null;
        }
        
        
     }
}