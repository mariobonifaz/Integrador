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
exports.DirectionsController = void 0;
class DirectionsController {
    constructor(directionService) {
        this.directionService = directionService;
    }
    createDirection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const directions = yield this.directionService.createDirection(req.body);
                res.status(201).json(directions);
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
exports.DirectionsController = DirectionsController;
