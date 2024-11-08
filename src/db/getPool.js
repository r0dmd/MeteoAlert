import mysql from 'mysql2/promise';

// Obtenemos las variables de entorno necesarias
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un grupo de conexiones con la BD
let pool;

// Función que retorna el grupo de conexiones
const getPool = async () => {
    try {
        // Si no existe, lo generamos
        if (!pool) {
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'Z',
            });

            // Una vez establecida la conexión, generamos la BD si no existe; y la seleccionamos
            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);
            await pool.query(`USE ${MYSQL_DB}`);
        }

        return await pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
