import { Router } from "express";
import { indexController } from "../controllers/indexController";

class IndexRoutes {
    
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() :void {
        this.router.get("/", indexController.index);
    }
}
const indxRoutes = new IndexRoutes();   // Creando la instancia de indexRoute.
export default indxRoutes.router;   //Compartir rutas.