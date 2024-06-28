import Ingrediente from "../entity/ingrediente.js";

/** 
 * @interface
*/
export class IngredienteRepository{
    /**
     * @param {Ingrediente} ingrediente
     * @param {string} id
     * @param {string} nombre
     * @param {number} cantidad
     * @returns {Promise< Ingrediente | null>}
     */
    async createIngrediente(nombre,cantidad){
        throw new Error("Method not implemented.");
    }
    async getIngredientes(ingrediente){
        throw new Error("Method not implemented.");
    }
    async updateIngredientes(id,nombre,cantidad){
        throw new Error("Method not implemented.");
    }
    async deleteIngrediente(id){
        throw new Error("Method not implemented.");
    }
    async getIngrediente(id){
        throw new Error("Method not implemented.");
    }
}
