import { Router } from 'express';

import equipoController from '../controllers/equipoController';

class EquipoRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/:id', equipoController.getid);
        this.router.get('/:id/:nombre/:curso_nrc/:nTrabajador', equipoController.getOneEquipo);
        this.router.get('/:curso_nrc/:nTrabajador', equipoController.getEquipos1);
        //this.router.get('/:id/:curso_nrc/:nTrabajador', equipoController.getNameEquipo);        
        this.router.get('/', equipoController.getEquipos);
        this.router.post('/', equipoController.saveEquipo);
        this.router.put('/:id/:nrc/:nTrabajador', equipoController.updateEquipo); 
        this.router.delete('/:id/:curso_nrc/:nTrabajador', equipoController.deleteEquipo); 
        this.router.delete('/:curso_nrc/:nTrabajador', equipoController.deleteAllEquipos);
        this.router.post('/:nrc', equipoController.deleteEquipoo);
    }

}
const equipoRoutes = new EquipoRoutes();
export default equipoRoutes.router;

