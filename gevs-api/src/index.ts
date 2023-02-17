import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';

class Server {
    public app: Application;
    
    constructor() {
        this.app= express();    // Iinicaliza la variable app.
        this.config();          // Llama al método config.
        this.routes();          // Llama al método routes.
    }

    config() :void {
        // Configurar el puerto para mi servidor.
        this.app.set("port", process.env.PORT || 3000);

        // Configurar morgan para ver las peticiones en consola.
        this.app.use(morgan("dev"));

        // Permitir la conexión de API's.
        this.app.use(cors());

        // Permitir solo peticiones en formato json.
        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: false}));
    }

    routes() :void {
        this.app.use("/", indexRoutes);     // Todas las rutas que se encuentre en IndexRoute se vayan a raíz.
        // /api/auth
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/usuario", usuarioRoutes);
    }

    start() :void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port ", this.app.get("port"));
        });
    }

}
const server = new Server();
server.start();