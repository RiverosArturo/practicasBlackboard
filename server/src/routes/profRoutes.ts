import { Router } from 'express';
import profController from '../controllers/profController';

class ProfRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', profController.list);
        this.router.get('/:ntrabajador', profController.getOne);
        this.router.post('/', profController.create);
        this.router.put('/:ntrabajador', profController.update); 
        this.router.delete('/:ntrabajador', profController.delete); 
        this.router.delete('/', profController.deleteAllProf);
    }

}
const profRoutes = new ProfRoutes();
export default profRoutes.router;

