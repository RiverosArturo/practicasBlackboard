import { Router } from 'express';
import loginController from '../controllers/loginController';

class LoginRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }  

    config(): void { 
        this.router.get('/', loginController.getlistProf);
        this.router.get('/:nTrabajador', loginController.getOneProf);        

        this.router.get('/', loginController.getlistStudent);
        this.router.get('/:matricula', loginController.getOneStudent);

        this.router.get('/', loginController.getlistAdmi);
        this.router.get('/:id', loginController.getOneAdmi);
    }

}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;

