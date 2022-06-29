"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class LoginController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prof = yield database_1.default.query('SELECT * FROM profesor');
            res.json(prof);
        });
    }
    getOneProf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ntrabajador } = req.params;
            const prof = yield database_1.default.query('SELECT * FROM profesor WHERE ntrabajador = ?', [ntrabajador]);
            if (prof.length > 0) {
                return res.json(prof[0]);
            }
            res.status(404).json({ Text: "El profesor no exixte" });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
