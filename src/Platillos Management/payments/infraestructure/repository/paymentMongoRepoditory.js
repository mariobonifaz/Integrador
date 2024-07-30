import { PaymentRepository } from "../../domain/port/paymentInterface.js";
import { connectToDatabase } from "../../../../database/mongoDB.js";
import { Payment } from "../../domain/entity/payments.js";
import {createPaymentMetod} from "../services/paypalAdapter.js"
import { getToken } from "../services/paypalClient.js"
import { capturePayment } from "../services/paypalAdapter.js";
import axios from 'axios';

export class PaymentMongoRepository extends PaymentRepository{
    
    async createPayment(paymentData) {
        const { db } = await connectToDatabase();
        const pagosCollection = db.collection('pagos');
    
        try {

            const paymentResult = await createPaymentMetod(paymentData.total_order);
            console.log(paymentResult)
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
    
    async confirmetPaymnet(paypal_payment_id) {
        
        const { db } = await connectToDatabase();
        const pagosCollection = db.collection('pagos');
        console.log("paso controller");
    
        try {
            const payment = await pagosCollection.findOne({ id_paymnet_paypal: paypal_payment_id });
    
            if (!payment) {
                return "No se encontró el pago";
            }
    
            const token = await getToken();
            const captureResult = await capturePayment(paypal_payment_id, token.token_type, token.access_token);
            console.log("captura ",captureResult)
            let status, message;
            if(captureResult.statusText === 'Created'){
                status = "Completado";
                message = "Se hizo la compra correctamente";
            } else {
                status = "Fallido";
                message = "Fallo";
            }
    
            const result = await pagosCollection.updateOne(
                { id_payment_paypal: paypal_payment_id },
                { $set: { status_payment: status } }
            );
    
            // Realizar petición HTTP a la URL específica
            let orderId = payment.id_order; // Asumiendo que tienes un campo 'id_order' en tu documento de pago
            orderId = parseInt(orderId, 10);

            const url = `http://3.87.103.175:3001/orders/${orderId}/status`;
    
            await axios.patch(url, { status: status === "Completado" ? "pagado" : "fallido" });
    
            return message;
    
        } catch (error) {
            console.error("Error actualizando el estado del pago:", error);
            return null;
        }
    }
}