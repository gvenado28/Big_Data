import { json, Request, Response } from "express";
import dao from "../dao/usuarioDAO";
import { utils } from "../utils/utils";

class UsuarioController {

    public async listar(req: Request, res: Response) {
        try {

            const result = await dao.listar();
            res.json(result);

        } catch (error: any){
            return res.status(500).json({mensaje: error.message});
        }
    }

    public async agregar(req: Request, res: Response) {
        try {

            // TODO: Obtener los valores del body. (nombre, apellidos, username, paswd, cveRol)
            var usuario = req.body;

            // Validar que los datos no sean nulos (null).
            if (!usuario.nombre || !usuario.apellidos || !usuario.username || !usuario.passwd || !usuario.cveRol) {
                return res.status(400).json({mensaje: "Todos los datos son req."});
            }

            // Verificar que los datos no esten vacios.
            if (usuario.nombre.trim() == ""
                || usuario.apellidos.trim() == ""
                || usuario.username.trim() == ""
                || usuario.passwd.trim() == ""
                || usuario.cveRol <= 0) {
                    return res.status(400).json({mensaje: "Todos los datos son req."});
                }

            // Encriptar la contraseña.
            var encryptedText = await utils.hashPassword(usuario.passwd.trim());
            usuario.passwd = encryptedText;

            // Crear el objeto usuario
            const newUser = {
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                username: usuario.username,
                passwd: usuario.passwd,
                cveRol: usuario.cveRol
            }

            // Inserción del dato.
            const result = await dao.agregar(newUser);

            // Devolver el mensaje de respuesta.
            if (result.affectedRows > 0) {
                return res.json({mensaje: "Los datos se guardaron"});
            } else {
                return res.status(500).json({mensaje: result.message});
            }

        } catch (error: any){
            return res.status(500).json({mensaje: error.message});
        }
    }

    public async actualizar(req: Request, res: Response) {
        try {

            // Obtener los datos del body.
            var act = req.body;

             // Validar que los datos no sean indefinidos (null).
            if (!act.nombre || !act.apellidos || !act.cveRol || !act.cveUsuario) {
                return res.status(400).json({mensaje: "Todos los datos son req."});
            }
        
            // Validar que los datos no esten vacios.
            if (act.nombre.trim() == ""
            || act.apellidos.trim() == ""
            || act.cveRol <= 0
            || act.cveUsuario <= 0) {
                return res.status(400).json({mensaje: "Todos los datos son req."});
            }

            // Crear un objeto con los datos a actualizar.
            const updateUser = {
                nombre: act.nombre.trim(),
                apellidos: act.apellidos.trim(),
                cveRol: act.cveRol
            }

            // TODO: Persistencia de la actualización de los datos (DB => DAO).
            const result = await dao.actualizar(updateUser, act.cveUsuario);

            // TODO: Verificar que se realizo la actualización (affectedRows).
            if (result.affectedRows > 0) {
                return res.json({mensaje: "Datos actualizados correctamente"});
            } else {
                return res.status(500).json({mensaje: result.message});
            }


        } catch (error: any){
            return res.status(500).json({mensaje: error.message});
        }
    }

    public async eliminar(req: Request, res: Response) {
        try {

        } catch (error: any){
            return res.status(500).json({mensaje: error.message});
        }
    }
}

export const usuarioController = new UsuarioController();