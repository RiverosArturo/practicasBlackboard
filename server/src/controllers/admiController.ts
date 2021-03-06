import {Request, Response} from 'express';
import pool from '../database';

class AdmiController {

    public async list (req: Request, res: Response){
      const admi = await pool.query('SELECT * FROM administrador');
        res.json(admi);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {id} = req.params;
        const admi = await pool.query('SELECT * FROM administrador WHERE id = ?', [id])
        if (admi.length > 0 ){
            return res.json(admi[0]);
        }
        res.json({Text:"El Admistrador no existe"});
    }
}


const admiController = new AdmiController();
export default admiController;