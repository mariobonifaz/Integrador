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

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.loginUser(email, password);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const success = await this.userService.deleteUserByEmail(email);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'User not found' });
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