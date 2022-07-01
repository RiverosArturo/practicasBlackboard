import {Request, Response} from 'express';
import pool from '../database';

class LoginController {

    public async getlistProf (req: Request, res: Response){
      const prof = await pool.query('SELECT * FROM profesor');
        res.json(prof);
    }
    public async getOneProf (req:Request, res:Response): Promise<any>{
        const  {ntrabajador} = req.params;
        const prof = await pool.query('SELECT * FROM profesor WHERE ntrabajador = ?', [ntrabajador])
        if (prof.length > 0 ){
            return res.json(prof[0]);
        }
        res.json({Text:"El profesor no exixte"});
    }
//---------------------------------------------------------------------------------------------------

    public async getlistStudent (req: Request, res: Response){
        const student = await pool.query('SELECT * FROM studiante');
        res.json(student);
    }
    public async getOneStudent (req:Request, res:Response): Promise<any>{
        const  {matricula} = req.params;
        const student = await pool.query('SELECT * FROM estudiante WHERE matricula = ?', [matricula])
        if (student.length > 0 ){
            return res.json(student[0]);
        }
        res.json({Text:"El Alumno no exixte"});
    }
//-------------------------------------------------------------------------------------------------------
public async getlistAdmi (req: Request, res: Response){
    const admi = await pool.query('SELECT * FROM administrador');
      res.json(admi);
  }
  public async getOneAdmi (req:Request, res:Response): Promise<any>{
      const  {id} = req.params;
      const admi = await pool.query('SELECT * FROM administrador WHERE id = ?', [id])
      if (admi.length > 0 ){
          return res.json(admi[0]);
      }
      res.json({Text:"El administrador no exixte"});
  }
}


const loginController = new LoginController();
export default loginController;