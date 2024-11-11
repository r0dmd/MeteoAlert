import mysql from 'mysql2/promise';

// Obtenemos las variables de entorno necesarias
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// ------------------------------------------
// Función que retorna el grupo de conexiones
const getPool = async () => {
    try {
        // Variable que almacenará un grupo de conexiones con la BD
        let pool;

        // NOTA: En el código de clase de 'Diario de Viajes' esta parte tenía un problema: aunque la BD se generaba si no existía, no se configuraba en la conexión inicial, lo que causaba problemas luego al ejecutar consultas. Para corregir esto se añadió `database: MYSQL_DB` en la configuración de `createPool`, asegurando que el pool esté conectado directamente a la BD especificada desde el inicio; y se eliminó la línea `await pool.query('USE ...')`, ya innecesaria. (David lo mencionó en clase pero no llegó a corregirlo en el repositorio)
        if (!pool) {
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB, // Seleccionamos la BD al crear el pool
                timezone: 'Z',
            });

            // Una vez establecida la conexión, generamos la BD si no existe.
            // NOTA: Es buena práctica envolver el nombre de la BD en comillas invertidas para evitar problemas con nombres de BD que puedan contener caracteres especiales
            await pool.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB}\``);
        }

        // Es suficiente con retornar 'pool' y no 'await pool', porque pool no es una promesa sino el propio objeto de conexión listo para ser usado, así que no requiere procesamiento asíncrono adicional
        return pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
