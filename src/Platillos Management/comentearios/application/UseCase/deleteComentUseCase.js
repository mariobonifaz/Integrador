import Coment from "../../domain/entity/coment.js";
import { ComentRepository } from "../../domain/port/comentRepository.js";
import { validateDeleteComent } from "../../domain/validation/validationComents.js";

export class DeleteComentUseCase{
    constructor(comentRepository){
        this.comentRepository = comentRepository;
    }
    async run({id,id_user}){

        const { error } = validateDeleteComent.validate({id,id_user});
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            return await this.comentRepository.deleteComent(id,id_user);
        } catch (error) {
            console.error("Error al eliminar los comentarios:", error);
            throw error;
        }
    }
}