import Ingrediente from "../../domain/entity/ingrediente.js";
import { IngredienteRepository } from "../../domain/port/ingredienteInterface.js";

export class GetIngredientesUseCase{
    constructor(ingredienteRepository){
        this.ingredienteRepository = ingredienteRepository;
    }
    async run(){
        try {
            return await this.ingredienteRepository.getIngredientes();
        } catch (error) {
            return null;
        }
    }
}