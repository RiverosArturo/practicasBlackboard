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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pCourse = yield database_1.default.query('SELECT * FROM estudiante_curso');
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
    getNrcCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            const pCourse = yield database_1.default.query('SELECT * FROM estudiante_curso WHERE nrc = ?', [nrc]);
            if (pCourse.length > 0) {
                return res.json(pCourse[0]);
            }
            res.status(404).json({ Text: "El curso no existe" });
        });
    }
    getOneNrcCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            const nrcCourse = yield database_1.default.query('SELECT * FROM estudiante_curso WHERE nrc = ?', [nrc]);
            if (nrcCourse.length > 0) {
                return res.json(nrcCourse[0]);
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
            const { nrc } = req.params;
            yield database_1.default.query('UPDATE estudiante_curso set ? WHERE nrc = ?', [req.body, nrc]);
            res.json({ message: 'The curso was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            yield database_1.default.query('DELETE FROM estudiante_curso WHERE nrc = ?', [nrc]);
            res.json({ message: 'The course was deleted' });
        });
    }
    deleteAllProfCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM estudiante_curso');
            res.json({ message: 'The courses was deleted' });
        });
    }
}
const StudCourseController = new studCourseController();
exports.default = StudCourseController;
