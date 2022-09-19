import { Router } from 'express';
import profCourseController from '../controllers/profCourseController';

class ProfCourseRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void {              
        this.router.get('/:nTrabajador/:nrc', profCourseController.getUSERNRC);
        this.router.get('/', profCourseController.list);   
        this.router.post('/', profCourseController.create);                
        this.router.delete('/:nTrabajador/:nrc', profCourseController.delete); 
        this.router.delete('/', profCourseController.deleteAllProfCourses);
        this.router.post('/:nrc', profCourseController.deleteProfesorCu);
    }

}
const profCourseRoutes = new ProfCourseRoutes();
export default profCourseRoutes.router;

