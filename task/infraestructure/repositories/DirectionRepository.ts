import { Directions } from "../../domain/entities/Directions";

export interface DirectionsRepository{
    createDirections( direction: Directions ): Promise <Directions>;
}