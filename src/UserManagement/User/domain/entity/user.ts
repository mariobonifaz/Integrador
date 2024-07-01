export class User {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly phone:string,
        readonly admin: boolean 
    ) { }
}

export class UserLogin {
    constructor(
        readonly token: string,
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly phone:string,
        readonly admin: boolean 
    ) { }
}