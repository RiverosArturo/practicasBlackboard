"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const studRoutes_1 = __importDefault(require("./routes/studRoutes"));
const cursoRoutes_1 = __importDefault(require("./routes/cursoRoutes"));
const profRoutes_1 = __importDefault(require("./routes/profRoutes"));
const profCourseRoutes_1 = __importDefault(require("./routes/profCourseRoutes"));
const admiRoutes_1 = __importDefault(require("./routes/admiRoutes"));
const equipoRoutes_1 = __importDefault(require("./routes/equipoRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const studCourseRoutes_1 = __importDefault(require("./routes/studCourseRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/student', studRoutes_1.default);
        this.app.use('/api/curso', cursoRoutes_1.default);
        this.app.use('/api/prof', profRoutes_1.default);
        this.app.use('/api/profCourse', profCourseRoutes_1.default);
        this.app.use('/api/studCourse', studCourseRoutes_1.default);
        this.app.use('/api/admi', admiRoutes_1.default);
        this.app.use('/api/equipo', equipoRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
