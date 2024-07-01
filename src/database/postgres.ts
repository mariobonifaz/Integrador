import { Pool } from "pg";
import { Signale } from "signale";
import dotenv from 'dotenv';


const signale = new Signale();

const config = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'integrador_user',
  password: 'Miller2001',
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

export async function query(sql: string, params?: any[]) {
  const client = await pool.connect();
  try {
    signale.success("Conexión exitosa a la BD");
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    signale.error(error);
    throw error;
  } finally {
    client.release();
  }
}
