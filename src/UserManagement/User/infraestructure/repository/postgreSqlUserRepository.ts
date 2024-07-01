import { User, UserLogin } from "../../domain/entity/user";
import { UserRepository } from "../../domain/port/userRepository";
import { query } from "../../../../database/postgres"
import { compare } from "../../../../helpers/ashs";
import { tokenSigIn } from "../../../../helpers/token";

export class PostgresSqlUserRepository implements UserRepository{
    async registerUser(name: string, email: string, password: string, phone: string, admin: boolean): Promise<User | null | Error> {
        try {
          const sql = "INSERT INTO users (name, email, password, phone, admin) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, password, phone, admin";
          const params = [name, email, password, phone, admin];
          const result = await query(sql, params);
            
          if (result.length > 0) {
            const user = result[0];
            return new User(user.id, user.name, user.email, user.password, user.phone, user.admin);
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error adding review:", error);
          return error as Error;
        }
    }
    async loginUser(email: string, password: string): Promise<UserLogin | Error | null | string> {
        try {
            // Primero, obtener el usuario por email.
            const result = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    
    
            if (!result || result.length === 0) {
                return null;
            }
    
            // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos.
            const passwordMatches = await compare(password, result[0].password);
    
            if (!passwordMatches) {
                return 'Contraseña incorrecta';
            }
    
            // Generar y devolver un token JWT.
            const token: string = tokenSigIn(result[0].id, result[0].email);
            return new UserLogin(token,result[0].id,result[0].name,result[0].email,result[0].phone,result[0].admin);
    
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
    
}