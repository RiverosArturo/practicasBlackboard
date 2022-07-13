import { Router } from 'express';
import profCourseController from '../controllers/profCourseController';

class ProfCourseRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', profCourseController.list);
        this.router.get('/:nTrabajador', profCourseController.getOne);
        this.router.get('/:nrc', profCourseController.getOneNrcCourse);
        this.router.get('/:nrc', profCourseController.getNrcCourse);
        this.router.get('/:nrc', profCourseController.getNRCCourse);
        this.router.post('/', profCourseController.create);
        this.router.put('/:nrc', profCourseController.update); 
        this.router.delete('/:nrc', profCourseController.delete); 
        this.router.delete('/', profCourseController.deleteAllProfCourses);
    }

}
const profCourseRoutes = new ProfCourseRoutes();
export default profCourseRoutes.router;

