"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HomeRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
    }
}
const homeRoutes = new HomeRoutes();
exports.default = homeRoutes.router;
