import {Request, Response} from 'express';
import pool from '../database';

class ChatController {

    public async list (req: Request, res: Response){
      const curso = await pool.query('SELECT * FROM chat');
        res.json(curso);
    }
    // public async getOneCourse (req:Request, res:Response): Promise<any>{
    //     const  {nrc} = req.params;
    //     const curso = await pool.query('SELECT * FROM curso WHERE nrc = ?', [nrc])
    //     if (curso.length > 0 ){
    //         return res.json(curso[0]);
    //     }
    //     res.json({Text:"El aviso no existe"});
    // }
    public async create (req:Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO chat set ?', [req.body]);
        res.json({Message: 'chat Saved'});
    }
    public async update (req:Request, res:Response): Promise<void>{
        const { clave } = req.params;
        await pool.query('UPDATE chat set ? WHERE id = ?', [req.body, clave]);
        res.json({message: 'The chat was UPDATE'});
    }
    public async delete (req:Request, res:Response): Promise <void>{
        const {nrc} = req.params;
        await pool.query('DELETE FROM chat WHERE id = ?', [nrc]);
        res.json({message: 'The chat was deleted'});
    }
    public async deleteAllAvisos (req:Request, res:Response): Promise <void>{
        await pool.query('DELETE FROM chat');
        res.json({message: 'The chats was deleted'});
    }
}
const chatController = new ChatController();
export default chatController;