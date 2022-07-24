import {Request, Response} from 'express';
import pool from '../database';

class EquipoController {
    public async getEquipo(req: Request, res: Response){
        const  {id,nombre,curso_nrc,nTrabajador} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo WHERE id=? AND nombre=? AND curso_nrc=? AND nTrabajador=?', [id,nombre,curso_nrc,nTrabajador])
          res.json(equipo);
      }
      public async getEquipos1(req: Request, res: Response){
        const  {curso_nrc, nTrabajador} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?', [curso_nrc, nTrabajador])
          res.json(equipo);
      }    
    public async getEquipos (req: Request, res: Response){              
        const equipo = await pool.query('SELECT * FROM equipo');
        res.json(equipo);
    }
    public async saveEquipo (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO equipo set ?', [req.body]);
        res.json({Message: 'Equipo Saved'});
    }
    public async updateEquipo (req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE equipo set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The Equipo was UPDATE'});
    }
    public async deleteEquipo (req:Request, res:Response): Promise <void>{
        const {id} = req.params;
        await pool.query('DELETE  FROM equipo WHERE id = ?', [id]);
        res.json({message: 'The Equipo was deleted'});
    }
    public async deleteAllEquipos (req:Request, res:Response): Promise <void>{
        const {curso_nrc, nTrabajador} = req.params;
        await pool.query('DELETE  FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?',[curso_nrc, nTrabajador]);
        res.json({message: 'The Equipo was deleted'});
    }
}
const equipoController = new EquipoController();
export default equipoController;