import Platillo from "../../domain/entity/platillo.js";
import { PlatilloRepository } from "../../domain/port/platilloInterface.js";
import { validateIdPlatillo } from "../../domain/validation/platilloValidation.js";

export class GetPlatilloByIdUseCase{
    constructor(platilloRepository){
        this.platilloRepository = platilloRepository;
    }
    async run({id}){
        const { error } = validateIdPlatillo.validate({id});
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            return await this.platilloRepository.getPlatilloById(id);
        } catch (error) {
            console.error("Error al obtener el platillo:", error);
            throw error;
        }
    }
}