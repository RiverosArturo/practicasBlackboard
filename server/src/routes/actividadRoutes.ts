import { Router } from 'express';
import ActividadController from '../controllers/actividadController';

class actividadRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        //this.router.get('/', ActividadController.getActivity);
        this.router.get('/', ActividadController.list);
        this.router.get('/', ActividadController.listEq);
        this.router.get('/:id/:nrc/:noTrabajador', ActividadController.getOne);
        //this.router.get('/:listAct', ActividadController.listAct);
        this.router.get('/:id/:nrc/:id_equipo/:noTrabajador', ActividadController.getOneEq);
        this.router.post('/', ActividadController.create);
        this.router.put('/:id/:nrc/:noTrabajador', ActividadController.updateAct);
        this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', ActividadController.updateActEq);
        //this.router.put('/:id/:idEquipo', ActividadController.updateActEq);
        this.router.delete('/:id/:nrc/:noTrabajador', ActividadController.delete);
        this.router.delete('/:id/:nrc/:id_equipo/:noTrabajador', ActividadController.deleteEq);
        //this.router.delete('/:id/:idEquipo', ActividadController.deleteActEq); 
    }

}
const ActividadRoutes = new actividadRoutes();
export default ActividadRoutes.router;