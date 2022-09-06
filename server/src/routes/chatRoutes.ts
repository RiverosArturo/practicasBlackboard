import { Router } from 'express';
import chatController from '../controllers/chatController';

class ChatRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', chatController.list);
        this.router.get('/id_equipo', chatController.listEq);
        this.router.get('/:nrc/:noTrabajador', chatController.getOne);
        this.router.get('/:nrc/:id_equipo/:noTrabajador', chatController.getOneEq);
        this.router.post('/', chatController.create);
        // this.router.put('/:id/:nrc/:noTrabajador', ActividadController.updateAct);
        // this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', ActividadController.updateActEq);
        this.router.delete('/:matricula/:nrc/:noTrabajador', chatController.delete);
        this.router.delete('/:nrc/:id_equipo/:noTrabajador', chatController.deleteEq);
    }

}
const chatRoutes = new ChatRoutes();
export default chatRoutes.router;