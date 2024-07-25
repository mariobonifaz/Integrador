import { PaymentRepository } from "../domain/port/paymentInterface.js";

export class ConfirmetMetodUseCase{
    constructor(paymentRepository){
        this.paymentRepository = paymentRepository;
    }
    async run(id_paymnet_paypal){
        try {
            

            return await this.paymentRepository.confirmetPaymnet(id_paymnet_paypal);
        } catch (error) {
            return null;
        }
    }
}