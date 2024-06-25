import { Users } from "../../domain/entities/Users";

export interface UserRepository{
    registerUsers( users: Users ): Promise <Users>;
    findByEmail(email: string): Promise<Users | null>;
}