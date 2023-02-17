"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioDAO_1 = __importDefault(require("../dao/usuarioDAO"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuarioDAO_1.default.listar();
                res.json(result);
            }
            catch (error) {
                return res.status(500).json({ mensaje: error.message });
            }
        });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: Obtener los valores del body. (nombre, apellidos, username, paswd, cveRol)
                var usuario = req.body;
                // Validar que los datos no sean nulos (null).
                if (!usuario.nombre || !usuario.apellidos || !usuario.username || !usuario.passwd || !usuario.cveRol) {
                    return res.status(400).json({ mensaje: "Todos los datos son req." });
                }
                // Verificar que los datos no esten vacios.
                if (usuario.nombre.trim() == ""
                    || usuario.apellidos.trim() == ""
                    || usuario.username.trim() == ""
                    || usuario.passwd.trim() == ""
                    || usuario.cveRol <= 0) {
                    return res.status(400).json({ mensaje: "Todos los datos son req." });
                }
                // Encriptar la contraseña.
                var encryptedText = yield utils_1.utils.hashPassword(usuario.passwd.trim());
                usuario.passwd = encryptedText;
                // Crear el objeto usuario
                const newUser = {
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    username: usuario.username,
                    passwd: usuario.passwd,
                    cveRol: usuario.cveRol
                };
                // Inserción del dato.
                const result = yield usuarioDAO_1.default.agregar(newUser);
                // Devolver el mensaje de respuesta.
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Los datos se guardaron" });
                }
                else {
                    return res.status(500).json({ mensaje: result.message });
                }
            }
            catch (error) {
                return res.status(500).json({ mensaje: error.message });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener los datos del body.
                var act = req.body;
                // Validar que los datos no sean indefinidos (null).
                if (!act.nombre || !act.apellidos || !act.cveRol || !act.cveUsuario) {
                    return res.status(400).json({ mensaje: "Todos los datos son req." });
                }
                // Validar que los datos no esten vacios.
                if (act.nombre.trim() == ""
                    || act.apellidos.trim() == ""
                    || act.cveRol <= 0
                    || act.cveUsuario <= 0) {
                    return res.status(400).json({ mensaje: "Todos los datos son req." });
                }
                // Crear un objeto con los datos a actualizar.
                const updateUser = {
                    nombre: act.nombre.trim(),
                    apellidos: act.apellidos.trim(),
                    cveRol: act.cveRol
                };
                // TODO: Persistencia de la actualización de los datos (DB => DAO).
                const result = yield usuarioDAO_1.default.actualizar(updateUser, act.cveUsuario);
                // TODO: Verificar que se realizo la actualización (affectedRows).
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Datos actualizados correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: result.message });
                }
            }
            catch (error) {
                return res.status(500).json({ mensaje: error.message });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return res.status(500).json({ mensaje: error.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
