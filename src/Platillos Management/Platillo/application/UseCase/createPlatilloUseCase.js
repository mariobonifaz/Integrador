import Platillo from "../../domain/entity/platillo.js";
import { PlatilloRepository } from "../../domain/port/platilloInterface.js";
import { validateCreatePlatillo } from "../../domain/validation/platilloValidation.js";

export class CreatePlatilloUseCase{
    constructor(platilloRepository){
        this.PlatilloRepository = platilloRepository
    }
    async run(platillo, ingredientes){
        
        const { error } = validateCreatePlatillo.validate(platillo);
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            console.log("UseCase",platillo.nombre_platillo,ingredientes)
            const newPlatillo = {
                nombre_platillo: platillo.nombre_platillo,
                descripcion: platillo.descripcion,
                precio: platillo.precio,
                categoria: platillo.categoria,
                imagen:platillo.imagen

            };
            return await this.PlatilloRepository.createPlatillo(newPlatillo,ingredientes);
        } catch (error) {
            return null;
        }
    }
}