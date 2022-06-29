import {Request, Response} from 'express';
import pool from '../database';

class StudController {

    public async list (req: Request, res: Response){
      const stud = await pool.query('SELECT * FROM estudiante');
        res.json(stud);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {matricula} = req.params;
        const stud = await pool.query('SELECT * FROM estudiante WHERE matricula = ?', [matricula])
        if (stud.length > 0 ){
            return res.json(stud[0]);
        }
        res.json({Text:"El estudiante no exixte"});
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO estudiante set ?', [req.body]);
        res.json({Message: 'student Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { matricula } = req.params;
        await pool.query('UPDATE estudiante set ? WHERE matricula = ?', [req.body, matricula]);
        res.json({message: 'The student was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {matricula} = req.params;
        await pool.query('DELETE FROM estudiante WHERE matricula = ?', [matricula]);
        res.json({message: 'The student was deleted'});
    }
    public async deleteAllStudents (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM estudiante');
        res.json({message: 'The students was deleted'});
    }
}
const studController = new StudController();
export default studController;