import { Router } from 'express';
import avisoController from '../controllers/avisoController';

class AvisoRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/:nrc/:noTrabajador', avisoController.list);
        //this.router.get('/:id_equipo', avisoController.listEq);
        this.router.get('/:id/:nrc/:noTrabajador', avisoController.getOne);
        this.router.get('/:id/:nrc/:id_equipo/:noTrabajador', avisoController.getOneEq);
        this.router.post('/', avisoController.create);
        this.router.put('/:id/:nrc/:noTrabajador', avisoController.updateAv);
        this.router.put('/:id/:nrc/:noTrabajador/:id_equipo', avisoController.updateAvEq);
        this.router.delete('/:nrc/:noTrabajador', avisoController.deleteAviCur); 
        this.router.delete('/:id/:nrc/:noTrabajador', avisoController.delete);
        this.router.delete('/:id/:nrc/:id_equipo/:noTrabajador', avisoController.deleteEq);
        this.router.post('/:nrc', avisoController.deleteAvisos);
    }

}
const avisoRoutes = new AvisoRoutes();
export default avisoRoutes.router;