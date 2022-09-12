"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadController_1 = __importDefault(require("../controllers/actividadController"));
const actividadController_2 = __importDefault(require("../controllers/actividadController"));
class actividadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', actividadController_1.default.getActividad);
        this.router.get('/:nrc/:noTrabajador', actividadController_2.default.list);
        this.router.get('/:id/:nrc/:noTrabajador', actividadController_2.default.getOne);
        this.router.get('/:id/:nrc/:id_equipo/:noTrabajador', actividadController_2.default.getOneEq);
        this.router.post('/', actividadController_2.default.create);
        this.router.put('/:id/:nrc/:noTrabajador', actividadController_2.default.updateAct);
        this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', actividadController_2.default.updateActEq);
        this.router.delete('/:id/:nrc/:noTrabajador', actividadController_2.default.delete);
        this.router.delete('/:id/:nrc/:id_equipo/:noTrabajador', actividadController_2.default.deleteEq);
    }
}
const ActividadRoutes = new actividadRoutes();
exports.default = ActividadRoutes.router;
