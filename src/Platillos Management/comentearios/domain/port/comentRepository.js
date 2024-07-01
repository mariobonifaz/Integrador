import Coment from "../entity/coment.js";

/** 
 * @interface
*/
export class ComentRepository{
    /**
     * @param {Coment} coment
     * @param {string} id_platillo
     * @param {string} id
     * @param {string} comentario
     * @param {number} calificacion
     * @returns {Promise< Coment | null>}
     * @returns {Promise< Coment[] | null>}
     */
    async createComent(coment){
        throw new Error("Method not implemented.");
    }
    async getComentsByPlatillo(id_platillo){
        throw new Error("Method not implemented.");

    }
    async deleteComent(id, id_user){
        throw new Error("Method not implemented.");
    }
    async updateComent(id, id_user, comentario, calificacion){
        throw new Error("Method not implemented.");
    }
    async getAllComents(){
        throw new Error("Method not implemented.");
    }
}
