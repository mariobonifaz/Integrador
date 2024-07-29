import { Users } from "../Users";

export interface UserRepository{
    registerUsers( users: Users ): Promise <Users>;
    findByEmail(email: string): Promise<Users | null>;
    deleteUserByEmail(email: string): Promise<boolean>;
    findById(userId: string): Promise<Users | null>;
    findAll(): Promise<Users[]>;
    updatePassword(userId: string, newPassword: string): Promise<boolean>;
}
