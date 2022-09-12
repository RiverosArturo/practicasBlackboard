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
class ComodinController2 {
    listEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso` WHERE nrc=? AND noTrabajador=? AND id_equipo IS NOT NULL', [nrc, noTrabajador]);
            res.json(actividad);
        });
    }
    listEqAl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador, id_equipo } = req.params;
            const actividad = yield database_1.default.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso` WHERE nrc=? AND noTrabajador=? AND id_equipo=?', [nrc, noTrabajador, id_equipo]);
            res.json(actividad);
        });
    }
}
const comodin2Controller = new ComodinController2();
exports.default = comodin2Controller;
