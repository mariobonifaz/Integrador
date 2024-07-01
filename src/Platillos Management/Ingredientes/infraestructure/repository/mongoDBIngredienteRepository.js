import { connectToDatabase } from "../../../../database/mongoDB.js";
import { IngredienteRepository } from "../../domain/port/ingredienteInterface.js";
import Ingrediente from "../../domain/entity/ingrediente.js";
import { ObjectId } from 'mongodb';

export class MongoIngredienteRepository extends IngredienteRepository {
    
    async createIngrediente(nombre, cantidad){
        const {db} = await connectToDatabase();
        const collection = db.collection('ingredientes');

        try {
            const result = await collection.insertOne({
                nombre: nombre,
                cantidad: cantidad
            });

            console.log("Ingrediente insertado con ID:", result.insertedId);
            return {
                success: true,
                data: new Ingrediente(result.insertedId, nombre, cantidad),
                message: "Ingrediente insertado con éxito"
            };
        } catch (error) {
            console.error("Error registering ingrediente:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al registrar el ingrediente"
            };
        }
    }

    async getIngredientes() {
        const {db} = await connectToDatabase();
        const collection = db.collection('ingredientes');

        try {
            const ingredientes = await collection.find({}).toArray();
            return {
                success: true,
                data: ingredientes.map(ing => new Ingrediente(ing._id, ing.nombre, ing.cantidad)),
                message: "Ingredientes recuperados con éxito"
            };
        } catch (error) {
            console.error("Error al recuperar ingredientes:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al recuperar los ingredientes"
            };
        }
    }

    async updateIngredientes(id,nombre,cantidad) {
        const {db} = await connectToDatabase();
        const collection = db.collection('ingredientes');
        console.log("Mongo",id)
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { nombre: nombre, cantidad: cantidad } }
            );

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    error: "Ingrediente no encontrado"
                };
            }

            console.log("Ingrediente actualizado con ID:", id);
            return {
                success: true,
                message: "Ingrediente actualizado con éxito"
            };
        } catch (error) {
            console.error("Error actualizando ingrediente:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al actualizar el ingrediente"
            };
        }
    }
    async deleteIngrediente(id) {
        const {db} = await connectToDatabase();
        const collection = db.collection('ingredientes');

        try {
            const result = await collection.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    error: "Ingrediente no encontrado"
                };
            }

            console.log("Ingrediente eliminado con ID:", id);
            return {
                success: true,
                message: "Ingrediente eliminado con éxito"
            };
        } catch (error) {
            console.error("Error eliminando ingrediente:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al eliminar el ingrediente"
            };
        }
    }
    async getIngrediente(id) {
        const {db} = await connectToDatabase();
        const collection = db.collection('ingredientes');

        try {
            const ingrediente = await collection.findOne({ _id: new ObjectId(id) });

            if (!ingrediente) {
                return {
                    success: false,
                    error: "Ingrediente no encontrado"
                };
            }

            console.log("Ingrediente recuperado con ID:", id);
            return {
                success: true,
                data: new Ingrediente(ingrediente._id, ingrediente.nombre, ingrediente.cantidad),
                message: "Ingrediente recuperado con éxito"
            };
        } catch (error) {
            console.error("Error al recuperar ingrediente:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al recuperar el ingrediente"
            };
        }
    }
}
