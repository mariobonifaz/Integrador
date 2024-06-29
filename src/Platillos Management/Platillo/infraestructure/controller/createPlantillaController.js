import { CreatePlatilloUseCase } from "../../application/UseCase/createPlatilloUseCase.js";
import { Platillo } from "../../domain/entity/platillo.js";
import { convertImageToBase64 } from "../../../../helpers/converImg.js";

export class CreatePlatilloController{
    constructor(createPlatilloUseCase){
        this.createPlatilloUseCase = createPlatilloUseCase;
    }
    async run(req, res) {
        try {
            let { nombre_platillo, descripcion, precio, categoria } = req.body;
            let {ingredientes} = req.body
            ingredientes = JSON.parse(ingredientes); //Convierte los datos en JSON
            const imagen = req.file;
            precio = parseFloat(precio); //Convierte en entero

            if (imagen) {
                const converImage = convertImageToBase64(imagen.buffer);
                const result = await this.createPlatilloUseCase.run({ nombre_platillo, descripcion, precio, categoria, imagen: converImage }, ingredientes);

                if (result) {
                    res.status(201).json(result);
                } else {
                    res.status(500).json({ error: "Unable to register product" });
                }
            } else {
                res.status(400).json({ error: "Image is required" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        
        
    }   
}