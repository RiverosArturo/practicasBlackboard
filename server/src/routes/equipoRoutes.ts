import { Router } from 'express';

import equipoController from '../controllers/equipoController';

class EquipoRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        
        this.router.get('/:id/:nombre/:curso_nrc/:nTrabajador', equipoController.getEquipo);
        this.router.get('/:curso_nrc/:nTrabajador', equipoController.getEquipos1);        
        this.router.get('/', equipoController.getEquipos);
        this.router.post('/', equipoController.saveEquipo);
        this.router.put('/:id', equipoController.updateEquipo); 
        this.router.delete('/:id', equipoController.deleteEquipo); 
        this.router.delete('/:nrc/:nTrabajador', equipoController.deleteAllEquipos);
    }

}
const equipoRoutes = new EquipoRoutes();
export default equipoRoutes.router;

