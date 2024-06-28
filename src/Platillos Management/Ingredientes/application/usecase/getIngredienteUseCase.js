import Ingrediente from "../../domain/entity/ingrediente.js";
import { IngredienteRepository } from "../../domain/port/ingredienteInterface.js";
import { validateIdIngrediente } from "../../domain/validation/ingredientesValitaion.js";

export class GetIngredienteUseCase{
    constructor(ingredienteRepository){
        this.ingredienteRepository = ingredienteRepository;
    }
    async run({id}){
        const { error } = validateIdIngrediente.validate({id});
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        try {
            return await this.ingredienteRepository.getIngrediente(id);
        } catch (error) {
            return null;
        }
    }
}