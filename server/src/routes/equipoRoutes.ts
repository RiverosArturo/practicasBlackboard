import { Router } from 'express';

import equipoController from '../controllers/equipoController';

class EquipoRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', equipoController.getEquipo);
        this.router.get('/:id', equipoController.getOneEquipo);
        this.router.get('/:id/:nombre', equipoController.getOneEquipoN);
        this.router.post('/', equipoController.saveEquipo);
        this.router.put('/:id', equipoController.updateEquipo); 
        this.router.delete('/:id', equipoController.deleteEquipo); 
        this.router.delete('/', equipoController.deleteAllEquipo);
    }

}
const equipoRoutes = new EquipoRoutes();
export default equipoRoutes.router;

