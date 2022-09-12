"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comodin2Controller_1 = __importDefault(require("../controllers/comodin2Controller"));
class comodin2Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:nrc/:noTrabajador', comodin2Controller_1.default.listEq);
        this.router.get('/:nrc/:noTrabajador/:id_equipo', comodin2Controller_1.default.listEqAl);
    }
}
const Comodin2Routes = new comodin2Routes();
exports.default = Comodin2Routes.router;
