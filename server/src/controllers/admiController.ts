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

    public async actividades (req: Request, res: Response){
        const {nrc, noTrabajador, id} = req.params;
        const actividad = await pool.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND id=? AND id_equipo IS NULL',[nrc, noTrabajador,id]);
        res.json(actividad);
    }

    public async actividadesE (req: Request, res: Response){
        const {nrc, noTrabajador, id, id_equipo} = req.params;
        const actividad = await pool.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND id=? AND id_equipo IS NOT NULL',[nrc, noTrabajador,id,id_equipo]);
        res.json(actividad);
    }
}


const admiController = new AdmiController();
export default admiController;