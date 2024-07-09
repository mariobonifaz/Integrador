import { Directions } from "../../domain/entities/Directions";
import { DirectionsRepository } from "../../domain/entities/repositories/DirectionRepository";
import { UserDirections } from "../../../User-Directions/User-Directions";

export class PostgresDirectionsRepository implements DirectionsRepository {
  async createDirection(directionData: Partial<Directions>, userId: number): Promise<Directions> {
    const direction = await Directions.create(directionData);
    await UserDirections.create({ userId, directionId: direction.id });
    return direction;
  }

  async findById(directionId: string): Promise<Directions | null> {
      try {
        const direction = await Directions.findByPk(directionId);
        return direction;
      } catch (error) {
        throw new Error(`Error geting direction by id: ${(error as Error).message}`);
      }
  }

  async findAll(): Promise<Directions[]> {
      try {
        const directions = await Directions.findAll();
        return directions;
      } catch (error) {
        throw new Error(`Error geting all directions: ${(error as Error).message}`);
      }
  }

  async deleteById(directionId: string): Promise<void> {
      try {
        const direction = await Directions.findByPk(directionId);
        if (direction) {
          await direction.destroy();
        }
      } catch (error) {
        throw new Error(`Error deleting direction: ${(error as Error).message}`);
      }
  }

  async update(directionsId: string, directionsData: Partial<Directions>): Promise<Directions | null> {
      try {
        const direction = await Directions.findByPk(directionsId);
        if (!direction) {
          return null;
        }
        await direction.update(directionsData);
        return direction;
      } catch (error) {
        throw new Error(`Error updating direction: ${(error as Error).message}`);
      }
  }
}
