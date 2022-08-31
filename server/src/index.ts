import  express, {Application}  from "express";

import morgan from "morgan";
import cors from "cors";
import studRoutes from './routes/studRoutes';
import cursoRoutes from "./routes/cursoRoutes";
import profRoutes from "./routes/profRoutes";
import profCourseRoutes from "./routes/profCourseRoutes";
import admiRoutes from "./routes/admiRoutes";
import equipoRoutes  from "./routes/equipoRoutes";
import loginRoutes from "./routes/loginRoutes";
import studCourseRoutes from "./routes/studCourseRoutes";
import actividadRoutes from "./routes/actividadRoutes";
import equipoStudentsRoutes from './routes/equipoStudentsRoutes';
import avisoRoutes from "./routes/avisoRoutes";
import chatRoutes from "./routes/chatRoutes";
import comodinRoutes from "./routes/comodinRoutes";

class Server {
    public app : Application;
    // public server: any;
    // public io: any;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        // this.server = require('http').Server(this.app);
        // this.io = require('socket.io')(this.server);
    }
    config(): void{
        //se establece puerto
        this.app.set('port', process.env.PORT || 3000);
        // this.server.set('port', process.env.PORT || 3000);
        
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes(): void{      
        this.app.use('/api/student', studRoutes);
        this.app.use('/api/curso', cursoRoutes);
        this.app.use('/api/prof', profRoutes);
        this.app.use('/api/profCourse',profCourseRoutes);
        this.app.use('/api/studCourse',studCourseRoutes);
        this.app.use('/api/admi',admiRoutes);
        this.app.use('/api/equipo',equipoRoutes);
        this.app.use('/api/actividad',actividadRoutes);
        this.app.use('/api/login',loginRoutes); 
        this.app.use('/api/equipoStudents',equipoStudentsRoutes);  
        this.app.use('/api/aviso', avisoRoutes);  
        this.app.use('/api/chat', chatRoutes);  
        this.app.use('/api/comodin',comodinRoutes);   
    }
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
        // this.server.listen(this.server.get('port'), () => {
        //     console.log("Servidor corriendo en", this.server.get('port'));
        // })
    }
}
const server = new Server();
server.start();
