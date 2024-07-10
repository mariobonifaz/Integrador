import { Directions } from "../../domain/entities/Directions";
import { DirectionsRepository } from "../../domain/entities/repositories/DirectionRepository";

export class DirectionService{
    constructor(
        private directionRepository: DirectionsRepository
    ){}

    async createDirection(directionData: Partial<Directions>, userId: number): Promise<Directions> {
        return await this.directionRepository.createDirection(directionData, userId);
      }

    async getDirectionById(directionId: string): Promise<Directions | null>{
        try {
            return await this.directionRepository.findById(directionId);
        } catch (error) {
            throw new Error(`Error getting direction by id:${(error as Error).message}`);
        }
    }

    async getAllDirections(): Promise<Directions[]>{
        try {
            return await this.directionRepository.findAll();
        } catch (error) {
            throw new Error(`Error getting all directions:${(error as Error).message}`);
        }
    }

    async deleteDirectionById(directionId: string): Promise<void>{
        try {
            await this.directionRepository.deleteById(directionId);
        } catch (error) {
            throw new Error(`Error deleting direction:${(error as Error).message}`);
        }
    }

    async updateDirection(directionId: string, directiondata: Partial<Directions>): Promise<Directions | null>{
        try {
            return await this.directionRepository.update(directionId, directiondata);
        } catch (error) {
            throw new Error(`Error deleting direction:${(error as Error).message}`);
        }
    }

    async getDirectionsByUserId(userId: number): Promise<Directions[]> {
        return await this.directionRepository.findAllByUserId(userId);
      }
}