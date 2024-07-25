import { ConfirmetMetodUseCase } from "../../application/confirmetMetodUseCase";

export class ConfirmetPaymentController{

    constructor(confirmetMetodUseCase){
        this.confirmetMetodUseCase = confirmetMetodUseCase;
    }
    async run(req,res){
        try {
            let {paypal_payment_id} = req.params;

            const resultPaymentConfirmet = await this.confirmetMetodUseCase.run(paypal_payment_id);

            if (resultPaymentConfirmet) {
                res.status(201).json(resultPaymentConfirmet);
            } else {
                res.status(500).json({ error: "Unable to confirmet Payment" });
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}