import { Router } from 'express';
import ActividadController from '../controllers/actividadController';

class actividadRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', ActividadController.getActivity);
        this.router.get('/', ActividadController.list);
        this.router.get('/:id/:noTrabajador/:nrc', ActividadController.getOne);
        this.router.get('/:listAct', ActividadController.listAct);
        this.router.get('/:id/:id_equipo/:noTrabajador/:nrc', ActividadController.getOneEq);
        this.router.post('/', ActividadController.create);
        this.router.put('/:id', ActividadController.update);
        //this.router.put('/:id/:idEquipo', ActividadController.updateActEq);
        this.router.delete('/:id', ActividadController.delete);
        //this.router.delete('/:id/:idEquipo', ActividadController.deleteActEq); 
    }

}
const ActividadRoutes = new actividadRoutes();
export default ActividadRoutes.router;