"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comodinController_1 = __importDefault(require("../controllers/comodinController"));
class comodinRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.delete('/:id_equipo/:nrc/:noTrabajador', comodinController_1.default.deleteActsEq);
    }
}
const ComodinRoutes = new comodinRoutes();
exports.default = ComodinRoutes.router;
