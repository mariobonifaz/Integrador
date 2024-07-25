import { CreatePaymentUseCase } from "../../application/createPaymentUseCase.js";

export class CreatePaymentController{

    constructor(createPaymentUseCase){
        this.createPaymentUseCase = createPaymentUseCase;
    }
    async run(req,res){
        try {
            let {id_user,id_order,total_order} = req.body;
            total_order = parseFloat(total_order);
            const newOrder = {id_user,id_order,total_order}

            const resultPayment = await this.createPaymentUseCase.run(newOrder);

            if (resultPayment) {
                res.status(201).json(resultPayment);
            } else {
                res.status(500).json({ error: "Unable to register Payment" });
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}