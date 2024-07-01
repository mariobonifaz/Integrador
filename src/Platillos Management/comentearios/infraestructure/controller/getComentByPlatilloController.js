import Coment from "../../domain/entity/coment.js";
import { ComentRepository } from "../../domain/port/comentRepository.js";

export class GetComentByPlatilloController{
    constructor(comentRepository){
        this.comentRepository = comentRepository;
    }
     async run(req,res){
        try {
            const id_platillo = req.params
            const result = await this.comentRepository.run(id_platillo)
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({ error: "Unable to coment" });
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