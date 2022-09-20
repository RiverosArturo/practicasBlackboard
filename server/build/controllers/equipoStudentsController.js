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
    getStudentEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula, nTrabajador } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM `equipo_estudiantes` WHERE matricula = ? AND nTrabajador = ? ', [matricula, nTrabajador]);
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            else {
                res.json({ matricula: 0 });
            }
        });
    }
    getNameEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, curso_nrc, nTrabajador } = req.params;
            //res.json({ nombre: 'prueba ' + nombre });
            const equipo = yield database_1.default.query('SELECT * FROM equipo WHERE nombre = ? AND curso_nrc = ? AND nTrabajador = ?  ', [nombre, curso_nrc, nTrabajador]);
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            else {
                res.json({ nombre: '...' });
            }
        });
    }
    get1Equipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM `equipo_estudiantes` WHERE id_equipo = ?', [id_equipo]);
            res.json(equipo);
        });
    }
    updateNameEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.default.query('UPDATE equipo set ? WHERE nombre = ?', [req.body, nombre]);
            res.json({ message: 'The name equipo was UPDATE. ' + nombre });
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
            const id = id_equipo;
            const curso_nrc = nrc;
            //await pool.query('DELETE FROM equipo WHERE id = ? AND curso_nrc = ? AND nTrabajador = ?', [id,curso_nrc,nTrabajador]);         
            res.json({ message: 'equipo was delated', id_equipo, curso_nrc, nTrabajador });
        });
    }
    deleteEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, curso_nrc, nTrabajador } = req.params;
            //res.json({message: '::>',id, nombre, curso_nrc, nTrabajador});
            const id_equipo = id;
            const nrc = curso_nrc;
            res.json({ message: '::> ', id_equipo, nrc, nTrabajador });
            yield database_1.default.query('DELETE FROM `equipo_estudiantes` WHERE id_equipo = ? AND nrc = ? AND nTrabajador = ?', [id_equipo, nrc, nTrabajador]);
            res.json({ message: 'The students Equipo was deleted' });
            //await pool.query('DELETE FROM equipo WHERE id = ? AND nombre = ? AND curso_nrc = ? AND nTrabajador = ?', [id,nombre,curso_nrc,nTrabajador]);         
            //res.json({message: 'equipo was delated'});
        });
    }
    deleteEquipoEsCur(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM `equipo_estudiantes` WHERE nrc = ? AND nTrabajador = ?', [nrc, nTrabajador]);
            res.json({ message: 'The student the Equipo was deleted' });
        });
    }
    deleteEquipoEs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            if (req.body.nrc > 0) {
                yield database_1.default.query('DELETE FROM equipo_estudiantes WHERE nrc=?', [req.body.nrc]);
                res.json({ message: 'The equipoEs was delated' });
            }
            else if (req.body.matricula > 0) {
                yield database_1.default.query('DELETE FROM equipo_estudiantes WHERE matricula=?', [req.body.matricula]);
                res.json({ message: 'The equipoEs was delated' });
            }
            else if (req.body.nTrabajador > 0) {
                yield database_1.default.query('DELETE FROM equipo_estudiantes WHERE nTrabajador=?', [req.body.nTrabajador]);
                res.json({ message: 'The equipoEs was delated' });
            }
        });
    }
}
const equipoStudentsController = new EquipoStudentsController();
exports.default = equipoStudentsController;
