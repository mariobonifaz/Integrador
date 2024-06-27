import { Directions } from "../../domain/entities/Directions";
import { DirectionsRepository } from "./DirectionRepository";
import DirectionsModel from "../../domain/entities/DirectionsModel";

export class PostgresDirectionsRepository implements DirectionsRepository {
    async createDirections(direction: Directions): Promise<Directions> {
        try {
          const newDirection = await DirectionsModel.create({
            calle: direction.calle,
            postcode: direction.postcode,
            colonia: direction.colonia,
            num_ext: direction.num_ext,
            num_int: direction.num_int,
            estado: direction.estado,
            ciudad: direction.ciudad,
            descripcion: direction.descripcion
          });
          return newDirection;
        } catch (error) {
            throw new Error(`Error creating direction: ${(error as Error).message}`);
        }
    }
}