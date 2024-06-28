import { createPool } from "mysql2/promise";
import pkg from 'signale';
const { Signale } = pkg;

const signale = new Signale();

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'integrador_david',
    password: 'Miller2001',
    waitForConnections: true,
    connectionLimit: 10,
};

// Crear el pool de conexiones
const pool = createPool(config);

export async function query(sql, params) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const [result] = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        console.log(process.env.DB_HOST); 
        signale.error(error);
        return null;
    }
}
