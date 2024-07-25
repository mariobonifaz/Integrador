import { Router } from 'express';

export const WewHookrouter = Router();



WewHookrouter.post('/webhook/paypal', async (req, res) => {
    const event = req.body

    if(event.event_type === "CHECKOUT.ORDER.APPROVED"){
        const paypal_payment_id = event.resource.id
        console.log(paypal_payment_id)
        try{
            const response = await fetch(`https://integrador-1l3d.onrender.com/paymnet/transactions/${paypal_payment_id}/certificate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response){
                const data = await response.json()
                res.status(200).json({
                    message: 'Payment certificate generated successfully',
                    certificate: data
                })
            }else{
                res.status(400).send({message: 'Error fetching payment certificate'})
            }

        }catch(err){
            console.error('Error:', err)
            res.status(500).send({message: 'Error processing webhook'})
        }
    }

});
