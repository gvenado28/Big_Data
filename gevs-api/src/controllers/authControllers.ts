import { Request, Response } from "express";
import dao from "../dao/authDAO";
import jwt from 'jsonwebtoken';
import keysSecret from "../config/keysSecret";

class AuthController {

    public async iniciarSesion(req: Request, res: Response) {
        try {

            // Realizar la segmentación de los datos del body
            const {username, password, ...rest} = req.body;

            // Verificar la estructura de la petición
            if (Object.keys(rest).length >0) {
                return res.status(400).json({mensaje: "La estructura no es correcta"});
            }
            
            //return res.json(req.body);

            // TO DO: Verificar que los datos (user y pass) no sean nulos(null)
            if (username == null || password == null) {     // Ó !username || !password
                return res.status(400).json({mensaje: "Todos loc campos son requeridos"});
            }

            // TO DO: Verificar que los datos (user y pass) no sean nulos(null)
            if (username.trim () == "" || password.trim() == "") {
                return res.status(400).json({mensaje: "El usuario y/o contraseña es incorrecto"});
            }

            // Obtener lso usuarios por el dato 'username'.
            const listUsers = await dao.getUSerByUsername(username);
            // return res.json(listUsers);      Devolver toda esa lista de usuarios
            if (listUsers.length <= 0) {
                return res.status(400).json({mensaje: "El usuario y/o contraseña es incorrecto"});
            }

            // Recorrer los datos del arreglo de usuarios.
            for (let usuario of listUsers) {
                
                // Se verifica la contraseña.
                if (usuario.passwd == password) {
                    const {passwd, ...newUser} = usuario;

                    var token = jwt.sign(newUser, keysSecret.keys.secret, {expiresIn: '1h'});

                    return res.json({mensaje: "Autenticación correctra", token});
                } else {
                    return res.status(400).json({mensaje: "El usuario y/o contraseña es incorrecto"});
                }
            }

        } catch (error: any) {
            return res.status(500).json({mensaje: error.message});
        }
    }
}

export const authController = new AuthController();