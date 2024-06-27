import { Request, Response } from "express";
import { DirectionService } from "../../aplication/services/user-cases/DirectionService";

export class DirectionsController {
    constructor( private directionService: DirectionService){}

    async createDirection( req: Request, res: Response){
        try{
            const directions = await this.directionService.createDirection(req.body);
            res.status(201).json(directions);
        } catch(err) {
            if (err instanceof Error) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}