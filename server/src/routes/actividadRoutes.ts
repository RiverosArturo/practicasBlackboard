import { Router } from 'express';
import actividadController from '../controllers/actividadController';
import ActividadController from '../controllers/actividadController';

class actividadRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/:nrc/:noTrabajador', ActividadController.list);
        this.router.get('/:id/:nrc/:noTrabajador', ActividadController.getOne);
        this.router.get('/:id/:nrc/:id_equipo/:noTrabajador', ActividadController.getOneEq);
        this.router.post('/', ActividadController.create);
        this.router.put('/:id/:nrc/:noTrabajador', ActividadController.updateAct);
        this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', ActividadController.updateActEq);
        this.router.put('/:id/:nrc/:noTrabajador/:id_equipo/:matricula', ActividadController.updateActEqAl);
        this.router.delete('/:id/:nrc/:noTrabajador', ActividadController.delete);
        this.router.delete('/:id/:nrc/:id_equipo/:noTrabajador', ActividadController.deleteEq);
    }

}
const ActividadRoutes = new actividadRoutes();
export default ActividadRoutes.router;