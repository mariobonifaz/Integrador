import { Platillo } from "../entity/platillo.js";
import { Ingrediente_Platillo } from "../entity/ingrediente_platillo.js";
/** 
 * @interface
*/
export class PlatilloRepository{
    /**
     * @param {Platillo} platillo
     * @param {string[]} ingredientes
     * @returns {Promise<Platillo | null>}
     */
    async createPlatillo(platillo, ingredientes){
        throw new Error("Method not implemented.");
    }
    async getAllPlatillo(){
        throw new Error("Method not implemented.");
    }
}
