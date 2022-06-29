import { Router } from 'express';
import studController from '../controllers/studController';
import gamesController from '../controllers/gamesController';
import cursoContrller  from  '../controllers/cursoController'


class HomeRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        
    }

}
const homeRoutes = new HomeRoutes();
export default homeRoutes.router;

