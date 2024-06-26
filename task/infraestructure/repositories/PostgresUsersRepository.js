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
exports.PostgresUserRepository = void 0;
const UsersModel_1 = __importDefault(require("../../domain/entities/UsersModel"));
class PostgresUserRepository {
    registerUsers(users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield UsersModel_1.default.create({
                    name: users.name,
                    phone: users.phone,
                    email: users.email,
                    password: users.password,
                    admin: users.admin
                });
                return newUser;
            }
            catch (error) {
                throw new Error(`Error creating product: ${error.message}`);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UsersModel_1.default.findOne({ where: { email } });
            }
            catch (error) {
                throw new Error(`Error finding user by email: ${error.message}`);
            }
        });
    }
    deleteUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UsersModel_1.default.destroy({ where: { email } });
                return result > 0;
            }
            catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        });
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
