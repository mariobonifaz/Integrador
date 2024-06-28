import { MongoClient } from 'mongodb';
import pkg from 'signale';
const { Signale } = pkg;

const signale = new Signale();
const url = 'mongodb+srv://root:Miller2001@platillosmanagement.usy4jnm.mongodb.net/';
const dbName = 'integrador_platillos';

let db = null;

export async function connectToDatabase() {
    if (db) {
        return db;
    }
    
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        signale.success("Conexión exitosa a la base de datos MongoDB");
        return db;
    } catch (error) {
        signale.error("Error al conectar a la base de datos:", error);
        throw error;
    }
}