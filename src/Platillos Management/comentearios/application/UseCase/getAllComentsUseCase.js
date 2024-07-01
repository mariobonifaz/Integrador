import { validateIdComent } from "../../domain/validation/validationComents.js";
import Coment from "../../domain/entity/coment.js";
import { ComentRepository } from "../../domain/port/comentRepository.js";

export class GetAllComentsUseCase{
    constructor(comentRepository){
        this.comentRepository = comentRepository;
    }
    async run(){
        try {
            return await this.comentRepository.getAllComents();
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
            throw error;
        }
    }
}