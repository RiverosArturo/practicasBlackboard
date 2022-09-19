import {Request, Response} from 'express';
import pool from '../database';

class studCourseController {
    public async lista (req: Request, res: Response){
        const curso = await pool.query('SELECT * FROM estudiante_curso');
          res.json(curso);
      }
    public async getlist (req: Request, res: Response){
        const {nrc, nTrabajador} = req.params;
        const studCourse = await pool.query('SELECT * FROM `estudiante_curso` WHERE nrc=? AND nTrabajador=?', [nrc, nTrabajador]);
          res.json(studCourse);
      }
    public async list (req: Request, res: Response){
        const {nrc, nTrabajador} = req.params;
        const pCourse = await pool.query('SELECT * FROM `estudiante_curso` WHERE nrc=? AND nTrabajador=?', [nrc, nTrabajador]);
        res.json(pCourse);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const {nrc, nTrabajador, matricula} = req.params;
        const pCourse = await pool.query('SELECT * FROM `estudiante_curso` WHERE nrc= ? AND nTrabajador= ? AND matricula= ?', [nrc, nTrabajador, matricula])
        if (pCourse.length > 0 ){
            return res.json(pCourse[0]);
        }else{res.json({matricula:"0", nrc:"0", nTrabajador:"0"});}
    }

    public async getEstudianteCurso (req:Request, res:Response): Promise<any>{
        const  {matricula} = req.params;
        const curso = await pool.query('SELECT * FROM estudiante_curso WHERE matricula = ?', [matricula])
        if (curso.length > 0 ){
            return res.json(curso[0]);
        }
        res.json({Text:"El curso no existe"});
    }

    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO estudiante_curso set ?', [req.body]);
        res.json({Message: 'Estudiante Saved in curso'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const {matricula, nrc} = req.params;
        await pool.query('UPDATE estudiante_curso set ? WHERE nrc = ? AND nTrabajador = ? AND matricula = ?', [nrc, matricula]);
        res.json({message: 'The curso was UPDATE'});
    }
    public async deleteOne (req:Request, res:Response): Promise <void>{
        const {matricula, nrc, nTrabajador} = req.params;
        await pool.query('DELETE FROM estudiante_curso WHERE matricula = ? AND nrc = ? AND nTrabajador = ?', [matricula, nrc, nTrabajador]); 
        res.json({message: 'The student was deleted'});
    }
    public async deleteAll (req:Request, res:Response): Promise <void>{
        const {nrc, nTrabajador} = req.params;
        await pool.query('DELETE FROM estudiante_curso WHERE nrc = ? AND nTrabajador = ?', [nrc, nTrabajador]); 
        res.json({message: 'The students was deleted'});
    }
    public async deleteCursoEs(req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        if(req.body.nrc > 0 ){
            await pool.query('DELETE FROM estudiante_curso WHERE nrc=?', [req.body.nrc]);
            res.json({message: 'The estudiante_curso was delated'});
        }else if(req.body.matricula > 0){
            await pool.query('DELETE FROM estudiante_curso WHERE matricula=?', [req.body.matricula]);
            res.json({message: 'The estudiante_curso was delated'});
        }else if(req.body.nTrabajador > 0){
            await pool.query('DELETE FROM estudiante_curso WHERE nTrabajador=?', [req.body.nTrabajador]);
            res.json({message: 'The estudiante_curso was delated'});
        }
    }
}
const StudCourseController = new studCourseController();
export default StudCourseController;