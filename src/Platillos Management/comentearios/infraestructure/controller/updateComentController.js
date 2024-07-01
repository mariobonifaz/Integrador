import { UpdateComentUseCase } from "../../application/UseCase/updateComentUseCase.js";

export class UpdateComentController{
    constructor(updateComentUseCase){
        this.updateComentUseCase = updateComentUseCase;
    }
    async run(req, res){
        try {
            const {id} = req.params
            const {id_user,comentario,calificacion} = req.body
            const updateComent = await this.updateComentUseCase.run({id,id_user,comentario,calificacion});

            if (updateComent) {
                res.status(200).json(updateComent);
            } else {
                res.status(500).json({ error: "Unable to update coment" });
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