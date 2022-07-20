import {Request, Response} from 'express';
import pool from '../database';

class EquipoController {

    public async getEquipo (req: Request, res: Response){
      const equipo = await pool.query('SELECT * FROM equipo');
        res.json(equipo);
    }
    public async getOneEquipo (req:Request, res:Response): Promise<any>{
        const  {id} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo WHERE id = ?', [id])
        if (equipo.length > 0 ){
            return res.json(equipo[0]);
        }
        res.json({id: 0, nombre: '', curso_nrc: 0});
    }
    public async getOneEquipoN (req:Request, res:Response): Promise<any>{
        const {id, nombre} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo WHERE id = ? OR nombre = ?', [id, nombre])
        if (equipo.length > 0 ){
            return res.json(equipo[0]);
        }
        res.json({id: 0, nombre: '', curso_nrc: 0});
    }
    public async saveEquipo (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO equipo set ?', [req.body]);
        res.json({Message: 'Equipo Saved'});
    }
    public async updateEquipo (req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE equipo set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The Equipo was UPDATE'});
    }
    public async deleteEquipo (req:Request, res:Response): Promise <void>{
        const {id} = req.params;
        await pool.query('DELETE FROM equipo WHERE id = ?', [id]);
        res.json({message: 'The Equipo was deleted'});
    }
    public async deleteAllEquipo (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM equipo');
        res.json({message: 'The Equipo was deleted'});
    }
}
const equipoController = new EquipoController();
export default equipoController;