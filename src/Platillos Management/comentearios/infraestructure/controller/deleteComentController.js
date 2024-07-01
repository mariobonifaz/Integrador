import { DeleteComentUseCase } from "../../application/UseCase/deleteComentUseCase.js";

export class DeleteComentController{
    constructor(deleteComentUseCase){
        this.deleteComentUseCase = deleteComentUseCase;
    }
    async run(req, res){
        try {
            const {id, id_user} = req.body
            const deleteComent = await this.deleteComentUseCase.run({id,id_user});

            if (deleteComent) {
                res.status(200).json(deleteComent);
            } else {
                res.status(500).json({ error: "Unable to eliminate coment" });
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