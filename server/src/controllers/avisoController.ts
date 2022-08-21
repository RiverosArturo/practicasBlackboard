import {Request, Response} from 'express';
import pool from '../database';

class AvisoController {

    public async list (req: Request, res: Response){
        const actividad = await pool.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso`');
        res.json(actividad);
    }
    public async listEq (req: Request, res: Response){
        const {id_equipo} = req.params;
        const actividad = await pool.query('SELECT DISTINCT id, aviso, fecha, hora, noTrabajador, nrc, id_equipo FROM `aviso` WHERE id_equipo = ?',[id_equipo]);
        res.json(actividad);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {id,nrc,noTrabajador} = req.params;
        const actividad = await pool.query('SELECT * FROM `aviso` WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL LIMIT 1', [id,nrc,noTrabajador])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({id: "", aviso:"", fecha:"",hora:"",noTrabajador:0,nrc:0,id_equipo:0});
        }
    }
    public async getOneEq (req:Request, res:Response): Promise<any>{
        const  {id,nrc,id_equipo,noTrabajador} = req.params;
        const actividad = await pool.query('SELECT * FROM `aviso` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=? LIMIT 1', [id,nrc,id_equipo,noTrabajador])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({id: "FALLO", aviso:"", fecha:"",hora:"",noTrabajador:0,nrc:0,id_equipo:0});
        }
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO aviso set ?', [req.body]);
        res.json({Message: 'aviso Saved'});
    }
    public async updateAv (req:Request, res:Response): Promise<void>{
        const {id,nrc,noTrabajador} = req.params;
        await pool.query('UPDATE aviso set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [req.body,id,nrc,noTrabajador]);
        res.json({message: 'The actividad was UPDATE'});
    }
    public async updateAvEq (req:Request, res:Response): Promise<void>{
        const {id,nrc,noTrabajador,id_equipo} = req.params;
        await pool.query('UPDATE aviso set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo=?', [req.body,id,nrc,noTrabajador,id_equipo]);
        res.json({message: 'The actividad was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {id,nrc,noTrabajador} = req.params;
        await pool.query('DELETE FROM aviso WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [id,nrc,noTrabajador]);
        res.json({message: 'The aviso was delated'});
    }
    public async deleteEq (req:Request, res:Response): Promise <void>{
        const {id,nrc,id_equipo,noTrabajador} = req.params;
        await pool.query('DELETE FROM `aviso` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=?', [id,nrc,id_equipo,noTrabajador]);
        res.json({message: 'The aviso was delated'});
    }
    public async deleteAllAvisos (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM aviso');
        res.json({message: 'The courses was deleted'});
    }
}
const avisoController = new AvisoController();
export default avisoController;