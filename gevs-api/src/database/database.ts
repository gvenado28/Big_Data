import mysql from 'promise-mysql';
import keys from '../config/keys';

// Generar un pool de conexión.
const pool = mysql.createPool(keys.database);
export default pool;