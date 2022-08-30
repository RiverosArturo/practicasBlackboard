import {Request, Response} from 'express';
import pool from '../database';

class EquipoAlumnoController {

      public async getquipoAlumno(req: Request, res: Response){
        const  {nrc, nTrabajador} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo WHERE curso_nrc = ? AND nTrabajador = ?', [nrc, nTrabajador])
          res.json(equipo);
      }  
    
}
const equipoAlumnoController = new EquipoAlumnoController();
export default equipoAlumnoController;