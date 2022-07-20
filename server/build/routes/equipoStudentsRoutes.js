"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipoStudentsController_1 = __importDefault(require("../controllers/equipoStudentsController"));
class EquipoStudentsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', equipoStudentsController_1.default.getEquipos);
        this.router.get('/:id', equipoStudentsController_1.default.getOneEquipo);
        this.router.get('/:nTrabajador/:nrc/:id', equipoStudentsController_1.default.getEquiposBien);
        this.router.post('/', equipoStudentsController_1.default.saveEquipo);
        this.router.put('/:id', equipoStudentsController_1.default.updateEquipo);
        this.router.delete('/:id', equipoStudentsController_1.default.deleteEquipo);
        this.router.delete('/', equipoStudentsController_1.default.deleteAllEquipo);
    }
}
const equipoStudentsRoutes = new EquipoStudentsRoutes();
exports.default = equipoStudentsRoutes.router;