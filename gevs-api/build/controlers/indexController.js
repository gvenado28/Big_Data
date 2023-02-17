"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        try {
            return res.json({ "mensaje": "La API funciona correctacmente" });
        }
        catch (error) {
            return res.status(500).json({ error: error.message }); // muestrame el error
        }
    }
}
exports.indexController = new IndexController(); // exportar la clase sobre una constante
