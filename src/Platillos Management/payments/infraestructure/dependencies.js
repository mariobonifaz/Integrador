import { PaymentMongoRepository } from "./repository/paymentMongoRepoditory.js";

import { CreatePaymentUseCase } from "../application/createPaymentUseCase.js";
import { CreatePaymentController } from "./controllers/createPaymentController.js";

import { ConfirmetMetodUseCase } from "../application/confirmetMetodUseCase.js";
import { ConfirmetPaymentController } from "./controllers/confirmetMethodcontroller.js";

const paymentMongoRepository = new PaymentMongoRepository();

const createPaymentUseCase = new CreatePaymentUseCase(paymentMongoRepository);
export const createPaymentController = new CreatePaymentController(createPaymentUseCase);

const confirmetMetodUseCase = new ConfirmetMetodUseCase(paymentMongoRepository);
export const confirmetPaymentController = new ConfirmetPaymentController(confirmetMetodUseCase);