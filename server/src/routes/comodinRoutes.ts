import { Router } from 'express';
import ComodinController from '../controllers/comodinController';

class comodinRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/:nrc/:noTrabajador', ComodinController.listActEq);
        this.router.get('/:nrc/:noTrabajador/:matricula', ComodinController.listActEs);
        this.router.get('/:nrc/:noTrabajador/:matricula/:id_equipo', ComodinController.listActEqEs);
        this.router.delete('/:id_equipo/:nrc/:noTrabajador', ComodinController.deleteActsEq);
    }

}
const ComodinRoutes = new comodinRoutes();
export default ComodinRoutes.router;