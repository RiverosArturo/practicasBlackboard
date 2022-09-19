"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studController_1 = __importDefault(require("../controllers/studController"));
class StudRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', studController_1.default.list);
        this.router.get('/:matricula', studController_1.default.getOne);
        this.router.post('/', studController_1.default.create);
        this.router.put('/:matricula', studController_1.default.update);
        this.router.delete('/:matricula', studController_1.default.delete);
        this.router.delete('/', studController_1.default.deleteAllStudents);
        this.router.post('/:matricula', studController_1.default.deleteEstudiante);
    }
}
const studRoutes = new StudRoutes();
exports.default = studRoutes.router;
