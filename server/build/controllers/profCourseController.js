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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pCourse = yield database_1.default.query('SELECT * FROM profesor_curso');
            res.json(pCourse);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nTrabajador } = req.params;
            const pCourse = yield database_1.default.query('SELECT * FROM profesor_curso WHERE nTrabajador = ?', [nTrabajador]);
            if (pCourse.length > 0) {
                return res.json(pCourse[0]);
            }
            res.status(404).json({ Text: "El curso no existe" });
        });
    }
    getNRCCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nTrabajador, nrc } = req.params;
            const pCourse = yield database_1.default.query('SELECT * FROM profesor_curso WHERE nTrabajador = ? AND WHERE nrc = ?', [nTrabajador, nrc]);
            if (pCourse.length > 0) {
                return res.json(pCourse[0]);
            }
            res.json({ Text: "El curso no existe" });
        });
    }
    // no borrar optiene el nrc para poder guardar el curso
    getOneNrcCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            const nrcCourse = yield database_1.default.query('SELECT * FROM profesor_curso WHERE nrc = ?', [nrc]);
            if (nrcCourse.length > 0) {
                return res.json(nrcCourse[0]);
            }
            res.json({ Text: "El curso no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO profesor_curso set ?', [req.body]);
            res.json({ Message: 'curso Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            yield database_1.default.query('UPDATE profesor_curso set ? WHERE nrc = ?', [req.body, nrc]);
            res.json({ message: 'The curso was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            yield database_1.default.query('DELETE FROM profesor_curso WHERE nrc = ?', [nrc]);
            res.json({ message: 'The course was deleted' });
        });
    }
    deleteAllProfCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM profesor_curso');
            res.json({ message: 'The courses was deleted' });
        });
    }
}
const profCourseController = new ProfCourseController();
exports.default = profCourseController;
