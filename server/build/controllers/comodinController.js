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
class ComodinController {
    listActEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT DISTINCT `id`, `nombre`, `descripcion`, `fecha`, `fechaEntrega`, `horaEntrega`, `noTrabajador`, `nrc`, `id_equipo`, `calificacion`, `urlProfesor`, `urlEstudiante`, `fechaEstudiante`, `comentarioProfesor` FROM `actividad` WHERE nrc=? AND noTrabajador=? AND id_equipo IS NOT NULL', [nrc, noTrabajador]);
            res.json(actividad);
        });
    }
    listActEs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador, matricula } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND matricula=? AND id_equipo IS NULL', [nrc, noTrabajador, matricula]);
            res.json(actividad);
        });
    }
    listActEqEs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador, matricula, id_equipo } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND matricula=? AND id_equipo=?', [nrc, noTrabajador, matricula, id_equipo]);
            res.json(actividad);
        });
    }
    deleteActsEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo, nrc, noTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM actividad WHERE id_equipo=? AND nrc=? AND noTrabajador=?', [id_equipo, nrc, noTrabajador]);
            res.json({ message: 'The actividad teams was delated' });
        });
    }
}
const comodinController = new ComodinController();
exports.default = comodinController;
