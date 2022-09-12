import {Request, Response} from 'express';
import pool from '../database';

class ComodinController2 {

    public async listEq (req: Request, res: Response){
        const {nrc, noTrabajador} = req.params;
        const actividad = await pool.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso` WHERE nrc=? AND noTrabajador=? AND id_equipo IS NOT NULL',[nrc, noTrabajador]);
        res.json(actividad);
    }
    public async listEqAl (req: Request, res: Response){
        const {nrc, noTrabajador, id_equipo} = req.params;
        const actividad = await pool.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso` WHERE nrc=? AND noTrabajador=? AND id_equipo=?',[nrc, noTrabajador,id_equipo]);
        res.json(actividad);
    }
}


const comodin2Controller = new ComodinController2();
export default comodin2Controller;