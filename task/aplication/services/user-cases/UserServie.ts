import { Users } from "../../../domain/entities/Users";
import { UserRepository } from "../../../infraestructure/repositories/UserRepository";

export class UserService{
    constructor(
        private userRepository: UserRepository
    ){}

    async registerUser(user: Users): Promise<Users> {
        try {
            return await this.userRepository.registerUsers(user);
        } catch (error) {
            throw new Error(`Error creating orer:${(error as Error).message}`);
        }
    }
}