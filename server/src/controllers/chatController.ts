import {Request, Response} from 'express';
import pool from '../database';

class ChatController {

    public async list (req: Request, res: Response){
        const actividad = await pool.query('SELECT DISTINCT mensaje, noTrabajador, nrc, id_equipo, matricula FROM `chat` AND id_equipo IS NULL LIMIT1 ');
        res.json(actividad);
    }
    public async listEq (req: Request, res: Response){
        const {id_equipo} = req.params;
        const actividad = await pool.query('SELECT DISTINCT mensaje, noTrabajador, nrc, id_equipo, matricula FROM `chat` WHERE id_equipo = ?',[id_equipo]);
        res.json(actividad);
    }
    public async getOne (req:Request, res:Response): Promise<any>{
        const  {matricula,nrc,noTrabajador} = req.params;
        const actividad = await pool.query('SELECT * FROM `chat` WHERE matricula=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL LIMIT 1', [matricula,nrc,noTrabajador])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({mensaje: "", noTrabajador:0, nrc:0,id_equipo:0,matricula:0});
        }
    }
    public async getOneEq (req:Request, res:Response): Promise<any>{
        const  {nrc,id_equipo,noTrabajador,x} = req.params;
        const actividad = await pool.query('SELECT * FROM `chat` WHERE nrc=? AND id_equipo=? AND noTrabajador=? LIMIT 1', [nrc,id_equipo,noTrabajador, x])
        if (actividad.length > 0 ){
            return res.json(actividad[0]);
        }else{
            res.json({mensaje:"FALLO", noTrabajador:0, nrc:0,id_equipo:0,matricula:0});
        }
    }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO chat set ?', [req.body]);
        res.json({Message: 'msj Saved'});
    }
    // public async updateCh (req:Request, res:Response): Promise<void>{
    //     const {id,nrc,noTrabajador} = req.params;
    //     await pool.query('UPDATE aviso set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [req.body,id,nrc,noTrabajador]);
    //     res.json({message: 'The actividad was UPDATE'});
    // }
    // public async updateAvEq (req:Request, res:Response): Promise<void>{
    //     const {id,nrc,noTrabajador,id_equipo} = req.params;
    //     await pool.query('UPDATE aviso set ? WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo=?', [req.body,id,nrc,noTrabajador,id_equipo]);
    //     res.json({message: 'The actividad was UPDATE'});
    // }
    public async delete (req:Request, res:Response): Promise <void>{
        const {matricula,nrc,noTrabajador} = req.params;
        await pool.query('DELETE FROM aviso WHERE id=? AND nrc=? AND noTrabajador=? AND id_equipo IS NULL', [matricula,nrc,noTrabajador]);
        res.json({message: 'The msj was delated'});
    }
    public async deleteEq (req:Request, res:Response): Promise <void>{
        const {nrc,id_equipo,noTrabajador,x} = req.params;
        await pool.query('DELETE FROM `aviso` WHERE id=? AND nrc=? AND id_equipo=? AND noTrabajador=?', [nrc,id_equipo,noTrabajador,x]);
        res.json({message: 'The msj was delated'});
    }
    // public async deleteAllAvisos (req:Request, res:Response): Promise <void>{
    //     await pool.query('DELETE FROM aviso');
    //     res.json({message: 'The courses was deleted'});
    // }
}
const chatController = new ChatController();
export default chatController;