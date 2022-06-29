import {Request, Response} from 'express';
import pool from '../database';

class AdmiController {

    public async list (req: Request, res: Response){
      const admi = await pool.query('SELECT * FROM administrador');
        res.json(admi);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {user} = req.params;
        const admi = await pool.query('SELECT * FROM administrador WHERE user = ?', [user])
        if (admi.length > 0 ){
            return res.json(admi[0]);
        }
        res.status(404).json({Text:"El Admistrador no exixte"});
    }
}


const admiController = new AdmiController();
export default admiController;