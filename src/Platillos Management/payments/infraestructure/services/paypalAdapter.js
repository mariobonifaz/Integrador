import paypal from '@paypal/checkout-server-sdk';
import { client } from './paypalClient.js';
import fetch from 'node-fetch';

export async function createPaymentMetod(amount) {
    
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'MXN',
                value: amount
            }
        }]
    });

    try {
        const response = await client().execute(request);
        return {
            status: 'success',
            id: response.result.id, // PayPal Payment ID
            approvalUrl: response.result.links.find(link => link.rel === 'approve').href
        };
    } catch (error) {
        return {
            status: 'fail',
            error: error.message
        };
    }
}

export async function capturePayment(id, tokenType, bearerToken) {
    try {
        const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `${tokenType} ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log(result);

        if (response.ok) {
            return {
                status: 'completed',
                details: result
            };
        } else {
            return {
                status: 'failed',
                details: result
            };
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error.message
        };
    }
}
