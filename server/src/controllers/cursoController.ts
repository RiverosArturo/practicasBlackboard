import {Request, Response} from 'express';
import pool from '../database';

class CursoController {

    public async list (req: Request, res: Response){
      const curso = await pool.query('SELECT * FROM curso');
        res.json(curso);
    }
    public async getOneCourse (req:Request, res:Response): Promise<any>{
        const  {nrc} = req.params;
        const curso = await pool.query('SELECT * FROM curso WHERE nrc = ?', [nrc])
        if (curso.length > 0 ){
            return res.json(curso[0]);
        }
        res.json({Text:"El curso no existe"});
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO curso set ?', [req.body]);
        res.json({Message: 'curso Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { clave } = req.params;
        await pool.query('UPDATE curso set ? WHERE clave = ?', [req.body, clave]);
        res.json({message: 'The curso was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        await pool.query('DELETE FROM curso WHERE nrc = ?', [nrc]);
        res.json({message: 'The course was deleted'});
    }
    public async deleteAllCourses (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM curso');
        res.json({message: 'The courses was deleted'});
    }
    public async verifica (req:Request, res:Response): Promise<any>{
        const  {nrc} = req.params;
        const curso = await pool.query('SELECT * FROM curso WHERE nrc = ?', [nrc])
        if (curso.length > 0 ){
            return res.json(curso[0]);
        }
        res.json({Text:"El curso no existe"});
    }
}
const cursoController = new CursoController();
export default cursoController;