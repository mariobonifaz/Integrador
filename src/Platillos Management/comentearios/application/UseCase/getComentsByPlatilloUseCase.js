import { validateIdComent } from "../../domain/validation/validationComents.js";
import Coment from "../../domain/entity/coment.js";
import { ComentRepository } from "../../domain/port/comentRepository.js";

export class GetComentByPlatilloUseCase{
    constructor(comentRepository){
        this.comentRepository = comentRepository;
    }
    async run({id_platillo}){
        console.log(id_platillo)
        const { error } = validateIdComent.validate({id_platillo});
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            return await this.comentRepository.getComentsByPlatillo(id_platillo);
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
            throw error;
        }
    }
}