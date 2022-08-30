"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipoAlumnoController_1 = __importDefault(require("../controllers/equipoAlumnoController"));
class EquipoAlumnoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:nrc/:nTrabajador', equipoAlumnoController_1.default.getquipoAlumno);
    }
}
const equipoAlumnoRoutes = new EquipoAlumnoRoutes();
exports.default = equipoAlumnoRoutes.router;
