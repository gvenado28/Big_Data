import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import keysSecret from "../config/keysSecret";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    try {

        // Obtener el token (header => auth).
        const token = <string>req.headers["auth"];

        // Verificar que el token sea correcto (verify token).
        let jwtPayload = <any>jwt.verify(token, keysSecret.keys.secret);

        // Realizar la segmentación de los datos para extraer el playload (información que contiene el token).
        const { iat, exp, ...newData} = jwtPayload;

        // Renovar el token para la persistencia del token.
        const newToken = jwt.sign(newData, keysSecret.keys.secret, { expiresIn: '1h'});

        // Enviar el nuevo toke.
        res.setHeader("auth", newToken);

        // Permitir el acceso a la ruta solicitada (if token is valid)
        next();

    } catch (error: any) {
        return res.status(401).send("Not Autorized");
    }
}