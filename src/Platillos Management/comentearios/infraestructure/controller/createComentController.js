import { CreateComentUseCase } from "../../application/UseCase/createComentUseCase.js";


export class CreateComentController{
    constructor(createComentUseCase){
        this.createComentUseCase = createComentUseCase
    }
    async run(req,res){
        try {
            const {id_platillo,id_user,comentario,calificacion} = req.body;
            const newComent = await this.createComentUseCase.run({id_platillo,id_user,comentario,calificacion})

            if (newComent) {
                res.status(201).json(newComent);
            } else {
                res.status(500).json({ error: "Unable to create coment" });
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