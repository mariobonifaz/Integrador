import { connectToDatabase } from "../../../../database/mongoDB.js";
import Platillo from "../../domain/entity/platillo.js";
import { PlatilloRepository } from "../../domain/port/platilloInterface.js";
import { ObjectId } from 'mongodb';
import Ingrediente from "../../../Ingredientes/domain/entity/ingrediente.js";

export class MongoPlatilloRepository extends PlatilloRepository {
    
    async createPlatillo(platillo, ingredientes) {
        const {db} = await connectToDatabase();
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
    
    async getAllPlatillo() {
        const {db} = await connectToDatabase();
        const collection = db.collection('platillos');

        try {
            const platillos = await collection.find({}).toArray();
            if (!platillos || platillos.length === 0) {
                return {
                    success: true,
                    data: [],
                    message: "No se encontraron platillos"
                };
            }

            return {
                success: true,
                data: platillos.map(plat => new Platillo(plat._id, plat.nombre_platillo, plat.descripcion, plat.precio, plat.categoria, plat.imagen)),
                message: "Platillos recuperados con éxito"
            };
        } catch (error) {
            console.error("Error al recuperar platillos:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al recuperar los platillos"
            };
        }
    }
    async getPlatilloById(id) {
        const {db} = await connectToDatabase();
        const collectionPlatillos = db.collection('platillos');
        const collectionIngredientes = db.collection('ingredientes');
        const collectionPlatilloIngrediente = db.collection('ingrediente_platillo');
    
        try {
            const platillo = await collectionPlatillos.findOne({ _id: new ObjectId(id) });
    
            if (!platillo) {
                return {
                    success: false,
                    error: "Platillo no encontrado"
                };
            }
    
            // Buscar los IDs de los ingredientes asociados al platillo
            const ingredientesIds = await collectionPlatilloIngrediente
                .find({ id_platillo: new ObjectId(id) })
                .toArray();

            const ingredienteObjectIds = ingredientesIds.map(pi => new ObjectId(pi.id_ingrediente));
    
            // Obtener los detalles de los ingredientes
            const ingredientes = await collectionIngredientes
                .find({ _id: { $in: ingredienteObjectIds } })
                .toArray();
            console.log("ingredientes",ingredientes)
            if (ingredientes.length === 0) {
                return {
                    success: true,
                    data: {
                        platillo: new Platillo(platillo._id, platillo.nombre_platillo, platillo.descripcion, platillo.precio, platillo.categoria, platillo.imagen),
                        ingredientes: []
                    },
                    message: "Platillo recuperado con éxito, pero no se encontraron detalles de los ingredientes"
                };
            }
    
            const ingredienteEntities = ingredientes.map(ing => new Ingrediente(ing._id, ing.nombre, ing.cantidad, ing.unidad));
    
            console.log("Platillo recuperado con ID:", id);
            return {
                success: true,
                data: {
                    platillo: new Platillo(platillo._id, platillo.nombre_platillo, platillo.descripcion, platillo.precio, platillo.categoria, platillo.imagen),
                    ingredientes: ingredienteEntities
                },
                message: "Platillo e ingredientes recuperados con éxito"
            };
        } catch (error) {
            console.error("Error al recuperar platillo e ingredientes:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al recuperar el platillo e ingredientes"
            };
        }
    }
    async updatePlatillo(platillo) {
        const {db} = await connectToDatabase();
        const collection = db.collection('platillos');
        console.log("Mongo",platillo.id)
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(platillo.id) },
                { $set: { nombre_platillo: platillo.nombre_platillo, descripcion: platillo.descripcion, precio: platillo.precio, categoria: platillo.categoria,imagen:platillo.imagen } }
            );

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    error: "Platillo no encontrado"
                };
            }

            console.log("Platillo actualizado con ID:", platillo.id);
            return {
                success: true,
                message: "Platillo actualizado con éxito"
            };
        } catch (error) {
            console.error("Error actualizando Platillo:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al actualizar el Platillo"
            };
        }
    }
    async deletePlatillo(id) {
        const { client, db } = await connectToDatabase();
        const collectionPlatillos = db.collection('platillos');
        const collectionPlatilloIngrediente = db.collection('ingrediente_platillo');
        const session = client.startSession();

        try {
            await session.withTransaction(async () => {
                // Eliminar el platillo
                const deletePlatilloResult = await collectionPlatillos.deleteOne(
                    { _id: new ObjectId(id) },
                    { session }
                );

                if (deletePlatilloResult.deletedCount === 0) {
                    throw new Error('Platillo no encontrado');
                }

                // Eliminar los registros en la tabla pivote
                await collectionPlatilloIngrediente.deleteMany(
                    { id_platillo: new ObjectId(id) },
                    { session }
                );

                console.log('Platillo y registros relacionados eliminados con éxito');
            });

            return {
                success: true,
                message: 'Platillo y registros relacionados eliminados con éxito'
            };
        } catch (error) {
            console.error('Error eliminando platillo y registros relacionados:', error);
            return {
                success: false,
                error: error.message || 'Error desconocido al eliminar el platillo y registros relacionados'
            };
        } finally {
            session.endSession();
        }
    }
}

