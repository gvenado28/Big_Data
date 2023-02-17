import {Request, Response} from 'express';
import pool from '../database/database';

class IndexController {

    public async index(req: Request, res: Response){
        try {
            const result = await pool.then(async (connection) => {
                return await connection.query("SHOW SCHEMAS");
            });
            
            return res.json(result);
        } catch (error: any) {
            return res.status(500).json({error: error.message});    // muestrame el error
        }
    }
}

export const indexController = new IndexController();   // exportar la clase sobre una constante