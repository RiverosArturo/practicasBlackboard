import {Request, Response} from 'express';
import pool from '../database';

class ActividadController {

    public async list (req: Request, res: Response){
      const prof = await pool.query('SELECT * FROM actividad');
        res.json(prof);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {id} = req.params;
        const actividad = await pool.query('SELECT * FROM actividad WHERE id = ?', [id])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }
        res.json({id: ""});
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO actividad set ?', [req.body]);
        res.json({Message: 'Actividad Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE actividad set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The actividad was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {id} = req.params;
        await pool.query('DELETE FROM actividad WHERE id = ?', [id]);
        res.json({message: 'The Profesor was delated'});
    }
}


const actividadController = new ActividadController();
export default actividadController;