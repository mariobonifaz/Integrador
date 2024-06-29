import Platillo from "../../domain/entity/platillo.js";
import { PlatilloRepository } from "../../domain/port/platilloInterface.js";

export class GetAllPlatilloUseCase{
    constructor(platilloRepository){
        this.PlatilloRepository = platilloRepository;
    }
    async run(){
        try {
            return await this.PlatilloRepository.getAllPlatillo();
        } catch (error) {
            return null;
        }
    }
}