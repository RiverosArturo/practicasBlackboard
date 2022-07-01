import {Request, Response} from 'express';
import pool from '../database';

class ProfController {

    public async list (req: Request, res: Response){
      const prof = await pool.query('SELECT * FROM profesor');
        res.json(prof);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {ntrabajador} = req.params;
        const prof = await pool.query('SELECT * FROM profesor WHERE ntrabajador = ?', [ntrabajador])
        if (prof.length > 0 ){
            return res.json(prof[0]);
        }
        res.json({Text:"El profesor no existe"});
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO profesor set ?', [req.body]);
        res.json({Message: 'Profesor Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { ntrabajador } = req.params;
        await pool.query('UPDATE profesor set ? WHERE ntrabajador = ?', [req.body, ntrabajador]);
        res.json({message: 'The Profesor was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {ntrabajador} = req.params;
        await pool.query('DELETE FROM profesor WHERE ntrabajador = ?', [ntrabajador]);
        res.json({message: 'The Profesor was delated'});
    }
    public async deleteAllProf (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM profesor');
        res.json({message: 'The Profesores was delated'});
    }
}


const profController = new ProfController();
export default profController;