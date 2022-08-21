"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avisoController_1 = __importDefault(require("../controllers/avisoController"));
class AvisoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', avisoController_1.default.list);
        this.router.get('/:id_equipo', avisoController_1.default.listEq);
        this.router.get('/:id/:nrc/:noTrabajador', avisoController_1.default.getOne);
        this.router.get('/:id/:nrc/:id_equipo/:noTrabajador', avisoController_1.default.getOneEq);
        this.router.post('/', avisoController_1.default.create);
        this.router.put('/:id/:nrc/:noTrabajador', avisoController_1.default.updateAv);
        this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', avisoController_1.default.updateAvEq);
        this.router.delete('/:id/:nrc/:noTrabajador', avisoController_1.default.delete);
        this.router.delete('/:id/:nrc/:id_equipo/:noTrabajador', avisoController_1.default.deleteEq);
        this.router.delete('/', avisoController_1.default.deleteAllAvisos);
    }
}
const avisoRoutes = new AvisoRoutes();
exports.default = avisoRoutes.router;
