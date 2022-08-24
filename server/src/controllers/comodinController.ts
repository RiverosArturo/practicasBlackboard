import {Request, Response} from 'express';
import pool from '../database';

class ComodinController {

    public async deleteActsEq (req:Request, res:Response): Promise <void>{
        const {id_equipo,nrc,noTrabajador} = req.params;
        await pool.query('DELETE FROM actividad WHERE id_equipo=? AND nrc=? AND noTrabajador=?', [id_equipo,nrc,noTrabajador]);
        res.json({message: 'The actividad teams was delated'});
    }
}


const comodinController = new ComodinController();
export default comodinController;