"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipoController_1 = __importDefault(require("../controllers/equipoController"));
class EquipoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', equipoController_1.default.getid);
        this.router.get('/:id/:nombre/:curso_nrc/:nTrabajador', equipoController_1.default.getOneEquipo);
        this.router.get('/:curso_nrc/:nTrabajador', equipoController_1.default.getEquipos1);
        //this.router.get('/:id/:curso_nrc/:nTrabajador', equipoController.getNameEquipo);        
        this.router.get('/', equipoController_1.default.getEquipos);
        this.router.post('/', equipoController_1.default.saveEquipo);
        this.router.put('/:id/:nrc/:nTrabajador', equipoController_1.default.updateEquipo);
        this.router.delete('/:id/:curso_nrc/:nTrabajador', equipoController_1.default.deleteEquipo);
        this.router.delete('/:curso_nrc/:nTrabajador', equipoController_1.default.deleteAllEquipos);
        this.router.post('/:nrc', equipoController_1.default.deleteEquipoo);
    }
}
const equipoRoutes = new EquipoRoutes();
exports.default = equipoRoutes.router;
