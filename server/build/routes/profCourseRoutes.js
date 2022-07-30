"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profCourseController_1 = __importDefault(require("../controllers/profCourseController"));
class ProfCourseRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:nTrabajador/:nrc', profCourseController_1.default.getUSERNRC);
        this.router.get('/', profCourseController_1.default.list);
        this.router.post('/', profCourseController_1.default.create);
        this.router.delete('/:nTrabajador/:nrc', profCourseController_1.default.delete);
        this.router.delete('/', profCourseController_1.default.deleteAllProfCourses);
    }
}
const profCourseRoutes = new ProfCourseRoutes();
exports.default = profCourseRoutes.router;
