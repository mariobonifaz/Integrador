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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.registerUser(req.body);
                res.status(201).json(users);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(500).json({ error: "Internal server error" });
                }
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.loginUser(email, password);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(401).json({ error: 'Invalid email or password' });
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(500).json({ error: "Internal server error" });
                }
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const success = yield this.userService.deleteUserByEmail(email);
                if (success) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(500).json({ error: "Internal server error" });
                }
            }
        });
    }
}
exports.UsersController = UsersController;
