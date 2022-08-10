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
            const actividad = yield database_1.default.query('SELECT DISTINCT id, nombre, descripcion, fecha, fechaEntrega, horaEntrega, noTrabajador, nrc, id_equipo FROM `actividad`');
            res.json(actividad);
        });
    }
    listEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo } = req.params;
            const actividad = yield database_1.default.query('SELECT DISTINCT id, nombre, descripcion, fecha, fechaEntrega, horaEntrega, noTrabajador, nrc, id_equipo FROM `actividad` WHERE id_equipo = ?', [id_equipo]);
            res.json(actividad);
        });
    }
    // public async listAct (req: Request, res: Response){
    //     const {listAct} = req.params;
    //     const actividad = await pool.query('SELECT * FROM actividad where id = ? ', [listAct]);
    //     res.json(actividad);
    // }
    // public async listActEq (req: Request, res: Response){
    //     const {listAct} = req.params;
    //     const actividad = await pool.query('SELECT * FROM actividad where id = ? ', [listAct]);
    //       res.json(actividad);
    // }
    // public async getActivity (req: Request, res: Response){
    //     const actividad = await pool.query('SELECT DISTINCT id, nombre, descripcion, fecha, fechaEntrega, horaEntrega, noTrabajador, nrc, id_equipo FROM `actividad`');
    //       res.json(actividad);
    //   }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `actividad` WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL LIMIT 1', [id, nrc, noTrabajador]);
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
            const { id, nrc, id_equipo, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `actividad` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=? LIMIT 1', [id, nrc, id_equipo, noTrabajador]);
            if (actividad.length > 0) {
                return res.json(actividad[0]);
            }
            else {
                res.json({ id: "FALLO", nombre: "", descripcion: "", fecha: "", fechaEntrega: "", horaEntrega: "", noTrabajador: 0, nrc: 0, id_equipo: 0 });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO actividad set ?', [req.body]);
            res.json({ Message: 'Actividad Saved' });
        });
    }
    updateAct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, noTrabajador } = req.params;
            yield database_1.default.query('UPDATE actividad set ? WHERE id=? AND nrc=? AND noTrabajador=?', [req.body, id, nrc, noTrabajador]);
            res.json({ message: 'The actividad was UPDATE' });
        });
    }
    updateActEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, noTrabajador, id_equipo } = req.params;
            yield database_1.default.query('UPDATE actividad set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo=?', [req.body, id, nrc, noTrabajador, id_equipo]);
            res.json({ message: 'The actividad was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, noTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM actividad WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [id, nrc, noTrabajador]);
            res.json({ message: 'The actividad was delated' });
        });
    }
    deleteEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, id_equipo, noTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM `actividad` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=?', [id, nrc, id_equipo, noTrabajador]);
            res.json({ message: 'The actividad was delated' });
        });
    }
}
const actividadController = new ActividadController();
exports.default = actividadController;
