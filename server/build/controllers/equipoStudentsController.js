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
class EquipoStudentsController {
    /*
    public async getEquipos (req: Request, res: Response){
      const equipo = await pool.query('SELECT * FROM equipo_estudiantes');
        res.json(equipo);
    }
    public async getEquiposBien (req: Request, res: Response){
        const  {nTrabajador, nrc, id} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo_estudiantes WHERE nTrabajador=? AND nrc=? AND id_equipo=?', [nTrabajador,nrc,id]);
          res.json(equipo);
      }
    public async getOneEquipo (req:Request, res:Response): Promise<any>{
        const  {id} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo_estudiantes WHERE id = ?', [id])
        if (equipo.length > 0 ){
            return res.json(equipo[0]);
        }
        res.json({id: 0, nombre: '', curso_nrc: 0});
    }
    public async saveEquipo (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO equipo_estudiantes set ?', [req.body]);
        res.json({Message: 'Equipo Saved'});
    }
    public async updateEquipo (req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE equipo_estudiantes set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The Equipo was UPDATE'});
    }*/
    //-------------------------------------------------------------------------------------------------    
    saveStudentEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO equipo_estudiantes set ?', [req.body]);
            res.json({ Message: 'Alumno agregado al equipo.' });
        });
    }
    getEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_equipo, nrc, nTrabajador } = req.params;
            const equipo = yield database_1.default.query('SELECT * FROM `equipo_estudiantes` WHERE id_equipo = ?', [id_equipo]);
            res.json(equipo);
        });
    }
}
const equipoStudentsController = new EquipoStudentsController();
exports.default = equipoStudentsController;
