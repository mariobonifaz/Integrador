export class Payment{
    constructor(id,id_order,id_user,total_order,url_payment,id_paymnet_paypal,status_paymet){
        this.id = id;
        this.id_order = id_order;
        this.id_user = id_user;
        this.total_order = total_order;
        this.url_payment = url_payment;
        this.id_paymnet_paypal = id_paymnet_paypal;
        this.status_paymet = status_paymet;
    }
}