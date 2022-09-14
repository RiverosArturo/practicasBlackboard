import {Request, Response} from 'express';
import pool from '../database';

class ComodinController {

    public async listActEq (req: Request, res: Response){
        const {nrc, noTrabajador} = req.params;
        const actividad = await pool.query('SELECT DISTINCT `id`, `nombre`, `descripcion`, `fecha`, `fechaEntrega`, `horaEntrega`, `noTrabajador`, `nrc`, `id_equipo`, `urlProfesor` FROM `actividad` WHERE nrc=? AND noTrabajador=? AND id_equipo IS NOT NULL',[nrc, noTrabajador]);
        res.json(actividad);
    }

    public async listActEs (req: Request, res: Response){
        const {nrc, noTrabajador, matricula} = req.params;
        const actividad = await pool.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND matricula=? AND id_equipo IS NULL',[nrc, noTrabajador,matricula]);
        res.json(actividad);
    }

    public async listActEqEs (req: Request, res: Response){
        const {nrc, noTrabajador, matricula, id_equipo} = req.params;
        const actividad = await pool.query('SELECT * FROM `actividad` WHERE nrc=? AND noTrabajador=? AND matricula=? AND id_equipo=?',[nrc, noTrabajador,matricula,id_equipo]);
        res.json(actividad);
    }

    public async deleteActsEq (req:Request, res:Response): Promise <void>{
        const {id_equipo,nrc,noTrabajador} = req.params;
        await pool.query('DELETE FROM actividad WHERE id_equipo=? AND nrc=? AND noTrabajador=?', [id_equipo,nrc,noTrabajador]);
        res.json({message: 'The actividad teams was delated'});
    }

    public async updateActAl (req:Request, res:Response): Promise<void>{
        const {id,nrc,noTrabajador,matricula} = req.params;
        await pool.query('UPDATE actividad set ? WHERE id=? AND nrc=? AND noTrabajador=? AND matricula=? AND id_equipo IS NULL', [req.body,id,nrc,noTrabajador,matricula]);
        res.json({message: 'The actividad was UPDATE'});
    }
}


const comodinController = new ComodinController();
export default comodinController;