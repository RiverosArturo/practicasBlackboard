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
class ChatController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const actividad = yield database_1.default.query('SELECT DISTINCT mensaje, noTrabajador, nrc, id_equipo, matricula FROM `chat` AND id_equipo IS NULL LIMIT1 ');
            res.json(actividad);
        });
    }
    listEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo } = req.params;
            const actividad = yield database_1.default.query('SELECT DISTINCT mensaje, noTrabajador, nrc, id_equipo, matricula FROM `chat` WHERE id_equipo = ?', [id_equipo]);
            res.json(actividad);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `chat` WHERE nrc=? AND noTrabajador=? AND id_equipo IS NULL', [nrc, noTrabajador]);
            if (actividad.length > 0) {
                return res.json(actividad);
            }
            else {
                return res.json({ mensaje: "NO HAY MENSAJES!!!", noTrabajador: 0, nrc: 0, id_equipo: 0, matricula: 0 });
            }
        });
    }
    getOneEq(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc, id_equipo, noTrabajador } = req.params;
            const actividad = yield database_1.default.query('SELECT * FROM `chat` WHERE nrc=? AND id_equipo=? AND noTrabajador=?', [nrc, id_equipo, noTrabajador]);
            if (actividad.length > 0) {
                res.json(actividad);
            }
            else {
                res.json({ mensaje: "NO HAY MENSAJES", noTrabajador: 0, nrc: 0, id_equipo: 0, matricula: 0 });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO chat set ?', [req.body]);
            res.json({ Message: 'msj Saved' });
        });
    }
    // public async updateCh (req:Request, res:Response): Promise<void>{
    //     const {id,nrc,noTrabajador} = req.params;
    //     await pool.query('UPDATE aviso set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [req.body,id,nrc,noTrabajador]);
    //     res.json({message: 'The actividad was UPDATE'});
    // }
    // public async updateAvEq (req:Request, res:Response): Promise<void>{
    //     const {id,nrc,noTrabajador,id_equipo} = req.params;
    //     await pool.query('UPDATE aviso set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo=?', [req.body,id,nrc,noTrabajador,id_equipo]);
    //     res.json({message: 'The actividad was UPDATE'});
    // }
    // public async delete (req:Request, res:Response): Promise <void>{
    //     const {matricula,nrc,noTrabajador} = req.params;
    //     await pool.query('DELETE FROM aviso WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [matricula,nrc,noTrabajador]);
    //     res.json({message: 'The msj was delated'});
    // }
    // public async deleteEq (req:Request, res:Response): Promise <void>{
    //     const {nrc,id_equipo,noTrabajador,x} = req.params;
    //     await pool.query('DELETE FROM `aviso` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=?', [nrc,id_equipo,noTrabajador,x]);
    //     res.json({message: 'The msj was delated'});
    // }
    deleteChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            if (req.body.nrc > 0) {
                yield database_1.default.query('DELETE FROM chat WHERE nrc=?', [req.body.nrc]);
                res.json({ message: 'The chats was delated' });
            }
            else if (req.body.matricula > 0) {
                yield database_1.default.query('DELETE FROM chat WHERE matricula=?', [req.body.matricula]);
                res.json({ message: 'The chats was delated' });
            }
            else if (req.body.nTrabajador > 0) {
                yield database_1.default.query('DELETE FROM chat WHERE noTrabajador=?', [req.body.nTrabajador]);
                res.json({ message: 'The chats was delated' });
            }
        });
    }
}
const chatController = new ChatController();
exports.default = chatController;
