import {Request, Response} from 'express';
import pool from '../database';

class EquipoStudentsController {
    
    public async getEquipos (req: Request, res: Response){
      const equipo = await pool.query('SELECT * FROM equipo_estudiantes');
        res.json(equipo);
    }
    public async getEquiposBien (req: Request, res: Response){
        const  {nTrabajador, nrc, id} = req.params;
        const equipo = await pool.query('SELECT * FROM equipo_estudiantes WHERE nTrabajador=? AND nrc=? AND id_equipo=?', [nTrabajador,nrc,id]);
          res.json(equipo);
      }
    public async saveEquipo (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO equipo_estudiantes set ?', [req.body]);
        res.json({Message: 'Equipo Saved'});
    }
    public async updateEquipo (req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE equipo_estudiantes set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The Equipo was UPDATE'});
    }
//-------------------------------------------------------------------------------------------------    
public async saveStudentEquipo (req:Request, res:Response): Promise<void> {//
    await pool.query('INSERT INTO equipo_estudiantes set ?', [req.body]);
    res.json({Message: 'Alumno agregado al equipo.'});
}
public async getStudentEquipo (req:Request, res:Response): Promise<any>{
  const  { matricula, nTrabajador } = req.params;
  const equipo = await pool.query('SELECT * FROM `equipo_estudiantes` WHERE matricula = ? AND nTrabajador = ? ', [ matricula, nTrabajador ])
  if (equipo.length > 0 ){      
      return res.json(equipo[0]);      
  }else{            
      res.json({ matricula: 0 });
  }
}
public async getNameEquipo (req:Request, res:Response): Promise<any>{
  const  {id, nombre, curso_nrc, nTrabajador } = req.params;
  //res.json({ nombre: 'prueba ' + nombre });
  
  const equipo = await pool.query('SELECT * FROM equipo WHERE nombre = ? AND curso_nrc = ? AND nTrabajador = ?  ', [ nombre, curso_nrc, nTrabajador ])
  if (equipo.length > 0 ){      
      return res.json(equipo[0]);            
  }else{            
      res.json({ nombre: '...' });
  }  
}
public async get1Equipo (req: Request, res: Response){//
    const {id_equipo} = req.params;
    const equipo = await pool.query('SELECT * FROM `equipo_estudiantes` WHERE id_equipo = ?', [id_equipo]);
    res.json(equipo);      
  }
public async updateNameEquipo (req:Request, res:Response): Promise<void>{
    const { nombre } = req.params;
    await pool.query('UPDATE equipo set ? WHERE nombre = ?', [req.body, nombre]);
    res.json({message: 'The name equipo was UPDATE. '+ nombre});
}
public async deleteStudentEquipo (req:Request, res:Response): Promise <void>{
    const {matricula, id_equipo, nrc, nTrabajador} = req.params;
    await pool.query('DELETE FROM `equipo_estudiantes` WHERE matricula = ? AND id_equipo = ? AND nrc = ? AND nTrabajador = ?', [matricula,id_equipo,nrc,nTrabajador]);         
    res.json({message: 'The student the Equipo was deleted'});  
}  
public async deleteStudentsEquipo (req:Request, res:Response): Promise <void>{
    const {id_equipo, nrc, nTrabajador} = req.params;
    await pool.query('DELETE FROM `equipo_estudiantes` WHERE id_equipo = ? AND nrc = ? AND nTrabajador = ?', [id_equipo,nrc,nTrabajador]);        
    const id = id_equipo; const curso_nrc = nrc; 
    //await pool.query('DELETE FROM equipo WHERE id = ? AND curso_nrc = ? AND nTrabajador = ?', [id,curso_nrc,nTrabajador]);         
    res.json({message: 'equipo was delated',id_equipo, curso_nrc, nTrabajador});
}
public async deleteEquipo (req:Request, res:Response): Promise <void>{
    const {id, nombre, curso_nrc, nTrabajador} = req.params;
    //res.json({message: '::>',id, nombre, curso_nrc, nTrabajador});

    const id_equipo = id; const nrc = curso_nrc; 
    res.json({message: '::> ',id_equipo, nrc, nTrabajador});
    await pool.query('DELETE FROM `equipo_estudiantes` WHERE id_equipo = ? AND nrc = ? AND nTrabajador = ?', [id_equipo,nrc,nTrabajador]);
    res.json({message: 'The students Equipo was deleted'});
    
    //await pool.query('DELETE FROM equipo WHERE id = ? AND nombre = ? AND curso_nrc = ? AND nTrabajador = ?', [id,nombre,curso_nrc,nTrabajador]);         
    //res.json({message: 'equipo was delated'});
}
public async deleteEquipoEsCur (req:Request, res:Response): Promise <void>{
    const {nrc, nTrabajador} = req.params;
    await pool.query('DELETE FROM `equipo_estudiantes` WHERE nrc = ? AND nTrabajador = ?', [nrc,nTrabajador]);         
    res.json({message: 'The student the Equipo was deleted'});  
}  
public async deleteEquipoEs(req:Request, res:Response): Promise <void>{
    const {nrc} = req.params;
    if(req.body.nrc > 0 ){
        await pool.query('DELETE FROM equipo_estudiantes WHERE nrc=?', [req.body.nrc]);
        res.json({message: 'The equipoEs was delated'});
    }else if(req.body.matricula > 0 ){
        await pool.query('DELETE FROM equipo_estudiantes WHERE matricula=?', [req.body.matricula]);
        res.json({message: 'The equipoEs was delated'});
    }else if(req.body.nTrabajador > 0 ){
        await pool.query('DELETE FROM equipo_estudiantes WHERE nTrabajador=?', [req.body.nTrabajador]);
        res.json({message: 'The equipoEs was delated'});
    }
}
}
const equipoStudentsController = new EquipoStudentsController();
export default equipoStudentsController;
