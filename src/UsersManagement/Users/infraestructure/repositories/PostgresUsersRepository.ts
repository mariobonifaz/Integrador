import { Users } from "../../domain/entities/Users";
import { UserRepository } from "../../domain/entities/Port/UserRepository";
import UsersModel from "../../domain/entities/Users";

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
            throw new Error(`Error creating users: ${(error as Error).message}`);
        }
    }
    
    async findByEmail(email: string): Promise<Users | null> {
        try {
            return await UsersModel.findOne({ where: { email } });
        } catch (error) {
            throw new Error(`Error finding user by email: ${(error as Error).message}`);
        }
    }

    async deleteUserByEmail(email: string): Promise<boolean> {
        try {
            const result = await UsersModel.destroy({ where: { email } });
            return result > 0;
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }

    async findById(userId: string): Promise<Users | null> {
        try {
            const user = await Users.findByPk(userId);
            return user;
        } catch (error) {
            throw new Error(`Error geting user by id: ${(error as Error).message}`);
        }
    }

    async findAll(): Promise<Users[]> {
        try {
            const users = await Users.findAll();
            return users;
        } catch (error) {
            throw new Error(`Error geting all users: ${(error as Error).message}`);
        }
    }

    async updatePassword(userId: string, newPassword: string): Promise<boolean> {
        try {
            const result = await UsersModel.update({ password: newPassword }, {
                where: { id: userId }
            });
            return result[0] > 0;
        } catch (error) {
            throw new Error(`Error updating password: ${(error as Error).message}`);
        }
    }
}
