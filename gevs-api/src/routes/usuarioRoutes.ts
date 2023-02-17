import { Router } from "express"
import { usuarioController } from "../controllers/usuarioController";

class UsuarioRoutes {

    public router: Router;

    constructor () {
        this.router = Router();
        this.config();
    }

    private config (){
        // Listado (GET)
        this.router.get("/", usuarioController.listar);

        // Inserción (POST)
        this.router.post("/", usuarioController.agregar);

        // Actualización (PUT)
        this.router.put("/", usuarioController.actualizar);

        // Eliminar (DELETE) => param: cveUsuario
        this.router.delete("/:cveUsuario", usuarioController.eliminar);
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;