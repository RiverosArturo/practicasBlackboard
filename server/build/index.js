"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const studRoutes_1 = __importDefault(require("./routes/studRoutes"));
const cursoRoutes_1 = __importDefault(require("./routes/cursoRoutes"));
const profRoutes_1 = __importDefault(require("./routes/profRoutes"));
const profCourseRoutes_1 = __importDefault(require("./routes/profCourseRoutes"));
const admiRoutes_1 = __importDefault(require("./routes/admiRoutes"));
const equipoRoutes_1 = __importDefault(require("./routes/equipoRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const studCourseRoutes_1 = __importDefault(require("./routes/studCourseRoutes"));
const actividadRoutes_1 = __importDefault(require("./routes/actividadRoutes"));
const equipoStudentsRoutes_1 = __importDefault(require("./routes/equipoStudentsRoutes"));
const avisoRoutes_1 = __importDefault(require("./routes/avisoRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const comodinRoutes_1 = __importDefault(require("./routes/comodinRoutes"));
const comodin2Routes_1 = __importDefault(require("./routes/comodin2Routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        //se establece puerto
        this.app.set('port', process.env.PORT || 3000);
        // this.server.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({
            origin: "*",
            credentials: true
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: '*'
            }
        });
    }
    routes() {
        this.app.use('/api/student', studRoutes_1.default);
        this.app.use('/api/curso', cursoRoutes_1.default);
        this.app.use('/api/prof', profRoutes_1.default);
        this.app.use('/api/profCourse', profCourseRoutes_1.default);
        this.app.use('/api/studCourse', studCourseRoutes_1.default);
        this.app.use('/api/admi', admiRoutes_1.default);
        this.app.use('/api/equipo', equipoRoutes_1.default);
        this.app.use('/api/actividad', actividadRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
        this.app.use('/api/equipoStudents', equipoStudentsRoutes_1.default);
        this.app.use('/api/aviso', avisoRoutes_1.default);
        this.app.use('/api/chat', chatRoutes_1.default);
        this.app.use('/api/comodin', comodinRoutes_1.default);
        this.app.use('/api/comodin2', comodin2Routes_1.default);
    }
    start() {
        this.io.sockets.on('connection', (socket) => {
            console.log("Nuevo usuario conectado: " + socket.id);
            //const { nameRoom } = socket.handshake.query;
            // console.log(nameRoom);
            // socket.join(nameRoom);
            socket.on("sendMessage", (messageInfo) => {
                console.log("Enviando un msj");
                console.log("HEY: " + messageInfo.mensaje);
                console.log("Objeto: " + messageInfo.nombre);
                // console.log("HEY: " + messageInfo.type);
                //Usuario se une a la sala
                console.log("SALA: " + messageInfo.sala);
                socket.join(messageInfo.sala);
                console.log("Conectado en sala " + messageInfo.sala);
                //Mandamos msj a la sala
                socket.broadcast.to(messageInfo.sala).emit("reveiceMessage", messageInfo);
                // console.log("Ya pase el broadcast.emit!!!!");
                // console.log("//////////Saliendo de sendMessage y entrando a reveiceMessage////////////");
            });
            socket.on("unirSala", (sala) => {
                socket.join(sala);
                console.log(socket.id + " unido a la sala " + sala);
            });
            socket.on("desconectarSala", (sala) => {
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
