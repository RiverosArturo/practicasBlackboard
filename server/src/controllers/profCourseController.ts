import {Request, Response} from 'express';
import pool from '../database';

class ProfCourseController {

// optiene user y nrc para filtar un curso exixtente    
public async getUSERNRC(req:Request, res:Response): Promise<any>{
    const  {nTrabajador, nrc} = req.params;
    const curso = await pool.query('SELECT * FROM profesor_curso WHERE nTrabajador = ? AND nrc = ? ', [nTrabajador, nrc])
    if (curso.length > 0 ){
        return res.json(curso[0]);
    }
    res.json({Text:"El curso no existe"});
}
    public async list (req: Request, res: Response){///////////////////////////////////////////////////
        const pCourse = await pool.query('SELECT * FROM profesor_curso');
          res.json(pCourse);
      }
    public async create (req:Request, res:Response): Promise<void> {///////////////////////////// 
        await pool.query('INSERT INTO profesor_curso set ?', [req.body]);
        res.json({Message: 'curso Saved'});
    }
    public async delete (req:Request, res:Response): Promise <void>{//////////////////////////////
        const {nTrabajador, nrc} = req.params;
        await pool.query('DELETE FROM profesor_curso WHERE nTrabajador = ? AND nrc = ? ', [nTrabajador, nrc]);
        res.json({message: 'The course was deleted'});
    }
    public async deleteAllProfCourses (req:Request, res:Response): Promise <void>{/////////////////
        await pool.query('DELETE FROM profesor_curso');
        res.json({message: 'The courses was deleted'});
    }
    public async deleteProfesorCu(req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        if(req.body.nrc > 0){
            await pool.query('DELETE FROM profesor_curso WHERE nrc=?', [req.body.nrc]);
            res.json({message: 'The profesor_curso was delated'});
        }else if(req.body.nTrabajador > 0){
            await pool.query('DELETE FROM profesor_curso WHERE nTrabajador=?', [req.body.nTrabajador]);
            res.json({message: 'The profesor_curso was delated'});
        }
    }
    
}
const profCourseController = new ProfCourseController();
export default profCourseController;