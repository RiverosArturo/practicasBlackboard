"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avisoController_1 = __importDefault(require("../controllers/avisoController"));
class AvisoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', avisoController_1.default.list);
        //this.router.get('/:nrc', avisoController.getOneCourse);
        this.router.post('/', avisoController_1.default.create);
        this.router.put('/:id', avisoController_1.default.update);
        this.router.delete('/:id', avisoController_1.default.delete);
        this.router.delete('/', avisoController_1.default.deleteAllAvisos);
    }
}
const avisoRoutes = new AvisoRoutes();
exports.default = avisoRoutes.router;
