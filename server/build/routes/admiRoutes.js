"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admiController_1 = __importDefault(require("../controllers/admiController"));
class AdmiRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', admiController_1.default.list);
        this.router.get('/:id', admiController_1.default.getOne);
        this.router.get('/:nrc/:noTrabajador/:id', admiController_1.default.actividades);
        this.router.get('/:nrc/:noTrabajador/:id/:id_equipo', admiController_1.default.actividadesE);
    }
}
const admiRoutes = new AdmiRoutes();
exports.default = admiRoutes.router;
