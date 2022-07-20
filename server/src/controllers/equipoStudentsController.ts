import {Request, Response} from 'express';
import pool from '../database';

class EquipoStudentsController {

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
    }
    public async deleteEquipo (req:Request, res:Response): Promise <void>{
        const {id} = req.params;
        await pool.query('DELETE FROM equipo_estudiantes WHERE id = ?', [id]);
        res.json({message: 'The Equipo was deleted'});
    }
    public async deleteAllEquipo (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM equipo_estudiantes');
        res.json({message: 'The Equipo was deleted'});
    }
}
const equipoStudentsController = new EquipoStudentsController();
export default equipoStudentsController;