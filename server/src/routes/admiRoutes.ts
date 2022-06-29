import { Router } from 'express';
import admiController from '../controllers/admiController';

class AdmiRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', admiController.list);
        this.router.get('/:user', admiController.getOne);
    }

}
const admiRoutes = new AdmiRoutes();
export default admiRoutes.router;

