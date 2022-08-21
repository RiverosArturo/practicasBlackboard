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
class AvisoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const actividad = yield database_1.default.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso`');
            res.json(actividad);
        });
    }
    listEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo } = req.params;
            const actividad = yield database_1.default.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso` WHERE id_equipo = ?', [id_equipo]);
            res.json(actividad);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `aviso` WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL LIMIT 1', [id, nrc, noTrabajador]);
            if (actividad.length > 0) {
                return res.json(actividad[0]);
            }
            else {
                res.json({ id: "", aviso: "", fecha: "", hora: "", noTrabajador: 0, nrc: 0, id_equipo: 0 });
            }
        });
    }
    getOneEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, id_equipo, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `aviso` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=? LIMIT 1', [id, nrc, id_equipo, noTrabajador]);
            if (actividad.length > 0) {
                return res.json(actividad[0]);
            }
            else {
                res.json({ id: "FALLO", aviso: "", fecha: "", hora: "", noTrabajador: 0, nrc: 0, id_equipo: 0 });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO aviso set ?', [req.body]);
            res.json({ Message: 'aviso Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave } = req.params;
            yield database_1.default.query('UPDATE aviso set ? WHERE id = ?', [req.body, clave]);
            res.json({ message: 'The aviso was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, noTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM aviso WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [id, nrc, noTrabajador]);
            res.json({ message: 'The aviso was delated' });
        });
    }
    deleteEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, id_equipo, noTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM `aviso` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=?', [id, nrc, id_equipo, noTrabajador]);
            res.json({ message: 'The aviso was delated' });
        });
    }
    deleteAllAvisos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM aviso');
            res.json({ message: 'The courses was deleted' });
        });
    }
}
const avisoController = new AvisoController();
exports.default = avisoController;
