import { Users } from "../../domain/entities/Users";
import { UserRepository } from "../../domain/entities/Port/UserRepository";

export class UserService{
    constructor(
        private userRepository: UserRepository
    ){}

    async registerUser(user: Users): Promise<Users> {
        try {
            return await this.userRepository.registerUsers(user);
        } catch (error) {
            throw new Error(`Error creating user:${(error as Error).message}`);
        }
    }
    
    async loginUser(email: string, password: string): Promise<Users | null> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (user && user.password === password) {
                return user;
            }
            return null;
        } catch (error) {
            throw new Error(`Error logging in user: ${(error as Error).message}`);
        }
    }

    async deleteUserByEmail(email: string): Promise<boolean> {
        try {
            return await this.userRepository.deleteUserByEmail(email);
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }

    async getUserById(userId: string): Promise<Users | null>{
        try {
            return await this.userRepository.findById(userId);    
        } catch (error) {
            throw new Error(`Error geting user by id: ${(error as Error).message}`);
        }
    }

    async getAllUsers(): Promise<Users[]> {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            throw new Error(`Error geting all users: ${(error as Error).message}`);
        }
    }

    async updatePassword(userId: string, newPassword: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findById(userId);
            if (user) {
                return await this.userRepository.updatePassword(userId, newPassword);
            }
            return false;
        } catch (error) {
            throw new Error(`Error updating password: ${(error as Error).message}`);
        }
    }
}