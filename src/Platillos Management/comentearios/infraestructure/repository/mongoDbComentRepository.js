import Coment from "../../domain/entity/coment.js";
import { ComentRepository } from "../../domain/port/comentRepository.js";
import { connectToDatabase } from "../../../../database/mongoDB.js";
import { ObjectId } from 'mongodb';
 
export class MongoDBComentRepository extends ComentRepository{
    async createComent(coment) {
        const { db } = await connectToDatabase();
        const collectionComentarios = db.collection('comentarios');
        const collectionPlatillos = db.collection('platillos');
    
        try {
            // Verificar si el platillo existe
            const platillo = await collectionPlatillos.findOne({ _id: new ObjectId(coment.id_platillo) });
    
            if (!platillo) {
                return {
                    success: false,
                    error: "Platillo no encontrado"
                };
            }
    
            // Insertar el comentario
            const result = await collectionComentarios.insertOne({
                id_platillo: coment.id_platillo,
                id_user: coment.id_user,
                comentario: coment.comentario,
                calificacion: coment.calificacion
            });
    
            console.log("Comentario insertado con ID:", result.insertedId);
            return {
                success: true,
                data: new Coment(result.insertedId, coment.id_platillo, coment.id_user, coment.comentario, coment.calificacion),
                message: "Comentario insertado con éxito"
            };
        } catch (error) {
            console.error("Error registrando comentario:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al registrar el comentario"
            };
        }
    }
    async getComentsByPlatillo(id_platillo) {
        const {db} = await connectToDatabase();
        const collection = db.collection('comentarios');

        try {
            const comentarios = await collection.find({ id_platillo: (id_platillo) }).toArray();

            if (!comentarios) {
                return {
                    success: false,
                    error: "No se encontraron comentarios para este platillo"
                };
            }
            return {
                success: true,
                data: comentarios.map(com => new Coment(com._id, com.id_platillo, com.id_user,com.comentario,com.calificacion)),
                message: "Comentarios recuperado con éxito"
            };
        } catch (error) {
            console.error("Error al recuperar Comentario:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al recuperar los comentarios"
            };
        }
    }
    async deleteComent(id, id_user) {
        const { db } = await connectToDatabase();
        const collection = db.collection('comentarios');

        try {
            const objectId = new ObjectId(id);        

            // Verificar que el comentario pertenezca al usuario
            const comentario = await collection.findOne({ _id: objectId, id_user: id_user });

            if (!comentario) {
                return {
                    success: false,
                    error: "Comentario no encontrado o no pertenece al usuario"
                };
            }

            // Eliminar el comentario
            const deleteResult = await collection.deleteOne({ _id: objectId, id_user: id_user });

            if (deleteResult.deletedCount === 0) {
                throw new Error('Error eliminando el comentario');
            }

            console.log('Comentario eliminado con éxito');
            return {
                success: true,
                message: 'Comentario eliminado con éxito'
            };
        } catch (error) {
            console.error('Error eliminando el comentario:', error);
            return {
                success: false,
                error: error.message || 'Error desconocido al eliminar el comentario'
            };
        }
    }
    async updateComent(id, id_user, comentario, calificacion) {
        const { db } = await connectToDatabase();
        const collection = db.collection('comentarios');

        try {
            const objectId = new ObjectId(id);
            
            // Verificar que el comentario pertenezca al usuario
            const comentarioExistente = await collection.findOne({ _id: objectId, id_user: id_user });

            if (!comentarioExistente) {
                return {
                    success: false,
                    error: "Comentario no encontrado o no pertenece al usuario"
                };
            }

            // Actualizar el comentario y la calificación
            const updateResult = await collection.updateOne(
                { _id: objectId, id_user: id_user },
                { $set: { comentario: comentario, calificacion: calificacion } }
            );

            if (updateResult.modifiedCount === 0) {
                throw new Error('Error actualizando el comentario');
            }

            console.log('Comentario actualizado con éxito');
            return {
                success: true,
                message: 'Comentario actualizado con éxito'
            };
        } catch (error) {
            console.error('Error actualizando el comentario:', error);
            return {
                success: false,
                error: error.message || 'Error desconocido al actualizar el comentario'
            };
        }
    }
    async getAllComents(){
        const {db} = await connectToDatabase();
        const collection = db.collection('comentarios');

        try {
            const comentarios = await collection.find({}).toArray();
            if (!comentarios || comentarios.length === 0) {
                return {
                    success: true,
                    data: [],
                    message: "No se encontraron Comentarios"
                };
            }

            return {
                success: true,
                data: comentarios.map(com => new Coment(com._id, com.id_platillo, com.id_user, com.comentario,com.calificacion)),
                message: "Comentarios recuperados con éxito"
            };
        } catch (error) {
            console.error("Error al recuperar Comentarios:", error);
            return {
                success: false,
                error: error.message || "Error desconocido al recuperar los Comentarios"
            };
        }
    }
}