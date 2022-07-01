import {Request, Response} from 'express';
import pool from '../database';

class LoginController {

  public async getOneAdmi (req:Request, res:Response): Promise<any>{
      const  {id} = req.params;
      const admi = await pool.query('SELECT * FROM administrador WHERE id = ?', [id])
      if (admi.length > 0 ){
          return res.json(admi[0]);
      }
      res.json({Text:"El administrador no exissste"});
  }
}


const loginController = new LoginController();
export default loginController;