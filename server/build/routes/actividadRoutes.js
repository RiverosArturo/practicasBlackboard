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
        //this.router.get('/', ActividadController.getlist);
        this.router.get('/', actividadController_1.default.list);
        this.router.get('/:id', actividadController_1.default.getOne);
        this.router.get('/:id/:id_equipo', actividadController_1.default.getOneEq);
        this.router.post('/', actividadController_1.default.create);
        this.router.put('/:id', actividadController_1.default.update);
        //this.router.put('/:id/:idEquipo', ActividadController.updateActEq);
        this.router.delete('/:id', actividadController_1.default.delete);
        //this.router.delete('/:id/:idEquipo', ActividadController.deleteActEq); 
    }
}
const ActividadRoutes = new actividadRoutes();
exports.default = ActividadRoutes.router;
