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
class EquipoController {
    getEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipo = yield database_1.default.query('SELECT * FROM equipo');
            res.json(equipo);
        });
    }
    getOneEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM equipo WHERE id = ?', [id]);
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            res.json({ id: 0, nombre: '', curso_nrc: 0 });
        });
    }
    getOneEquipoN(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nombre } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM equipo WHERE id = ? OR nombre = ?', [id, nombre]);
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            res.json({ id: 0, nombre: '', curso_nrc: 0 });
        });
    }
    saveEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO equipo set ?', [req.body]);
            res.json({ Message: 'Equipo Saved' });
        });
    }
    updateEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE equipo set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The Equipo was UPDATE' });
        });
    }
    deleteEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM equipo WHERE id = ?', [id]);
            res.json({ message: 'The Equipo was deleted' });
        });
    }
    deleteAllEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM equipo');
            res.json({ message: 'The Equipo was deleted' });
        });
    }
}
const equipoController = new EquipoController();
exports.default = equipoController;
