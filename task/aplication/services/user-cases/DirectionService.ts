import { Directions } from "../../../domain/entities/Directions";
import { DirectionsRepository } from "../../../infraestructure/repositories/DirectionRepository";

export class DirectionService{
    constructor(
        private directionRepository: DirectionsRepository
    ){}

    async createDirection(direction: Directions): Promise<Directions>{
        try {
            return await this.directionRepository.createDirections(direction);
        } catch (error) {
            throw new Error(`Error creating direction:${(error as Error).message}`);
        }
    }
}