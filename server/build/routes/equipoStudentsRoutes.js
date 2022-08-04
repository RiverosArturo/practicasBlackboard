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
        /*
        this.router.get('/', equipoStudentsController.getEquipos);
        this.router.get('/:id', equipoStudentsController.getOneEquipo);
        this.router.get('/:nTrabajador/:nrc/:id', equipoStudentsController.getEquiposBien);
        this.router.post('/', equipoStudentsController.saveEquipo);
        this.router.put('/:id', equipoStudentsController.updateEquipo);
        */
        //------------------------------------------------------------------------------------        
        this.router.post('/', equipoStudentsController_1.default.saveStudentEquipo);
        this.router.get('/:id_equipo/:nrc/:nTrabajador', equipoStudentsController_1.default.get1Equipo);
    }
}
const equipoStudentsRoutes = new EquipoStudentsRoutes();
exports.default = equipoStudentsRoutes.router;
