import { Router } from 'express';
import avisoController from '../controllers/avisoController';

class AvisoRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', avisoController.list);
        //this.router.get('/:nrc', avisoController.getOneCourse);
        this.router.post('/', avisoController.create);
        this.router.put('/:id', avisoController.update); 
        this.router.delete('/:id', avisoController.delete); 
        this.router.delete('/', avisoController.deleteAllAvisos);
    }

}
const avisoRoutes = new AvisoRoutes();
export default avisoRoutes.router;