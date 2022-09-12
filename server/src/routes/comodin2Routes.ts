import { Router } from 'express';
import Comodin2Controller from '../controllers/comodin2Controller';

class comodin2Routes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/:nrc/:noTrabajador', Comodin2Controller.listEq);
        this.router.get('/:nrc/:noTrabajador/:id_equipo', Comodin2Controller.listEqAl);
    }

}
const Comodin2Routes = new comodin2Routes();
export default Comodin2Routes.router;