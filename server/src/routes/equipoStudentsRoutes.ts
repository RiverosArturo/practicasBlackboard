import { Router } from 'express';

import equipoStudentsController from '../controllers/equipoStudentsController';

class EquipoStudentsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 

        this.router.get('/', equipoStudentsController.getEquipos);        
        this.router.get('/:nTrabajador/:nrc/:id', equipoStudentsController.getEquiposBien);
        this.router.post('/', equipoStudentsController.saveEquipo);
        this.router.put('/:id', equipoStudentsController.updateEquipo); 
        
//------------------------------------------------------------------------------------        
        this.router.post('/', equipoStudentsController.saveStudentEquipo);
        this.router.get('/:id_equipo', equipoStudentsController.get1Equipo);
        this.router.get('/:matricula/:nTrabajador', equipoStudentsController.getStudentEquipo);
        this.router.delete('/:matricula/:id_equipo/:nrc/:nTrabajador', equipoStudentsController.deleteStudentEquipo);
        this.router.delete('/:id_equipo/:nrc/:nTrabajador', equipoStudentsController.deleteStudentsEquipo);
        this.router.delete('/:id/:nombre/:curso_nrc/:nTrabajador', equipoStudentsController.deleteEquipo); 

    }

}
const equipoStudentsRoutes = new EquipoStudentsRoutes();
export default equipoStudentsRoutes.router;