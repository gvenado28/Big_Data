"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // Iinicaliza la variable app.
        this.config(); // Llama al método config.
        this.routes(); // Llama al método routes.
    }
    config() {
        // Configurar el puerto para mi servidor.
        this.app.set("port", process.env.PORT || 3000);
        // Configurar morgan para ver las peticiones en consola.
        this.app.use((0, morgan_1.default)("dev"));
        // Permitir la conexión de API's.
        this.app.use((0, cors_1.default)());
        // Permitir solo peticiones en formato json.
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/", indexRoutes_1.default); // Todas las rutas que se encuentre en IndexRoute se vayan a raíz.
        // /api/auth
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/usuario", usuarioRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port ", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
