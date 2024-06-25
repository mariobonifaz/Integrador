import { Request, Response } from 'express';
import { UserService } from '../../aplication/services/user-cases/UserServie';

export class UsersController {
    constructor(private userService: UserService){}

    async registerUser( req: Request, res: Response){
        try {
            const users = await this.userService.registerUser(req.body);
            res.status(201).json(users);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}