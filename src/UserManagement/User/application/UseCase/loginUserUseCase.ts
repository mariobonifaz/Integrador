import { User, UserLogin } from "../../domain/entity/user";
import { UserRepository } from "../../domain/port/userRepository";

export class LoginUserUseCase{
    constructor( readonly userRepository: UserRepository){}

    async run(email:string, password:string):Promise<UserLogin | null | Error |string>{
        try {
            return await this.userRepository.loginUser(email,password);
        } catch (error) {
            return null;
        }
    }
}