import { Request, Response } from "express";
import { DirectionService } from "../../aplication/Use-Cases/DirectionService";

export class DirectionsController {
    constructor( private directionService: DirectionService){}

    async createDirection(req: Request, res: Response): Promise<void> {
        try {
          const { calle, postcode, colonia, num_ext, num_int, estado, ciudad, descripcion, userId } = req.body;
          const directionData = { calle, postcode, colonia, num_ext, num_int, estado, ciudad, descripcion};
          const direction = await this.directionService.createDirection(directionData, userId);
          res.status(201).json(direction);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
      }

    async getDirectionById(req: Request, res:Response): Promise<void>{
        try {
            const direction = await this.directionService.getDirectionById(req.params.id);
            if (direction){
                res.status(200).json(direction);
            } else {
                res.status(404).send('Direction not found')
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async getAllDirections(req: Request, res:Response): Promise<void> { 
        try {
            const directions = await this.directionService.getAllDirections();
            res.status(200).json(directions);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async deleteDirectionById(req: Request, res:Response): Promise <void>{
        try {
            await this.directionService.deleteDirectionById(req.params.id);
            res.status(204).send();
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async updateDirection(req:Request, res: Response): Promise<void>{
        try {
            const directions = await this.directionService.updateDirection(req.params.id, req.body);
            if (directions) {
                res.status(200).json(directions);
            } else {
                res.status(404).send('Direction not found');
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}
