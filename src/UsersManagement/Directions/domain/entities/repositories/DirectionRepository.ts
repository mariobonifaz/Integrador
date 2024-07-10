import { Directions } from "../Directions";

export interface DirectionsRepository{
    createDirection(directionData: Partial<Directions>, userId: number): Promise<Directions>;
    findAll(): Promise<Directions[]>;
    findById(directionId: string): Promise<Directions | null>;
    deleteById(directionId: string): Promise<void>;
    update(directionsId: string, directionsData: Partial<Directions>): Promise< Directions | null>
    findAllByUserId(userId: number): Promise<Directions[]>;
}
