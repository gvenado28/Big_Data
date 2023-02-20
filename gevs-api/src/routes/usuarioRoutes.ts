import { Router } from "express"
import { usuarioController } from "../controllers/usuarioController";
import { checkJWT } from "../middleware/jwt";

class UsuarioRoutes {

    public router: Router;

    constructor () {
        this.router = Router();
        this.config();
    }

    private config (){
        // Listado (GET)
        this.router.get("/", [checkJWT], usuarioController.listar);

        // Inserción (POST)
        this.router.post("/", [checkJWT], usuarioController.agregar);

        // Actualización (PUT)
        this.router.put("/", [checkJWT], usuarioController.actualizar);

        // Eliminar (DELETE) => param: cveUsuario
        this.router.delete("/:cveUsuario", [checkJWT], usuarioController.eliminar);
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
