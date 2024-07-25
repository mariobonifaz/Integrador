import { PaymentMongoRepository } from "./repository/paymentMongoRepoditory.js";

import { CreatePaymentUseCase } from "../application/createPaymentUseCase.js";
import { CreatePaymentController } from "./controllers/createPaymentController.js";

const paymentMongoRepository = new PaymentMongoRepository();

const createPaymentUseCase = new CreatePaymentUseCase(paymentMongoRepository);
export const createPaymentController = new CreatePaymentController(createPaymentUseCase);