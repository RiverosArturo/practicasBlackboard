"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profCourseController_1 = __importDefault(require("../controllers/profCourseController"));
class ProfCourseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', profCourseController_1.default.list);
        this.router.get('/:nTrabajador', profCourseController_1.default.getOne);
        this.router.get('/:nrc', profCourseController_1.default.getOneNrcCourse);
        this.router.get('/:nrc', profCourseController_1.default.getNrcCourse);
        this.router.post('/', profCourseController_1.default.create);
        this.router.put('/:nrc', profCourseController_1.default.update);
        this.router.delete('/:nrc', profCourseController_1.default.delete);
        this.router.delete('/', profCourseController_1.default.deleteAllProfCourses);
    }
}
const profCourseRoutes = new ProfCourseRoutes();
exports.default = profCourseRoutes.router;
