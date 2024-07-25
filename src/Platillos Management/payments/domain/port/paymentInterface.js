import { Payment } from "../entity/payments.js";

/** 
 * @interface
*/
export class PaymentRepository{
    /**
     * @param {Payment} payment
     * @param {paypal_payment_id} string
     * @returns {Promise<Payment | null>}
     */
    async createPayment(payment){
        throw new Error("Method not implemented.");
    }
    async confirmetPaymnet(paypal_payment_id){
        throw new Error("Method not implemented.");
    }
}