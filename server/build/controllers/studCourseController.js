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
class studCourseController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const curso = yield database_1.default.query('SELECT * FROM estudiante_curso');
            res.json(curso);
        });
    }
    getlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, nTrabajador } = req.params;
            const studCourse = yield database_1.default.query('SELECT * FROM `estudiante_curso` WHERE nrc=? AND nTrabajador=?', [nrc, nTrabajador]);
            res.json(studCourse);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, nTrabajador } = req.params;
            const pCourse = yield database_1.default.query('SELECT * FROM `estudiante_curso` WHERE nrc=? AND nTrabajador=?', [nrc, nTrabajador]);
            res.json(pCourse);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, nTrabajador, matricula } = req.params;
            const pCourse = yield database_1.default.query('SELECT * FROM `estudiante_curso` WHERE nrc= ? AND nTrabajador= ? AND matricula= ?', [nrc, nTrabajador, matricula]);
            if (pCourse.length > 0) {
                return res.json(pCourse[0]);
            }
            else {
                res.json({ matricula: "0", nrc: "0", nTrabajador: "0" });
            }
        });
    }
    getEstudianteCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const curso = yield database_1.default.query('SELECT * FROM estudiante_curso WHERE matricula = ?', [matricula]);
            if (curso.length > 0) {
                return res.json(curso[0]);
            }
            res.json({ Text: "El curso no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO estudiante_curso set ?', [req.body]);
            res.json({ Message: 'Estudiante Saved in curso' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula, nrc } = req.params;
            yield database_1.default.query('UPDATE estudiante_curso set ? WHERE nrc = ? AND nTrabajador = ? AND matricula = ?', [nrc, matricula]);
            res.json({ message: 'The curso was UPDATE' });
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula, nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM estudiante_curso WHERE matricula = ? AND nrc = ? AND nTrabajador = ?', [matricula, nrc, nTrabajador]);
            res.json({ message: 'The student was deleted' });
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM estudiante_curso WHERE nrc = ? AND nTrabajador = ?', [nrc, nTrabajador]);
            res.json({ message: 'The students was deleted' });
        });
    }
    deleteCursoEs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            if (req.body.nrc > 0) {
                yield database_1.default.query('DELETE FROM estudiante_curso WHERE nrc=?', [req.body.nrc]);
                res.json({ message: 'The estudiante_curso was delated' });
            }
            else if (req.body.matricula > 0) {
                yield database_1.default.query('DELETE FROM estudiante_curso WHERE matricula=?', [req.body.matricula]);
                res.json({ message: 'The estudiante_curso was delated' });
            }
            else if (req.body.nTrabajador > 0) {
                yield database_1.default.query('DELETE FROM estudiante_curso WHERE nTrabajador=?', [req.body.nTrabajador]);
                res.json({ message: 'The estudiante_curso was delated' });
            }
        });
    }
}
const StudCourseController = new studCourseController();
exports.default = StudCourseController;
