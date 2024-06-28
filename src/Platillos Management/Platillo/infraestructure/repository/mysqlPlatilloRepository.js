import { query } from "../../../../database/mysql.js";
import { Platillo } from "../../domain/entity/platillo.js";
import { PlatilloRepository } from "../../domain/port/platilloInterface.js";

export class MysqlPlatilloRepository extends PlatilloRepository{
    async createPlatillo(platillo){
        try {
            console.log("datos",platillo.id,platillo.nombre_platillo,platillo.descripcion,platillo.precio,platillo.categoria,platillo.imagen)
            const sql = "INSERT INTO platillos(id, nombre_platillo, descripcion, precio, categoria, imagen) VALUES (?, ?, ?, ?, ?, ?)"
            const param = [platillo.id,platillo.nombre_platillo,platillo.descripcion,platillo.precio,platillo.categoria,platillo.imagen]

            await query(sql,param);

            return platillo;

        } catch (error) {
            console.error("Error registering product:", error);
            return null;
        }
    }
}