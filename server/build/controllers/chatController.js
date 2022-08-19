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
            const curso = yield database_1.default.query('SELECT * FROM chat');
            res.json(curso);
        });
    }
    // public async getOneCourse (req:Request, res:Response): Promise<any>{
    //     const  {nrc} = req.params;
    //     const curso = await pool.query('SELECT * FROM curso WHERE nrc = ?', [nrc])
    //     if (curso.length > 0 ){
    //         return res.json(curso[0]);
    //     }
    //     res.json({Text:"El aviso no existe"});
    // }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO chat set ?', [req.body]);
            res.json({ Message: 'chat Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave } = req.params;
            yield database_1.default.query('UPDATE chat set ? WHERE id = ?', [req.body, clave]);
            res.json({ message: 'The chat was UPDATE' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nrc } = req.params;
            yield database_1.default.query('DELETE FROM chat WHERE id = ?', [nrc]);
            res.json({ message: 'The chat was deleted' });
        });
    }
    deleteAllAvisos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM chat');
            res.json({ message: 'The chats was deleted' });
        });
    }
}
const chatController = new ChatController();
exports.default = chatController;
