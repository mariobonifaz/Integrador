import { User,UserLogin } from "../entity/user";

export interface UserRepository{

    registerUser(name:string,email:string,password:string,phone:string,admin:boolean ):Promise<User | null | Error>
    loginUser(email:string, password:string):Promise<UserLogin | null | Error | string>
}