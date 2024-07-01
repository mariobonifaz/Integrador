import { GetAllComentsUseCase } from "../../application/UseCase/getAllComentsUseCase.js";

export class GetAllComentsController{
    constructor(getAllComentsUseCase){
        this.getAllComentsUseCase = getAllComentsUseCase;
    }
     async run(req,res){
        try {
            
            const result = await this.getAllComentsUseCase.run()
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({ error: "Unable to coments" });
            }
        } catch (error) {
            return null;
        }
        
        
     }
}