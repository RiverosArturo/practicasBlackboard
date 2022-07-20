"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studCourseController_1 = __importDefault(require("../controllers/studCourseController"));
class studCourseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:nrc/:nTrabajador', studCourseController_1.default.getlist);
        this.router.get('/:nrc/:nTrabajador', studCourseController_1.default.list);
        this.router.get('/:nrc/:nTrabajador/:matricula', studCourseController_1.default.getOne);
        this.router.post('/', studCourseController_1.default.create);
        this.router.put('/:nrc/:nTrabajador/:matricula', studCourseController_1.default.update);
        this.router.delete('/:matricula/:nrc/:nTrabajador', studCourseController_1.default.deleteOne);
        this.router.delete('/', studCourseController_1.default.deleteAll);
    }
}
const StudCourseRoutes = new studCourseRoutes();
exports.default = StudCourseRoutes.router;
