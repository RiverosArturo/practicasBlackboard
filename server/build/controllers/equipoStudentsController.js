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
class EquipoStudentsController {
    getEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipo = yield database_1.default.query('SELECT * FROM equipo_estudiantes');
            res.json(equipo);
        });
    }
    getEquiposBien(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nTrabajador, nrc, id } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM equipo_estudiantes WHERE nTrabajador=? AND nrc=? AND id_equipo=?', [nTrabajador, nrc, id]);
            res.json(equipo);
        });
    }
    getOneEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM equipo_estudiantes WHERE id = ?', [id]);
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            res.json({ id: 0, nombre: '', curso_nrc: 0 });
        });
    }
    saveEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO equipo_estudiantes set ?', [req.body]);
            res.json({ Message: 'Equipo Saved' });
        });
    }
    updateEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE equipo_estudiantes set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The Equipo was UPDATE' });
        });
    }
    //-------------------------------------------------------------------------------------------------    
    saveStudentEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO equipo_estudiantes set ?', [req.body]);
            res.json({ Message: 'Alumno agregado al equipo.' });
        });
    }
    get1Equipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo, nrc, nTrabajador } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM `equipo_estudiantes` WHERE id_equipo = ?', [id_equipo]);
            res.json(equipo);
        });
    }
    deleteStudentEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula, id_equipo, nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM `equipo_estudiantes` WHERE matricula = ? AND id_equipo = ? AND nrc = ? AND nTrabajador = ?', [matricula, id_equipo, nrc, nTrabajador]);
            res.json({ message: 'The student the Equipo was deleted' });
        });
    }
    deleteStudentsEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo, nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM `equipo_estudiantes` WHERE id_equipo = ? AND nrc = ? AND nTrabajador = ?', [id_equipo, nrc, nTrabajador]);
            res.json({ message: 'The students the Equipo was deleted' });
        });
    }
    deleteEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, curso_nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM equipo WHERE id = ? AND nombre = ? AND curso_nrc = ? AND nTrabajador = ?', [id, nombre, curso_nrc, nTrabajador]);
            res.json({ message: 'The Equipo was deleted' });
        });
    }
}
const equipoStudentsController = new EquipoStudentsController();
exports.default = equipoStudentsController;
