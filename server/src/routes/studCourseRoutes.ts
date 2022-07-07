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
        this.router.get('/:nrc', studCourseController.getOneNrcCourse);
        this.router.get('/:nrc', studCourseController.getNrcCourse);
        this.router.post('/', studCourseController.create);
        this.router.put('/:nrc', studCourseController.update); 
        this.router.delete('/:nrc', studCourseController.delete); 
        this.router.delete('/', studCourseController.deleteAllProfCourses);
    }

}
const StudCourseRoutes = new studCourseRoutes();
export default StudCourseRoutes.router;

