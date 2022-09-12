import  express, {Application}  from "express";
import {Server as WebsocketServer } from "socket.io";
import http from 'http';

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
import comodin2Routes from "./routes/comodin2Routes";

class Server {
    public app : Application;
    public server: any;
    public io: any;
    public httpServer: any;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void{
        //se establece puerto
        this.app.set('port', process.env.PORT || 3000);
        // this.server.set('port', process.env.PORT || 3000);
        
        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin:"*",
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.server = http.createServer(this.app);
        this.io = new WebsocketServer(this.server,{
            cors:{
                origin: '*'
            }
        });
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
        this.app.use('/api/comodin2',comodin2Routes);   
    }
    start(): void{

        this.io.sockets.on('connection',(socket:any)=>{
            console.log("Nuevo usuario conectado: " + socket.id);
            //const { nameRoom } = socket.handshake.query;
            // console.log(nameRoom);
            // socket.join(nameRoom);
        
            socket.on("sendMessage", (messageInfo:any)=>{
                console.log("Enviando un msj");
                console.log("HEY: " + messageInfo.mensaje);
                console.log("Objeto: " + messageInfo.nombre);
                // console.log("HEY: " + messageInfo.type);
                //Usuario se une a la sala
                console.log("SALA: " + messageInfo.sala);
                socket.join(messageInfo.sala);
                console.log("Conectado en sala " + messageInfo.sala)
                
                //Mandamos msj a la sala
                socket.broadcast.to(messageInfo.sala).emit("reveiceMessage", messageInfo);
                // console.log("Ya pase el broadcast.emit!!!!");
                // console.log("//////////Saliendo de sendMessage y entrando a reveiceMessage////////////");
            });

            socket.on("unirSala", (sala:any) =>{
                socket.join(sala);
                console.log(socket.id + " unido a la sala " + sala);
            })

            socket.on("desconectarSala", (sala:any) => {
                socket.leave(sala);
                console.log("Abandono la sala: " + sala);
            });
        
            
        });

        // this.io.sockets.on('connection',(socket:any)=>{
        //         console.log("Nuevo usuario conectado!!!");

        //         socket.emit('test event','here is some data');
        // });

        this.server.listen(3000, () => {
            console.log('Server on port', 3000);
        });
    }
}
const server = new Server();
server.start();
