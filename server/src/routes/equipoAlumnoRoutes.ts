import { Router } from 'express';

import equipoAlumnoController from '../controllers/equipoAlumnoController';

class EquipoAlumnoRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        
        this.router.get('/:nrc/:nTrabajador', equipoAlumnoController.getquipoAlumno);
    }

}
const equipoAlumnoRoutes = new EquipoAlumnoRoutes();
export default equipoAlumnoRoutes.router;

