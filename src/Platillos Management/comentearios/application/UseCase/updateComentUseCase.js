import Coment from "../../domain/entity/coment.js";
import { ComentRepository } from "../../domain/port/comentRepository.js";
import { validateUpdateComent } from "../../domain/validation/validationComents.js";

export class UpdateComentUseCase {
    constructor(comentRepository){
        this.comentRepository = comentRepository;
    }
    async run({id,id_user,comentario,calificacion}){

        const { error } = validateUpdateComent.validate({id,id_user,comentario,calificacion});
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            return await this.comentRepository.updateComent(id,id_user,comentario,calificacion);
        } catch (error) {
            console.error("Error al modificar los comentarios:", error);
            throw error;
        }
    }
}