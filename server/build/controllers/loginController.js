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
    getlistProf(req, res) {
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
            res.json({ Text: "El profesor no exixte" });
        });
    }
    //---------------------------------------------------------------------------------------------------
    getlistStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield database_1.default.query('SELECT * FROM studiante');
            res.json(student);
        });
    }
    getOneStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const student = yield database_1.default.query('SELECT * FROM estudiante WHERE matricula = ?', [matricula]);
            if (student.length > 0) {
                return res.json(student[0]);
            }
            res.json({ Text: "El Alumno no exixte" });
        });
    }
    //-------------------------------------------------------------------------------------------------------
    getlistAdmi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admi = yield database_1.default.query('SELECT * FROM administrador');
            res.json(admi);
        });
    }
    getOneAdmi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const admi = yield database_1.default.query('SELECT * FROM administrador WHERE id = ?', [id]);
            if (admi.length > 0) {
                return res.json(admi[0]);
            }
            res.json({ Text: "El administrador no exixte" });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
