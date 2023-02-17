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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authDAO_1 = __importDefault(require("../dao/authDAO"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keysSecret_1 = __importDefault(require("../config/keysSecret"));
class AuthController {
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Realizar la segmentación de los datos del body
                const _a = req.body, { username, password } = _a, rest = __rest(_a, ["username", "password"]);
                // Verificar la estructura de la petición
                if (Object.keys(rest).length > 0) {
                    return res.status(400).json({ mensaje: "La estructura no es correcta" });
                }
                //return res.json(req.body);
                // TO DO: Verificar que los datos (user y pass) no sean nulos(null)
                if (username == null || password == null) { // Ó !username || !password
                    return res.status(400).json({ mensaje: "Todos loc campos son requeridos" });
                }
                // TO DO: Verificar que los datos (user y pass) no sean nulos(null)
                if (username.trim() == "" || password.trim() == "") {
                    return res.status(400).json({ mensaje: "El usuario y/o contraseña es incorrecto" });
                }
                // Obtener lso usuarios por el dato 'username'.
                const listUsers = yield authDAO_1.default.getUSerByUsername(username);
                // return res.json(listUsers);      Devolver toda esa lista de usuarios
                if (listUsers.length <= 0) {
                    return res.status(400).json({ mensaje: "El usuario y/o contraseña es incorrecto" });
                }
                // Recorrer los datos del arreglo de usuarios.
                for (let usuario of listUsers) {
                    // Se verifica la contraseña.
                    if (usuario.passwd == password) {
                        const { passwd } = usuario, newUser = __rest(usuario, ["passwd"]);
                        var token = jsonwebtoken_1.default.sign(newUser, keysSecret_1.default.keys.secret, { expiresIn: '1h' });
                        return res.json({ mensaje: "Autenticación correctra", token });
                    }
                    else {
                        return res.status(400).json({ mensaje: "El usuario y/o contraseña es incorrecto" });
                    }
                }
            }
            catch (error) {
                return res.status(500).json({ mensaje: error.message });
            }
        });
    }
}
exports.authController = new AuthController();
