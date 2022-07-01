"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', loginController_1.default.getlistProf);
        this.router.get('/:nTrabajador', loginController_1.default.getOneProf);
        this.router.get('/', loginController_1.default.getlistStudent);
        this.router.get('/:matricula', loginController_1.default.getOneStudent);
        this.router.get('/', loginController_1.default.getlistAdmi);
        this.router.get('/:id', loginController_1.default.getOneAdmi);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
