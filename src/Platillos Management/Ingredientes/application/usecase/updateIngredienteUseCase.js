import Ingrediente from "../../domain/entity/ingrediente.js";
import { IngredienteRepository } from "../../domain/port/ingredienteInterface.js";
import { validateUpdateIngrediente } from "../../domain/validation/ingredientesValitaion.js";

export class UpdateIngredienteUseCase{
    constructor(ingredienteRepository){
        this.ingredienteRepository = ingredienteRepository;
    }

    async run({id,nombre,cantidad}){

        const { error } = validateUpdateIngrediente.validate({ id, nombre, cantidad });
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }

        try {
            console.log("UseCase",id)
            return await this.ingredienteRepository.updateIngredientes(id,nombre,cantidad);
        } catch (error) {
            console.error("Error actualizando ingrediente:", error);
            throw error;
        }
    }
}