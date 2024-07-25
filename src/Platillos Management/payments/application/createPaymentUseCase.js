import { PaymentRepository } from "../domain/port/paymentInterface.js";

export class CreatePaymentUseCase{
    constructor(paymentRepository){
        this.paymentRepository = paymentRepository;
    }
    async run(paymnet){
        try {
            const newPaymet = {
                id_order: paymnet.id_order,
                id_user: paymnet.id_user,
                total_order: paymnet.total_order,
            };
            return await this.paymentRepository.createPayment(newPaymet);
        } catch (error) {
            return null;
        }
    }
}