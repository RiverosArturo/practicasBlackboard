import {Request, Response} from 'express';
import pool from '../database';

class ProfCourseController {

    public async list (req: Request, res: Response){
      const pCourse = await pool.query('SELECT * FROM profesor_curso');
        res.json(pCourse);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {nTrabajador} = req.params;
        const pcourse = await pool.query('SELECT * FROM profesor_curso WHERE nTrabajador = ?', [nTrabajador])
        if (pcourse.length > 0 ){
            return res.json(pcourse[0]);
        }
        res.status(404).json({Text:"El curso no exixte"});
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO profesor_curso set ?', [req.body]);
        res.json({Message: 'curso Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { nrc } = req.params;
        await pool.query('UPDATE profesor_curso set ? WHERE nrc = ?', [req.body, nrc]);
        res.json({message: 'The curso was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        await pool.query('DELETE FROM profesor_curso WHERE nrc = ?', [nrc]);
        res.json({message: 'The course was deleted'});
    }
    public async deleteAllProfCourses (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM profesor_curso');
        res.json({message: 'The courses was deleted'});
    }
    
}
const profCourseController = new ProfCourseController();
export default profCourseController;