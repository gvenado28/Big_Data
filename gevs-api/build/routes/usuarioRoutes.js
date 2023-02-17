"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Listado (GET)
        this.router.get("/", usuarioController_1.usuarioController.listar);
        // Inserción (POST)
        this.router.post("/", usuarioController_1.usuarioController.agregar);
        // Actualización (PUT)
        this.router.put("/", usuarioController_1.usuarioController.actualizar);
        // Eliminar (DELETE) => param: cveUsuario
        this.router.delete("/:cveUsuario", usuarioController_1.usuarioController.eliminar);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
