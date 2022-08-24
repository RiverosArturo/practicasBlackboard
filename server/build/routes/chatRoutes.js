"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = __importDefault(require("../controllers/chatController"));
class ChatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', chatController_1.default.list);
        this.router.get('/id_equipo', chatController_1.default.listEq);
        this.router.get('/:matricula/:nrc/:noTrabajador', chatController_1.default.getOne);
        this.router.get('/:nrc/:id_equipo/:noTrabajador/:x', chatController_1.default.getOneEq);
        this.router.post('/', chatController_1.default.create);
        // this.router.put('/:id/:nrc/:noTrabajador', ActividadController.updateAct);
        // this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', ActividadController.updateActEq);
        this.router.delete('/:matricula/:nrc/:noTrabajador', chatController_1.default.delete);
        this.router.delete('/:nrc/:id_equipo/:noTrabajador/:x', chatController_1.default.deleteEq);
    }
}
const chatRoutes = new ChatRoutes();
exports.default = chatRoutes.router;
