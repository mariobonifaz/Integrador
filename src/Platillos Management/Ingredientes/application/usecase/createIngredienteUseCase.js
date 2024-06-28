import Ingrediente from "../../domain/entity/ingrediente.js";
import { IngredienteRepository } from "../../domain/port/ingredienteInterface.js";
import { validateCreateIngrediente } from "../../domain/validation/ingredientesValitaion.js";

export class CreateIngredienteUseCase{
    constructor(ingredienteRepository){
        this.ingredienteRepository = ingredienteRepository;
    }

    async run({nombre, cantidad}){

        const { error } = validateCreateIngrediente.validate({nombre, cantidad});
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            return await this.ingredienteRepository.createIngrediente(nombre, cantidad);
        } catch (error) {
            return null;
        }
    }
}