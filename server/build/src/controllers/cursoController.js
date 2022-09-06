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
class CursoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const curso = yield database_1.default.query('SELECT * FROM curso');
            res.json(curso);
        });
    }
    getOneCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            const curso = yield database_1.default.query('SELECT * FROM curso WHERE nrc = ?', [nrc]);
            if (curso.length > 0) {
                return res.json(curso[0]);
            }
            res.json({ Text: "El curso no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO curso set ?', [req.body]);
            res.json({ Message: 'curso Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave } = req.params;
            yield database_1.default.query('UPDATE curso set ? WHERE clave = ?', [req.body, clave]);
            res.json({ message: 'The curso was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            yield database_1.default.query('DELETE FROM curso WHERE nrc = ?', [nrc]);
            res.json({ message: 'The course was deleted' });
        });
    }
    deleteAllCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM curso');
            res.json({ message: 'The courses was deleted' });
        });
    }
    verifica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            const curso = yield database_1.default.query('SELECT * FROM curso WHERE nrc = ?', [nrc]);
            if (curso.length > 0) {
                return res.json(curso[0]);
            }
            res.json({ Text: "El curso no existe" });
        });
    }
}
const cursoController = new CursoController();
exports.default = cursoController;
