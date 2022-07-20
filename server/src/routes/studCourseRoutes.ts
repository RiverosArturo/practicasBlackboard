import { Router } from 'express';
import studCourseController from '../controllers/studCourseController';

class studCourseRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/:nTrabajador/:nrc', studCourseController.getlist);        
        this.router.get('/:nrc/:nTrabajador', studCourseController.list);
        this.router.get('/:nrc/:nTrabajador/:matricula', studCourseController.getOne);
        this.router.post('/', studCourseController.create);
        this.router.put('/:nrc/:nTrabajador/:matricula', studCourseController.update); 
        this.router.delete('/:matricula/:nrc/:nTrabajador', studCourseController.deleteOne); 
        this.router.delete('/', studCourseController.deleteAll); 
    }

}
const StudCourseRoutes = new studCourseRoutes();
export default StudCourseRoutes.router;

