import {Request, Response} from 'express';
import pool from '../database';

class AvisoController {

    public async list (req: Request, res: Response){
      const curso = await pool.query('SELECT * FROM aviso');
        res.json(curso);
    }
    // public async getOneCourse (req:Request, res:Response): Promise<any>{
    //     const  {nrc} = req.params;
    //     const curso = await pool.query('SELECT * FROM curso WHERE nrc = ?', [nrc])
    //     if (curso.length > 0 ){
    //         return res.json(curso[0]);
    //     }
    //     res.json({Text:"El aviso no existe"});
    // }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO aviso set ?', [req.body]);
        res.json({Message: 'aviso Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { clave } = req.params;
        await pool.query('UPDATE aviso set ? WHERE id = ?', [req.body, clave]);
        res.json({message: 'The aviso was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        await pool.query('DELETE FROM aviso WHERE id = ?', [nrc]);
        res.json({message: 'The aviso was deleted'});
    }
    public async deleteAllAvisos (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM aviso');
        res.json({message: 'The courses was deleted'});
    }
}
const avisoController = new AvisoController();
export default avisoController;