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
        //this.router.get('/:nrc', avisoController.getOneCourse);
        this.router.post('/', chatController_1.default.create);
        this.router.put('/:id', chatController_1.default.update);
        this.router.delete('/:id', chatController_1.default.delete);
        this.router.delete('/', chatController_1.default.deleteAllAvisos);
    }
}
const chatRoutes = new ChatRoutes();
exports.default = chatRoutes.router;
