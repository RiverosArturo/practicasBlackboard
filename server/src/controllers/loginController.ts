import {Request, Response} from 'express';
import pool from '../database';

class LoginController {

    public async list (req: Request, res: Response){
      const prof = await pool.query('SELECT * FROM profesor');
        res.json(prof);
    }
    public async getOneProf (req:Request, res:Response): Promise<any>{
        const  {ntrabajador} = req.params;
        const prof = await pool.query('SELECT * FROM profesor WHERE ntrabajador = ?', [ntrabajador])
        if (prof.length > 0 ){
            return res.json(prof[0]);
        }
        res.status(404).json({Text:"El profesor no exixte"});
    }    
}


const loginController = new LoginController();
export default loginController;