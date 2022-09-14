import { Router } from 'express';
import admiController from '../controllers/admiController';

class AdmiRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', admiController.list);
        this.router.get('/:id', admiController.getOne);
        this.router.get('/:nrc/:noTrabajador/:id', admiController.actividades);
        this.router.get('/:nrc/:noTrabajador/:id/:id_equipo', admiController.actividadesE);
    }

}
const admiRoutes = new AdmiRoutes();
export default admiRoutes.router;

