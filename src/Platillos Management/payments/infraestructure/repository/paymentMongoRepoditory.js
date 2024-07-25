import { PaymentRepository } from "../../domain/port/paymentInterface.js";
import { connectToDatabase } from "../../../../database/mongoDB.js";
import { Payment } from "../../domain/entity/payments.js";
import {createPaymentMetod} from "../services/paypalAdapter.js"
import { getToken } from "../services/paypalClient.js"
import { capturePayment } from "../services/paypalAdapter.js";


export class PaymentMongoRepository extends PaymentRepository{
    
    async createPayment(paymentData) {
        const { db } = await connectToDatabase();
        const pagosCollection = db.collection('pagos');
    
        try {

            const paymentResult = await createPaymentMetod(paymentData.total_order);
            
            if(paymentResult.status !== 'success'){
                return "nose pudo"
            }

            const paypal_payment_id = paymentResult.id
            const approvalUrl = paymentResult.approvalUrl
            const status_payment = "Pendiente"
            // Crear el pago
            const newPayment = await pagosCollection.insertOne({
                id_order: paymentData.id_order,
                id_user: paymentData.id_user,
                total_order: paymentData.total_order,
                url_paymnet: approvalUrl,
                id_paymnet_paypal: paypal_payment_id,
                status_payment : status_payment
            });
    
            const paymentId = newPayment.insertedId;
    
            return new Payment(paymentId, paymentData.id_order, paymentData.id_user, paymentData.total_order,approvalUrl,paypal_payment_id, status_payment);
        } catch (error) {
            console.error("Error registrando pago:", error);
            return null;
        }
    }

    async confirmetPayment(paypal_payment_id) {
        const { db } = await connectToDatabase();
        const pagosCollection = db.collection('pagos');

        try {
            const payment = await pagosCollection.findOne({ id_payment_paypal: paypal_payment_id });

            if (!payment) {
                return "No se encontró el pago";
            }

            const token = getToken();
            const captureResult = await capturePayment(paypal_payment_id, token.token_type, token.access_token);

            if(captureResult.statusText === 'Created'){
                const result = await pagosCollection.updateOne(
                    { id_payment_paypal: paypal_payment_id },
                    { $set: { status_payment: "Completado" } }
                );

                return payment;
            }else{
                const result = await pagosCollection.updateOne(
                    { id_payment_paypal: paypal_payment_id },
                    { $set: { status_payment: "Fallido" } }
                );
                return "Fallo"
            }

        } catch (error) {
            console.error("Error actualizando el estado del pago:", error);
            return null;
        }
    }
}