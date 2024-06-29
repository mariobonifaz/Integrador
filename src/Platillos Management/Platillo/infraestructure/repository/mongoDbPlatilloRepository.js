import { connectToDatabase } from "../../../../database/mongoDB.js";
import Platillo from "../../domain/entity/platillo.js";
import { PlatilloRepository } from "../../domain/port/platilloInterface.js";
import { ObjectId } from 'mongodb';

export class MongoPlatilloRepository extends PlatilloRepository {
    
    async createPlatillo(platillo, ingredientes) {
        const db = await connectToDatabase();
        const platilloCollection = db.collection('platillos');
        const ingredienteCollection = db.collection('ingredientes');
        const ingredientePlatilloCollection = db.collection('ingrediente_platillo');

        try {
            // Validar que los IDs de ingredientes existen
            const ingredientesObjectIds = ingredientes.map(id => new ObjectId(id));
            const existingIngredientes = await ingredienteCollection.find({
                _id: { $in: ingredientesObjectIds }
            }).toArray();

            if (existingIngredientes.length !== ingredientes.length) {
                console.log("Uno o más IDs de ingredientes no existen o se repiten ingredientes");
                return "Al menos un ingrediente no existe"
            }

            // Crear el platillo
            const platilloResult = await platilloCollection.insertOne({
                nombre_platillo: platillo.nombre_platillo,
                descripcion: platillo.descripcion,
                precio: platillo.precio,
                categoria: platillo.categoria,
                imagen: platillo.imagen
            });

            const platilloId = platilloResult.insertedId;

            // Crear las relaciones en la tabla pivote
            const ingredientePlatilloDocuments = ingredientes.map(id_ingrediente => ({
                id_platillo: platilloId,
                id_ingrediente: new ObjectId(id_ingrediente)
            }));

            await ingredientePlatilloCollection.insertMany(ingredientePlatilloDocuments);

            console.log("Platillo y relaciones con ingredientes insertados con éxito");
            return new Platillo(platilloId, platillo.nombre_platillo, platillo.descripcion, platillo.precio, platillo.categoria, platillo.imagen);
        } catch (error) {
            console.error("Error registrando platillo:", error);
            return null;
        }
    }
    async getAllPlatillo(){

        const db = await connectToDatabase();
        const collection = db.collection('platillos');

        try {
            const platillos = await collection.find({}).toArray();
            return {
                success: true,
                data: platillos.map(plat => new Platillo(plat._id, plat.nombre_platillo, plat.descripcion,plat.precio,plat.categoria,plat.imagen)),
                message: "Platillos recuperados con éxito"
            };
        } catch (error) {
            console.error("Error al recuperar ingredientes:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al recuperar los ingredientes"
            };
        }
    }
}
