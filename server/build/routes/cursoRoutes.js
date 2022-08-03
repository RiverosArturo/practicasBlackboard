"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cursoController_1 = __importDefault(require("../controllers/cursoController"));
class CursoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', cursoController_1.default.list);
        this.router.get('/:nrc', cursoController_1.default.getOneCourse);
        this.router.post('/', cursoController_1.default.create);
        this.router.put('/:clave', cursoController_1.default.update);
        this.router.delete('/:nrc', cursoController_1.default.delete);
        this.router.delete('/', cursoController_1.default.deleteAllCourses);
        this.router.get('/:nrc', cursoController_1.default.verifica);
    }
}
const cursoRoutes = new CursoRoutes();
exports.default = cursoRoutes.router;
