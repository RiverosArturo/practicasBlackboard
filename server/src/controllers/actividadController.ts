import {Request, Response} from 'express';
import pool from '../database';

class ActividadController {

    public async getActividad (req: Request, res: Response){
        const activ = await pool.query('SELECT * FROM actividad');
          res.json(activ);
      }
    public async list (req: Request, res: Response){
        const {nrc, noTrabajador} = req.params;
        const actividad = await pool.query('SELECT DISTINCT `id`, `nombre`, `descripcion`, `fecha`, `fechaEntrega`, `horaEntrega`, `noTrabajador`, `nrc`, `id_equipo`, `urlProfesor` FROM `actividad` WHERE nrc=? AND noTrabajador=? AND id_equipo IS NULL',[nrc, noTrabajador]);
        res.json(actividad);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {id,nrc,noTrabajador} = req.params;
        const actividad = await pool.query('SELECT * FROM `actividad` WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL LIMIT 1', [id,nrc,noTrabajador])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({id: "", nombre:"", descripcion:"", fecha:"", fechaEntrega:"",horaEntrega:"",noTrabajador:0,nrc:0,id_equipo:0});
        }
    }
    public async getOneEq (req:Request, res:Response): Promise<any>{
        const  {id,nrc,id_equipo,noTrabajador} = req.params;
        const actividad = await pool.query('SELECT * FROM `actividad` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=? LIMIT 1', [id,nrc,id_equipo,noTrabajador])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({id: "FALLO", nombre:"", descripcion:"", fecha:"", fechaEntrega:"",horaEntrega:"",noTrabajador:0,nrc:0,id_equipo:0});
        }
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO actividad set ?', [req.body]);
        res.json({Message: 'Actividad Saved'});
    }
    public async updateAct (req:Request, res:Response): Promise<void>{
        const {id,nrc,noTrabajador} = req.params;
        await pool.query('UPDATE actividad set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [req.body,id,nrc,noTrabajador]);
        res.json({message: 'The actividad was UPDATE'});
    }
    public async updateActEq (req:Request, res:Response): Promise<void>{
        const {id,nrc,noTrabajador,id_equipo} = req.params;
        await pool.query('UPDATE actividad set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo=?', [req.body,id,nrc,noTrabajador,id_equipo]);
        res.json({message: 'The actividad was UPDATE'});
    }
    public async updateActEqAl (req:Request, res:Response): Promise<void>{
        const {id,nrc,noTrabajador,id_equipo,matricula} = req.params;
        await pool.query('UPDATE actividad set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo=? AND matricula=?', [req.body,id,nrc,noTrabajador,id_equipo,matricula]);
        res.json({message: 'The actividad was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {id,nrc,noTrabajador} = req.params;
        await pool.query('DELETE FROM actividad WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [id,nrc,noTrabajador]);
        res.json({message: 'The actividad was delated'});
    }
    public async deleteEq (req:Request, res:Response): Promise <void>{
        const {id,nrc,id_equipo,noTrabajador} = req.params;
        await pool.query('DELETE FROM `actividad` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=?', [id,nrc,id_equipo,noTrabajador]);
        res.json({message: 'The actividad was delated'});
    }
    public async deleteActividadCur (req:Request, res:Response): Promise <void>{
        const {nrc,noTrabajador} = req.params;
        await pool.query('DELETE FROM actividad WHERE nrc=? AND noTrabajador=? AND id_equipo IS NULL', [nrc,noTrabajador]);
        res.json({message: 'The activitys was delated'});
    }
    public async deleteActividad(req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        if(req.body.nrc > 0){
            await pool.query('DELETE FROM actividad WHERE nrc=?', [req.body.nrc]);
            res.json({message: 'The activitys was delated'});
        }else if(req.body.matricula > 0){
            await pool.query('DELETE FROM actividad WHERE matricula=?', [req.body.matricula]);
            res.json({message: 'The activitys was delated'});
        }else if(req.body.nTrabajador > 0){
            await pool.query('DELETE FROM actividad WHERE noTrabajador=?', [req.body.nTrabajador]);
            res.json({message: 'The activitys was delated'});
        }
    }
}


const actividadController = new ActividadController();
export default actividadController;