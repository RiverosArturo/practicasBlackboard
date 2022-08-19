import { Router } from 'express';
import chatController from '../controllers/chatController';

class ChatRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', chatController.list);
        //this.router.get('/:nrc', avisoController.getOneCourse);
        this.router.post('/', chatController.create);
        this.router.put('/:id', chatController.update); 
        this.router.delete('/:id', chatController.delete); 
        this.router.delete('/', chatController.deleteAllAvisos);
    }

}
const chatRoutes = new ChatRoutes();
export default chatRoutes.router;