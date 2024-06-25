import { Users } from "../../domain/entities/Users";
import { UserRepository } from "./UserRepository";
import UsersModel from "../../domain/entities/UsersModel";

export class PostgresUserRepository implements UserRepository {
    async registerUsers(users: Users): Promise<Users> {
        try {
            const newUser = await UsersModel.create({
                name: users.name,
                phone: users.phone,
                email: users.email,
                password: users.password,
                admin: users.admin
            });
            return newUser;
        } catch (error) {
            throw new Error(`Error creating product: ${(error as Error).message}`);
        }
    }
}