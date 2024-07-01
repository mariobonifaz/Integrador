import Coment from "../../domain/entity/coment.js";
import { ComentRepository } from "../../domain/port/comentRepository.js";
import { validateCreateComent } from "../../domain/validation/validationComents.js";

export class CreateComentUseCase{
    constructor(comentRepository){
        this.comentRepository = comentRepository;
    }
    async run(coment){

        const { error } = validateCreateComent.validate(coment);
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            const newComent ={
                id_platillo: coment.id_platillo,
                id_user:coment.id_user,
                comentario: coment.comentario,
                calificacion: coment.calificacion,
            }
            return await this.comentRepository.createComent(newComent);
        } catch (error) {
            console.error("Error crear el Platillo:", error);
            throw error;
        }
    }
}