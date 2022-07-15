import {Request, Response} from 'express';
import pool from '../database';

class ProfCourseController {

    public async list (req: Request, res: Response){
      const pCourse = await pool.query('SELECT * FROM profesor_curso');
        res.json(pCourse);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {nTrabajador} = req.params;
        const pCourse = await pool.query('SELECT * FROM profesor_curso WHERE nTrabajador = ?', [nTrabajador])
        if (pCourse.length > 0 ){
            return res.json(pCourse[0]);
        }
        res.status(404).json({Text:"El curso no existe"});
    }
// optiene user y nrc para filtar un curso exixtente    
    public async getUSERNRC (req:Request, res:Response): Promise<any>{
        const  {nrc} = req.params;        
        const pCourse = await pool.query('SELECT * FROM profesor_curso WHERE nrc = ?', [nrc])
        if (pCourse.length > 0 ){
            return res.json(pCourse[0]);
        }
        res.json({Text:"El curso no existe"});
    }
// no borrar optiene el nrc para poder guardar el curso
    public async getOneNrcCourse (req:Request, res:Response): Promise<any>{
        const  {nrc} = req.params;
        const nrcCourse = await pool.query('SELECT * FROM profesor_curso WHERE nrc = ?', [nrc])
        if (nrcCourse.length > 0 ){
            return res.json(nrcCourse[0]);
        }
        res.json({Text:"El curso no existe"});
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