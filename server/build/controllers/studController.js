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
class StudController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stud = yield database_1.default.query('SELECT * FROM estudiante');
            res.json(stud);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const stud = yield database_1.default.query('SELECT * FROM estudiante WHERE matricula = ?', [matricula]);
            if (stud.length > 0) {
                return res.json(stud[0]);
            }
            res.json({ Text: "El estudiante no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO estudiante set ?', [req.body]);
            res.json({ Message: 'student Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            yield database_1.default.query('UPDATE estudiante set ? WHERE matricula = ?', [req.body, matricula]);
            res.json({ message: 'The student was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            yield database_1.default.query('DELETE FROM estudiante WHERE matricula = ?', [matricula]);
            res.json({ message: 'The student was deleted' });
        });
    }
    deleteAllStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM estudiante');
            res.json({ message: 'The students was deleted' });
        });
    }
    deleteEstudiante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            if (req.body.matricula > 0) {
                yield database_1.default.query('DELETE FROM estudiante WHERE matricula=?', [req.body.matricula]);
                res.json({ message: 'The estudent was delated' });
            }
        });
    }
}
const studController = new StudController();
exports.default = studController;
