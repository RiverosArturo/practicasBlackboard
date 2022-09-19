import { Router } from 'express';

import cursoController from '../controllers/cursoController';

class CursoRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', cursoController.list);
        this.router.get('/:nrc', cursoController.getOneCourse);
        this.router.post('/', cursoController.create);
        this.router.put('/:clave', cursoController.update); 
        this.router.delete('/:nrc', cursoController.delete); 
        this.router.post('/:nrc', cursoController.deleteCursos); 
        this.router.delete('/', cursoController.deleteAllCourses);
        this.router.get('/:nrc', cursoController.verifica);
    }

}
const cursoRoutes = new CursoRoutes();
export default cursoRoutes.router;

