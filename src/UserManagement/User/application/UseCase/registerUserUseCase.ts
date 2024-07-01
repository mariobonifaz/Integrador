import { User } from "../../domain/entity/user";
import { UserRepository } from "../../domain/port/userRepository";
import { encrypt } from "../../../../helpers/ashs";

export class RegisterUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async run(name:string,email:string,password:string,phone:string,admin:boolean): Promise<User | null |Error> {
        const hashPassword = await encrypt(password)
        try {
            const createdUser = await this.userRepository.registerUser(name,email,hashPassword,phone,admin);
            return createdUser;
        } catch (error) {
            console.error("Error in Register User:", error);
            return null;
        }
    }
}