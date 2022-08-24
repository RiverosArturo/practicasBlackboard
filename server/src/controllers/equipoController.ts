import {Request, Response} from 'express';
import pool from '../database';

class EquipoController {
    public async getid (req:Request, res:Response): Promise<any>{
        const  {id} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo WHERE id = ? ', [id])
        if (equipo.length > 0 ){
            return res.json(equipo[0]);
        }else{            
            res.json({id:'0'});
        }
    }
    public async getOneEquipo (req:Request, res:Response): Promise<any>{
        const  {id,nombre,curso_nrc,nTrabajador} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo WHERE nombre=? AND curso_nrc=? AND nTrabajador=?', [nombre,curso_nrc,nTrabajador])
        if (equipo.length > 0 ){
            return res.json(equipo[0]);
        }else{            
            res.json({nombre:'A' ,curso_nrc:curso_nrc, nTrabajador:nTrabajador});
        }
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
    // public async getNameEquipo (req:Request, res:Response): Promise<any>{
    //     const  {curso_nrc, nTrabajador } = req.params;
    //     //res.json({ nombre: 'prueba ' + nombre });
        
    //     const equipo = await pool.query('SELECT * FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?  ', [ id, curso_nrc, nTrabajador ])
    //     if (equipo.length > 0 ){      
    //         return res.json(equipo[0]);            
    //     }else{            
    //         res.json({ nombre: '...' });
    //     }  
    // }
    public async saveEquipo (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO equipo set ?', [req.body]);
        res.json({Message: 'Equipo Saved'});
    }
    public async updateEquipo (req:Request, res:Response): Promise<void>{
        const { id, nrc, nTrabajador } = req.params;
        await pool.query('UPDATE equipo set ? WHERE id = ? AND curso_nrc = ? AND nTrabajador = ?', [req.body, id,nrc,nTrabajador]);
        res.json({message: 'The Equipo was UPDATE !!!!!!!!!!'});
    }
    public async deleteEquipo (req:Request, res:Response): Promise <void>{
        const {id, curso_nrc, nTrabajador} = req.params;
        await pool.query('DELETE FROM equipo WHERE id = ? AND curso_nrc = ? AND nTrabajador = ?', [id,curso_nrc,nTrabajador]);         
        res.json({message: 'The Equipo was deleted'});
    }
    public async deleteAllEquipos (req:Request, res:Response): Promise <void>{
        const {curso_nrc, nTrabajador} = req.params;
        await pool.query('DELETE FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?', [curso_nrc,nTrabajador]); 
        res.json({message: 'The Equipos was deleted'});
    }
}
const equipoController = new EquipoController();
export default equipoController;