import  express, {Application}  from "express";

import morgan from "morgan";
import cors from "cors";

import indexRoutes from './routes/indexRoutes';

import studRoutes from './routes/studRoutes';
import cursoRoutes from "./routes/cursoRoutes";
import profRoutes from "./routes/profRoutes";
import profCourseRoutes from "./routes/profCourseRoutes";
import admiRoutes from "./routes/admiRoutes";
import equipoRoutes  from "./routes/equipoRoutes";
import loginRoutes from "./routes/loginRoutes";
import studCourseRoutes from "./routes/studCourseRoutes";
import actividadRoutes from "./routes/actividadRoutes";

class Server {
    public app : Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes(): void{
        this.app.use('/', indexRoutes);        
        this.app.use('/api/student', studRoutes);
        this.app.use('/api/curso', cursoRoutes);
        this.app.use('/api/prof', profRoutes);
        this.app.use('/api/profCourse',profCourseRoutes);
        this.app.use('/api/studCourse',studCourseRoutes);
        this.app.use('/api/admi',admiRoutes);
        this.app.use('/api/equipo',equipoRoutes);
        this.app.use('/api/actividad',actividadRoutes);
        this.app.use('/api/login',loginRoutes);        
    }
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
