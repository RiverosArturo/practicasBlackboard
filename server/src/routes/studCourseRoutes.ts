import { Router } from 'express';
import studCourseController from '../controllers/studCourseController';

class studCourseRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', studCourseController.list);
        this.router.get('/:nrc/:nTrabajador/:matricula', studCourseController.getOne);
        this.router.post('/', studCourseController.create);
        this.router.put('/:matricula', studCourseController.update); 
        this.router.delete('/:matricula', studCourseController.delete); 
    }

}
const StudCourseRoutes = new studCourseRoutes();
export default StudCourseRoutes.router;

