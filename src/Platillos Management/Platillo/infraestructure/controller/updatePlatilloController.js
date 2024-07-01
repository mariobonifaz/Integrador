import { UpdatePlatilloUseCase } from "../../application/UseCase/updatePlatilloUseCase.js";
import { convertImageToBase64 } from "../../../../helpers/converImg.js";

export class UpdatePlatilloController{
    constructor(updatePlatilloUseCase){
        this.updatePlatilloUseCase = updatePlatilloUseCase
    }
    async run(req,res){
        try {
            const {id} = req.params
            let {nombre_platillo,descripcion,precio,categoria} = req.body
            let imagen = req.file
            precio = parseFloat(precio) //Convierte el string a flotante

            if(!imagen){
                return res.status(400).json({ error: "Inserte una imagen" });
            }
            const converImage = convertImageToBase64(imagen.buffer) //Convierte la imagen en base64
            const updatePlatillo = await this.updatePlatilloUseCase.run({id,nombre_platillo,descripcion,precio,categoria,imagen:converImage})

            if (updatePlatillo) {
                res.status(200).json(updatePlatillo);
            } else {
                res.status(500).json({ error: "Unable to update platillo" });
            }
            
        } catch (error) {
            if (error.message.startsWith("Validation error:")) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    }
}