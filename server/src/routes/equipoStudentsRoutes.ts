import { Router } from 'express';

import equipoStudentsController from '../controllers/equipoStudentsController';

class EquipoStudentsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', equipoStudentsController.getEquipos);
        this.router.get('/:id', equipoStudentsController.getOneEquipo);
        this.router.get('/:nTrabajador/:nrc/:id', equipoStudentsController.getEquiposBien);
        this.router.post('/', equipoStudentsController.saveEquipo);
        this.router.put('/:id', equipoStudentsController.updateEquipo); 
//------------------------------------------------------------------------------------        
        this.router.post('/', equipoStudentsController.saveStudentEquipo);
        this.router.get('/:id_equipo/:nrc/:nTrabajador', equipoStudentsController.get1Equipo);
    }

}
const equipoStudentsRoutes = new EquipoStudentsRoutes();
export default equipoStudentsRoutes.router;