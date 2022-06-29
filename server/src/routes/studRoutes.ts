import { Router } from 'express';
import studController from '../controllers/studController';

class StudRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', studController.list);
        this.router.get('/:matricula', studController.getOne);
        this.router.post('/', studController.create);
        this.router.put('/:matricula', studController.update); 
        this.router.delete('/:matricula', studController.delete); 
        this.router.delete('/', studController.deleteAllStudents); 
    }

}
const studRoutes = new StudRoutes();
export default studRoutes.router;

