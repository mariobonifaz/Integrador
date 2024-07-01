import Platillo from "../../domain/entity/platillo.js";
import { PlatilloRepository } from "../../domain/port/platilloInterface.js";
import { validateUpdatePlatillo } from "../../domain/validation/platilloValidation.js";


export class UpdatePlatilloUseCase{
    constructor(platilloRepository){
        this.platilloRepository = platilloRepository;
    }
    async run({id,nombre_platillo,descripcion,precio,categoria,imagen}){

        const { error } = validateUpdatePlatillo.validate({id,nombre_platillo,descripcion,precio,categoria,imagen});
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }

        try {
            return await this.platilloRepository.updatePlatillo({id,nombre_platillo,descripcion,precio,categoria,imagen})
        } catch (error) {
            console.error("Error actualizando Platillo:", error);
            throw error;
        }
    }
}