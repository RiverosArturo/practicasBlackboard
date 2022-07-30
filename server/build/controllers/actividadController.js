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
class ActividadController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const actividad = yield database_1.default.query('SELECT * FROM actividad');
            res.json(actividad);
        });
    }
    listAct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { listAct } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM actividad where id = ? ', [listAct]);
            res.json(actividad);
        });
    }
    getActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const actividad = yield database_1.default.query('SELECT * FROM actividad');
            res.json(actividad);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM actividad WHERE id = ? AND id_equipo IS NULL LIMIT 1 ', [id]);
            if (actividad.length > 0) {
                return res.json(actividad[0]);
            }
            else {
                res.json({ id: "", nombre: "", descripcion: "", fecha: "", fechaEntrega: "", horaEntrega: "", noTrabajador: 0, nrc: 0, id_equipo: 0 });
            }
        });
    }
    getOneEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, id_equipo } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM actividad WHERE id = ? AND id_equipo = ? LIMIT 1', [id, id_equipo]);
            if (actividad.length > 0) {
                return res.json(actividad[0]);
            }
            else {
                res.json({ id: "", nombre: "", descripcion: "", fecha: "", fechaEntrega: "", horaEntrega: "", noTrabajador: 0, nrc: 0, id_equipo: 0 });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO actividad set ?', [req.body]);
            res.json({ Message: 'Actividad Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE actividad set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The actividad was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM actividad WHERE id = ?', [id]);
            res.json({ message: 'The Profesor was delated' });
        });
    }
}
const actividadController = new ActividadController();
exports.default = actividadController;
