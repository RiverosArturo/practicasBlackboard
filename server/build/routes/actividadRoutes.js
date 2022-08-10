"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadController_1 = __importDefault(require("../controllers/actividadController"));
class actividadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/', ActividadController.getActivity);
        this.router.get('/', actividadController_1.default.list);
        this.router.get('/:id/:nrc/:noTrabajador', actividadController_1.default.getOne);
        //this.router.get('/:listAct', ActividadController.listAct);
        this.router.get('/:id/:nrc/:id_equipo/:noTrabajador', actividadController_1.default.getOneEq);
        this.router.post('/', actividadController_1.default.create);
        this.router.put('/:id/:nrc/:noTrabajador', actividadController_1.default.updateAct);
        this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', actividadController_1.default.updateActEq);
        //this.router.put('/:id/:idEquipo', ActividadController.updateActEq);
        this.router.delete('/:id/:nrc/:noTrabajador', actividadController_1.default.delete);
        this.router.delete('/:id/:nrc/:id_equipo/:noTrabajador', actividadController_1.default.deleteEq);
        //this.router.delete('/:id/:idEquipo', ActividadController.deleteActEq); 
    }
}
const ActividadRoutes = new actividadRoutes();
exports.default = ActividadRoutes.router;
