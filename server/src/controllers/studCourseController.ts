import {Request, Response} from 'express';
import pool from '../database';

class studCourseController {

    public async list (req: Request, res: Response){
      const pCourse = await pool.query('SELECT * FROM estudiante_curso');
        res.json(pCourse);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const {nrc, nTrabajador, matricula} = req.params;
        const pCourse = await pool.query('SELECT * FROM `estudiante_curso` WHERE nrc= ? AND nTrabajador= ? AND matricula= ?', [nrc, nTrabajador, matricula])
        if (pCourse.length > 0 ){
            return res.json(pCourse[0]);
        }else{res.json({matricula:"0", nrc:"0", nTrabajador:"0"});}
    }
    public async getNrcCourse (req:Request, res:Response): Promise<any>{
        const  {nrc} = req.params;
        const pCourse = await pool.query('SELECT * FROM estudiante_curso WHERE nrc = ?', [nrc])
        if (pCourse.length > 0 ){
            return res.json(pCourse[0]);
        }
        res.status(404).json({Text:"El curso no existe"});
    }
    public async getOneNrcCourse (req:Request, res:Response): Promise<any>{
        const  {nrc} = req.params;
        const nrcCourse = await pool.query('SELECT * FROM estudiante_curso WHERE nrc = ?', [nrc])
        if (nrcCourse.length > 0 ){
            return res.json(nrcCourse[0]);
        }
        res.json({Text:"El curso no existe"});
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO estudiante_curso set ?', [req.body]);
        res.json({Message: 'Estudiante Saved in curso'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { nrc } = req.params;
        await pool.query('UPDATE estudiante_curso set ? WHERE nrc = ?', [req.body, nrc]);
        res.json({message: 'The curso was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        await pool.query('DELETE FROM estudiante_curso WHERE nrc = ?', [nrc]);
        res.json({message: 'The course was deleted'});
    }
    public async deleteAllProfCourses (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM estudiante_curso');
        res.json({message: 'The courses was deleted'});
    }
    
}
const StudCourseController = new studCourseController();
export default StudCourseController;