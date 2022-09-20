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
class ProfCourseController {
    // optiene user y nrc para filtar un curso exixtente    
    getUSERNRC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nTrabajador, nrc } = req.params;
            const curso = yield database_1.default.query('SELECT * FROM profesor_curso WHERE nTrabajador = ? AND nrc = ? ', [nTrabajador, nrc]);
            if (curso.length > 0) {
                return res.json(curso[0]);
            }
            res.json({ Text: "El curso no existe" });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pCourse = yield database_1.default.query('SELECT * FROM profesor_curso');
            res.json(pCourse);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO profesor_curso set ?', [req.body]);
            res.json({ Message: 'curso Saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nTrabajador, nrc } = req.params;
            yield database_1.default.query('DELETE FROM profesor_curso WHERE nTrabajador = ? AND nrc = ? ', [nTrabajador, nrc]);
            res.json({ message: 'The course was deleted' });
        });
    }
    deleteAllProfCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM profesor_curso');
            res.json({ message: 'The courses was deleted' });
        });
    }
    deleteProfesorCu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            if (req.body.nrc > 0) {
                yield database_1.default.query('DELETE FROM profesor_curso WHERE nrc=?', [req.body.nrc]);
                res.json({ message: 'The profesor_curso was delated' });
            }
            else if (req.body.nTrabajador > 0) {
                yield database_1.default.query('DELETE FROM profesor_curso WHERE nTrabajador=?', [req.body.nTrabajador]);
                res.json({ message: 'The profesor_curso was delated' });
            }
        });
    }
}
const profCourseController = new ProfCourseController();
exports.default = profCourseController;
