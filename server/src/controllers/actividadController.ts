import {Request, Response} from 'express';
import pool from '../database';

class ActividadController {

    public async list (req: Request, res: Response){
      const actividad = await pool.query('SELECT * FROM actividad');
        res.json(actividad);
    }
    public async getActivity (req: Request, res: Response){
        const actividad = await pool.query('SELECT * FROM actividad');
          res.json(actividad);
      }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {id} = req.params;
        const actividad = await pool.query('SELECT * FROM actividad WHERE id = ? AND id_equipo IS NULL ', [id])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({id: "", nombre:"", descripcion:"", fecha:"", fechaEntrega:"",horaEntrega:"",noTrabajador:0,nrc:0,id_equipo:0});
        }
    }
    public async getOneEq (req:Request, res:Response): Promise<any>{
        const  {id, id_equipo} = req.params;
        const actividad = await pool.query('SELECT * FROM actividad WHERE id = ? AND id_equipo = ? ', [id,id_equipo])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({id: "", nombre:"", descripcion:"", fecha:"", fechaEntrega:"",horaEntrega:"",noTrabajador:0,nrc:0,id_equipo:0});
        }
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO actividad set ?', [req.body]);
        res.json({Message: 'Actividad Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE actividad set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The actividad was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {id} = req.params;
        await pool.query('DELETE FROM actividad WHERE id = ?', [id]);
        res.json({message: 'The Profesor was delated'});
    }
}


const actividadController = new ActividadController();
export default actividadController;