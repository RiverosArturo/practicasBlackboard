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
class AdmiController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admi = yield database_1.default.query('SELECT * FROM administrador');
            res.json(admi);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const admi = yield database_1.default.query('SELECT * FROM administrador WHERE id = ?', [id]);
            if (admi.length > 0) {
                return res.json(admi[0]);
            }
            res.json({ Text: "El Admistrador no existe" });
        });
    }
    actividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador, id } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND id=? AND id_equipo IS NULL', [nrc, noTrabajador, id]);
            res.json(actividad);
        });
    }
    actividadesE(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador, id, id_equipo } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND id=? AND id_equipo=?', [nrc, noTrabajador, id, id_equipo]);
            res.json(actividad);
        });
    }
}
const admiController = new AdmiController();
exports.default = admiController;
