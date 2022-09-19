"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profController_1 = __importDefault(require("../controllers/profController"));
class ProfRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', profController_1.default.list);
        this.router.get('/:ntrabajador', profController_1.default.getOne);
        this.router.post('/', profController_1.default.create);
        this.router.put('/:ntrabajador', profController_1.default.update);
        this.router.delete('/:ntrabajador', profController_1.default.delete);
        this.router.delete('/', profController_1.default.deleteAllProf);
        this.router.post('/:nTrabajador', profController_1.default.deleteProfesor);
    }
}
const profRoutes = new ProfRoutes();
exports.default = profRoutes.router;
