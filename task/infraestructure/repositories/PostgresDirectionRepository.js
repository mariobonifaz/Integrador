"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDirectionsRepository = void 0;
const DirectionsModel_1 = __importDefault(require("../../domain/entities/DirectionsModel"));
class PostgresDirectionsRepository {
    createDirections(direction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDirection = yield DirectionsModel_1.default.create({
                    calle: direction.calle,
                    postcode: direction.postcode,
                    colonia: direction.colonia,
                    num_ext: direction.num_ext,
                    num_int: direction.num_int,
                    estado: direction.estado,
                    ciudad: direction.ciudad,
                    descripcion: direction.descripcion
                });
                return newDirection;
            }
            catch (error) {
                throw new Error(`Error creating direction: ${error.message}`);
            }
        });
    }
}
exports.PostgresDirectionsRepository = PostgresDirectionsRepository;
