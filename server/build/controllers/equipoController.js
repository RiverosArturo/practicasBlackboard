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
    getid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM equipo WHERE id = ? ', [id]);
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            else {
                res.json({ id: '0' });
            }
        });
    }
    getOneEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, curso_nrc, nTrabajador } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM equipo WHERE nombre=? AND curso_nrc=? AND nTrabajador=?', [nombre, curso_nrc, nTrabajador]);
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            else {
                res.json({ nombre: 'A', curso_nrc: curso_nrc, nTrabajador: nTrabajador });
            }
        });
    }
    getEquipos1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_nrc, nTrabajador } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?', [curso_nrc, nTrabajador]);
            res.json(equipo);
        });
    }
    getEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipo = yield database_1.default.query('SELECT * FROM equipo');
            res.json(equipo);
        });
    }
    // public async getNameEquipo (req:Request, res:Response): Promise<any>{
    //     const  {curso_nrc, nTrabajador } = req.params;
    //     //res.json({ nombre: 'prueba ' + nombre });
    //     const equipo = await pool.query('SELECT * FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?  ', [ id, curso_nrc, nTrabajador ])
    //     if (equipo.length > 0 ){      
    //         return res.json(equipo[0]);            
    //     }else{            
    //         res.json({ nombre: '...' });
    //     }  
    // }
    saveEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO equipo set ?', [req.body]);
            res.json({ Message: 'Equipo Saved' });
        });
    }
    updateEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nrc, nTrabajador } = req.params;
            yield database_1.default.query('UPDATE equipo set ? WHERE id = ? AND curso_nrc = ? AND nTrabajador = ?', [req.body, id, nrc, nTrabajador]);
            res.json({ message: 'The Equipo was UPDATE !!!!!!!!!!' });
        });
    }
    deleteEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, curso_nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM equipo WHERE id = ? AND curso_nrc = ? AND nTrabajador = ?', [id, curso_nrc, nTrabajador]);
            res.json({ message: 'The Equipo was deleted' });
        });
    }
    deleteAllEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_nrc, nTrabajador } = req.params;
            yield database_1.default.query('DELETE FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?', [curso_nrc, nTrabajador]);
            res.json({ message: 'The Equipos was deleted' });
        });
    }
}
const equipoController = new EquipoController();
exports.default = equipoController;
