import pool from "../database/database";

class UsuarioDAO {

    public async listar() {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " SELECT u.cveUsuario, u.nombre, u.apellidos, u.username, r.nombre as 'rol', r.cveRol "
                + " FROM tbl_usuario u "
                + " JOIN tbl_rol r ON u.cveRol = r.cveRol "
                + " ORDER BY u.nombre ASC ");
        });
        return result;
    }

    public async agregar(usuario: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " INSERT INTO tbl_usuario SET ? ", [usuario]);
        });
        return result;
    }

    public async actualizar(usuario: any, cveUsuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " UPDATE tbl_usuario SET ? WHERE cveUsuario  ", [usuario, cveUsuario]);
        });
        return result;
    }

    public async eliminar(cveUsuario: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tbl_usuario WHERE cveUsuario = ?  ", [cveUsuario]);
        });
        return result;
    }
}

const dao = new UsuarioDAO();
export default dao;